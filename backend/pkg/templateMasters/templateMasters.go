package templatemasters

import (
	// "DynViz/internal/connectors"
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/templateDataBlockMaster"
	"DynViz/pkg/tile"

	// "encoding/json"
	"errors"
	"fmt"
	// "time"

	// "errors"
	// "fmt"
	"log"
	"net/http"

	"gorm.io/gorm"
)

func CreateTemplateMaster(templatemasterpayload *models.TemplateMasterPayload, loggeduser models.User) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	requestData := templatemasterpayload.Templatemaster
	// Convert the JSON connection parameters to bytes
	// TemplateParamsByte, err := json.Marshal(requestData.Configs)
	// if err != nil {
	// 	log.Println("Error marshaling connection parameters:", err)
	// 	response.Message = "Unable to create TemplateMaster"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	// Create a new connection instance
	templatemaster := models.TemplateMaster{
		Name: requestData.Name,
		// Height:         requestData.Height,
		// Width:          requestData.Width,
		Type:           requestData.Type,
		Layout:         requestData.Layout,
		Styles:         requestData.Styles,
		Configs:        requestData.Configs, // Assign marshaled JSON bytes
		CreatedByID:    loggeduser.ID,
		LastModifiedBy: loggeduser.ID,
	}

	// role.CheckUserAccess(menuID,user.ID)
	// Insert connection into the database
	if err := db.Create(&templatemaster).Error; err != nil {
		log.Println("Error creating TemplateMaster:", err)
		response.Message = "Unable to create TemplateMaster"
		response.Code = http.StatusInternalServerError
		return response
	}

	response = templateDataBlockMaster.CreateTemplateDataBlocks(templatemasterpayload.TDBM, loggeduser, templatemaster.ID)
	response.Message += "|Template Master created successfully"
	response.Data = templatemaster
	response.Code = http.StatusCreated
	return response
}

func UpdateTemplateMaster(requestData *models.TemplateMaster, userID int) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the existing connection
	var templateMaster models.TemplateMaster
	if err := db.First(&templateMaster, requestData.ID).Where("status = ?", 1).Error; err != nil {
		log.Println("Error fetching connection:", err)
		response.Message = "Connection not found"
		response.Code = http.StatusNotFound
		return response
	}

	// Convert the JSON connection parameters to bytes
	// TemplateParamsByte, err := json.Marshal(requestData.Configs)
	// if err != nil {
	//  log.Println("Error marshaling connection parameters:", err)
	//  response.Message = "Unable to update connection"
	//  response.Code = http.StatusInternalServerError
	//  return response
	// }

	// Update the fields with the new data
	updatefields := make(map[string]interface{})
	if requestData.Name != "" {
		updatefields["Name"] = requestData.Name
	}

	if len(requestData.Layout) > 0 && string(requestData.Layout) != "null" {
		updatefields["Layout"] = requestData.Layout
	}

	if len(requestData.Configs) > 0 && string(requestData.Configs) != "null" {
		updatefields["Layout"] = requestData.Layout
	}
	if len(requestData.Styles) > 0 && string(requestData.Styles) != "null" {
		updatefields["Layout"] = requestData.Layout
	}

	// if requestData.Width != "" {
	//  templateMaster.Width = requestData.Width
	// }
	// if requestData.Colour != "" {
	//  templateMaster.Colour = requestData.Colour
	// }

	if len(updatefields) > 0 {
		// templateMaster.Configs = TemplateParamsByte
		templateMaster.LastModifiedBy = userID

		if err := db.Model(&models.TemplateMaster{}).Where("ID = ? AND status = ?", requestData.ID, 1).Updates(updatefields).Error; err != nil {
			response.Message = "failed to update Tile"
			response.Code = http.StatusInternalServerError
			return response
		}

	}

	// templateMaster.LastModifiedBy = userID

	// Save the updated connection to the database
	// if err := db.Save(&templateMaster).Error; err != nil {
	//  log.Println("Error updating connection:", err)
	//  response.Message = "Unable to update connection"
	//  response.Code = http.StatusInternalServerError
	//  return response
	// }

	response.Message = "Template Master updated successfully"
	// response.Data = templateMaster
	response.Code = http.StatusOK
	return response
}

func DeleteTemplateMaster(requestData *models.TemplateMaster, userID int) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the existing connection
	var templateMaster models.TemplateMaster
	if err := db.First(&templateMaster, requestData.ID).Where("status = ?", 1).Error; err != nil {
		log.Println("Error fetching connection:", err)
		response.Message = "Connection not found"
		response.Code = http.StatusNotFound
		return response
	}

	updateddata := map[string]interface{}{
		"Status":         0,
	}

	// Update the connection in the database
	if err := db.Model(&templateMaster).Where("id = ?", requestData.ID).Updates(updateddata).Error; err != nil {
		log.Println("Error updating connection:", err)
		response.Message = "Unable to update connection"
		response.Code = http.StatusInternalServerError
		return response
	}
	// templateMaster.DeactivateByID = userID
	// deactivatedDate := time.Now()
	// templateMaster.DeactivateDate = &deactivatedDate
	// templateMaster.Status = 0

	// // Save the updated connection to the database
	// if err := db.Save(&templateMaster).Error; err != nil {
	// 	log.Println("Error updating connection:", err)
	// 	response.Message = "Unable to update connection"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	response.Message = "Template Master Deleted successfully"
	response.Data = templateMaster
	response.Code = http.StatusOK
	return response
}

