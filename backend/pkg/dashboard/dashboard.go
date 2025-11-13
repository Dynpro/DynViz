package dashboard

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/tile"
	"fmt"

	"net/http"
	"time"

	"gorm.io/gorm"
)

func VerifyDashboard(name string, table *gorm.DB, folderID int) int64 {
	var count int64
	table.Where("name = ? AND folder_id = ? AND status = ?", name, folderID, 1).Count(&count)
	return count
}

func CreateDashboard(dashpayload models.GetDashboardPayload, loggeduser models.User) models.Response {
	var dashboard models.Dashboard
	var response models.Response

	dashboard.Name = dashpayload.Name
	dashboard.Description = dashpayload.Description
	dashboard.FolderID = dashpayload.FolderID
	dashboard.ProjectID = dashpayload.ProjectID // Make sure this is correct

	dashboard.CreatedByID = loggeduser.ID
	dashboard.LastModifiedBy = loggeduser.ID
	dashboard.OrganizationID = loggeduser.OrganizationID

	db := database.DB

	// Use the correct model for verification
	if VerifyDashboard(dashpayload.Name, db.Model(&models.Dashboard{}), dashpayload.FolderID) > 0 {
		response.Message = "Dashboard with the same name already exists"
		response.Code = http.StatusNotAcceptable
	} else {
		// Use the correct model for creation
		if err := db.Create(&dashboard).Error; err != nil {
			response.Message = "Unable to create Dashboard"
			response.Code = http.StatusInternalServerError
		} else {
			response.Message = fmt.Sprintf("Dashboard : %s (%d) created successfully!", dashboard.Name, dashboard.ID)
			response.Code = http.StatusCreated
		}
	}

	return response
}

func GetAllDashboard(ID int) models.Response {
	var response models.Response
	// Get database connection
	db := database.DB

	var dashboard []models.Dashboard

	if err := db.Where("folder_id = ? AND status = ?", ID, 1).Find(&dashboard).Error; err != nil {
		response.Message = "Failed to fetch dashboards"
		response.Code = http.StatusInternalServerError
		return response
	}

	if len(dashboard) == 0 {
		response.Message = "No dashboards found"
		response.Code = http.StatusNotFound
		return response
	}
	response.Message = "Dashboard fetched successfully"
	response.Data = dashboard
	response.Code = http.StatusOK
	return response

}
func GetDashboard(ID int) models.Response {
	var response models.Response
	// Get database connection
	db := database.DB

	var dashboard models.Dashboard
	var dashtiles models.DashboardTilesResponse

	if err := db.Where("id = ? AND status = ?", ID, 1).First(&dashboard).Error; err != nil {
		response.Message = "Failed to fetch dashboard"
		response.Code = http.StatusNotFound
		return response
	}

	// Fetch tiles
	tileResponse, tiles := tile.GetAllTiles(ID)
	if tileResponse.Code != http.StatusOK {
		// If there was an error fetching tiles, include the tile response message in the dashboard response
		response.Message = "Dashboard fetched, but tiles could not be fetched"
		response.Code = http.StatusPartialContent // Indicates that part of the data was fetched
		response.Data = map[string]interface{}{
			"dashboard": dashboard,
			"tiles":     tileResponse.Data,
		}
		return response
	}

	// Successful case
	dashtiles.Dashboard = dashboard
	dashtiles.Tiles = tiles

	response.Message = "Dashboard and tiles fetched successfully"
	response.Data = dashtiles
	fmt.Println(dashtiles.Dashboard)
	response.Code = http.StatusOK
	return response

}

func UpdateDashboard(dashpayload models.GetDashboardPayload, loggeduser models.User) models.Response {
	var response models.Response
	db := database.DB
	updatefields := make(map[string]interface{})

	if dashpayload.Name != "" {
		updatefields["Name"] = dashpayload.Name
	}

	if dashpayload.Description != "" {
		updatefields["Description"] = dashpayload.Description
	}

	if len(updatefields) > 0 {
		updatefields["LastModifiedBy"] = loggeduser.ID

		if VerifyDashboard(dashpayload.Name, db.Model(&models.Dashboard{}), dashpayload.FolderID) > 0 {
			response.Message = "Dashboard with the same name already exists"
			response.Code = http.StatusNotAcceptable
		} else {
			if err := db.Model(&models.Dashboard{}).Where("ID = ? AND status = ?", dashpayload.ID, 1).Updates(updatefields).Error; err != nil {
				response.Message = "failed to update Dashbaord"
				response.Code = http.StatusInternalServerError
			} else {
				response.Message = "Dashboard Updated Successfully"
				response.Code = http.StatusOK
			}
		}

	}
	return response
}

func DeleteDashboard(ID int, loggeduser models.User) models.Response {
	var response models.Response
	db := database.DB
	updates := map[string]interface{}{"deactivate_by_id": loggeduser.ID, "DeactivateDate": time.Now(), "LastModifiedBy": loggeduser.ID, "Status": 0}
	result := db.Model(&models.Dashboard{}).Where("id = ? AND status = ?", ID, 1).Updates(updates)

	if err := result.Error; err != nil {
		response.Message = "Failed to delete Dashboard"
		response.Code = http.StatusInternalServerError
	} else if result.RowsAffected == 0 {
		response.Message = "No active Dashboard found with the given ID"
		response.Code = http.StatusNotFound
	} else {
		response.Message = "Dashboard deleted successfully"
		response.Code = http.StatusOK
	}
	return response
}
