package filtermapping

import (
	"DynViz/internal/database"
	"DynViz/models"
	"errors"
	"fmt"
	"log"
	"net/http"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// CreateFilterMappings creates or deletes mappings between a Filter and multiple DataBlocks.
// The request payload should contain the Filter ID and a map of DataBlock IDs to boolean status.
// The boolean status indicates whether the mapping should be created (true) or deleted (false).
// The function returns a response with the appropriate HTTP status code and a message indicating
// the success or failure of the operation.
//
// The function first checks if the Filter ID is valid and if at least one DataBlock ID is provided.
// Then it iterates over the DataBlock map and creates or deletes mappings based on the boolean status.
// If the mapping doesn't exist for deletion, it returns an error.
// If any error occurs during the operation, it returns an error response with the appropriate HTTP status code.
func CreateFilterMappings(filterMappingModelPayload *models.CreateFilterMappingPayloadNew, Users *models.User) models.Response {
	var response models.Response
	var Filter models.Filter
	// var DataBlock []models.DataBlock
	var Dashboard models.Dashboard
	// var createFilterMapping models.FilterDataBlockMapping

	// Ensure the Filter ID is valid
	if filterMappingModelPayload.FilterID == 0 {
		response.Message = "Filter ID is required to create mapping."
		response.Code = http.StatusBadRequest
		return response
	}

	if filterMappingModelPayload.DashboardID == 0 {
		response.Message = "Dashboard ID is required to create mapping."
		response.Code = http.StatusBadRequest
		return response
	}

	// Ensure that at least one DataBlock is provided
	if len(filterMappingModelPayload.DataBlockID) == 0 {
		response.Message = "At least one Data Block is required to create mapping."
		response.Code = http.StatusBadRequest
		return response
	}

	// Fetch the Filter from the database
	db := database.DB
	result := db.First(&Filter, "ID = ?", filterMappingModelPayload.FilterID)
	if result.Error != nil {
		response.Message = fmt.Sprintf("Invalid Filter ID: %d", filterMappingModelPayload.FilterID)
		response.Code = http.StatusBadRequest
		return response
	}

	result = db.First(&Dashboard, "ID = ?", filterMappingModelPayload.DashboardID)
	if result.Error != nil {
		response.Message = fmt.Sprintf("Invalid Dashboard ID: %d", filterMappingModelPayload.DashboardID)
		response.Code = http.StatusBadRequest
		return response
	}

	// Iterate over DataBlock map and create or delete mappings based on the boolean status
	dataBlockIDs := make([]int, 0, len(filterMappingModelPayload.DataBlockID))
	for dataBlockID := range filterMappingModelPayload.DataBlockID {
		dataBlockIDs = append(dataBlockIDs, dataBlockID)
	}

	var dataBlocks []models.DataBlock
	if err := db.Where("ID IN ?", dataBlockIDs).Find(&dataBlocks).Error; err != nil {
		response.Message = "Error fetching Data Blocks."
		response.Code = http.StatusBadRequest
		return response
	}

	// Verify all DataBlocks exist
	dataBlockIDMap := make(map[int]bool)
	for _, dataBlock := range dataBlocks {
		dataBlockIDMap[dataBlock.ID] = true
	}
	for id := range filterMappingModelPayload.DataBlockID {
		if !dataBlockIDMap[id] {
			response.Message = fmt.Sprintf("Invalid Data Block ID: %d", id)
			response.Code = http.StatusBadRequest
			return response
		}
	}

	// Iterate and handle each DataBlock mapping
	for dataBlockID, status := range filterMappingModelPayload.DataBlockID {
		if status {
			// Check if the combination already exists
			existingMapping := models.FilterDataBlockMapping{}
			err := db.Where("dashboard_id = ? AND filter_id = ? AND data_block_id = ?",
				filterMappingModelPayload.DashboardID,
				filterMappingModelPayload.FilterID,
				dataBlockID).First(&existingMapping).Error

			if err == nil {
				// Mapping already exists, skip creation
				log.Printf("Mapping already exists for DashboardID %d, FilterID %d, DataBlockID %d\n",
					filterMappingModelPayload.DashboardID,
					filterMappingModelPayload.FilterID,
					dataBlockID)
				continue
			}

			if !errors.Is(err, gorm.ErrRecordNotFound) {
				// Handle unexpected errors
				log.Printf("Error checking existing mapping for DataBlockID %d: %v\n", dataBlockID, err)
				continue
			}

			// Create mapping as it doesn't exist
			err = db.Clauses(clause.OnConflict{
				Columns:   []clause.Column{{Name: "id"}}, // Replace "id" with your unique constraint columns
				DoNothing: true,
			}).Create(&models.FilterDataBlockMapping{
				DashboardID: filterMappingModelPayload.DashboardID,
				FilterID:    filterMappingModelPayload.FilterID,
				DataBlockID: dataBlockID,
				CreatedByID: Users.ID,
			}).Error
			if err != nil {
				log.Printf("Error creating mapping for DataBlockID %d: %v\n", dataBlockID, err)
			}
		} else {
			// Delete mapping
			if err := db.Where("filter_id = ? AND dashboard_id = ? AND data_block_id = ?",
				filterMappingModelPayload.FilterID,
				filterMappingModelPayload.DashboardID,
				dataBlockID).Delete(&models.FilterDataBlockMapping{}).Error; err != nil {
				log.Printf("Error deleting mapping for DataBlockID %d: %v\n", dataBlockID, err)
			}
		}
	}

	// Return success response
	response.Message = "Filter DataBlock Mapping Created/Updated Successfully"
	response.Code = http.StatusCreated
	return response
}

// DeleteFilterMappings deletes the mappings between a Filter, a Dashboard and a datablock.
// The function takes a payload containing the Filter ID and Dashboard ID, and
// the user information responsible for the operation. It returns a response
// indicating the success or failure of the operation.
//
// The function first checks if the Filter ID and Dashboard ID are provided and valid.
// It then attempts to fetch the corresponding Filter and Dashboard records from
// the database. If either of these records is invalid, an error response is returned.
//
// If a mapping between the provided Filter ID and Dashboard ID exists, it is deleted.
// If the mapping does not exist, a "not found" error is returned. Any errors during
// the deletion process result in an internal server error response. On successful deletion,
// a success message is returned.
func DeleteFilterMappings(filterMappingModelPayload *models.DeleteFilterMappingPayloadNew, Users *models.User) models.Response {
	var response models.Response
	var Filter models.Filter
	var Dashboard models.Dashboard
	var deleteFilterMapping models.FilterDataBlockMapping

	// Ensure the Filter ID is valid
	if filterMappingModelPayload.FilterID == 0 {
		response.Message = "Filter ID is required to delete mapping."
		response.Code = http.StatusBadRequest
		return response
	}

	if filterMappingModelPayload.DashboardID == 0 {
		response.Message = "Dashboard ID is required to delete mapping."
		response.Code = http.StatusBadRequest
		return response
	}

	// Fetch the Filter from the database
	db := database.DB
	result := db.First(&Filter, "ID = ?", filterMappingModelPayload.FilterID)
	if result.Error != nil {
		response.Message = fmt.Sprintf("Invalid Filter ID: %d", filterMappingModelPayload.FilterID)
		response.Code = http.StatusBadRequest
		return response
	}

	result = db.First(&Dashboard, "ID = ?", filterMappingModelPayload.DashboardID)
	if result.Error != nil {
		response.Message = fmt.Sprintf("Invalid Dashboard ID: %d", filterMappingModelPayload.DashboardID)
		response.Code = http.StatusBadRequest
		return response
	}

	if err := db.Where("filter_id = ? AND dashboard_id = ?", filterMappingModelPayload.FilterID, filterMappingModelPayload.DashboardID).Delete(&deleteFilterMapping).Error; err != nil {
		log.Println(err)
		response.Message = "Unable to delete Filter Mapping"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = "Filter DataBlock Mapping Deleted Successfully"
	response.Code = http.StatusCreated
	return response
}

// GetFilterMappings retrieves the DataBlock Mapping for a given Filter and Dashboard.
// It takes a payload containing the Filter ID and Dashboard ID, and the user information
// responsible for the operation. It returns a response indicating the success or failure
// of the operation.
//
// The function first checks if the Filter ID and Dashboard ID are provided and valid.
// It then attempts to fetch the corresponding Filter and Dashboard records from
// the database. If either of these records is invalid, an error response is returned.
//
// If a mapping between the provided Filter ID and Dashboard ID exists, the IDs of
// the associated DataBlocks are returned in the response. If no mappings are found,
// a "not found" error is returned. Any errors during the retrieval process result in
// an internal server error response. On successful retrieval, a success message is
// returned.
func GetFilterMappings(filterMappingModelPayload *models.GetFilterMappingPayload, Users *models.User) models.Response {
	var response models.Response
	var Filter models.Filter
	var Dashboard models.Dashboard

	// Ensure the Filter ID is valid
	if filterMappingModelPayload.FilterID == 0 {
		response.Message = "Filter ID is required to fetch datablock mapping."
		response.Code = http.StatusBadRequest
		return response
	}

	if filterMappingModelPayload.DashboardID == 0 {
		response.Message = "Dashboard ID is required to fetch datablock mapping."
		response.Code = http.StatusBadRequest
		return response
	}

	// Fetch the Filter from the database
	db := database.DB
	result := db.First(&Filter, "ID = ?", filterMappingModelPayload.FilterID)
	if result.Error != nil {
		response.Message = fmt.Sprintf("Invalid Filter ID: %d", filterMappingModelPayload.FilterID)
		response.Code = http.StatusBadRequest
		return response
	}

	result = db.First(&Dashboard, "ID = ?", filterMappingModelPayload.DashboardID)
	if result.Error != nil {
		response.Message = fmt.Sprintf("Invalid Dashboard ID: %d", filterMappingModelPayload.DashboardID)
		response.Code = http.StatusBadRequest
		return response
	}

	// Fetch all records that match the filter and dashboard IDs
	var getFilterMappings []models.FilterDataBlockMapping
	if err := db.Where("filter_id = ? AND dashboard_id = ?", filterMappingModelPayload.FilterID, filterMappingModelPayload.DashboardID).Find(&getFilterMappings).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.Message = "No Filter Mappings found for the provided IDs"
			response.Code = http.StatusNotFound
		} else {
			response.Message = "Failed to fetch Filter Mappings"
			response.Code = http.StatusInternalServerError
		}
		return response
	}

	// Extract datablock_ids into a list
	var dataBlockIDs []int
	for _, mapping := range getFilterMappings {
		dataBlockIDs = append(dataBlockIDs, mapping.DataBlockID)
	}

	// Return the list of datablock_ids in the response
	response.Data = dataBlockIDs
	response.Message = "Filter DataBlock Mappings retrieved successfully"
	response.Code = http.StatusOK
	return response

}

func GetFilterDataBlockMapping(filterID int, datablockID int) models.Response {
	var response models.Response
	// var Filter models.Filter

	var getFilterMappings []models.FilterDataBlockMapping

	//find the filter
	db := database.DB

	if err := db.Where("filter_id = ? AND datablock_id = ?", filterID, datablockID).Find(&getFilterMappings).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.Message = "No Filter Mappings found for the provided IDs"
			response.Code = http.StatusNotFound
		} else {
			response.Message = "Failed to fetch Filter Mappings"
			response.Code = http.StatusInternalServerError
		}
		return response
	}

	return response
}
