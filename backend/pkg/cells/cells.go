package cells

import (
	// "DynViz/internal/connectors"
	// "DynViz/internal/connectors"
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/filters"
	"DynViz/pkg/querymaster"
	"DynViz/pkg/variables"
	"DynViz/utils"
	"encoding/json"
	"errors"
	"strings"

	// "errors"
	"fmt"
	"log"
	"net/http"

	"gorm.io/gorm"
	// "time"
	// "regexp"
	// "gorm.io/gorm"
)

func Createcell(requestData *models.Cell) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Create a new query record
	Cell := models.Cell{
		WorksheetID: requestData.WorksheetID,
		Query:       requestData.Query,
		// ConnectionID: requestData.ConnectionID,
	}

	// Insert the query record into the database
	if err := db.Create(&Cell).Error; err != nil {
		log.Println("Error creating cell:", err)
		response.Message = "Unable to create cell"
		response.Code = http.StatusInternalServerError
		return response
	}
	response.Message = "Cell created successfully"
	response.Data = &Cell.ID
	response.Code = http.StatusCreated
	return response
}

func UpdateCell(ID int, payloaddata *models.Cell) models.Response {

	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the query record to be updated
	var cell models.Cell

	if err := db.Where("id = ?", ID).First(&cell).Error; err != nil {
		log.Println("Error fetching query:", err)
		response.Message = "Unable to fetch query"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Update the query fields
	// cell.Query = payloaddata.Query
	// cell.Result = payloaddata.Result
	updatedData := map[string]interface{}{
        "query":  payloaddata.Query,
        "result": payloaddata.Result,
    }
	// Save the updated query record
	// if err := db.Save(&cell).Error; err != nil {
	// 	log.Println("Error updating cell:", err)
	// 	response.Message = "Unable to update cell"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }
    if err := db.Model(&cell).Updates(updatedData).Error; err != nil {
        log.Println("Error updating cell:", err)
        response.Message = "Unable to update cell"
        response.Code = http.StatusInternalServerError
        return response
    }

	response.Message = "cell updated successfully"
	response.Code = http.StatusOK
	return response
}

func DeleteCell(ID int) models.Response {
	var response models.Response
	var datablock models.DataBlock

	// Create a connection with the database
	db := database.DB

	// Check if the cell ID is present in the datablock with status = 1 (active)
	if err := db.Where("cell_id = ? AND status = ?", ID, 1).First(&datablock).Error; err == nil {
		// Cell is active in datablock, so do not delete
		response.Message = "Cell is active in datablock and cannot be deleted Please assign cell to the datablock "
		response.Code = http.StatusBadRequest
		return response
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		// Handle any other error that might occur during the datablock query
		log.Println("Unable to fetch datablock due to server error:", err)
		response.Message = "Server error while checking datablock"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Fetch the query record to be updated
	var cell models.Cell
	if err := db.Where("id = ?", ID).First(&cell).Error; err != nil {
		log.Println("Error fetching cell:", err)
		response.Message = "Unable to fetch cell"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Update the query fields
	// cell.Status = 0
	updatedData := map[string]interface{}{
		"status": 0,
	}
	// // Save the updated query record
	// if err := db.Save(&cell).Error; err != nil {
	// 	log.Println("Error deleting cell:", err)
	// 	response.Message = "Unable to deleting cell"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }
	if err := db.Model(&cell).Updates(updatedData).Error; err != nil {
        log.Println("Error deleting cell:", err)
        response.Message = "Unable to delete cell"
        response.Code = http.StatusInternalServerError
        return response
    }

	response.Message = "Cell deleted successfully"
	response.Code = http.StatusOK
	return response
}

func GetAllCells(WorksheetID int) models.Response {
	var cell []models.Cell
	var response models.Response

	// creating connection with database
	db := database.DB

	// Query the database for querys with specific organization ID and active status
	if err := db.Where("  worksheet_id =? AND status = ? ", WorksheetID, 1).Find(&cell).Error; err != nil {
		response.Message = "Failed to find cell"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = "Cells fetched successfully"

	response.Data = cell
	response.Code = http.StatusOK
	response.Total = len(cell)
	return response
}

// func CellQuery(req models.Cell) (models.QueryResponse, error) {
// 	var response models.QueryResponse

// 	// Run the TileQuery using the updated query and connectionID
// 	response, err := querymaster.TileQuery(models.QueryRequest{Query: req.Query}, req.ConnectionID)
// 	if err != nil {
// 		log.Println("Error running cell query:", err)
// 		return response, fmt.Errorf("unable to run cell query: %v", err)
// 	}

// 	// Check if the response contains only one column and one row
// 	if len(response.Columns) == 1 && len(response.Rows) == 1 {
// 		// Extract the single value from the response
// 		output := response.Rows[0][0]

// 		// Create the desired JSON structure
// 		resultJSON := map[string]interface{}{"value": output}

// 		// Marshal the resultJSON into JSON
// 		queryResponseJSON, err := json.Marshal(resultJSON)
// 		if err != nil {
// 			fmt.Println("error in marshaling query response")
// 			return response, err
// 		}

// 		req.Result = json.RawMessage(queryResponseJSON)
// 	} else {
// 		// Marshal the original queryResponse into JSON if it's not a single row and column
// 		queryResponseJSON, err := json.Marshal(response)
// 		if err != nil {
// 			fmt.Println("error in marshaling query response")
// 			return response, err
// 		}

// 		req.Result = queryResponseJSON
// 	}

// 	// Update the cell with the provided request data
// 	updateResp := UpdateCell(req.ID, &req)
// 	if updateResp.Code != http.StatusOK {
// 		log.Println("Error updating cell :", updateResp.Message)
// 		return response, fmt.Errorf(updateResp.Message)
// 	}

// 	return response, nil
// }

func GetCells(TileID int) models.Response {
	var datablocks []models.DataBlock
	var cells []models.Cell
	var response models.Response

	// Connect to the database
	db := database.DB

	// Query the DataBlock by TileID and status
	if err := db.Where("tile_id = ? AND status = ?", TileID, 1).
		Find(&datablocks).Error; err != nil {
		response.Message = "Failed to find the DataBlock"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Collect all CellIDs from the fetched DataBlocks
	var cellIDs []int
	for _, datablock := range datablocks {
		cellIDs = append(cellIDs, datablock.CellID)
	}

	// Fetch the Cells associated with the collected CellIDs and status = 1
	if err := db.Where("id IN ? AND status = ?", cellIDs, 1).Find(&cells).Error; err != nil {
		response.Message = "Failed to find cells"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Return the fetched data
	response.Message = "Cells of the particular tile fetched successfully"
	response.Data = cells
	response.Code = http.StatusOK
	response.Total = len(cells)

	return response
}

// func CellQuery(requestData models.Cell) (models.QueryResponse, error) {
// 	var response models.QueryResponse
// 	var cell models.Cell
// 	var set models.Set
// 	// Create a connection with the database
// 	db := database.DB

// 	// Fetch the `Cell` along with its associated `Set`
// 	if err := db.Preload("Set").First(&cell, requestData.ID).Error; err != nil {
// 		if errors.Is(err, gorm.ErrRecordNotFound) {
// 			log.Printf("Cell with ID %d not found", requestData.ID)
// 			return response, fmt.Errorf("cell not found")
// 		}
// 		log.Printf("Error fetching Cell with ID %d: %v", requestData.ID, err)
// 		return response, err
// 	}
// 	// Fetch the `Cell` along with its associated `Set`
// 	if err := db.First(&set, requestData.SetID).Error; err != nil {
// 		if errors.Is(err, gorm.ErrRecordNotFound) {
// 			log.Printf("Set with ID %d not found", requestData.SetID)
// 			return response, fmt.Errorf("set not found")
// 		}
// 		log.Printf("Error fetching set with ID %d: %v", requestData.SetID, err)
// 		return response, err
// 	}
// 	// Ensure the `Set` is valid and contains a `ConnectionID`
// 	if set.ConnectionID == 0 {
// 		log.Printf("Invalid or missing ConnectionID in Set for Cell ID %d", requestData.ID)
// 		return response, fmt.Errorf("missing or invalid ConnectionID in the associated Set")
// 	}
// 	fmt.Println("a")

// 	trimmedQuery := strings.TrimSpace(strings.ToUpper(requestData.Query))
// 	fmt.Println("trimmed query:",trimmedQuery)

// 	if !strings.HasPrefix(trimmedQuery, "SELECT") {
// 		log.Printf("Invalid query for Cell ID %d: only SELECT queries are allowed", requestData.ID)
// 		return response, fmt.Errorf("invalid query: only SELECT queries are allowed")
// 	}

// fmt.Println("b")
// 	// Compile the query
// 	compiledQuery, err := variables.VariableCompiler(requestData.Query, cell.Set.ID)
// 	if err != nil {
// 		log.Printf("Error compiling query for Cell ID %d: %v", requestData.ID, err)
// 		return response, fmt.Errorf("unable to compile query: %v", err)
// 	}

// 	// var filters map[int][]string
// 	fmt.Println("c")

// 	allFilters := utils.GetFilter()

// 	fmt.Println(allFilters)

// 	for key, value := range allFilters {
// 		fmt.Println(key, value)
// 		compiledQuery = filters.ApplyFilter(key, utils.DataBlockID, compiledQuery, value)
// 	}

// 	// Update the query field in the cell
// 	cell.Query = compiledQuery
// 	// Execute the query using the `TileQuery` method
// 	queryResponse, err := querymaster.TileQuery(models.QueryRequest{Query: cell.Query}, cell.Set.ConnectionID)
// 	if err != nil {
// 		log.Printf("Error executing TileQuery for Cell ID %d: %v", requestData.ID, err)
// 		return response, fmt.Errorf("unable to execute query: %v", err)
// 	}

// 	// Process the query response
// 	if len(queryResponse.Columns) == 1 && len(queryResponse.Rows) == 1 {
// 		// Single value response
// 		output := queryResponse.Rows[0][0]

// 		// Reformat the single value
// 		formattedText, err := utils.Reformattext(output)
// 		if err != nil {
// 			log.Printf("Error formatting text for Cell ID %d: %v", requestData.ID, err)
// 			return response, err
// 		}

// 		// Update the result field in the cell
// 		cell.Result = json.RawMessage(fmt.Sprintf(`"%s"`, formattedText))
// 	} else {
// 		// Table response
// 		formattedTable, err := utils.Reformattable(queryResponse.Columns, queryResponse.Rows)
// 		if err != nil {
// 			log.Printf("Error formatting table for Cell ID %d: %v", requestData.ID, err)
// 			return response, err
// 		}

// 		// Update the result field in the cell
// 		cell.Result = json.RawMessage(formattedTable)
// 	}

// 	// Update the cell with the new result
// 	if err := db.Model(&cell).Updates(map[string]interface{}{"Result": cell.Result}).Error; err != nil {
// 		log.Printf("Error updating Cell ID %d with the result: %v", requestData.ID, err)
// 		return response, fmt.Errorf("unable to update cell with result")
// 	}

//		return queryResponse, nil
//	}
func CellQuery(requestData models.Cell, datablockID int) (models.QueryResponse, error) {
	var response models.QueryResponse
	var cell, cell2 models.Cell
	var set models.Set

	// Create a connection with the database
	db := database.DB
	// Update the SetID and query of the cell
	updateData := map[string]interface{}{
		"set_id": requestData.SetID,
		"query":  requestData.Query,
	}
	fmt.Println(requestData.Query)
	// Update the SetID of the cell
	if err := db.Model(&cell2).Where("id = ?", requestData.ID).Updates(updateData).Error; err != nil {
		log.Printf("Error updating SetID for Cell ID %d: %v", requestData.ID, err)
		return response, fmt.Errorf("unable to update SetID for cell")
	}
	// Fetch the `Cell` along with its associated `Set`
	if err := db.Preload("Set").First(&cell, requestData.ID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("Cell with ID %d not found", requestData.ID)
			return response, fmt.Errorf("cell not found")
		}
		log.Printf("Error fetching Cell with ID %d: %v", requestData.ID, err)
		return response, err
	}

	// // Fetch the updated cell to ensure the in-memory object reflects the database state
	// if err := db.Preload("Set").First(&cell, requestData.ID).Error; err != nil {
	//     log.Printf("Error refetching updated Cell with ID %d: %v", requestData.ID, err)
	//     return response, fmt.Errorf("unable to fetch updated cell")
	// }

	fmt.Printf("Updated Cell SetID: %d\n", cell2.SetID)
	fmt.Printf("Updated Cell SetID: %d\n", cell.SetID)
	fmt.Printf("CellID query: %s\n", cell2.Query)
	fmt.Printf("CellID query: %s\n", cell.Query)

	// fmt.Println("Updated Cell SetID:", cell.SetID)

	if err := db.First(&set, requestData.SetID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("Set with ID %d not found", requestData.SetID)
			return response, fmt.Errorf("set not found")
		}
		log.Printf("Error fetching Set with ID %d: %v", requestData.SetID, err)
		return response, err
	}

	if set.ConnectionID == 0 {
		log.Printf("Invalid or missing ConnectionID in Set for Cell ID %d", requestData.ID)
		return response, fmt.Errorf("missing or invalid ConnectionID in the associated Set")
	}
	// Directly assign the query to `cell.Result` if `SetID == -1`
	if requestData.SetID == -1 {
		cell.Result = json.RawMessage(`"` + requestData.Query + `"`)
		if err := db.Model(&cell).Updates(map[string]interface{}{"Result": cell.Result}).Error; err != nil {
			log.Printf("Error updating Cell ID %d with the result: %v", requestData.ID, err)
			return response, fmt.Errorf("unable to update cell with result")
		}
		// Set the response
		response.Columns = []string{"value"}
		response.Rows = [][]interface{}{{requestData.Query}}
		return response, nil
	}

	fmt.Println(requestData.Query)
	trimmedQuery := strings.TrimSpace(strings.ToUpper(requestData.Query))
	if !strings.HasPrefix(trimmedQuery, "SELECT") {
		log.Printf("Invalid query for Cell ID %d: only SELECT queries are allowed", requestData.ID)
		return response, fmt.Errorf("invalid query: only SELECT queries are allowed")
	}
	fmt.Println(cell.SetID)
	fmt.Println(trimmedQuery)

	// Compile the query
	compiledQuery, err := variables.VariableCompiler(requestData.Query, cell.Set.ID)
	if err != nil {
		log.Printf("Error compiling query for Cell ID %d: %v", requestData.ID, err)
		return response, fmt.Errorf("unable to compile query: %v", err)
	}

	fmt.Println(compiledQuery)

	allFilters := utils.GetFilter()

	fmt.Println(allFilters)

	// check if datablockID is -1

	if datablockID == -1 {
		log.Printf("Skipping filter applyment")
	} else {
		log.Printf("Applying filters to datablock: %d\n", datablockID)
		for key, value := range allFilters {
			compiledQuery = filters.ApplyFilter(key, datablockID, compiledQuery, value)
		}
	}

	// Update the query field in the cell
	cell.Query = compiledQuery

	fmt.Println(compiledQuery)

	// Execute the query using the `TileQuery` method
	queryResponse, err := querymaster.TileQuery(models.QueryRequest{Query: cell.Query}, cell.Set.ConnectionID)
	if err != nil {
		log.Printf("Error executing TileQuery for Cell ID %d: %v", requestData.ID, err)
		return response, fmt.Errorf("unable to execute query: %v", err)
	}

	// Process the query response
	if len(queryResponse.Columns) == 1 && len(queryResponse.Rows) == 1 {
		// Single value response
		output := queryResponse.Rows[0][0]

		// Reformat the single value
		formattedText, err := utils.Reformattext(output)
		if err != nil {
			log.Printf("Error formatting text for Cell ID %d: %v", requestData.ID, err)
			return response, err
		}

		// Marshal the single value directly into json.RawMessage
		resultJSON, err := json.Marshal(formattedText)
		if err != nil {
			log.Printf("Error marshaling single value JSON for Cell ID %d: %v", requestData.ID, err)
			return response, fmt.Errorf("error marshaling single value JSON")
		}

		cell.Result = json.RawMessage(resultJSON)
	} else {
		// Table response
		formattedTable, err := utils.Reformattable(queryResponse.Columns, queryResponse.Rows)
		if err != nil {
			log.Printf("Error formatting table for Cell ID %d: %v", requestData.ID, err)
			return response, err
		}

		// Validate and assign the table JSON directly
		var validJSON json.RawMessage
		if err := json.Unmarshal([]byte(formattedTable), &validJSON); err != nil {
			log.Printf("Error validating table JSON for Cell ID %d: %v", requestData.ID, err)
			return response, fmt.Errorf("error validating table JSON")
		}

		cell.Result = validJSON
	}

	// Update the cell with the new result
	if err := db.Model(&cell).Updates(map[string]interface{}{"Result": cell.Result}).Error; err != nil {
		log.Printf("Error updating Cell ID %d with the result: %v", requestData.ID, err)
		return response, fmt.Errorf("unable to update cell with result")
	}

	return queryResponse, nil
}
