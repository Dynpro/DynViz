package variables

import (
	// "DynViz/internal/connectors"
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/utils"
	"strings"

	// "DynViz/utils"

	// "strings"

	// "DynViz/pkg/set"
	"errors"
	"fmt"
	"log"
	"net/http"

	// "time"

	// "regexp"
	"gorm.io/gorm"
)

func VerifyVar(name string, db *gorm.DB, orgID, connectionID int, setID int) bool {
	var count int64
	// Query to check if a record exists
	db.Model(&models.Variables{}).Where("name = ? AND organization_id = ? AND connection_id = ? AND status = ?", name, orgID, connectionID, 1).Count(&count)
	return count > 0
}
func CreateVariables(requestData *models.Variables, users *models.User) models.Response {
	var response models.Response
	var set models.Set
	var schemaNames models.SchemaName
	var tableNames []models.TableName
	// fmt.Println(requestData.SetID)
	// Create a connection with the database
	db := database.DB

	// Check for existing variable name
	// if VerifyVar(requestData.Name, db, users.OrganizationID, requestData.ConnectionID, requestData.ID) {
	// 	response.Message = "Variable with the same name already exists"
	// 	response.Code = http.StatusNotAcceptable
	// 	return response
	// }

	// Dynamically generate the table name based on the OrganizationID
	tableName := fmt.Sprintf("org_tables.table_names_%d", users.OrganizationID)
	schemaName := fmt.Sprintf("org_tables.schema_names_%d", users.OrganizationID)
	// // Fetch the set and preload the related schema and table names
	// err := db.Preload("schema_names_%d",users.OrganizationID).Where("id = ? AND status = ?", requestData.SetID, 1).First(&set).Error
	// if err != nil {
	// 	response.Message = "Failed to find Set"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }
	// fmt.Println(set)
	// Fetch table names associated with the schema_id
	err := db.Table("sets").Where("id = ? AND status = ?", requestData.SetID, 1).Find(&set).Error
	if err != nil {
		response.Message = "Failed to find set"
		response.Code = http.StatusInternalServerError
		return response
	}
	// Fetch table names associated with the schema_id
	err = db.Table(tableName).Where("schema_id = ?", set.SchemaID).Find(&tableNames).Error
	if err != nil {
		response.Message = "Failed to find table names"
		response.Code = http.StatusInternalServerError
		return response
	}
	err = db.Table(schemaName).Where("id = ?", set.SchemaID).Find(&schemaNames).Error
	if err != nil {
		response.Message = "Failed to find table names"
		response.Code = http.StatusInternalServerError
		return response
	}
	// fmt.Println("aa")
	// fmt.Println(tableNames)
	SN := schemaNames.Name
	// Loop through table names and create a new record for each
	for _, table := range tableNames {
		// Generate the $(table_name) format for variable names
		// varName := table.Name
		tableid := table.ID
		// Construct the query for each table
		query := fmt.Sprintf("SELECT * FROM %s.%s", SN, table.Name)
		// Query, err := utils.EncryptAES(query)
		// if err != nil {
		// 	log.Println("Error encrypting  query:", err)

		// }
		fmt.Println(query)
		// Create a new record for the variable
		payload := models.Variables{
			Name:           fmt.Sprintf("$(%s)", table.Name),
			SetID:          requestData.SetID,
			TableID:        tableid,
			ConnectionID:   requestData.ConnectionID,
			OrganizationID: users.OrganizationID,
			Query:          query,
			Is_Custom:      requestData.Is_Custom,
			CreatedByID:    users.ID,
			LastModifiedBy: users.ID,
		}

		// Insert the variable record into the database
		if err := db.Create(&payload).Error; err != nil {
			log.Println("Error creating variable for table:", table.Name, "Error:", err)
			response.Message = "Failed to create some variables"
			response.Code = http.StatusInternalServerError
			return response
		}
	}

	// Construct the success response
	response.Message = "Variables created successfully for all tables"
	response.Data = tableNames // Include table names in response if needed
	response.Code = http.StatusCreated
	return response
}

