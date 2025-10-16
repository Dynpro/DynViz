package worksheet

import (
	"DynViz/internal/database"
	"DynViz/models"
	"fmt"
	"log"
	"net/http"
	"time"

	"gorm.io/gorm"
)

func VerifyWorksheet(name string, table *gorm.DB, projectID int, folderId int) int64 {
	var count int64
	if folderId == 0 {
		table.Where("name = ? AND project_id = ? AND status = ?", name, projectID, 1).Count(&count)
	} else {
		table.Where("name = ? AND folder_id = ? AND status = ?", name, folderId, 1).Count(&count)
	}
	return count
}

func CreateWorksheet(worksheetpayload models.Worksheet, loggeduser models.User) models.Response {
	var worksheet models.Worksheet
	var response models.Response

	worksheet.Name = worksheetpayload.Name
	worksheet.OrganizationID = loggeduser.OrganizationID
	worksheet.ProjectID = worksheetpayload.ProjectID
	worksheet.FolderID = worksheetpayload.FolderID
	worksheet.CreatedByID = loggeduser.ID
	worksheet.LastModifiedBy = loggeduser.ID

	db := database.DB
	if VerifyWorksheet(worksheetpayload.Name, db.Model(&models.Worksheet{}), worksheetpayload.ProjectID, worksheetpayload.FolderID) > 0 {
		response.Message = "Worksheet with the same name already exists"
		response.Code = http.StatusNotAcceptable
		return response
	} else {
		// Use the correct model for creation
		if err := db.Create(&worksheet).Error; err != nil {
			response.Message = "Unable to create Worksheet"
			response.Code = http.StatusInternalServerError
			return response
		}

		response.Message = fmt.Sprintf("Worksheet : %s (%d) created successfully!", worksheet.Name, worksheet.ID)
		response.Code = http.StatusCreated
		return response
	}
}

