package querymaster

import (
	"DynViz/internal/connectors"
	"DynViz/internal/database"
	"DynViz/models"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	// "regexp"
	"gorm.io/gorm"
)

func CreateQuery(requestData *models.QueryMaster, users *models.User) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Check if the ConnectionMasterID exists
	var connectionMaster models.ConnectionMaster
	if err := db.Where("id = ?", requestData.ConnectionMasterID).First(&connectionMaster).Error; err != nil {
		log.Println("Error finding Query master ID:", err)
		response.Message = "Invalid Query Master ID"
		response.Code = http.StatusBadRequest
		return response
	}

	// Create a new query record
	query := models.QueryMaster{
		SchemaQuery:        requestData.SchemaQuery,
		TableQuery:         requestData.TableQuery,
		ColumnQuery:        requestData.ColumnQuery,
		ConnectionMasterID: requestData.ConnectionMasterID,
		Description:        requestData.Description,
		DBType:             requestData.DBType,
		LastModifiedBy:     users.ID,
	}

	// Insert the query record into the database
	if err := db.Create(&query).Error; err != nil {
		log.Println("Error creating query:", err)
		response.Message = "Unable to create query"
		response.Code = http.StatusInternalServerError
		return response
	}
	response.Message = "Query created successfully"
	response.Code = http.StatusCreated
	return response
}

func UpdateQuery(ID int, requestData *models.QueryMaster, userID int) models.Response {

	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the query record to be updated
	var QueryMaster models.QueryMaster

	if err := db.Where("id = ?", ID).First(&QueryMaster).Error; err != nil {
		log.Println("Error fetching query:", err)
		response.Message = "Unable to fetch query"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Update the query fields
	QueryMaster.SchemaQuery = requestData.SchemaQuery
	QueryMaster.TableQuery = requestData.TableQuery
	QueryMaster.ColumnQuery = requestData.ColumnQuery
	QueryMaster.DBType = requestData.DBType
	QueryMaster.Description = requestData.Description
	QueryMaster.ConnectionMasterID = requestData.ConnectionMasterID
	QueryMaster.LastModifiedBy = userID

	// Save the updated query record
	if err := db.Model(&QueryMaster).Where("id = ?", ID).Updates(map[string]interface{}{
		"SchemaQuery":        requestData.SchemaQuery,
		"TableQuery":         requestData.TableQuery,
		"ColumnQuery":        requestData.ColumnQuery,
		"DBType":             requestData.DBType,
		"Description":        requestData.Description,
		"ConnectionMasterID": requestData.ConnectionMasterID,
		"LastModifiedBy":     userID,
	}).Error; err != nil {
		log.Println("Error updating query:", err)
		response.Message = "Unable to update query"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = "query updated successfully"
	response.Code = http.StatusOK
	return response
}

func DeleteQuery(ID int, userID int) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the query record to be updated
	var QueryMaster models.QueryMaster
	if err := db.Where("id = ?", ID).First(&QueryMaster).Error; err != nil {
		log.Println("Error fetching query:", err)
		response.Message = "Unable to fetch query"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Update the query fields

	QueryMaster.Status = 0
	QueryMaster.DeactivateByID = userID

	// Save the updated query record
	if err := db.Model(&QueryMaster).Where("id = ?", ID).Update("status", 0).Error; err != nil {
		log.Println("Error deleting query:", err)
		response.Message = "Unable to delete query"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = "query deleted successfully"
	response.Code = http.StatusOK
	return response
}

func GetQuery(ID int) (models.QueryMaster, error) {

	var QueryMaster models.QueryMaster

	db := database.DB

	// Fetch the connection by ID and ensure it is active
	if err := db.Where("id = ? AND status = ?", ID, 1).First(&QueryMaster).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("Record not found:", err)
			return QueryMaster, err
		} else {
			fmt.Println("Error fetching query:", err)
			return QueryMaster, err
		}
	}

	return QueryMaster, nil
}

func GetAllQueries() models.Response {
	var QueryMaster []models.QueryMaster
	var response models.Response

	// creating connection with database
	db := database.DB

	// Query the database for querys with specific organization ID and active status
	if err := db.Where(" status = ?", 1).Find(&QueryMaster).Error; err != nil {
		response.Message = "Failed to find querys"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = "querys data fetched successfully"

	response.Data = QueryMaster
	response.Code = http.StatusOK
	response.Total = len(QueryMaster)
	return response
}

// TileQuery is the function for executing a query
func TileQuery(req models.QueryRequest, connectionID int) (models.QueryResponse, error) {
	var response models.QueryResponse

	// Check if connectionID is -1 and skip all operations
	if connectionID == -1 {
		response.Columns = []string{"static value"}  // Set Columns to a slice containing "static value"
		response.Rows = [][]interface{}{{req.Query}} // Set Rows to a slice containing the query string
		return response, nil
	}

	// Proceed with normal operations if connectionID is not -1
	db := connectors.GetDBConnection(connectionID)
	if db == nil {
		return models.QueryResponse{}, fmt.Errorf("database connection for connectionID %d is nil", connectionID)
	}

	rows, err := db.Query(req.Query)
	if err != nil {
		return models.QueryResponse{}, fmt.Errorf("error executing query: %v", err)
	}

	columns, err := rows.Columns()
	if err != nil {
		return models.QueryResponse{}, fmt.Errorf("error fetching columns: %v", err)
	}
	// fmt.Println(rows.ColumnTypes())
	columnTypes, err := rows.ColumnTypes()
	if err != nil {
		return models.QueryResponse{}, fmt.Errorf("error fetching column types: %v", err)
	}

	// Determine the data types of the columns
	columnTypeMap := make(map[string]string)
	for _, colType := range columnTypes {
		columnTypeMap[colType.Name()] = colType.DatabaseTypeName()
	}

	response.Columns = columns

	// Iterate through the result set and process the first 10 rows
	rowCount := 0
	for rows.Next() {
		if rowCount >= 10 {
			break
		}
		rowCount++

		columnValues := make([]interface{}, len(columns))
		columnPointers := make([]interface{}, len(columns))
		for i := range columnValues {
			columnPointers[i] = &columnValues[i]
		}

		if err := rows.Scan(columnPointers...); err != nil {
			return models.QueryResponse{}, fmt.Errorf("error scanning row: %v", err)
		}

		// Format timestamp columns
		for i, colName := range columns {
			if isTimestamp(columnTypeMap[colName]) {
				switch v := columnValues[i].(type) {
				case time.Time:
					columnValues[i] = v.Format("2006-01-02")
				case string:
					if len(v) >= 10 {
						columnValues[i] = v[:10] // Strip to "YYYY-MM-DD"
					}
				}
			}
		}

		response.Rows = append(response.Rows, columnValues)
	}

	if err := rows.Err(); err != nil {
		return models.QueryResponse{}, fmt.Errorf("error processing rows: %v", err)
	}

	return response, nil
}

// isTimestamp checks if the given column type is a timestamp
func isTimestamp(columnType string) bool {
	// fmt.Println(columnType)
	return columnType == "DATE" || columnType == "TIMESTAMP_NTZ" || columnType == "TIMESTAMP_LTZ" || columnType == "TIMESTAMP_TZ"
}
