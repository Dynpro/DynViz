package tile

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/datablock"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
	"gorm.io/gorm"
)

func VerifyTile(name string, table *gorm.DB, dashid int) int64 {
	var count int64
	table.Where("name = ? AND dashboard_id = ? AND status = ?", name, dashid, 1).Count(&count)
	return count
}

func CreateTile(tilepayloadreq models.TileRequestPayloadMaster, loggeduser models.User) models.Response {
	var tile models.Tile
	var response models.Response

	tilepayload := tilepayloadreq.TileReqP
	tile.Name = tilepayload.Name
	tile.DashboardID = tilepayload.DashboardID
	tile.TemplateMasterID = tilepayload.TemplateMasterID
	tile.CreatedByID = loggeduser.ID
	tile.LastModifiedBy = loggeduser.ID
	// tile.Height = tilepayload.Height
	// tile.Width = tilepayload.Width
	// tile.Color = tilepayload.Color
	tile.Url = tilepayload.URL
	// tile.CreatedByID = loggeduser.ID
	// tile.LastModifiedBy = loggeduser.ID

	db := database.DB
	if VerifyTile(tilepayload.Name, db.Model(&models.Tile{}), tilepayload.DashboardID) > 0 {
		response.Message = "tile with the same name already exists"
		response.Code = http.StatusNotAcceptable
		return response
	} else {
		// Use the correct model for creation
		if err := db.Create(&tile).Error; err != nil {
			response.Message = "Unable to create Tile"
			response.Code = http.StatusInternalServerError
			return response
		} else {
			//write config eng var
			api_url := os.Getenv("SERVER_HOST")
			tile.Url = api_url + "/tile/get?id=" + strconv.Itoa(tile.ID)
			if err := db.Save(&tile).Error; err != nil {
				response.Message = "unable to create tile"
				response.Code = http.StatusInternalServerError
				return response
			}
			response.Message = fmt.Sprintf("Tile : %s (%d) created successfully!", tile.Name, tile.ID)
			response.Code = http.StatusCreated
			fmt.Println(tile.ID)
			// response = datablock.CreateDataBlocks(tilepayloadreq.DataBlocks, tile.ID, loggeduser)
			response.Message += "Tile : created successfully!"
			response.Code = http.StatusCreated
			return response
		}
	}
}

func CreateTileTest(tiledbpayload models.TileRequestPayloadMaster, loggeduser models.User, WSCTpayload models.Tiledatablockpayload) (models.Response, models.Tile) {
	var tile models.Tile
	var response models.Response
	var tdbm []models.TemplateDataBlockMaster
	var datablocks []models.DataBlockRequestPayload

	tilepayload := tiledbpayload.TileReqP
	tile.Name = tilepayload.Name
	tile.DashboardID = tilepayload.DashboardID
	tile.TemplateMasterID = tilepayload.TemplateMasterID
	tile.CreatedByID = loggeduser.ID
	tile.LastModifiedBy = loggeduser.ID
	// tile.Height = tilepayload.Height
	tile.Configs = tilepayload.Configs
	tile.Type = tilepayload.Type
	tile.Styles = tilepayload.Styles
	tile.Layout = tilepayload.Layout

	db := database.DB
	// if VerifyTile(tilepayload.Name, db.Model(&models.Tile{}), tilepayload.DashboardID) > 0 {
	// 	response.Message = "Tile with the same name already exists"
	// 	response.Code = http.StatusNotAcceptable
	// 	return response, 0
	// }else{
	// Create the tile
	if err := db.Create(&tile).Error; err != nil {
		response.Message = "Unable to create Tile"
		response.Code = http.StatusInternalServerError
		return response, tile
	} else {
		// Set the URL for the tile and save it
		api_url := os.Getenv("SERVER_HOST")
		tile.Url = api_url + "/datablock/getall?id=" + strconv.Itoa(tile.ID)
		if err := db.Save(&tile).Error; err != nil {
			response.Message = "Unable to create tile"
			response.Code = http.StatusInternalServerError
			return response, tile
		}

		// Fetch tdbm to create datablocks
		if err := db.Where("template_master_id  = ?", tilepayload.TemplateMasterID).Find(&tdbm).Error; err != nil {
			response.Message = fmt.Sprint("Failed to fetch template, please provide correct ID")
			response.Code = http.StatusNotFound
			return response, tile
		}
		// fmt.Println(tile.TemplateMasterID)
		// fmt.Println(tdbm)
		// Assign tdbm values to datablocks and set the TileID for each datablock
		for _, t := range tdbm {
			datablock := models.DataBlockRequestPayload{
				TemplateDataBlockMasterID: t.ID,
				DashboardID:               tile.DashboardID,
				TileID:                    tile.ID,
				ChartMasterID:             t.ChartMasterID,
				Type:                      t.Type,
				Configs:                   t.Configs,
				IsStatic:                  false,
				Query:                     t.Name,
				Name:                      t.Name,
				Styles:                    t.Styles,
				Data:                      t.Data,
				Library:                   t.Library,
			}
			datablocks = append(datablocks, datablock)
		}

		// Assign the created datablocks to the payload
		tiledbpayload.DataBlocks = datablocks
		fmt.Println(tiledbpayload.DataBlocks)

		// Create datablocks and update the response
		response = datablock.CreateDataBlocks(tiledbpayload.DataBlocks, tile.ID, loggeduser, WSCTpayload)
		response.Message += " Tile created successfully!"
		response.Code = http.StatusCreated
		response.Data = tile
		return response, tile
	}

}

