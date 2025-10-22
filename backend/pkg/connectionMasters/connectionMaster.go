package connectionmaster

import (
	// "DynViz/internal/connectors"
	"DynViz/internal/database"
	"DynViz/models"
	"encoding/json"
	"time"

	// "errors"
	// "fmt"
	"log"
	"net/http"
)

func CreateMasterConnection(requestData *models.Connection, ID int) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Convert the JSON connection parameters to bytes
	connectionParamsBytes, err := json.Marshal(requestData.Params)
	if err != nil {
		log.Println("Error marshaling connection parameters:", err)
		response.Message = "Unable to create connection"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Create a new connection instance
	conn := models.ConnectionMaster{
		Name:   requestData.Name,
		DBType: requestData.DBType,
		Params: connectionParamsBytes, // Assign marshaled JSON bytes

		CreatedByID:    ID,
		LastModifiedBy: ID,
	}
	// role.CheckUserAccess(menuID,user.ID)
	// Insert connection into the database
	if err := db.Create(&conn).Error; err != nil {
		log.Println("Error creating connection:", err)
		response.Message = "Unable to create connection"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = "Connection created successfully"
	response.Data = conn
	response.Code = http.StatusCreated
	return response
}

func UpdateMasterConnection(requestData *models.Connection, userID int) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the existing connection
	var conn models.ConnectionMaster
	if err := db.First(&conn, requestData.ID).Where("status = ?", 1).Error; err != nil {
		log.Println("Error fetching connection:", err)
		response.Message = "Connection not found"
		response.Code = http.StatusNotFound
		return response
	}

	// Convert the JSON connection parameters to bytes
	connectionParamsBytes, err := json.Marshal(requestData.Params)
	if err != nil {
		log.Println("Error marshaling connection parameters:", err)
		response.Message = "Unable to update connection"
		response.Code = http.StatusInternalServerError
		return response
	}

	// update the fields with the new data using updates
	updates := map[string]interface{}{
		"Name":           requestData.Name,
		"DBType":         requestData.DBType,
		"Params":         connectionParamsBytes, // Assign marshaled JSON bytes
		"LastModifiedBy": userID,
	}
	// // Update the fields with the new data
	// if requestData.Name != "" {
	// 	conn.Name = requestData.Name
	// }

	// if len(requestData.Params) > 0 {
	// 	conn.Params = connectionParamsBytes
	// }

	// conn.LastModifiedBy = userID

	// Update the connection in the database
	if err := db.Model(&conn).Updates(updates).Error; err != nil {
		log.Println("Error updating connection:", err)
		response.Message = "Unable to update connection"
		response.Code = http.StatusInternalServerError
		return response
	}
	// Save the updated connection to the database
	// if err := db.Save(&conn).Error; err != nil {
	// 	log.Println("Error updating connection:", err)
	// 	response.Message = "Unable to update connection"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	response.Message = "Connection updated successfully"
	response.Data = conn
	response.Code = http.StatusOK
	return response
}

func DeleteMasterConnection(requestData *models.Connection, userID int) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the existing connection
	var conn models.ConnectionMaster
	if err := db.First(&conn, requestData.ID).Where("status = ?", 1).Error; err != nil {
		log.Println("Error fetching connection:", err)
		response.Message = "Connection not found"
		response.Code = http.StatusNotFound
		return response
	}

	// conn.DeactivateByID = userID
	// conn.Status = 0
	updatedData := map[string]interface{}{
		"Status":         0,
		"DeactivateByID": userID,
		"DeactivateDate": time.Now(),
	}

	// Update the connection in the database
	if err := db.Model(&conn).Where("id = ?", requestData.ID).Updates(updatedData).Error; err != nil {
		log.Println("Error updating connection:", err)
		response.Message = "Unable to update connection"
		response.Code = http.StatusInternalServerError
		return response
	}
	// Save the updated connection to the database
	// if err := db.Save(&conn).Error; err != nil {
	// 	log.Println("Error updating connection:", err)
	// 	response.Message = "Unable to update connection"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	response.Message = "Connection updated successfully"
	response.Data = conn
	response.Code = http.StatusOK
	return response
}