func GetMasterTemplate(ID int, loggedUserID int) models.Response {
	// Write Code of GetTemplateMaster by id
	var templateMaster models.TemplateMaster
	var tdbm_res models.TemplateResponse
	var tdbm []models.TemplateDataBlockMaster
	var tdbmpartial []models.TDBMPartial
	var response models.Response
	db := database.DB

	// Fetch the Template by ID and ensure it is active
	if err := db.Where("id = ? AND status = ?", ID, 1).First(&templateMaster).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "Template not present"
			response.Code = http.StatusNotFound
			return response
		} else {
			fmt.Println("Error fetching Template:", err)
			response.Message = "Failed to fetch Template data"
			response.Code = http.StatusInternalServerError
			return response
		}
	}

	//template response code
	tdbm_res.TemplateMasterID = templateMaster.ID

	// Fetch the TDBM array by Template ID and ensure it is active
	if err := db.Preload("ChartMaster").Where("template_master_id  = ? AND status = ?", tdbm_res.TemplateMasterID, 1).Find(&tdbm).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "TDBM not present"
			response.Code = http.StatusNotFound
			return response
		} else {
			fmt.Println("Error fetching Template:", err)
			response.Message = "Failed to fetch TDBM data"
			response.Code = http.StatusInternalServerError
			return response
		}
	}
	// fmt.Println(tdbm)
	// marshal_tdbm, err := json.Marshal(tdbm)
	// if err != nil {

	// 	fmt.Println("Failed to serialize data in package")
	// }
	// // fmt.Println(marshal_tdbm)

	// Map the fetched data to the TDBMPartial struct and preload ChartMaster
	for _, tdb := range tdbm {
		var chartMaster models.ChartMaster
		if err := db.Model(&models.ChartMaster{}).Where("id = ?", tdb.ChartMasterID).First(&chartMaster).Error; err != nil {
			fmt.Println("Error preloading ChartMaster:", err)
			response.Message = "Failed to preload ChartMaster data"
			response.Code = http.StatusInternalServerError
			// return response
		}

		tdbmPartial := models.TDBMPartial{
			ID:               tdb.ID,
			TemplateMasterID: tdb.TemplateMasterID,
			ChartMasterID:    tdb.ChartMasterID,
			ChartMaster:      chartMaster,
			Configs:          tdb.Configs,
			// FontSize:         tdb.FontSize,
			// FontWeight:       tdb.FontWeight,
			// FontStyle:        tdb.FontStyle,
			// FontColor:        tdb.FontColor,
			// FontFamily:       tdb.FontFamily,
			// DefaultValue:     tdb.DefaultValue,
		}

		tdbmpartial = append(tdbmpartial, tdbmPartial)
	}

	tdbm_res.TDBMS = tdbmpartial
	// tdbm_res.TDBMS = tdbm
	// tdbm_res.TDBMS = marshal_tdbm

	// Set response data
	response.Message = "Template fetched successfully"
	response.Data = tdbm_res
	response.Code = http.StatusOK
	return response
}