func GetAllTiles(ID int) (models.Response, []models.Tile) {
	var response models.Response
	var Dashbaord models.Dashboard
	// Get database connection
	db := database.DB
	var tiles []models.Tile
	var alltiles []models.Tile

	// Query the database for querys with specific organization ID and active status
	if err := db.Where("  id =? AND status = ? ", ID, 1).First(&Dashbaord).Error; err != nil {
		response.Message = "Failed to find dashboard"
		response.Code = http.StatusInternalServerError
		return response, alltiles
	}
	//tile reponse payload begin
	tile_columns := "ID,Name,template_master_id,type,configs,layout,styles,url"
	dblock_columns := "id,dashboard_id,name,tile_id,chart_master_id,template_data_block_master_id,configs,cell_id,data,styles,type"
	if err := db.Model(&models.Tile{}).Select(tile_columns).Preload("DataBlocks", func(db *gorm.DB) *gorm.DB {
		return db.Select(dblock_columns)
	}).Where("dashboard_id = ? AND status = ?", ID, 1).Find(&tiles).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "Tile not Created succesfully"
			response.Code = http.StatusNotFound
			return response, tiles
		} else {
			fmt.Println("Error fetching Tile:", err)
			response.Message = "Failed to fetch Tile data"
			response.Code = http.StatusInternalServerError
			return response, tiles
		}
	}

	// Process each Tile and map datablock to datablocks
	var formattedData []map[string]interface{}
	for _, tile := range tiles {
		formattedTemplate := map[string]interface{}{
			"id":             tile.ID,
			"name":           tile.Name,
			"dashboard_name": Dashbaord.Name,
			"type":           tile.Type,
			"configs":        tile.Configs,
			"url":            tile.Url,
			"layout":         tile.Layout,
			"styles":         tile.Styles,
			"datablocks":     map[string]interface{}{}, // Initialize datablocks map
		}

		// Process each TDBM associated with the template
		for _, tdb := range tile.DataBlocks {
			// Assign the TDBM to the appropriate datablock by name (header, mainContent, etc.)
			formattedTemplate["datablocks"].(map[string]interface{})[tdb.Name] = map[string]interface{}{
				"datablock_id":                  tdb.ID,
				"dashboard_id":                  tdb.DashboardID,
				"tile_id":                       tdb.TileID,
				"chart_master_id":               tdb.ChartMasterID,
				"template_data_block_master_id": tdb.TemplateDataBlockMasterID,
				"cell_id":                       tdb.CellID,
				"styles":                        tdb.Styles,
				"data":                          tdb.Data,
				"configs":                       tdb.Configs,
				"type":                          tdb.Type,
			}
		}

		// Append the formatted template to the list
		formattedData = append(formattedData, formattedTemplate)
	}

	//tiles as per new request
	if err := db.Preload("Dashboard").Model(&models.Tile{}).Select(tile_columns).Where("dashboard_id = ? AND status = ?", ID, 1).Find(&alltiles).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "Tile not Created succesfully"
			response.Code = http.StatusNotFound
			return response, alltiles
		} else {
			fmt.Println("Error fetching Tile:", err)
			response.Message = "Failed to fetch Tile data"
			response.Code = http.StatusInternalServerError
			return response, alltiles
		}
	}

	if len(alltiles) == 0 {
		response.Message = "No tiles found"
		response.Code = http.StatusNotFound
		return response, nil
	}

	response.Message = "Tiles fetched successfully"
	// response.Data = formattedData
	response.Data = alltiles
	response.Code = http.StatusOK
	return response, tiles
}
func GetTile(ID int) models.Response {
	var response models.Response
	// Get database connection
	db := database.DB

	var tile []models.Tile

	//tile reponse payload begin
	tile_columns := "ID,Name,template_master_id,type,configs,layout,styles,url"
	dblock_columns := "id,dashboard_id,name,tile_id,chart_master_id,template_data_block_master_id,configs,cell_id,data,styles,type"
	if err := db.Model(&models.Tile{}).Select(tile_columns).Preload("DataBlocks", func(db *gorm.DB) *gorm.DB {
		return db.Select(dblock_columns)
	}).Where("id = ? AND status = ?", ID, 1).First(&tile).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "Tile not Created succesfully"
			response.Code = http.StatusNotFound
			return response
		} else {
			fmt.Println("Error fetching Tile:", err)
			response.Message = "Failed to fetch Tile data"
			response.Code = http.StatusInternalServerError
			return response
		}
	}

	// Process each Tile and map datablock to datablocks
	var formattedData []map[string]interface{}
	for _, tiledata := range tile {
		formattedTemplate := map[string]interface{}{
			"id":   tiledata.ID,
			"name": tiledata.Name,
			// "dashboard_id": tile.TemplateMasterID,
			"type":       tiledata.Type,
			"configs":    tiledata.Configs,
			"url":        tiledata.Url,
			"layout":     tiledata.Layout,
			"styles":     tiledata.Styles,
			"datablocks": map[string]interface{}{}, // Initialize datablocks map
		}

		// Process each TDBM associated with the template
		for _, tdb := range tiledata.DataBlocks {
			if tdb.Type == "text" {
				// Assign the TDBM to the appropriate datablock by name (header, mainContent, etc.)
				formattedTemplate["datablocks"].(map[string]interface{})[tdb.Name] = map[string]interface{}{
					"datablock_id":                  tdb.ID,
					"dashboard_id":                  tdb.DashboardID,
					"tile_id":                       tdb.TileID,
					"chart_master_id":               tdb.ChartMasterID,
					"template_data_block_master_id": tdb.TemplateDataBlockMasterID,
					"cell_id":                       tdb.CellID,
					"styles":                        tdb.Styles,
					"data":                          tdb.Data,
					"configs":                       tdb.Configs,
					"type":                          tdb.Type,
				}
			} else {
				formattedTemplate["datablocks"].(map[string]interface{})[tdb.Name] = map[string]interface{}{
					"datablock_id":                  tdb.ID,
					"dashboard_id":                  tdb.DashboardID,
					"tile_id":                       tdb.TileID,
					"chart_master_id":               tdb.ChartMasterID,
					"template_data_block_master_id": tdb.TemplateDataBlockMasterID,
					"cell_id":                       tdb.CellID,
					"styles":                        tdb.Styles,
					"series":                        tdb.Data,
					"options":                       tdb.Configs,
					"type":                          tdb.Type,
				}
			}

		}

		// Append the formatted template to the list
		formattedData = append(formattedData, formattedTemplate)
	}

	response.Message = "Tile fetched successfully"
	response.Data = formattedData
	response.Code = http.StatusOK
	return response

}

