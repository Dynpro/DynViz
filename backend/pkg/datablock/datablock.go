package datablock

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/cells"
	"DynViz/pkg/querymaster"
	"DynViz/pkg/worksheet"
	"DynViz/utils"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"gorm.io/gorm"
)

func CreateDataBlocks(dataBlockPayloads []models.DataBlockRequestPayload, tileid int, LoggedUser models.User, wsctpayload models.Tiledatablockpayload) models.Response {
	var response models.Response
	db := database.DB

	// Iterate over each DataBlock payload and insert into the database
	for _, dataBlockPayload := range dataBlockPayloads {
		// Convert the JSON connection parameters to bytes
		// configBytes, err := json.Marshal(dataBlockPayload.Configs)
		// if err != nil {
		// 	log.Println("Error marshaling CONFIG parameters:", err)
		// 	response.Message = "Unable to create DataBlock"
		// 	response.Code = http.StatusInternalServerError
		// 	return response
		// }

		//Create Cell for datablock
		//step 1: fetch the last used active worksheet:
		var latestWorksheetID int

		// Find the latest active worksheet
		lastUsedWorksheet := worksheet.GetLastUsedWorksheet(LoggedUser).Data
		if lastUsedWorksheet != nil {
			latestWorksheetID = lastUsedWorksheet.(models.Worksheet).ID //lastUsedWorksheet.(interface{})["id"].(int)
		}
		// if err := db.Model(&models.Worksheet{}).Where("project_id = ? AND status = ?", wsctpayload.ProjectID, 1).Order("last_modified_date DESC").
		// 	Select("id").Limit(1).Scan(&latestWorksheetID).Error; err != nil {
		// 	log.Println("Error finding latest worksheet:", err)
		// 	response.Message = "Error finding latest worksheet"
		// 	response.Code = http.StatusInternalServerError
		// 	return response
		// }

		//assign values to cell
		var cell models.Cell
		// Fetch the `Cell` along with its associated `Set`
		// if err := db.Preload("Set").First(&cell, cell.ID).Error; err != nil {
		// 	if errors.Is(err, gorm.ErrRecordNotFound) {
		// 		log.Printf("Cell with ID %d not found", )
		// 		return response
		// 	}
		// 	log.Printf("Error fetching Cell with ID %d: %v", cell.ID, err)
		// 	return response
		// }
		cell.WorksheetID = latestWorksheetID
		cell.Query = dataBlockPayload.Query
		cell.SetID = -1

		// Insert the Cell into the database
		if err := db.Create(&cell).Error; err != nil {
			log.Println("Error creating Cell:", err)
			response.Message = "Unable to create Cell"
			response.Code = http.StatusInternalServerError
			return response
		}

		// Create a new DataBlock instance
		dataBlock := models.DataBlock{
			TemplateDataBlockMasterID: dataBlockPayload.TemplateDataBlockMasterID,
			ChartMasterID:             dataBlockPayload.ChartMasterID,
			TileID:                    tileid,
			DashboardID:               dataBlockPayload.DashboardID,
			Name:                      dataBlockPayload.Name,
			Styles:                    dataBlockPayload.Styles,
			CellID:                    cell.ID, //assigned after creating cell
			Data:                      dataBlockPayload.Data,
			Configs:                   dataBlockPayload.Configs,
			Type:                      dataBlockPayload.Type,
			Library:                   dataBlockPayload.Library,
		}

		// Insert the DataBlock into the database
		if err := db.Create(&dataBlock).Error; err != nil {
			log.Println("Error creating DataBlock:", err)
			response.Message = "Unable to create DataBlock"
			response.Code = http.StatusInternalServerError
			return response
		}
	}

	response.Message = "DataBlocks created successfully"
	response.Data = dataBlockPayloads
	response.Code = http.StatusCreated
	return response
}

// func CreateDataBlock(datablockPayload models.DataBlock, LoggedUser models.User) models.Response {
// 	var response models.Response
// 	db := database.DB
// 	// Convert the JSON connection parameters to bytes
// 	ConfigBytes, err := json.Marshal(datablockPayload.Configs)
// 	if err != nil {
// 		log.Println("Error marshaling CONFIG parameters:", err)
// 		response.Message = "Unable to create DataBlock"
// 		response.Code = http.StatusInternalServerError
// 		return response
// 	}
// // Create a new connection instance
// DataBlock := models.DataBlock{
// 	TemplateDataBlockMasterID: datablockPayload.TemplateDataBlockMasterID,
// 	ChartMasterID: datablockPayload.ChartMasterID,
// 	TileID:   datablockPayload.TileID,
// 	DashboardID: datablockPayload.DashboardID,
// 	IsStatic: datablockPayload.IsStatic,
// 	Query: datablockPayload.Query,