func GetMasterTemplateTest(ID int, tiledbpayload models.Tiledatablockpayload, loggeduser models.User) models.Response {
	var TM models.TemplateMaster //templatemaster
	// var gettile models.Tile
	var response models.Response
	db := database.DB
	// var tdbm []models.TemplateDataBlockMaster
	var tiledbreqpayload models.TileRequestPayloadMaster

	//fetch template by ID to create tile
	if err := db.Where("id = ? AND status = ?", ID, 1).First(&TM).Error; err != nil {
		response.Message = "Failed to fetch template plase provide correct ID"
		response.Code = http.StatusNotFound
		return response
	}

	//fetch tdbm to create datablocks
	// if err := db.Where("template_master_id = ? AND status = ?", TM.ID, 1).Find(&tdbm).Error; err != nil {
	// 	response.Message = "Failed to fetch template plase provide correct ID"
	// 	response.Code = http.StatusNotFound
	// 	return response
	// }

	// var datablocks []models.DataBlockRequestPayload

	// Create a new Tile
	tiledbreqpayload.TileReqP.Name = TM.Name
	tiledbreqpayload.TileReqP.DashboardID = tiledbpayload.DashboardID // update
	tiledbreqpayload.TileReqP.TemplateMasterID = TM.ID
	// tiledbreqpayload.TileReqP.Height = 1
	// tiledbreqpayload.TileReqP.Width = 1
	tiledbreqpayload.TileReqP.Configs = TM.Configs
	tiledbreqpayload.TileReqP.Layout = TM.Layout
	tiledbreqpayload.TileReqP.Styles = TM.Styles
	tiledbreqpayload.TileReqP.Type = TM.Type

	_, tile := tile.CreateTileTest(tiledbreqpayload, loggeduser, tiledbpayload) //datablockspayload
	// response = tile.GetTile(tileID)
	//tile reponse payload begin
	tile_columns := "ID,Name,dashboard_id,template_master_id,type,configs,layout,styles,url"
	dblock_columns := "id,dashboard_id,name,tile_id,chart_master_id,template_data_block_master_id,configs,cell_id,data,styles,type"
	if err := db.Model(&models.Tile{}).Select(tile_columns).Preload("DataBlocks", func(db *gorm.DB) *gorm.DB {
		return db.Select(dblock_columns)
	}).Where("id = ? AND status = ?", tile.ID, 1).First(&tile).Error; err != nil {
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

	// Process each TemplateMaster and map TDBM to datablocks
	var formattedData []map[string]interface{}

	formattedTemplate := map[string]interface{}{
		"id":           tile.ID,
		"name":         tile.Name,
		"dashboard_id": tile.TemplateMasterID,
		"type":         tile.Type,
		"configs":      tile.Configs,
		"url":          tile.Url,
		"layout":       tile.Layout,
		"styles":       tile.Styles,
		"datablocks":   map[string]interface{}{}, // Initialize datablocks map
	}

	// Process each TDBM associated with the template
	for _, tdb := range tile.DataBlocks {
		// Assign the TDBM to the appropriate datablock by name (header, mainContent, etc.)
		if tdb.Type == "text" {
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

	response.Message = "tile created successfully"
	response.Code = http.StatusCreated
	response.Data = formattedData
	return response

}

// func GetAllTemplateMaster(templateType string) models.Response {
func GetAllTemplateMaster() models.Response {
	//Write Code of GetAllTemplateMaster
	var templateMasters []models.TemplateMaster
	var response models.Response
	db := database.DB
	// var IDs []map[string]interface{}

	// Fetch the connection by ID and ensure it is active
	// Use Select to specify fields to be fetched for TemplateMaster
	if err := db.Model(&models.TemplateMaster{}).Select("ID", "Name", "configs", "layout", "styles", "type").Preload("TDBM", func(db *gorm.DB) *gorm.DB {
		return db.Select("ID", "name", "template_master_id", "chart_master_id", "styles", "data", "configs", "type")
	}).Where("status = ?", 1).Find(&templateMasters).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "Template not present"
			response.Code = http.StatusNotFound
			return response
		} else {
			fmt.Println("Error fetching Template:", err)
			response.Message = "Failed to fetch Template data"
			response.Code = http.StatusInternalServerError
			return response
		}
	}
	if len(templateMasters) == 0 {
		response.Message = "No templates available"
		response.Data = templateMasters
		// response.Data = IDs
		response.Code = http.StatusOK
		return response
	}

	// Process each TemplateMaster and map TDBM to datablocks
	var formattedData []map[string]interface{}
	for _, tmpl := range templateMasters {
		formattedTemplate := map[string]interface{}{
			"id":         tmpl.ID,
			"layout":     tmpl.Layout,
			"styles":     tmpl.Styles,
			"datablocks": map[string]interface{}{}, // Initialize datablocks map
		}

		// Process each TDBM associated with the template
		for _, tdbm := range tmpl.TDBM {
			// Assign the TDBM to the appropriate datablock by name (header, mainContent, etc.)
			if tdbm.Type == "text" {
				formattedTemplate["datablocks"].(map[string]interface{})[tdbm.Name] = map[string]interface{}{
					"datablock_id": tdbm.ID,
					"styles":       tdbm.Styles,
					"data":         tdbm.Data,
					"configs":      tdbm.Configs,
					"type":         tdbm.Type,
				}
			} else {
				formattedTemplate["datablocks"].(map[string]interface{})[tdbm.Name] = map[string]interface{}{
					"datablock_id": tdbm.ID,
					"styles":       tdbm.Styles,
					"series":       tdbm.Data,
					"options":      tdbm.Configs,
					"type":         tdbm.Type,
				}
			}
		}

		// Append the formatted template to the list
		formattedData = append(formattedData, formattedTemplate)
	}

	// Set response data
	response.Message = "Template fetched successfully"
	// response.Data = templateMasters
	response.Data = formattedData
	response.Code = http.StatusOK
	return response
}

func GetTemplateByID(ID int) models.Response {
	var tdbm models.TemplateDataBlockMaster
	var response models.Response
	db := database.DB

	// Fetch the Template by ID and ensure it is active
	if err := db.Where("id = ? AND status = ?", ID, 1).First(&tdbm).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "Template not present"
			response.Code = http.StatusNotFound
			return response
		} else {
			fmt.Println("Error fetching Template:", err)
			response.Message = "Failed to fetch Template data"
			response.Code = http.StatusInternalServerError
			return response
		}
	}
	response.Data = tdbm
	response.Message = "Success"
	return response
}