func UpdateTile(tilepayload models.Tile, loggeduser models.User) models.Response {
	var response models.Response
	db := database.DB
	updatefields := make(map[string]interface{})

	if tilepayload.Name != "" {
		updatefields["Name"] = tilepayload.Name
	}

	if tilepayload.Type != "" {
		updatefields["Type"] = tilepayload.Type
	}

	if len(tilepayload.Configs) > 0 && string(tilepayload.Configs) != "null" {
		updatefields["Configs"] = tilepayload.Configs
	}

	if len(tilepayload.Layout) > 0 && string(tilepayload.Layout) != "null" {
		updatefields["Layout"] = tilepayload.Layout
	}
	if len(tilepayload.Styles) > 0 && string(tilepayload.Styles) != "null" {
		updatefields["Styles"] = tilepayload.Styles
	}

	if len(updatefields) > 0 {
		updatefields["LastModifiedBy"] = loggeduser.ID

		if err := db.Model(&models.Tile{}).Where("ID = ? AND status = ?", tilepayload.ID, 1).Updates(updatefields).Error; err != nil {
			response.Message = "failed to update Tile"
			response.Code = http.StatusInternalServerError
			return response
		} else {

			response.Message = "Tile updated successfully"
			response.Code = http.StatusOK
			return response

		}

	}
	return response
}

