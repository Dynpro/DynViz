package set

import (
	// "DynViz/internal/connectors"
	"DynViz/internal/database"
	"DynViz/models"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	// "time"

	// "regexp"
	"gorm.io/gorm"
)

func VerifySet(name string, db *gorm.DB, orgID, connectionID, setID int) bool {
	var count int64

	// Ensure you query the correct model for the "sets" table
	db.Model(&models.Set{}).
		Where("name = ? AND organization_id = ? AND connection_id = ? AND status = ?",
			name, orgID, connectionID, 1).
		Count(&count)

	// Return true if count > 0, indicating the set already exists
	return count > 0
}
func CreateSet(requestData *models.Set, users *models.User) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Dynamically generate the table name based on the OrganizationID
	tableName := fmt.Sprintf("org_tables.schema_names_%d", users.OrganizationID)
	var schema_names models.SchemaName
	// Check if the SchemaID exists in the dynamically generated table
	// var schemaName models.SchemaName
	// Use the correct model for the query, not the tableName string
	if err := db.Table(tableName).Where("id = ?", requestData.SchemaID).Take(&schema_names).Error; err != nil {
		log.Println("Error finding Schema ID in table:", tableName, "Error:", err)
		response.Message = "Invalid Schema ID"
		response.Code = http.StatusBadRequest
		return response
	}

	// fmt.Println(requestData)
	// Create a new record for the set
	payload := models.Set{
		Name:           requestData.Name,
		SchemaID:       requestData.SchemaID,
		ConnectionID:   requestData.ConnectionID,
		OrganizationID: users.OrganizationID,
		CreatedByID:    users.ID,
		LastModifiedBy: users.ID,
	}
	// Update the `is_mapped` field in the `schema_names` table
	if err := db.Table(tableName).Where("id = ?", requestData.SchemaID).Update("is_mapped", 1).Error; err != nil {
		log.Println("Error updating is_mapped in schema_names table:", err)
		response.Message = "Set created, but failed to update schema mapping"
		response.Code = http.StatusInternalServerError
		return response
	}

	if VerifySet(requestData.Name, db, users.OrganizationID, payload.ConnectionID, requestData.ID) {
		response.Message = "Set with the same name already exists"
		response.Code = http.StatusNotAcceptable
		return response
	}
	// Insert the set record into the database
	if err := db.Create(&payload).Error; err != nil {
		log.Println("Error creating set:", err)
		response.Message = "Unable to create set"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = fmt.Sprintf("Set created successfully with ID %d", payload.ID)
	response.Code = http.StatusCreated
	response.Data = payload.ID
	return response
}

// func UpdateSet(ID int, requestData *models.Set, user models.User) models.Response {

// 	log.Println("in set pkg update")
// 	var response models.Response

// 	// Create a connection with the database
// 	db := database.DB
// 	var schema_names models.SchemaName

// 	// Dynamically generate the table name based on the OrganizationID
// 	tableName := fmt.Sprintf("org_tables.schema_names_%d", user.OrganizationID)

// 	log.Println(tableName)

// 	// Check if the SchemaID exists in the dynamically generated table
// 	if err := db.Table(tableName).Where("id = ?", requestData.SchemaID).Take(&schema_names).Error; err != nil {
// 		log.Println("Error finding Schema ID in table:", tableName, "Error:", err)
// 		response.Message = "Invalid Schema ID"
// 		response.Code = http.StatusBadRequest
// 		return response
// 	}

// 	// Fetch the Set record to be updated
// 	var set models.Set
// 	if err := db.Where("id = ?", ID).First(&set).Error; err != nil {
// 		log.Println("Error fetching Set:", err)
// 		response.Message = "Unable to fetch Set"
// 		response.Code = http.StatusInternalServerError
// 		return response
// 	}
// 	fmt.Println("a") //why this is used(ateeqh? can we delete this?)

