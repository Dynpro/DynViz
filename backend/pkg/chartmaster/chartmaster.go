package chartmaster

import (
	"DynViz/internal/database"
	"DynViz/models"
	"fmt"
	"net/http"
	"time"

	"gorm.io/gorm"
)

func VerifyChart(name string, table *gorm.DB) int64 {
	var count int64
	table.Where("name = ? AND status = ?", name, 1).Count(&count)
	return count
}

func CreateChart(chartpayload models.ChartMaster, loggeduser models.User) models.Response {
	var chart models.ChartMaster
	var response models.Response

	chart.Name = chartpayload.Name
	chart.Category = chartpayload.Category
	chart.Configs = chartpayload.Configs
	chart.LastModifiedBy = loggeduser.ID
	chart.LastModifiedDate = time.Now()

	db := database.DB
	if VerifyChart(chartpayload.Name, db.Model(&models.ChartMaster{})) > 0 {
		response.Message = "chart with the same name already exists"
		response.Code = http.StatusNotAcceptable
		return response
	} else {
		// Use the correct model for creation
		if err := db.Create(&chart).Error; err != nil {
			response.Message = "Unable to create chart"
			response.Code = http.StatusInternalServerError
			return response
		} else {
			response.Message = fmt.Sprintf("Chart : %s (%d) created successfully!", chart.Name, chart.ID)
			response.Code = http.StatusCreated
			return response
		}
	}
}

func GetAllCharts() models.Response {
	var response models.Response
	// Get database connection
	db := database.DB
	var chart []models.ChartMaster

	if err := db.Find(&chart).Error; err != nil {
		response.Message = "Failed to fetch charts"
		response.Code = http.StatusInternalServerError
		return response
	}

	if len(chart) == 0 {
		response.Message = "No charts found"
		response.Code = http.StatusNotFound
		return response
	}
	response.Message = "charts fetched successfully"
	response.Data = chart
	response.Code = http.StatusOK
	return response
}

func GetChart(ID int) models.Response {
	var response models.Response
	// Get database connection
	db := database.DB

	var chart []models.ChartMaster

	if err := db.Where("id = ?", ID).First(&chart).Error; err != nil {
		response.Message = "Failed to fetch chart"
		response.Code = http.StatusNotFound
		return response
	}

	response.Message = "Chart fetched successfully"
	response.Data = chart
	response.Code = http.StatusOK
	return response

}

func DeleteChartMaster(ID int, loggedID int) models.Response {
	var response models.Response
	db := database.DB
	update := map[string]interface{}{
		"status":             0,
		"last_modified_by":   loggedID,
		"last_modified_date": time.Now(),
	}
	result := db.Model(&models.ChartMaster{}).Where("id = ? AND status = ?", ID, 1).Updates(update)

	if err := result.Error; err != nil {
		response.Message = "Failed to delete Chart"
		response.Code = http.StatusInternalServerError
		return response
	} else if result.RowsAffected == 0 {
		response.Message = "No active Chart found with the given ID"
		response.Code = http.StatusNotFound
		return response
	} else {
		response.Message = "Chart deleted successfully"
		response.Code = http.StatusOK
		return response
	}

}

func UpdateChartMaster(chartpayload models.ChartMaster, loggeduser models.User) models.Response {
	var response models.Response
	db := database.DB

	updatefields := make(map[string]interface{})

	if chartpayload.Name != "" {
		updatefields["Name"] = chartpayload.Name
		if VerifyChart(chartpayload.Name, db.Model(&models.ChartMaster{})) > 0 {
			response.Message = "Chart with the same name already exists"
			response.Code = http.StatusNotAcceptable
			return response
		}
	}

	if chartpayload.Category != "" {
		updatefields["Category"] = chartpayload.Category
	}

	// Fetch and merge Configs
	if len(chartpayload.Configs) > 0 {

		updatefields["Configs"] = chartpayload.Configs
	}

	if len(updatefields) > 0 {
		updatefields["LastModifiedBy"] = loggeduser.ID
	}

	if err := db.Model(&models.ChartMaster{}).Where("ID = ? AND status = ?", chartpayload.ID, 1).Updates(updatefields).Error; err != nil {
		response.Message = "Failed to update Chart"
		response.Code = http.StatusInternalServerError
		return response
	} else {
		response.Message = "Chart Updated Successfully"
		response.Code = http.StatusOK
		return response

	}

}