func UpdateVariables(ID int, requestData *models.Variables, user models.User) models.Response {

	// log.Println("in set pkg update")
	var response models.Response

	// Create a connection with the database
	db := database.DB
	var schema_names models.SchemaName

	// Dynamically generate the table name based on the OrganizationID
	tableName := fmt.Sprintf("org_tables.table_names_%d", user.OrganizationID)

	log.Println(tableName)

	// Check if the TableID exists in the dynamically generated table
	if err := db.Table(tableName).Where("id = ?", requestData.TableID).Take(&schema_names).Error; err != nil {
		log.Println("Error finding table ID in table:", tableName, "Error:", err)
		response.Message = "Invalid table ID"
		response.Code = http.StatusBadRequest
		return response
	}

	// Fetch the Set record to be updated
	var Variable models.Variables
	if err := db.Where("id = ?", ID).First(&Variable).Error; err != nil {
		log.Println("Error fetching variable:", err)
		response.Message = "Unable to fetch variable"
		response.Code = http.StatusInternalServerError
		return response
	}

	if VerifyVar(requestData.Name, db, user.OrganizationID, Variable.ConnectionID, requestData.ID) {
		response.Message = "variable with the same name already exists"
		response.Code = http.StatusNotAcceptable
		return response
	}
	// Query, err := utils.EncryptAES(requestData.Query)
	// if err != nil {
	// 	log.Println("Error encrypting  query:", err)

	// }
	varName := fmt.Sprintf("$(%s)", requestData.Name)

	// Update the Set fields
	updateddata := map[string]interface{}{
		"Name":           varName,
		"TableID":        requestData.TableID,
		"Query":          requestData.Query,
		"Is_Custom":      requestData.Is_Custom,
		"LastModifiedBy": user.ID,
	}

	if err := db.Model(&Variable).Where("id = ?", ID).Updates(updateddata).Error; err != nil {
		log.Println("Error update variable:", err)
		response.Message = "Unable to update variable"
		response.Code = http.StatusInternalServerError
		return response
	}
	// // Update the Set fields
	// Variable.Name = varName
	// Variable.TableID = requestData.TableID
	// Variable.Query = requestData.Query
	// Variable.Is_Custom = requestData.Is_Custom
	// Variable.LastModifiedBy = user.ID
	// // Save the delete set record
	// if err := db.Save(&Variable).Error; err != nil {
	// 	log.Println("Error update variable:", err)
	// 	response.Message = "Unable to update variable"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }
	// fmt.Println("a")

	response.Message = fmt.Sprintf("Variable updated successfully with ID %d", Variable.ID)
	response.Code = http.StatusOK
	return response
}

func DeleteVariables(ID int, user models.User) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB
	// var schema_names models.SchemaName
	// // Dynamically generate the table name based on the OrganizationID
	// tableName := fmt.Sprintf("org_tables.schema_names_%d", user.OrganizationID)

	// // Check if the SchemaID exists in the dynamically generated table
	// if err := db.Table(tableName).Where("id = ?", ID).First(schema_names).Error; err != nil {
	// 	log.Println("Error finding Schema ID in table:", tableName, "Error:", err)
	// 	response.Message = "Invalid Schema ID"
	// 	response.Code = http.StatusBadRequest
	// 	return response
	// }

	// Fetch the variable record to be deleted
	var Variable models.Variables
	if err := db.Where("id = ?", ID).First(&Variable).Error; err != nil {
		log.Println("Error fetching Variable:", err)
		response.Message = "Unable to fetch Variable"
		response.Code = http.StatusInternalServerError
		return response
	}


	updateddata := map[string]interface{}{
		"Status":         0,
		"DeactivateByID": user.ID,
		// "DeactivateDate": time.Now(),
	}

	if err := db.Model(&Variable).Where("id = ?", ID).Updates(updateddata).Error; err != nil {
		log.Println("Error deleting Variable:", err)
		response.Message = "Unable to delete Variable"
		response.Code = http.StatusInternalServerError
		return response
	
	}
	// Update the CommonMenu fields
	// Variable.Status = 0
	// Variable.DeactivateByID = user.ID

	// // Save the delete variable record
	// if err := db.Save(&Variable).Error; err != nil {
	// 	log.Println("Error deleting Variable:", err)
	// 	response.Message = "Unable to delete Variable"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	response.Message = "Variable deactivated successfully"
	response.Code = http.StatusOK
	return response
}
func GetVariables(ID int) (models.VarRes, error) {
	var variable models.Variables
	var response models.VarRes

	// Establish a connection with the database
	db := database.DB

	// Fetch the variable by ID and ensure it is active (status = 1)
	err := db.Where("id = ? AND status = ?", ID, 1).Take(&variable).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("Variable with ID %d not found or inactive: %v", ID, err)
			return response, fmt.Errorf("variable not found or inactive")
		}
		log.Printf("Error fetching Variable with ID %d: %v", ID, err)
		return response, fmt.Errorf("error fetching variable: %v", err)
	}

	// Map the `Variables` model to the `VarRes` model
	response = models.VarRes{
		ID:               variable.ID,
		Name:             variable.Name,
		SetID:            variable.SetID,
		TableID:          variable.TableID,
		ConnectionID:     variable.ConnectionID,
		Query:            variable.Query,
		Is_Custom:        variable.Is_Custom,
		Is_Found:         variable.Is_Found,
		Status:           variable.Status,
		Is_mapped:        variable.Is_mapped,
		OrganizationID:   variable.OrganizationID,
		CreatedByID:      variable.CreatedByID,
		CreatedDate:      variable.CreatedDate,
		LastModifiedBy:   variable.LastModifiedBy,
		LastModifiedDate: variable.LastModifiedDate,
		DeactivateByID:   variable.DeactivateByID,
		DeactivateDate:   variable.DeactivateDate,
	}

	return response, nil
}

