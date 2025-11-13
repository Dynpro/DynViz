package connections

import (
	"DynViz/internal/connectors"
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/utils"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

func CreateConn(requestData *models.Connection, email string) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch user details based on email
	var user models.User
	if err := db.Where("email = ? AND status = ?", email, 1).First(&user).Error; err != nil {
		log.Println("Error fetching user details:", err)
		response.Message = "Unable to fetch user details"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Convert the JSON connection parameters to bytes
	connectionParamsBytes, err := json.Marshal(requestData.Params)
	if err != nil {
		log.Println("Error marshaling connection parameters:", err)
		response.Message = "Unable to create connection"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Create a new connection instance
	conn := models.Connection{
		Name:           requestData.Name,
		OrganizationID: user.OrganizationID,
		DBType:         requestData.DBType,
		Params:         connectionParamsBytes, // Assign marshaled JSON bytes

		ConnectionMasterID: requestData.ConnectionMasterID,

		CreatedByID:    user.ID,
		LastModifiedBy: user.ID,
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

func UpdateConn(requestData *models.Connection, ID int) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch user details based on email

	// Fetch the existing connection
	var conn models.Connection
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

	// Update the fields with the new data using updates
	updates := map[string]interface{}{
		"Name":           requestData.Name,
		"DBType":         requestData.DBType,
		"Params":         connectionParamsBytes, // Assign marshaled JSON bytes
		"LastModifiedBy": ID,
	}
	if err := db.Model(&conn).Where("id = ?", requestData.ID).Updates(updates).Error; err != nil {
		log.Println("Error updating connection:", err)
		response.Message = "Unable to update connection"
		response.Code = http.StatusInternalServerError
		return response
	}
	// // Update the fields with the new data
	// if requestData.Name != "" {
	// 	conn.Name = requestData.Name
	// }

	// if len(requestData.Params) > 0 {
	// 	conn.Params = connectionParamsBytes
	// }

	// conn.LastModifiedBy = ID

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

func GetConn(ID int) models.Response {
	var conn models.Connection // Use a singular model instance since you are fetching by ID
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the connection by ID and ensure it is active
	if err := db.Where("id = ? AND status = ?", ID, 1).First(&conn).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "ID not present"
			response.Code = http.StatusNotFound
		} else {
			fmt.Println("Error fetching connection:", err)
			response.Message = "Failed to fetch connection data"
			response.Code = http.StatusInternalServerError
		}
		return response
	}

	// Set response data
	response.Message = "Connection fetched successfully"
	response.Data = conn
	response.Code = http.StatusOK
	return response
}

func GetAllDefaultConnections() models.Response {
	var connection_name []string
	var response models.Response

	// creating connection with database
	db := database.DB

	// Query the database for all country details
	if err := db.Table("connection_masters").Pluck("name", &connection_name).Where("status = ?", 1).Error; err != nil {
		response.Message = "Failed to fetch connection data"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Construct the response
	response.Message = "Data fetched successfully"
	response.Data = connection_name
	response.Code = http.StatusOK
	return response
}

func GetAllConnections(ID int) models.Response {
	var connection []models.Connection // Use a singular model instance since you are fetching by ID
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the connection by ID and ensure it is active
	if err := db.Where("organization_id = ? AND status = ?", ID, 1).Find(&connection).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "Connection not found"
			response.Code = http.StatusNotFound
		} else {
			fmt.Println("Error fetching connection:", err)
			response.Message = "Failed to fetch connection"
			response.Code = http.StatusInternalServerError
		}
		return response
	}

	// Set response data
	response.Message = string(rune(len(connection))) + " Connections fetched successfully"
	response.Data = connection
	response.Code = http.StatusOK
	return response
}

func GetConnectionMaster(ID int) (models.ConnectionMaster, error) {

	var connection models.ConnectionMaster

	db := database.DB

	// Fetch the connection by ID and ensure it is active
	if err := db.Where("id = ? AND status = ?", ID, 1).First(&connection).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("Record not found:", err)
			return connection, err
		} else {
			fmt.Println("Error fetching connection:", err)
			return connection, err
		}
	}

	return connection, nil
}

func GetAllConnectionsMaster() models.Response {
	var connections []models.ConnectionMaster
	var response models.Response

	// creating connection with database
	db := database.DB

	// Query the database for all country details
	if err := db.Find(&connections).Where("status = ?", 1).Error; err != nil {
		response.Message = "Failed to connections"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Construct the response
	response.Code = http.StatusOK
	response.Data = connections
	response.Message = string(rune(len(connections))) + " connections fetched successfully!"
	return response
}

func CheckConnection(ID int) models.Response {

	var response models.Response

	err := connectors.DBConnections[ID].Ping()
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = fmt.Sprintf("Error pinging %d: %v\n", ID, err)

	} else {

		response.Code = http.StatusOK
		response.Message = fmt.Sprintf("%d connection is alive.\n", ID)
	}

	return response
}