func DeleteWorksheet(ID int, loggedID int) models.Response {
	var response models.Response
	db := database.DB

	// Prepare the update fields
	update := map[string]interface{}{
		"status":           0,
		"last_modified_by": loggedID,
		"deactivate_by_id": loggedID,
		"deactivate_date":  time.Now(),
		// "last_modified_date" : time.Now(),
	}

	// Perform the update operation
	result := db.Model(&models.Worksheet{}).Where("id = ? AND status = ?", ID, 1).Updates(update)

	// Check for errors
	if result.Error != nil {
		response.Message = "Failed to delete Worksheet"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Check if any rows were affected
	if result.RowsAffected == 0 {
		response.Message = "No active Worksheet found with the given ID"
		response.Code = http.StatusNotFound
		return response
	}

	// Successful update
	response.Message = "Worksheet deleted successfully"
	response.Code = http.StatusOK
	return response
}

func UpdateWorksheet(worksheetpayload models.Worksheet, loggeduser models.User) models.Response {
	var response models.Response
	db := database.DB
	updatefields := make(map[string]interface{})

	if worksheetpayload.Name != "" {
		if VerifyWorksheet(worksheetpayload.Name, db.Model(&models.Worksheet{}), worksheetpayload.ProjectID, worksheetpayload.FolderID) > 0 {
			response.Message = "Worksheet with the same name already exists"
			response.Code = http.StatusNotAcceptable
			return response
		} else {
			updatefields["Name"] = worksheetpayload.Name
		}
	}

	if len(updatefields) > 0 {
		updatefields["LastModifiedBy"] = loggeduser.ID

		if err := db.Model(&models.Worksheet{}).Where("ID = ? AND status = ?", worksheetpayload.ID, 1).Updates(updatefields).Error; err != nil {
			response.Message = "failed to update Worksheet"
			response.Code = http.StatusInternalServerError
			return response
		}

		response.Message = "Worksheet updated successfully"
		response.Code = http.StatusOK
		return response
	}

	// If no fields were updated, respond with an appropriate message
	response.Message = "No changes detected"
	response.Code = http.StatusNoContent
	return response
}

func GetAllWorksheets(projectID int, folderID int) models.Response {
	var response models.Response
	// Get database connection
	db := database.DB
	// var worksheet []models.Worksheet
	var worksheets []map[string]interface{}

	// Select specific columns
	columns := "id, name, organization_id, project_id, folder_id"

	if folderID == 0 { // No folderID provided
		// if err := db.Select(columns).Where("project_id = ? AND folder_id = ?", projectID, 0).Find(&worksheet).Error; err != nil {
		if err := db.Model(&models.Worksheet{}).Select(columns).Where("project_id = ? AND folder_id = ?", projectID, 0).Find(&worksheets).Error; err != nil {
			response.Message = "Failed to fetch Project Worksheets"
			response.Code = http.StatusInternalServerError
			return response
		}
	} else { // FolderID provided
		// if err := db.Select(columns).Where("project_id = ? AND folder_id = ?", projectID, folderID).Find(&worksheet).Error; err != nil {
		if err := db.Model(&models.Worksheet{}).Select(columns).Where("project_id = ? AND folder_id = ?", projectID, folderID).Find(&worksheets).Error; err != nil {
			response.Message = "Failed to fetch Folder Worksheets"
			response.Code = http.StatusInternalServerError
			return response
		}
	}

	response.Message = "Worksheet fetched successfully"
	response.Data = worksheets
	response.Code = http.StatusOK
	return response
}

func GetWorksheet(worksheetID int) models.Response {
	var response models.Response
	var worksheet models.Worksheet
	db := database.DB

	WorksheetColumns := "id,name"
	CellColumns := "id,query,set_id,worksheet_id,result"

	// Fetch the Worksheet
	if err := db.Model(&models.Worksheet{}).
		Select(WorksheetColumns).
		Preload("Cell", func(db *gorm.DB) *gorm.DB {
			return db.Select(CellColumns).Where("status = ?", 1)
		}).
		Where("id = ? AND status = 1", worksheetID).
		First(&worksheet).Error; err != nil {
		response.Message = "Unable to fetch Worksheet"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = "Worksheet fetched successfully"
	response.Code = http.StatusOK
	response.Data = worksheet
	return response
}

func GetLastUsedWorksheet(loggeduser models.User) models.Response {
	var response models.Response

	db := database.DB
	var worksheet models.Worksheet

	subquery := db.Model(&models.Worksheet{}).
		Select("MAX(last_modified_date)").
		Where("organization_id = ?", loggeduser.OrganizationID)

	err := db.Where("last_modified_date = (?)", subquery).
		Where("organization_id = ?", loggeduser.OrganizationID).
		First(&worksheet).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			response.Message = "No worksheets found for the organization"
			response.Code = http.StatusInternalServerError
			return response
		}
		log.Println("Error fetching last used worksheet:", err)
		response.Message = "Error fetching last used worksheet"
		response.Code = http.StatusInternalServerError
		return response
	}
	// if err := db.Model(&models.Worksheet{}).Select(columns).Where("project_id in (?) or folder_id in (?)", projectIDs, folderIDs).Find(&worksheets).Error; err != nil {
	// 	response.Message = "Failed to fetch Project Worksheets"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	response.Message = "Worksheet fetched successfully"
	response.Data = worksheet
	response.Code = http.StatusOK
	return response
}

func GetAllWorksheetsforUser(loggeduser models.User) models.Response {
	var response models.Response
	// Get database connection
	db := database.DB
	// var worksheet []models.Worksheet
	var worksheets []map[string]interface{}
	var projectIDs []int
	var folderIDs []int

	// Get all project IDs associated with the logged user's OrganizationID
	if err := db.Model(&models.Project{}).
		Where("organization_id = ?", loggeduser.OrganizationID).
		Pluck("id", &projectIDs).Error; err != nil {
		response.Message = "Failed to fetch project IDs"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Get all folder IDs associated with the logged user's OrganizationID
	if err := db.Model(&models.Folder{}).
		Where("organization_id = ?", loggeduser.OrganizationID).
		Pluck("id", &folderIDs).Error; err != nil {
		response.Message = "Failed to fetch folder IDs"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Select specific columns
	columns := "id, name, organization_id, project_id, folder_id"

	if err := db.Model(&models.Worksheet{}).Select(columns).Where("project_id in (?) or folder_id in (?)", projectIDs, folderIDs).Find(&worksheets).Error; err != nil {
		response.Message = "Failed to fetch Project Worksheets"
		response.Code = http.StatusInternalServerError
		return response
	}

	fmt.Println(worksheets)
	if len(worksheets) == 0 {
		response.Message = "No worksheets found"
		response.Code = http.StatusNotFound
		return response
	}

	response.Message = "Worksheet fetched successfully"
	response.Data = worksheets
	response.Code = http.StatusOK
	return response
}