// 	if VerifySet(requestData.Name, db, user.OrganizationID, set.ConnectionID, requestData.ID) {
// 		response.Message = "set with the same name already exists"
// 		response.Code = http.StatusNotAcceptable
// 		return response
// 	}
// 	// Update the Set fields
// 	set.Name = requestData.Name
// 	set.LastModifiedBy = user.ID
// 	// Save the delete set record
// 	if err := db.Save(&set).Error; err != nil {
// 		log.Println("Error deleting set:", err)
// 		response.Message = "Unable to delete set"
// 		response.Code = http.StatusInternalServerError
// 		return response
// 	}
// 	fmt.Println("a")

// 	response.Message = fmt.Sprintf("Set Updated successfully with ID %d", set.ID)
// 	response.Code = http.StatusOK
// 	return response
// }

// func DeleteSet(ID int, user models.User) models.Response {
// 	var response models.Response

// 	// Create a connection with the database
// 	db := database.DB
// 	// var schema_names models.SchemaName
// 	// // Dynamically generate the table name based on the OrganizationID
// 	// tableName := fmt.Sprintf("org_tables.schema_names_%d", user.OrganizationID)

// 	// // Check if the SchemaID exists in the dynamically generated table
// 	// if err := db.Table(tableName).Where("id = ?", ID).First(schema_names).Error; err != nil {
// 	// 	log.Println("Error finding Schema ID in table:", tableName, "Error:", err)
// 	// 	response.Message = "Invalid Schema ID"
// 	// 	response.Code = http.StatusBadRequest
// 	// 	return response
// 	// }

// 	// Fetch the Set record to be deleted
// 	var set models.Set
// 	if err := db.Where("id = ?", ID).First(&set).Error; err != nil {
// 		log.Println("Error fetching Set:", err)
// 		response.Message = "Unable to fetch Set"
// 		response.Code = http.StatusInternalServerError
// 		return response
// 	}

// 	// Update the CommonMenu fields
// 	set.Status = 0
// 	set.DeactivateByID = user.ID

// 	// Save the delete set record
// 	if err := db.Save(&set).Error; err != nil {
// 		log.Println("Error deleting set:", err)
// 		response.Message = "Unable to delete set"
// 		response.Code = http.StatusInternalServerError
// 		return response
// 	}

// 	response.Message = fmt.Sprintf("Set Deleted successfully with ID %d", set.ID)
// 	response.Code = http.StatusOK
// 	return response
// }

func GetSet(ID int) (models.SetRes, error) {
	var set models.Set
	var response models.SetRes

	// Establish a connection with the database
	db := database.DB

	// Fetch the Set by ID and ensure it is active (status = 1)
	err := db.Where("id = ? AND status = ?", ID, 1).Take(&set).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("Set with ID %d not found or inactive: %v", ID, err)
			return response, fmt.Errorf("set not found or inactive")
		}
		log.Printf("Error fetching Set with ID %d: %v", ID, err)
		return response, fmt.Errorf("error fetching set: %v", err)
	}

	// Map fields from the `Set` model to the `SetRes` response model
	response = models.SetRes{
		ID:               set.ID,
		Name:             set.Name,
		SchemaID:         set.SchemaID,
		ConnectionID:     set.ConnectionID,
		Is_Found:         set.Is_Found,
		Status:           set.Status,
		Is_mapped:        set.Is_mapped,
		OrganizationID:   set.OrganizationID,
		CreatedByID:      set.CreatedByID,
		CreatedDate:      set.CreatedDate,
		LastModifiedBy:   set.LastModifiedBy,
		LastModifiedDate: set.LastModifiedDate,
		DeactivateByID:   set.DeactivateByID,
		DeactivatedDate:  set.DeactivatedDate,
	}

	return response, nil
}