func CreateConnection(connection *models.Connection) (models.Connection, error) {

	// var response models.Response

	// set organization details

	// set time

	db := database.DB
	if err := db.Create(&connection).Error; err != nil {

		log.Println(err)
		log.Println("Unable to create connection")

		return *connection, err
	} else {

		log.Printf("Connection : %s (%d) created successfully!", connection.Name, connection.ID)

		return *connection, nil
	}

}

func DeleteConnection(connectionID int, ID int) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the existing connection
	var conn models.Connection
	if err := db.First(&conn, connectionID).Where("status = ?", 1).Error; err != nil {
		log.Println("Error fetching connection:", err)
		response.Message = "Connection not found"
		response.Code = http.StatusNotFound
		return response
	}

	// conn.Status = 0
	// conn.DeactivateByID = ID
	// conn.DeactivateDate = time.Now()

	updatedData := map[string]interface{}{
		"Status":         0,
		"DeactivateByID": ID,
		"DeactivateDate": time.Now(),
	}

	// Update the connection in the database
	if err := db.Model(&conn).Where("id = ?", connectionID).Updates(updatedData).Error; err != nil {
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

	response.Message = "Connection  deleted  successfully"
	response.Data = conn
	response.Code = http.StatusOK
	return response
}

// DeleteConn deletes a connection from the database.
func DeleteConn(connectionID int) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the existing connection
	var conn models.Connection
	if err := db.First(&conn, connectionID).Where("status = ?").Error; err != nil {
		log.Println("Error fetching connection:", err)
		response.Message = "Connection not found"
		response.Code = http.StatusNotFound
		return response
	}

	// Delete the connection from the database
	if err := db.Delete(&conn).Where("status = ?", 1).Error; err != nil {
		log.Println("Error deleting connection:", err)
		response.Message = "Unable to delete connection"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = "Invalid connection"
	response.Data = conn
	response.Code = http.StatusOK
	return response
}

//--------------------------------------------------------------------------------------------------------------------------

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

	// Update the fields with the new data using updates
	updates := map[string]interface{}{
		"Name":           requestData.Name,
		"DBType":         requestData.DBType,
		"Params":         connectionParamsBytes, // Assign marshaled JSON bytes
		"LastModifiedBy": userID,
	}
	// if requestData.Name != "" {
	// 	conn.Name = requestData.Name
	// }

	// if len(requestData.Params) > 0 {
	// 	conn.Params = connectionParamsBytes
	// }

	// conn.LastModifiedBy = userID

	// Update the connection in the database
	if err := db.Model(&conn).Where("id = ?", requestData.ID).Updates(updates).Error; err != nil {
		log.Println("Error updating connection:", err)
		response.Message = "Unable to update connection"
		response.Code = http.StatusInternalServerError
		return response
	}
	// // Save the updated connection to the database
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