func GetAllVariables(SetID int, user models.User) models.Response {
	var variables []models.Variables
	var response models.Response
	var result []models.VarRes

	// Establish a connection with the database
	db := database.DB

	// Fetch all active variables for the given organization ID
	err := db.Where("set_id=? AND status = ? AND organization_id = ?", SetID, 1, user.OrganizationID).Find(&variables).Error
	if err != nil {
		log.Printf("Error fetching Variables for organization ID %d: %v", user.OrganizationID, err)
		response.Message = "Failed to fetch Variables"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Map the fetched `Variables` to `VarRes`
	for _, variable := range variables {
		result = append(result, models.VarRes{
			ID:               variable.ID,
			Name:             variable.Name,
			SetID:            variable.SetID,
			TableID:          variable.TableID,
			ConnectionID:     variable.ConnectionID,
			Query:            variable.Query,
			Is_Custom:        variable.Is_Custom,
			Is_Found:         variable.Is_Found,
			Status:           variable.Status,
			Is_mapped:        variable.Is_mapped,
			OrganizationID:   variable.OrganizationID,
			CreatedByID:      variable.CreatedByID,
			CreatedDate:      variable.CreatedDate,
			LastModifiedBy:   variable.LastModifiedBy,
			LastModifiedDate: variable.LastModifiedDate,
			DeactivateByID:   variable.DeactivateByID,
			DeactivateDate:   variable.DeactivateDate,
		})
	}

	// Build the response
	response.Message = "Variables data fetched successfully"
	response.Data = result
	response.Code = http.StatusOK
	response.Total = len(result)

	return response
}

// cell-query----->compiler func(read karega and search karega regex of [$()] )-if yes then find the variable query
//    -if no then run the query as it is(--Optional--)

func FindVar(name string, db *gorm.DB, setID int) (string, error) {
	var Variable models.Variables

	log.Println("Finding variable:", name)

	query := db.Select("query").Where("name = ? AND status = ? AND set_id = ?", name, 1, setID).First(&Variable)

	if query.Error != nil {
		return "", query.Error
	}
	return Variable.Query, nil

}
func VariableCompiler(query string, setID int) (string, error) {
	db := database.GetPostgresDBConnection()

	log.Println(query)

	matches := utils.FindOccurrences(query)

	if len(matches) == 0 {
		return query, nil
	}

	for _, match := range matches {
		s, err := FindVar(match, db, setID)
		if err != nil {
			log.Printf("Error finding variable %s: %v", s, err)
			return query, err
		}
		query = strings.Replace(query, match, "("+s+")", 1)
	}

	return VariableCompiler(query, setID)
}
func GetVariablesBySetID(setID int, user models.User) models.Response {
	var variables []models.Variables
	var response models.Response
	var result []models.VarRes

	// Establish a connection with the database
	db := database.DB

	// Fetch all active variables for the given SetID and OrganizationID
	err := db.Where("set_id = ? AND status = ? AND organization_id = ?", setID, 1, user.OrganizationID).Find(&variables).Error
	if err != nil {
		log.Printf("Error fetching Variables for SetID %d and OrganizationID %d: %v", setID, user.OrganizationID, err)
		response.Message = "Failed to fetch Variables"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Map the fetched `Variables` to `VarRes`
	for _, variable := range variables {
		result = append(result, models.VarRes{
			ID:               variable.ID,
			Name:             variable.Name,
			SetID:            variable.SetID,
			TableID:          variable.TableID,
			ConnectionID:     variable.ConnectionID,
			Query:            variable.Query,
			Is_Custom:        variable.Is_Custom,
			Is_Found:         variable.Is_Found,
			Status:           variable.Status,
			Is_mapped:        variable.Is_mapped,
			OrganizationID:   variable.OrganizationID,
			CreatedByID:      variable.CreatedByID,
			CreatedDate:      variable.CreatedDate,
			LastModifiedBy:   variable.LastModifiedBy,
			LastModifiedDate: variable.LastModifiedDate,
			DeactivateByID:   variable.DeactivateByID,
			DeactivateDate:   variable.DeactivateDate,
		})
	}

	// Build the response
	response.Message = "Variables fetched successfully"
	response.Data = result
	response.Code = http.StatusOK
	response.Total = len(result)

	return response
}