func GetAllSet(user models.User) models.Response {
	var sets []models.Set            // To store data fetched from the database
	var setResponses []models.SetRes // To store the mapped response
	var response models.Response

	// Establish a connection with the database
	db := database.DB

	// Fetch all active sets for the given organization ID
	err := db.Where("status = ? AND organization_id = ?", 1, user.OrganizationID).Find(&sets).Error
	if err != nil {
		log.Printf("Error fetching sets for organization ID %d: %v", user.OrganizationID, err)
		response.Message = "Failed to fetch sets"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Map the `Set` data into `SetRes` format
	for _, set := range sets {
		setRes := models.SetRes{
			ID:               set.ID,
			Name:             set.Name,
			SchemaID:         set.SchemaID,
			ConnectionID:     set.ConnectionID,
			Is_Found:         set.Is_Found,
			Status:           set.Status,
			Is_mapped:        set.Is_mapped,
			OrganizationID:   set.OrganizationID,
			CreatedByID:      set.CreatedByID,
			CreatedDate:      set.CreatedDate,
			LastModifiedBy:   set.LastModifiedBy,
			LastModifiedDate: set.LastModifiedDate,
			DeactivateByID:   set.DeactivateByID,
			DeactivatedDate:  set.DeactivatedDate,
		}
		setResponses = append(setResponses, setRes)
	}

	// Build the response
	response.Message = "Set data fetched successfully"
	response.Data = setResponses
	response.Code = http.StatusOK
	response.Total = len(setResponses)

	return response
}

func UpdateSet(ID int, requestData *models.Set, user models.User) models.Response {

	log.Println("in set pkg update")
	var response models.Response

	// Create a connection with the database
	db := database.DB
	var schema_names models.SchemaName

	// Dynamically generate the table name based on the OrganizationID
	tableName := fmt.Sprintf("org_tables.schema_names_%d", user.OrganizationID)

	log.Println(tableName)

	// Check if the SchemaID exists in the dynamically generated table
	if err := db.Table(tableName).Where("id = ?", requestData.SchemaID).Take(&schema_names).Error; err != nil {
		log.Println("Error finding Schema ID in table:", tableName, "Error:", err)
		response.Message = "Invalid Schema ID"
		response.Code = http.StatusBadRequest
		return response
	}

	// Fetch the Set record to be updated
	var set models.Set
	if err := db.Where("id = ?", ID).First(&set).Error; err != nil {
		log.Println("Error fetching Set:", err)
		response.Message = "Unable to fetch Set"
		response.Code = http.StatusInternalServerError
		return response
	}
	fmt.Println("a") //why this is used(ateeqh? can we delete this?)

	if VerifySet(requestData.Name, db, user.OrganizationID, set.ConnectionID, requestData.ID) {
		response.Message = "set with the same name already exists"
		response.Code = http.StatusNotAcceptable
		return response
	}
	// Update the Set fields
	updates := map[string]interface{}{
		"name":             requestData.Name,
		"last_modified_by": user.ID,
	}
	// Save the delete set record
	if err := db.Model(&set).Updates(updates).Error; err != nil {
		log.Println("Error updating set:", err)
		response.Message = "Unable to update set"
		response.Code = http.StatusInternalServerError
		return response
	}
	fmt.Println("a")

	response.Message = fmt.Sprintf("Set Updated successfully with ID %d", set.ID)
	response.Code = http.StatusOK
	return response
}

func DeleteSet(ID int, user models.User) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB
	// Fetch the Set record to be deleted
	var set models.Set
	if err := db.Where("id = ?", ID).First(&set).Error; err != nil {
		log.Println("Error fetching Set:", err)
		response.Message = "Unable to fetch Set"
		response.Code = http.StatusInternalServerError
		return response
	}
	updates := map[string]interface{}{
		"status":           0,
		"deactivate_by_id": user.ID,
		"deactivated_date":  time.Now(),
		"last_modified_by": user.ID,
	}
	// Save the delete set record
	if err := db.Model(&set).Updates(updates).Error; err != nil {
		log.Println("Error deleting set:", err)
		response.Message = "Unable to delete set"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = fmt.Sprintf("Set Deleted successfully with ID %d", set.ID)
	response.Code = http.StatusOK
	return response
}