// 	ConnectionID: datablockPayload.ConnectionID,
// 	Configs: ConfigBytes, // Assign marshaled JSON bytes
// 	Width: datablockPayload.Width,
// 	Color: datablockPayload.Color,
// }

// if err := db.Create(&DataBlock).Error; err != nil {
// 	log.Println("Error creating Datablock:", err)
// 	response.Message = "Unable to create Datablock"
// 	response.Code = http.StatusInternalServerError
// 	return response
// }

// response.Message = "Datablock created successfully"
// response.Data = DataBlock
// response.Code = http.StatusCreated
// return response
// }

func UpdateDataBlocks(datablockPayloads []models.DataBlock, LoggedUser models.User) models.Response {
	var response models.Response
	db := database.DB

	for _, datablockPayload := range datablockPayloads {
		var Datablock models.DataBlock

		// Convert the JSON connection parameters to bytes
		ConfigBytes, err := json.Marshal(datablockPayload.Configs)
		if err != nil {
			log.Println("Error marshaling config datablock parameters:", err)
			response.Message = "Unable to update Datablock"
			response.Code = http.StatusInternalServerError
			return response
		}

		// Prepare the fields for update
		updates := map[string]interface{}{
			// "Name":    datablockPayload.Name,
			"TileID":  datablockPayload.TileID,
			"Configs": ConfigBytes,
			"CellID":  datablockPayload.CellID,
			// "Data":    datablockPayload.Data,
			"Styles": datablockPayload.Styles,
			"Type":   datablockPayload.Type,
		}

		// Update the specific DataBlock using db.Updates
		if err := db.Model(&Datablock).Where("id = ?", datablockPayload.ID).Updates(updates).Error; err != nil {
			log.Println("Error updating datablock:", err)
			response.Message = "Unable to update Datablock"
			response.Code = http.StatusInternalServerError
			return response
		}
	}

	response.Message = "Datablocks updated successfully"
	response.Code = http.StatusOK
	return response
}

func DeleteDataBlock(ID int, LoggedUser models.User) models.Response {
	var response models.Response
	db := database.DB

	// Fetch the existing connection
	var DataBlock models.DataBlock
	if err := db.First(&DataBlock, ID).Where("status = ?", 1).Error; err != nil {
		log.Println("Error fetching Template DataBlock :", err)
		response.Message = "DataBlock not found"
		response.Code = http.StatusNotFound
		return response
	}

	DataBlock.Status = 0

	// Save the updated connection to the database
	if err := db.Model(&DataBlock).Where("id = ?", ID).Update("status", 0).Error; err != nil {
		log.Println("Error deleting DataBlock:", err)
		response.Message = "Unable to delete DataBlock"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = "DataBlock Deleted successfully"
	response.Data = DataBlock
	response.Code = http.StatusOK
	return response
}
func GetDataBlock(ID int) models.Response {
	var response models.Response
	var datablock models.DataBlock
	var cell models.Cell
	db := database.DB

	// Fetch the data block by ID
	if err := db.Where("id = ?", ID).First(&datablock).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "Data block record not found"
			response.Code = http.StatusNotFound
			fmt.Println("Data block record not found:", err)
		} else {
			response.Message = "Error fetching data block"
			response.Code = http.StatusInternalServerError
			fmt.Println("Error fetching data block:", err)
		}
		return response
	}

	// Fetch the cell by CellID from the datablock
	if err := db.Where("id = ?", datablock.CellID).First(&cell).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "Cell record not found"
			response.Code = http.StatusNotFound
			fmt.Println("Cell record not found:", err)
		} else {
			response.Message = "Error fetching cell"
			response.Code = http.StatusInternalServerError
			fmt.Println("Error fetching cell:", err)
		}
		return response
	}

	// Execute the query associated with the cell
	queryData, err := querymaster.TileQuery(models.QueryRequest{Query: cell.Query}, cell.Set.ConnectionID)
	if err != nil {
		log.Print("Error running query:", err)
		response.Message = "Unable to run query"
		response.Code = http.StatusNotAcceptable
		return response
	}

	response.Message = "Data block fetched successfully"
	response.Data = struct {
		DataBlock models.DataBlock     `json:"data_block"`
		QueryData models.QueryResponse `json:"query_data"`
	}{
		DataBlock: datablock,
		QueryData: queryData,
	}
	response.Code = http.StatusOK
	return response
}