func DeleteTile(ID int, loggedID int) models.Response {
	var response models.Response
	db := database.DB

	// Prepare the update fields
	update := map[string]interface{}{
		"status":           0,
		"last_modified_by": loggedID,
		"deactivate_by_id": loggedID,
		"deactivate_date":  time.Now(),
	}

	// Perform the update operation
	result := db.Model(&models.Tile{}).Where("id = ? AND status = ?", ID, 1).Updates(update)

	// Check for errors
	if result.Error != nil {
		response.Message = "Failed to delete Tile"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Check if any rows were affected
	if result.RowsAffected == 0 {
		response.Message = "No active Tile found with the given ID"
		response.Code = http.StatusNotFound
		return response
	}

	// Successful update
	response.Message = "Tile deleted successfully"
	response.Code = http.StatusOK
	return response
}

// this function updates layout(postion) of all tiles of dashboards- after some time this fun
func UpdateTiles(tilepayloads []models.Tile, loggeduser models.User) models.Response {
	var response models.Response
	db := database.DB

	for _, tilepayload := range tilepayloads {
		// var tile models.Tile
		updatefields := make(map[string]interface{})

		if tilepayload.Name != "" {
			updatefields["Name"] = tilepayload.Name
		}

		if tilepayload.Type != "" {
			updatefields["Type"] = tilepayload.Type
		}

		if len(tilepayload.Configs) > 0 && string(tilepayload.Configs) != "null" {
			updatefields["Configs"] = tilepayload.Configs
		}

		if len(tilepayload.Layout) > 0 && string(tilepayload.Layout) != "null" {
			updatefields["Layout"] = tilepayload.Layout
		}
		if len(tilepayload.Styles) > 0 && string(tilepayload.Styles) != "null" {
			updatefields["Styles"] = tilepayload.Styles
		}

		if len(updatefields) > 0 {
			updatefields["LastModifiedBy"] = loggeduser.ID

			if err := db.Model(&models.Tile{}).Where("ID = ? AND status = ?", tilepayload.ID, 1).Updates(updatefields).Error; err != nil {
				response.Message = "failed to update Tile"
				response.Code = http.StatusInternalServerError
				return response
			}
		}
	}
	response.Message = "Tile Updatd Succesfully"
	response.Code = http.StatusOK
	return response
}
func CreateTileLoc(requestData *models.Dashboard, users *models.User) models.Response {
	var response models.Response
	var dashboard models.Dashboard
	// updatefields := make(map[string]interface{})
	// Create a connection with the database
	db := database.DB

	// Fetch the existing dashboard
	if err := db.Where("id = ?", requestData.ID).Take(&dashboard).Error; err != nil {
		log.Println("Error in fetching dashboard ID:", err)
		response.Message = "Unable to fetch dashboard ID"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Update the existing dashboard's configs
	// dashboard.Configs = requestData.Configs
	updatefields := map[string]interface{}{
		"Configs":  requestData.Configs,
	}
	// updatefields["Configs"] = requestData.Configs

	// // Save the updated record
	// if err := db.Save(&dashboard).Error; err != nil {
	// 	log.Println("Error updating dashboard configs:", err)
	// 	response.Message = "Unable to update dashboard configs"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	

	if err := db.Model(&models.Dashboard{}).Where("ID = ? AND status = ?", requestData.ID, 1).Updates(updatefields).Error; err != nil {
		response.Message = "failed to update Tile"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = fmt.Sprintf("Dashboard updated successfully with ID %d", dashboard.ID)
	response.Code = http.StatusOK
	response.Data = dashboard.ID
	return response
}