func ProcessFileAndStoreInDB(filename string, fileUpload models.FileUpload, user models.User, Organization models.Organization, connectionID int) models.Response {

	db := database.DB

	var response models.Response
	// Open the file for reading
	file, err := os.Open(fileUpload.FileURL)
	if err != nil {
		log.Println("error opening file: %v", err)
		response.Message = "Unable to create connection"
		response.Code = http.StatusInternalServerError
		return response
	}
	defer file.Close()

	// Detect file type based on extension
	ext := strings.ToLower(filepath.Ext(fileUpload.FileURL))

	var headers []string
	var records [][]string

	switch ext {
	case ".csv":
		headers, records, err = utils.ParseCSV(file)
		if err != nil {
			log.Printf("error parsing CSV: %v", err)
			response.Message = "Unable to create connection"
			response.Code = http.StatusInternalServerError
			return response
		}
	case ".xlsx":
		headers, records, err = utils.ParseExcel(fileUpload.FileURL)
		if err != nil {
			log.Printf("error parsing Excel: %v", err)
			response.Message = "Unable to create connection"
			response.Code = http.StatusInternalServerError
			return response
		}
	default:
		response.Message = "Unsupported file type"
		response.Code = http.StatusBadRequest
		return response
	}

	// Handle duplicate headers by renaming them dynamically
	headerCount := make(map[string]int)
	uniqueHeaders := make([]string, len(headers))

	for i, header := range headers {
		normalizedHeader := strings.ToUpper(header) // Normalize to avoid case-sensitive issues

		if count, exists := headerCount[normalizedHeader]; exists {
			// Rename duplicate by appending an index
			newHeader := fmt.Sprintf("%s_%d", header, count+1)
			uniqueHeaders[i] = newHeader
			headerCount[normalizedHeader]++ // Increment the count
		} else {
			uniqueHeaders[i] = header
			headerCount[normalizedHeader] = 1
		}
	}

	headers = uniqueHeaders // Use renamed headers

	fileconn := models.FileUpload{
		Name:               filename,
		OrganizationID:     user.OrganizationID,
		OrganizationName:   Organization.Name,
		FileURL:            fileUpload.FileURL,
		ConnectionMasterID: connectionID,

		CreatedByID:    user.ID,
		LastModifiedBy: user.ID,
	}

	if err := db.Create(&fileconn).Error; err != nil {
		log.Println("Error creating connection:", err)
		response.Message = "Unable to create connection"
		response.Code = http.StatusInternalServerError
		return response
	}

	schemaName := fmt.Sprintf("org_%s", Organization.Name)
	tableName := pq.QuoteIdentifier(fileconn.Name)

	createSchemaQuery := fmt.Sprintf(`CREATE SCHEMA IF NOT EXISTS %s;`, pq.QuoteIdentifier(schemaName))
	if err := db.Exec(createSchemaQuery).Error; err != nil {
		log.Printf("Error creating schema: %v", err)
		response.Message = "Unable to create schema"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Build the CREATE TABLE statement
	columnDefinitions := make([]string, len(headers))
	for i, header := range headers {
		// Default to TEXT data type; enhance this by analyzing the content for more appropriate types
		columnDefinitions[i] = fmt.Sprintf("%s TEXT", pq.QuoteIdentifier(header))
	}

	createTableQuery := fmt.Sprintf(`
		CREATE TABLE IF NOT EXISTS %s.%s(%s);
	`, pq.QuoteIdentifier(schemaName), tableName, strings.Join(columnDefinitions, ", "))

	if err := db.Exec(createTableQuery).Error; err != nil {
		log.Printf("Error creating table: %v", err)
		response.Message = "Unable to create table"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Prepare the INSERT statement with dynamic columns
	quotedHeaders := make([]string, len(headers))
	for i, header := range headers {
		quotedHeaders[i] = pq.QuoteIdentifier(header)
	}

	// Prepare the INSERT statement with dynamic columns
	insertQuery := fmt.Sprintf(`
    INSERT INTO %s.%s (%s) VALUES
	`, pq.QuoteIdentifier(schemaName), tableName, strings.Join(quotedHeaders, ", "))

	// Insert each row of the parsed file data
	for _, record := range records {
		// Add each record as a value in the INSERT statement
		values := make([]string, len(record))
		for i, value := range record {
			values[i] = fmt.Sprintf("'%s'", value) // Quote each value
		}

		// Build and execute the full insert query
		fullInsertQuery := insertQuery + fmt.Sprintf("(%s);", strings.Join(values, ", "))

		if err := db.Exec(fullInsertQuery).Error; err != nil {
			log.Printf("Error inserting data: %v", err)
			response.Message = "Unable to insert data"
			response.Code = http.StatusInternalServerError
			return response
		}
	}

	response.Message = "Connection created successfully"
	response.Data = fileconn
	response.Code = http.StatusCreated
	return response

}

func Connectioncreate(Connection_master_id int, file_name string, OrgID int, user models.User) (models.Response, error) {
	var response models.Response
	db := database.DB
	var conn models.Connection

	// Check if the connection exists and is active
	if err := db.Where("organization_id = ? AND status = ? AND name= ? ", OrgID, 1, file_name).First(&conn).Error; err != nil {
		log.Println("Error fetching connection:", err)
		response.Message = "Connection already exists"
		response.Code = http.StatusNotAcceptable
		return response, err // Return the error for further handling
	}

	// Prepare the connection parameters
	connectionParams := map[string]interface{}{
		"host":            os.Getenv("DB_HOST"),
		"port":            os.Getenv("DB_PORT"),
		"user":            os.Getenv("DB_USER"),
		"password":        os.Getenv("DB_PASSWORD"),
		"dbname":          os.Getenv("DB_NAME2"),
		"file_name":       file_name,
		"organization_id": OrgID,
	}

	// Marshal the parameters into JSON
	connectionParamsBytes, err := json.Marshal(connectionParams)
	if err != nil {
		log.Println("Error marshaling connection parameters:", err)
		response.Message = "Failed to create connection parameters"
		response.Code = http.StatusInternalServerError
		return response, err
	}

	// Create a new connection instance
	conne := models.Connection{
		Name:               file_name,
		OrganizationID:     OrgID,
		DBType:             "file",
		Params:             connectionParamsBytes, // Assign marshaled JSON bytes
		ConnectionMasterID: Connection_master_id,  // Use the ID of the fetched connection
		CreatedByID:        user.ID,
		LastModifiedBy:     user.ID,
	}

	// Call the CreateConnection function
	if _, err := CreateConnection(&conne); err != nil {
		log.Println("Error creating connection:", err)
		response.Message = "Failed to create connection"
		response.Code = http.StatusInternalServerError
		return response, err
	}

	response.Message = "Connection for file successfully created"
	response.Code = http.StatusOK
	return response, nil // Return nil error if successful
}