func GetAllDataBlock(tileID int) models.Response {
	var datablocks []models.DataBlock
	var response models.Response

	// Creating connection with the database
	db := database.DB

	// Query the database for all datablocks related to the tileID with status 1
	if err := db.Model(models.DataBlock{}).Select("id, cell_id").Where("tile_id = ? and status = ?", tileID, 1).Find(&datablocks).Error; err != nil {
		log.Println("Failed to fetch datablocks:", err)
		response.Message = "Failed to fetch datablocks"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Loop through each datablock to fetch the related cell and connection_id
	for _, datablock := range datablocks {
		var cell models.Cell

		// Fetch the cell to get connection_id
		if err := db.Model(models.Cell{}).Select("set_id").Where("id = ?", datablock.CellID).First(&cell).Error; err != nil {
			log.Println("Failed to fetch cell:", err)
			response.Message = "Failed to fetch cell for datablock " + string(rune(datablock.ID))
			response.Code = http.StatusInternalServerError
			return response
		}

		// Skip calling applydatablocks if connection_id is -1
		if cell.SetID == -1 {
			log.Println("Skipping applydatablocks for datablock and set_id is -1", datablock.ID)
			continue
		}
		// fmt.Println(datablock.ID,datablock.CellID,cell.ConnectionID)
		// Call the applydatablocks function with the fetched values
		responsedb, _ := RunAndApplyDataBlock(datablock.ID, datablock.CellID, cell.Set.ConnectionID)
		if responsedb.Code != http.StatusOK {
			log.Println("|all datablocks are not sync|")
			response.Message += "|all datablocks are not sync|"
		}
	}

	// Fetch the updated datablocks again after applying changes
	if err := db.Model(models.DataBlock{}).Where("tile_id = ? and status = ?", tileID, 1).Find(&datablocks).Error; err != nil {
		log.Println("Failed to fetch updated datablocks:", err)
		response.Message = "Failed to fetch updated datablocks"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Construct the response in the desired format
	datablocksMap := make(map[string]interface{})
	for _, datablock := range datablocks {
		var datablockDetails map[string]interface{}
		if datablock.Type == "text" {
			datablockDetails = map[string]interface{}{
				"id":      datablock.ID,
				"configs": datablock.Configs,
				"data":    datablock.Data,
				"styles":  datablock.Styles,
				"type":    datablock.Type,
			}

		} else {
			datablockDetails = map[string]interface{}{
				"id":      datablock.ID,
				"options": datablock.Configs,
				"series":  datablock.Data,
				"styles":  datablock.Styles,
				"type":    datablock.Type,
			}

		}
		datablocksMap[datablock.Name] = datablockDetails
	}

	// Construct the final response object
	response.Code = http.StatusOK
	response.Data = map[string]interface{}{
		"datablocks": datablocksMap,
	}
	response.Message = fmt.Sprintf("%d Datablocks fetched and updated successfully!", len(datablocks))
	return response
}

func RunAndApplyDataBlock(datablockID int, CellID int, ConnectionID int) (models.Response, error) {
	var response models.Response
	db := database.DB

	// Fetch the DataBlock by ID
	var datablock models.DataBlock
	if err := db.Preload("Cell").First(&datablock, datablockID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("DataBlock not found:", err)
			response.Message = "DataBlock not found"
			response.Code = http.StatusNotFound
			return response, err
		}
		fmt.Println("Error fetching DataBlock:", err)
		response.Message = "Error fetching DataBlock"
		response.Code = http.StatusInternalServerError
		return response, err
	}

	// Run the TileQuery using the CellID and ConnectionID from the DataBlock
	// fmt.Println(11,datablock.Cell.Query,11,11,ConnectionID)
	// queryResponse, err := querymaster.TileQuery(models.QueryRequest{Query: datablock.Cell.Query}, ConnectionID)
	// if err != nil {
	// 	response.Message = "Error executing TileQuery"
	// 	response.Code = http.StatusInternalServerError
	// 	return response, err
	// }
	// var cell models.Cell
	// utils.DataBlockID = datablock.ID
	_, err := cells.CellQuery(datablock.Cell, datablockID)
	if err != nil {
		fmt.Println("Error executing Query:", err)
		response.Message = "Error executing Query"
		response.Code = http.StatusInternalServerError
		return response, err
	}
	var dat models.Applydatareq
	dat.DatablockID = datablockID
	dat.CellID = CellID
	dblkres, err := ApplyResultToDatablock(dat)

	if err != nil {
		fmt.Println("Error applying result:", err)
		response.Message = "Error Applying Result"
		response.Code = http.StatusInternalServerError
		return response, err
	}

	return dblkres, err
}

// datablock.CellID = CellID
// // Save the updated DataBlock to the database
// if err := db.Save(&datablock).Error; err != nil {
// 	response.Message = "Error saving updated DataBlock"
// 	response.Code = http.StatusInternalServerError
// 	return response, err
// }

// response.Message = "DataBlock updated successfully"
// response.Data = datablock
// response.Code = http.StatusOK
// return response, nil

// func ApplyResultToDatablock(dat models.Applydatareq	)(models.Response, error) {
// 	var response models.Response
// 	var Cell models.Cell
// 	db := database.DB
// 	// Fetch the DataBlock by ID
// 	var datablock models.DataBlock
// 	if err := db.First(&datablock, dat.DatablockID).Error; err != nil {
// 		if errors.Is(err, gorm.ErrRecordNotFound) {
// 			response.Message = "DataBlock not found"
// 			response.Code = http.StatusNotFound
// 			return response, err
// 		}
// 		response.Message = "Error fetching DataBlock"
// 		response.Code = http.StatusInternalServerError
// 		return response, err
// 	}
// 	if err := db.First(&Cell, dat.CellID).Where("status = ?", 1).Error; err != nil {
// 		log.Println("Error fetching Template DataBlock :", err)
// 		response.Message = "DataBlock not found"
// 		response.Code = http.StatusNotFound
// 		return response, nil
// 	}

// 		// Check if the provided query matches the query in the Cell
// 		if dat.Query == Cell.Query && dat.ConnectionID == Cell.ConnectionID {
// 			// Update the CellID and Data of the DataBlock
// 			datablock.CellID = dat.CellID
// 			datablock.Data = Cell.Result
// 		} else {
// 			// Return an error if the queries do not match
// 			response.Message = "Query mismatch: provided query does not match the cell query"
// 			response.Code = http.StatusBadRequest
// 			return response, fmt.Errorf("query mismatch: provided query does not match the cell query")
// 		}
// 	// Save the updated DataBlock to the database
// 	if err := db.Save(&datablock).Error; err != nil {
// 		response.Message = "Error saving updated DataBlock"
// 		response.Code = http.StatusInternalServerError
// 		return response, err
// 	}

// 	response.Message = "DataBlock updated successfully"
// 	response.Data = datablock
// 	response.Code = http.StatusOK
// 	return response, nil
// }

// // Fetch the Cell by ID and ensure it's active (status = 1)
// if err := db.Where("status = ?", 1).First(&cell, dat.CellID).Error; err != nil {
// 	log.Println("Error fetching Cell:", err)
// 	response.Message = "Cell not found"
// 	response.Code = http.StatusNotFound
// 	return response, nil
// }
// fmt.Printf("datablock.Configs: %s\n", datablock.Configs)

// // Parse the datablock.Configs JSON into a map for modification
// var configs map[string]interface{}
// if err := json.Unmarshal(datablock.Configs, &configs); err != nil {
// 	response.Message = "Error parsing Configs"
// 	response.Code = http.StatusInternalServerError
// 	return response, err
// }

// // Case statement based on the DataBlock chart type
// switch datablock.Type {
// case "text":
// 	// Handle text formatting
// 	// formattedTextData, err := utils.Reformattext(cell.Result)
// 	// if err != nil {
// 	//     response.Message = "Error formatting text data"
// 	//     response.Code = http.StatusInternalServerError
// 	//     return response, err
// 	// }
// 	datablock.Data = cell.Result
// 	fmt.Printf("Cell Result: %+v\n", cell.Result)
// 	fmt.Printf("Formatted Data: %s\n", cell.Result)

// case "table":
// 	// Handle table formatting
// 	var tableData struct {
// 		Columns []string        `json:"columns"`
// 		Rows    [][]interface{} `json:"rows"`
// 	}
// 	if err := json.Unmarshal(cell.Result, &tableData); err != nil {
// 		response.Message = "Error parsing table data"
// 		response.Code = http.StatusInternalServerError
// 		return response, err
// 	}

// case "pie":
// 	// Handle pie chart formatting
// 	labels, series, err := utils.Reformatpie(cell.Result)
// 	if err != nil {
// 		response.Message = "Error formatting pie chart"
// 		response.Code = http.StatusInternalServerError
// 		return response, err
// 	}

// 	// Assign labels to the "labels" key in the Configs map
// 	configs["labels"] = labels

// 	// Assign series to Data
// 	datablock.Data = series

// case "bar":
// 	// Handle pie chart formatting
// 	labels, series, err := utils.Reformatpie(cell.Result)
// 	if err != nil {
// 		response.Message = "Error formatting pie chart"
// 		response.Code = http.StatusInternalServerError
// 		return response, err
// 	}

// 	// Assign labels to the "labels" key in the Configs map
// 	configs["labels"] = labels

// 	// Assign series to Data
// 	datablock.Data = series

// // Marshal the updated Configs back into JSON
// updatedConfigs, err := json.Marshal(configs)
// if err != nil {
// 	response.Message = "Error marshaling updated Configs"
// 	response.Code = http.StatusInternalServerError
// 	return response, err
// }
// datablock.Configs = updatedConfigs
// datablock.CellID = dat.CellID
// // Save the updated DataBlock
// if err := db.Save(&datablock).Error; err != nil {
// 	response.Message = "Error saving updated DataBlock"
// 	response.Code = http.StatusInternalServerError
// 	return response, err
// }

// func ApplyResultToDatablock(dat models.Applydatareq) (models.Response, error) {
// 	var response models.Response
// 	var cell models.Cell
// 	db := database.DB

// 	// Fetch the DataBlock by ID
// 	var datablock models.DataBlock
// 	if err := db.First(&datablock, dat.DatablockID).Error; err != nil {
// 		if errors.Is(err, gorm.ErrRecordNotFound) {
// 			response.Message = "DataBlock not found"
// 			response.Code = http.StatusNotFound
// 			return response, err
// 		}
// 		response.Message = "Error fetching DataBlock"
// 		response.Code = http.StatusInternalServerError
// 		return response, err
// 	}

// 	// Fetch the Cell by ID and ensure it's active (status = 1)
// 	if err := db.Where("status = ?", 1).First(&cell, dat.CellID).Error; err != nil {
// 		log.Println("Error fetching Cell:", err)
// 		response.Message = "Cell not found"
// 		response.Code = http.StatusNotFound
// 		return response, nil
// 	}

// 	// Parse the datablock.Configs JSON into a map for modification
// 	var configs map[string]interface{}
// 	if err := json.Unmarshal(datablock.Configs, &configs); err != nil {
// 		response.Message = "Error parsing Configs"
// 		response.Code = http.StatusInternalServerError
// 		return response, err
// 	}

// 	// Case statement based on the DataBlock chart type
// 	switch datablock.Type {
// 	case "text":
// 		// Handle text formatting
// 		// formattedTextData, err := utils.Reformattext(cell.Result)
// 		// if err != nil {
// 		//     response.Message = "Error formatting text data"
// 		//     response.Code = http.StatusInternalServerError
// 		//     return response, err
// 		// }

// 		datablock.Data = cell.Result

// 	case "table":
// 		fmt.Println("start of table case")
// 		// Handle table formatting
// 		var tableData struct {
// 			Columns []string        `json:"columns"`
// 			Rows    [][]interface{} `json:"rows"`
// 		}
// 		if err := json.Unmarshal(cell.Result, &tableData); err != nil {
// 			response.Message = "Error parsing table data"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}

// 		formattedTableData, err := utils.Reformattable(tableData.Columns, tableData.Rows)
// 		if err != nil {
// 			response.Message = "Error formatting table data"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}

// 		// datablock.Data = formattedTableData
// 		var reformattedTable struct {
// 			Columns []string        `json:"columns"`
// 			Rows    [][]interface{} `json:"rows"`
// 		}
// 		if err := json.Unmarshal(formattedTableData, &reformattedTable); err != nil {
// 			response.Message = "Error parsing formatted table data"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}

// 		// Assign the formatted table data to configs["headers"] and configs["rows"]
// 		configs["headers"] = reformattedTable.Columns
// 		configs["rows"] = reformattedTable.Rows

// 		// Marshal the updated Configs back into JSON
// 		updatedConfigs, err := json.Marshal(configs)
// 		if err != nil {
// 			response.Message = "Error marshaling updated Configs"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}
// 		datablock.Configs = updatedConfigs
// 		datablock.Data = nil
// 		// fmt.Println("end of table case")

// 	case "pie":
// 		// Handle pie chart formatting
// 		fmt.Println("start of pie case")

// 		labels, series, err := utils.Reformatpie(cell.Result)
// 		if err != nil {
// 			response.Message = "Error formatting pie chart"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}

// 		// Assign labels to the "labels" key in the Configs map
// 		configs["labels"] = labels

// 		// Assign series to Data
// 		datablock.Data = series
// 		fmt.Println("end of pie case")

// 	case "donut":
// 		// Handle pie chart formatting
// 		labels, series, err := utils.Reformatdonut(cell.Result)
// 		if err != nil {
// 			response.Message = "Error formatting pie chart"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}

// 		// Assign labels to the "labels" key in the Configs map
// 		configs["labels"] = labels

// 		// Assign series to Data
// 		datablock.Data = series

// 	case "bar":
// 		// Handle bar chart formatting

// 		labels, series, err := utils.ReformatBarChart(cell.Result) // Assuming you're getting labels and series correctly

// 		if err != nil {
// 			response.Message = "Error formatting bar chart"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}

// 		// Ensure configs["xaxis"] exists and is a map
// 		if _, ok := configs["xaxis"].(map[string]interface{}); !ok {
// 			configs["xaxis"] = make(map[string]interface{})
// 		}

// 		// Assign labels to the "categories" key inside "xaxis"
// 		xaxis := configs["xaxis"].(map[string]interface{})
// 		xaxis["categories"] = labels

// 		// Format the series data to match the structure: [{ data: [...] }]
// 		formattedSeries := []map[string]interface{}{
// 			{
// 				"data": series,
// 			},
// 		}

// 		// Marshal formattedSeries to JSON (since datablock.Data expects json.RawMessage)
// 		seriesJSON, err := json.Marshal(formattedSeries)

// 		if err != nil {
// 			response.Message = "Error marshaling series data"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}

// 		// Assign marshaled series data to datablock.Data
// 		datablock.Data = seriesJSON

// 	case "line":
// 		// Handle line chart formatting
// 		formattedLineData, err := utils.ReformatLineChart(cell.Result)
// 		if err != nil {
// 			response.Message = "Error formatting line chart"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}
// 		datablock.Data = formattedLineData

// 	case "combo":
// 		fmt.Println("start of combo case")

// 		// Extracting labels, series, and yAxisData
// 		labels, seriesRaw, yAxisDataRaw, err := utils.ReformatComboChart(cell.Result)
// 		if err != nil {
// 			response.Message = "Error formatting combo chart"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}

// 		fmt.Println("yAxisDataRaw:")
// 		fmt.Println(string(yAxisDataRaw)) // Print as string for readability
// 		fmt.Println("Labels:")
// 		fmt.Println(labels)
// 		fmt.Println("SeriesRaw:")
// 		fmt.Println(string(seriesRaw))

// 		// Declare variables for unmarshaling
// 		var series []map[string]interface{}
// 		var yAxisData []map[string]interface{}

// 		// Unmarshal JSON correctly
// 		if err := json.Unmarshal(seriesRaw, &series); err != nil {
// 			response.Message = "Error unmarshaling series data"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}
// 		if err := json.Unmarshal(yAxisDataRaw, &yAxisData); err != nil {
// 			response.Message = "Error unmarshaling yAxis data"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}

// 		// Ensure x-axis categories exist
// 		if _, ok := configs["xaxis"].(map[string]interface{}); !ok {
// 			configs["xaxis"] = make(map[string]interface{})
// 		}
// 		configs["xaxis"].(map[string]interface{})["categories"] = labels

// 		// Fixing yAxisData formatting
// 		yAxisConfig := []map[string]interface{}{}
// 		for _, yAxis := range yAxisData {
// 			yAxisConfig = append(yAxisConfig, map[string]interface{}{
// 				"seriesName": yAxis["seriesName"], // Correct key mapping
// 				"title": map[string]interface{}{
// 					"text": yAxis["seriesName"],
// 				},
// 				"opposite": yAxis["opposite"], // Ensure it's boolean
// 			})
// 		}
// 		configs["yaxis"] = yAxisConfig

// 		// Fix series mapping
// 		formattedSeries := []map[string]interface{}{}
// 		for _, s := range series {
// 			formattedSeries = append(formattedSeries, map[string]interface{}{
// 				"name":  s["name"],
// 				"type":  s["type"],
// 				"yAxis": s["yAxis"],
// 				"data":  s["data"],
// 			})
// 		}

// 		// Marshal formatted series
// 		seriesJSON, err := json.Marshal(formattedSeries)
// 		if err != nil {
// 			response.Message = "Error marshaling series data"
// 			response.Code = http.StatusInternalServerError
// 			return response, err
// 		}

// 		// Assign final series data
// 		datablock.Data = seriesJSON

// 		fmt.Println("end of combo case")

// 	default:
// 		response.Message = "Unsupported chart type"
// 		response.Code = http.StatusBadRequest
// 		return response, fmt.Errorf("unsupported chart type: %s", datablock.Type)
// 	}

// 	// Marshal the updated Configs back into JSON
// 	updatedConfigs, err := json.Marshal(configs)
// 	if err != nil {
// 		response.Message = "Error marshaling updated Configs"
// 		response.Code = http.StatusInternalServerError
// 		return response, err
// 	}
// 	datablock.Configs = updatedConfigs

// 	// Save the updated DataBlock
// 	if err := db.Model(&datablock).Where("id = ?", datablock.ID).Updates(datablock).Error; err != nil {
// 		response.Message = "Error updating DataBlock"
// 		response.Code = http.StatusInternalServerError
// 		return response, err
// 	}

// 	// Construct the response
// 	responseData := map[string]interface{}{
// 		"ID":      datablock.ID,
// 		"Name":    datablock.Name,
// 		"Configs": json.RawMessage(datablock.Configs),
// 		"Data":    json.RawMessage(datablock.Data),
// 		"Styles":  json.RawMessage(datablock.Styles),
// 	}

// 	response.Message = "DataBlock updated successfully"
// 	response.Data = responseData
// 	response.Code = http.StatusOK

// 	return response, nil
// }



// 551
func ApplyResultToDatablock(dat models.Applydatareq) (models.Response, error) {
	var response models.Response
	var cell models.Cell
	db := database.DB

	// Fetch the DataBlock by ID
	var datablock models.DataBlock
	if err := db.First(&datablock, dat.DatablockID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "DataBlock not found"
			response.Code = http.StatusNotFound
			return response, err
		}
		response.Message = "Error fetching DataBlock"
		response.Code = http.StatusInternalServerError
		return response, err
	}

	// Fetch the Cell by ID and ensure it's active (status = 1)
	if err := db.Where("status = ?", 1).First(&cell, dat.CellID).Error; err != nil {
		log.Println("Error fetching Cell:", err)
		response.Message = "Cell not found"
		response.Code = http.StatusNotFound
		return response, nil
	}

	// Parse the datablock.Configs JSON into a map for modification
	var configs map[string]interface{}
	if err := json.Unmarshal(datablock.Configs, &configs); err != nil {
		response.Message = "Error parsing Configs"
		response.Code = http.StatusInternalServerError
		return response, err
	}

	// Case statement based on the DataBlock chart type
	switch datablock.Type {
	case "text":
		datablock.Data = cell.Result

	case "table":
		fmt.Println("start of table case")
		var tableData struct {
			Columns []string        `json:"columns"`
			Rows    [][]interface{} `json:"rows"`
		}
		if err := json.Unmarshal(cell.Result, &tableData); err != nil {
			response.Message = "Error parsing table data"
			response.Code = http.StatusInternalServerError
			return response, err
		}

		formattedTableData, err := utils.Reformattable(tableData.Columns, tableData.Rows)
		if err != nil {
			response.Message = "Error formatting table data"
			response.Code = http.StatusInternalServerError
			return response, err
		}

		var reformattedTable struct {
			Columns []string        `json:"columns"`
			Rows    [][]interface{} `json:"rows"`
		}
		if err := json.Unmarshal(formattedTableData, &reformattedTable); err != nil {
			response.Message = "Error parsing formatted table data"
			response.Code = http.StatusInternalServerError
			return response, err
		}

		configs["headers"] = reformattedTable.Columns
		configs["rows"] = reformattedTable.Rows

		updatedConfigs, err := json.Marshal(configs)
		if err != nil {
			response.Message = "Error marshaling updated Configs"
			response.Code = http.StatusInternalServerError
			return response, err
		}
		datablock.Configs = updatedConfigs
		datablock.Data = nil

	case "pie":
		fmt.Println("start of pie case")
		labels, series, err := utils.Reformatpie(cell.Result)
		if err != nil {
			response.Message = "Error formatting pie chart"
			response.Code = http.StatusInternalServerError
			return response, err
		}
		configs["labels"] = labels
		datablock.Data = series
		fmt.Println("end of pie case")

	case "donut":
		labels, series, err := utils.Reformatdonut(cell.Result)
		if err != nil {
			response.Message = "Error formatting pie chart"
			response.Code = http.StatusInternalServerError
			return response, err
		}
		configs["labels"] = labels
		datablock.Data = series

	case "bar":
		labels, series, err := utils.ReformatBarChart(cell.Result)
		if err != nil {
			response.Message = "Error formatting bar chart"
			response.Code = http.StatusInternalServerError
			return response, err
		}
		if _, ok := configs["xaxis"].(map[string]interface{}); !ok {
			configs["xaxis"] = make(map[string]interface{})
		}
		xaxis := configs["xaxis"].(map[string]interface{})
		xaxis["categories"] = labels

		formattedSeries := []map[string]interface{}{
			{
				"data": series,
			},
		}
		seriesJSON, err := json.Marshal(formattedSeries)
		if err != nil {
			response.Message = "Error marshaling series data"
			response.Code = http.StatusInternalServerError
			return response, err
		}
		datablock.Data = seriesJSON

	case "line":
		formattedLineData, err := utils.ReformatLineChart(cell.Result)
		if err != nil {
			response.Message = "Error formatting line chart"
			response.Code = http.StatusInternalServerError
			return response, err
		}
		datablock.Data = formattedLineData

	case "combo":
		fmt.Println("start of combo case")
		// ReformatComboChart returns (labels, seriesRaw, yAxisDataRaw)
		labels, seriesRaw, yAxisDataRaw, err := utils.ReformatComboChart(cell.Result)
		if err != nil {
			response.Message = "Error formatting combo chart"
			response.Code = http.StatusInternalServerError
			return response, err
		}

		// Debug prints
		fmt.Println("yAxisDataRaw:")
		fmt.Println(string(yAxisDataRaw))
		fmt.Println("Labels:")
		fmt.Println(labels)
		fmt.Println("SeriesRaw:")
		fmt.Println(string(seriesRaw))

		var series []map[string]interface{}
		var yAxisData []map[string]interface{}
		if err := json.Unmarshal(seriesRaw, &series); err != nil {
			response.Message = "Error unmarshaling series data"
			response.Code = http.StatusInternalServerError
			return response, err
		}
		if err := json.Unmarshal(yAxisDataRaw, &yAxisData); err != nil {
			response.Message = "Error unmarshaling yAxis data"
			response.Code = http.StatusInternalServerError
			return response, err
		}

		// Ensure x-axis exists in configs
		if _, ok := configs["xaxis"].(map[string]interface{}); !ok {
			configs["xaxis"] = make(map[string]interface{})
		}
		configs["xaxis"].(map[string]interface{})["categories"] = labels

		// Build yAxis configuration by copying the yAxisData map to preserve existing fields,
		// and only updating "seriesName" and "title"
		yAxisConfig := []map[string]interface{}{}
		for _, y := range yAxisData {
			newYAxis := make(map[string]interface{})
			for k, v := range y {
				newYAxis[k] = v
			}
			// Update only name (and title) without overwriting other fields
			newYAxis["seriesName"] = y["seriesName"]
			newYAxis["title"] = map[string]interface{}{
				"text": y["seriesName"],
			}
			yAxisConfig = append(yAxisConfig, newYAxis)
		}
		configs["yaxis"] = yAxisConfig

		// Build series configuration by copying each series map so as not to overwrite extra keys
		formattedSeries := []map[string]interface{}{}
		for _, s := range series {
			newSeries := make(map[string]interface{})
			for k, v := range s {
				newSeries[k] = v
			}
			// Only update "name" and "data" if necessary, but preserve any additional keys like "type" and "yAxis"
			newSeries["name"] = s["name"]
			newSeries["data"] = s["data"]
			formattedSeries = append(formattedSeries, newSeries)
		}

		seriesJSON, err := json.Marshal(formattedSeries)
		if err != nil {
			response.Message = "Error marshaling series data"
			response.Code = http.StatusInternalServerError
			return response, err
		}
		datablock.Data = seriesJSON

		fmt.Println("end of combo case")

	default:
		response.Message = "Unsupported chart type"
		response.Code = http.StatusBadRequest
		return response, fmt.Errorf("unsupported chart type: %s", datablock.Type)
	}

	// Marshal the updated Configs back into JSON
	updatedConfigs, err := json.Marshal(configs)
	if err != nil {
		response.Message = "Error marshaling updated Configs"
		response.Code = http.StatusInternalServerError
		return response, err
	}
	datablock.Configs = updatedConfigs

	// Update only specific fields using a map (instead of updating the entire model)
	updateFields := map[string]interface{}{
		"Configs": datablock.Configs,
		"Data":    datablock.Data,
	}
	if err := db.Model(&models.Dashboard{}).Where("id = ?", datablock.ID).Updates(updateFields).Error; err != nil {
		response.Message = "Error updating DataBlock"
		response.Code = http.StatusInternalServerError
		return response, err
	}

	// Construct the response
	responseData := map[string]interface{}{
		"ID":      datablock.ID,
		"Name":    datablock.Name,
		"Configs": json.RawMessage(datablock.Configs),
		"Data":    json.RawMessage(datablock.Data),
		"Styles":  json.RawMessage(datablock.Styles),
	}

	response.Message = "DataBlock updated successfully"
	response.Data = responseData
	response.Code = http.StatusOK

	return response, nil
}
