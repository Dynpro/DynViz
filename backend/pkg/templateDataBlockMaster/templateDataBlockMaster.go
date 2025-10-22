package templateDataBlockMaster

import (
	"DynViz/internal/database"
	"DynViz/models"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"gorm.io/gorm"
)

func CreateTemplateDataBlocks(templatedatablockmasters []models.TemplateDataBlockMaster, LoggedUser models.User, templatemasterID int) models.Response {
	var response models.Response
	db := database.DB

	// Iterate over the array of templatedatablockmasters
	for _, templatedatablockmasterPayload := range templatedatablockmasters {
		TDBM := models.TemplateDataBlockMaster{
			Name:             templatedatablockmasterPayload.Name,
			TemplateMasterID: templatemasterID,
			ChartMasterID:    templatedatablockmasterPayload.ChartMasterID,

			Styles:  templatedatablockmasterPayload.Styles,
			Data:    templatedatablockmasterPayload.Data,
			Configs: templatedatablockmasterPayload.Configs,
			Type:    templatedatablockmasterPayload.Type,

			LastModifiedBy: LoggedUser.ID,
		}

		// Create each TemplateDataBlockMaster entry
		if err := db.Create(&TDBM).Error; err != nil {
			log.Println("Error creating TDBM:", err)
			response.Message = "Unable to create one or more TDBMs"
			response.Code = http.StatusInternalServerError
			return response
		}
	}

	response.Message = "All TDBMs created successfully"
	response.Code = http.StatusCreated
	return response
}

func UpdateTemplateDataBlock(templatedatablockmasterPayload models.TemplateDataBlockMaster, LoggedUser models.User) models.Response {
	var response models.Response
	db := database.DB

	// Fetch the existing connection
	var TDBM models.TemplateDataBlockMaster
	if err := db.First(&TDBM, templatedatablockmasterPayload.ID).Where("status = ?", 1).Error; err != nil {
		log.Println("Error fetching Template DataBlock Master:", err)
		response.Message = "Connection not found"
		response.Code = http.StatusNotFound
		return response
	}

	// Convert the JSON connection parameters to bytes
	ConfigBytes, err := json.Marshal(templatedatablockmasterPayload.Configs)
	if err != nil {
		log.Println("Error marshaling config TDBM parameters:", err)
		response.Message = "Unable to update TDBM"
		response.Code = http.StatusInternalServerError
		return response
	}


	updateddata := map[string]interface{}{
		"Name":             templatedatablockmasterPayload.Name,
		"TemplateMasterID": templatedatablockmasterPayload.TemplateMasterID,
		"ChartMasterID":    templatedatablockmasterPayload.ChartMasterID,
		"Styles":           templatedatablockmasterPayload.Styles,
		"Data":             templatedatablockmasterPayload.Data,
		"Configs":          ConfigBytes,
		"Type":             templatedatablockmasterPayload.Type,
		"LastModifiedBy":   LoggedUser.ID,
	}

	if err := db.Model(&TDBM).Where("id = ?", templatedatablockmasterPayload.ID).Updates(updateddata).Error; err != nil {
		log.Println("Error updating TDBM:", err)		
		response.Message = "Unable to update TDBM"
		response.Code = http.StatusInternalServerError
		return response
	}
	// // Update the fields with the new data
	// if templatedatablockmasterPayload.Name != "" {
	// 	TDBM.Data = templatedatablockmasterPayload.Data
	// }
	// if templatedatablockmasterPayload.Data != nil {
	// 	TDBM.Data = templatedatablockmasterPayload.Data
	// }
	// if templatedatablockmasterPayload.Styles != nil {
	// 	TDBM.Styles = templatedatablockmasterPayload.Styles
	// }
	// if templatedatablockmasterPayload.Configs != nil {
	// 	TDBM.Configs = templatedatablockmasterPayload.Configs
	// }
	// if len(templatedatablockmasterPayload.Configs) > 0 {
	// 	TDBM.Configs = ConfigBytes
	// }

	// TDBM.LastModifiedBy = LoggedUser.ID

	// // Save the updated connection to the database
	// if err := db.Save(&TDBM).Error; err != nil {
	// 	log.Println("Error updating connection:", err)
	// 	response.Message = "Unable to update connection"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	response.Message = "templatedatablockmaster updated successfully"
	response.Data = TDBM
	response.Code = http.StatusOK
	return response
}

func DeleteTemplateDataBlock(ID int, LoggedUser models.User) models.Response {
	var response models.Response
	db := database.DB

	// Fetch the existing connection
	var TDBM models.TemplateDataBlockMaster
	if err := db.First(&TDBM, ID).Where("status = ?", 1).Error; err != nil {
		log.Println("Error fetching Template DataBlock Master:", err)
		response.Message = "TDBM not found"
		response.Code = http.StatusNotFound
		return response
	}

	updateddata := map[string]interface{}{
		"Status": 0,
	}

	if err := db.Model(&TDBM).Where("id = ?", ID).Updates(updateddata).Error; err != nil {
		log.Println("Error updating TDBM:", err)		
		response.Message = "Unable to update TDBM"
		response.Code = http.StatusInternalServerError
		return response
	}
	// TDBM.Status = 0
	// TDBM.DeactivateByID = LoggedUser.ID
	// TDBM.LastModifiedBy = LoggedUser.ID

	// // Save the updated connection to the database
	// if err := db.Save(&TDBM).Error; err != nil {
	// 	log.Println("Error updating TDBM:", err)
	// 	response.Message = "Unable to update TDBM"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	response.Message = "templatedatablockmaster dELETED successfully"
	response.Data = TDBM
	response.Code = http.StatusOK
	return response
}

// GetTemplateDataBlockMaster fetches the template data block master by ID
func GetTemplateDataBlockMaster(ID int) models.Response {
	var response models.Response
	var TDBM models.TemplateDataBlockMaster

	db := database.DB

	// Fetch the template data block master by ID and ensure it is active
	if err := db.Where("id = ? AND status = ?", ID, 1).First(&TDBM).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "Record not found"
			response.Code = http.StatusNotFound
			fmt.Println("Record not found:", err)
		} else {
			response.Message = "Error fetching TDBM"
			response.Code = http.StatusInternalServerError
			fmt.Println("Error fetching connection:", err)
		}
		return response
	}

	response.Message = "Template data block master GET successfully"
	response.Data = TDBM
	response.Code = http.StatusOK
	return response
}

func GetAllTemplateDataBlockMaster() models.Response {
	var TDBM []models.TemplateDataBlockMaster
	var response models.Response

	// creating connection with database
	db := database.DB

	// Query the database for all country details
	if err := db.Find(&TDBM).Where("status = ?", 1).Error; err != nil {
		response.Message = "Failed to TDBM"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Construct the response
	response.Code = http.StatusOK
	response.Data = TDBM
	response.Message = string(rune(len(TDBM))) + " connections fetched successfully!"
	return response
}
