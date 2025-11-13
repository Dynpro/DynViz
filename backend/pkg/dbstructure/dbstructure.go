package dbstructure

import (
	"DynViz/internal/connectors"
	"DynViz/internal/database"
	"DynViz/models"
	"database/sql"

	// "errors"
	"fmt"
	"log"
	"strconv"

	// "log"

	"gorm.io/gorm"
)

type DatabaseStructure map[string]map[string][]string

// GetDBStructureSnowflake retrieves the database structure for Snowflake using database/sql
// func GetDBStructure(connectionID int) (*DatabaseStructure, error) {
// 	DB := connectors.GetDBConnection(connectionID)

// 	if DB == nil {
// 		return nil, fmt.Errorf("database connection for connectionID %d is nil", connectionID)
// 	}

// 	// Fetch the ConnectionMasterID for the given connectionID
// 	connectionMasterID, err := fetchConnectionMasterID(connectionID)
// 	if err != nil {
// 		return nil, fmt.Errorf("error fetching ConnectionMasterID: %v", err)
// 	}

// 	// Fetch the queries from the database using ConnectionMasterID
// 	queries, err := fetchQueries(connectionMasterID)
// 	if err != nil {
// 		return nil, fmt.Errorf("error fetching queries: %v", err)
// 	}

// 	structure := make(DatabaseStructure)

// 	// Use the fetched schema query
// 	rows, err := DB.Query(queries.SchemaQuery)
// 	if err != nil {
// 		return nil, fmt.Errorf("error fetching columns: %v", err)
// 	}
// 	defer rows.Close()

// 	var data []models.ColumnInfo

// 	for rows.Next() {
// 		var info models.ColumnInfo
// 		if err := rows.Scan(&info.TableSchema, &info.TableName, &info.ColumnName, &info.DataType); err != nil {
// 			return nil, fmt.Errorf("error scanning row: %v", err)
// 		}

// 		schemaName := info.TableSchema
// 		tableName := info.TableName
// 		columnName := info.ColumnName
// 		dataType := info.DataType

// 		data = append(data, info)

// 		if _, ok := structure[schemaName]; !ok {
// 			structure[schemaName] = make(map[string][]string)
// 		}
// 		if _, ok := structure[schemaName][tableName]; !ok {
// 			structure[schemaName][tableName] = []string{}
// 		}
// 		structure[schemaName][tableName] = append(structure[schemaName][tableName], fmt.Sprintf("%s:%s", columnName, dataType))
// 	}

// 	if err := rows.Err(); err != nil {
// 		return nil, fmt.Errorf("error processing rows: %v", err)
// 	}

// 	// Send response with structure
// 	go InsertDataInBackground(data, connectionID)

// 	return &structure, nil
// }

// fetchConnectionMasterID fetches the ConnectionMasterID for the given connectionID
func fetchConnectionMasterID(connectionID int) (int, error) {
	var connectionMasterID int
	db := database.GetPostgresDBConnection()
	err := db.Model(&models.Connection{}).Where("id = ?", connectionID).Select("connection_master_id").Scan(&connectionMasterID).Error
	if err != nil {
		return 0, err
	}
	return connectionMasterID, nil
}

// fetchQueries fetches the queries from the Queries table using ConnectionMasterID
func fetchQueries(connectionMasterID int) (models.QueryMaster, error) {
	var queries models.QueryMaster
	db := database.GetPostgresDBConnection()
	err := db.Where("connection_master_id = ?", connectionMasterID).First(&queries).Error
	if err != nil {
		return models.QueryMaster{}, err
	}
	return queries, nil
}

// InsertDataInBackground inserts the data in the background
// func InsertDataInBackground(data []models.ColumnInfo, connectionID int) {
// 	db := database.GetPostgresDBConnection()

// 	// // Delete existing data for the connection ID in the correct order
// 	// if err := deleteExistingData(connectionID); err != nil {
// 	// 	fmt.Printf("error deleting existing data: %v", err)
// 	// }

// 	// Insert schema names
// 	schemaNames := collectSchemaNames(data, connectionID)
// 	insertSchemaNames(db, schemaNames)

// 	// Fetch schema IDs after insertion
// 	schemaNameMap := fetchSchemaIDs(db, connectionID)

// 	// Insert table names using schema IDs
// 	tableNames := collectTableNames(data, connectionID, schemaNameMap)
// 	insertTableNames(db, tableNames)

// 	// Fetch table IDs after insertion
// 	tableNameMap := fetchTableIDs(db, connectionID)

// 	// Insert column names using schema and table IDs
// 	columnNames := collectColumnNames(data, schemaNameMap, tableNameMap, connectionID)
// 	insertColumnNames(db, columnNames)

//		// Clear the data slice to free memory
//		data = nil
//	}
// func deleteExistingData(connectionID int) error {
// 	db := database.GetPostgresDBConnection()

// 	// Delete columns for the tables from org_tables schema
// 	if err := db.Table("org_tables.column_names").Where("connection_id IN (?)", connectionID).Delete(&models.ColumnName{}).Error; err != nil {
// 		return err
// 	}

// 	return nil
// }

func collectSchemaNames(data []models.ColumnInfo, connectionID int) []models.SchemaName {
	var schemaNames []models.SchemaName
	schemaNameSet := make(map[string]struct{})

	for _, info := range data {
		if _, exists := schemaNameSet[info.TableSchema]; !exists {
			schemaNames = append(schemaNames, models.SchemaName{
				Name:         info.TableSchema,
				ConnectionID: connectionID,
			})
			schemaNameSet[info.TableSchema] = struct{}{}
		}
	}

	return schemaNames
}

// func insertSchemaNames(db *gorm.DB, schemaNames []models.SchemaName) {
// 	if err := db.CreateInBatches(&schemaNames, 10000).Error; err != nil {
// 		fmt.Printf("error inserting schema names: %v\n", err)
// 	}
// }

// func fetchSchemaIDs(db *gorm.DB, connectionID int) map[string]int {
// 	var schemaNames []models.SchemaName
// 	schemaNameMap := make(map[string]int)

// 	db.Where("connection_id = ?", connectionID).Find(&schemaNames)
// 	for _, schema := range schemaNames {
// 		schemaNameMap[schema.Name] = schema.ID
// 	}

// 	return schemaNameMap
// }

func collectTableNames(data []models.ColumnInfo, connectionID int, schemaNameMap map[string]int) []models.TableName {
	var tableNames []models.TableName
	tableNameSet := make(map[string]struct{})

	for _, info := range data {
		schemaID := schemaNameMap[info.TableSchema]

		tableKey := fmt.Sprintf("%s.%s", info.TableSchema, info.TableName)
		if _, exists := tableNameSet[tableKey]; !exists {
			tableNames = append(tableNames, models.TableName{
				Name:         info.TableName,
				SchemaID:     schemaID,
				ConnectionID: connectionID,
			})
			tableNameSet[tableKey] = struct{}{}
		}
	}

	return tableNames
}

// func insertTableNames(db *gorm.DB, tableNames []models.TableName) {

// 	if err := db.CreateInBatches(&tableNames, 10000).Error; err != nil {
// 		fmt.Printf("error inserting table names: %v\n", err)
// 	}
// }

// func fetchTableIDs(db *gorm.DB, connectionID int) map[string]int {
// 	var tableNames []models.TableName
// 	tableNameMap := make(map[string]int)

// 	db.Where("connection_id = ?", connectionID).Find(&tableNames)
// 	for _, table := range tableNames {
// 		tableKey := fmt.Sprintf("%d.%s", table.SchemaID, table.Name)
// 		tableNameMap[tableKey] = table.ID
// 	}

// 	return tableNameMap
// }

func collectColumnNames(data []models.ColumnInfo, schemaNameMap map[string]int, tableNameMap map[string]int, connectionID int) []models.ColumnName {
	var columnNames []models.ColumnName

	for _, info := range data {
		schemaID, schemaExists := schemaNameMap[info.TableSchema]
		if !schemaExists {
			fmt.Printf("SchemaID not found for schema: %s\n", info.TableSchema)
			continue
		}

		tableKey := fmt.Sprintf("%d.%s", schemaID, info.TableName)
		tableID, tableExists := tableNameMap[tableKey]
		if !tableExists {
			fmt.Printf("TableID not found for table: %s in schema: %s\n", info.TableName, info.TableSchema)
			continue
		}

		columnNames = append(columnNames, models.ColumnName{
			Name:         info.ColumnName,
			SchemaID:     schemaID,
			ConnectionID: connectionID,
			TableID:      tableID,
			DataType:     info.DataType, // Include DataType here
		})
	}

	return columnNames
}

// func insertColumnNames(db *gorm.DB, columnNames []models.ColumnName) {

// 	if err := db.CreateInBatches(&columnNames, 10000).Error; err != nil {
// 		fmt.Printf("error inserting column names: %v\n", err)
// 	}
// }

func GetDBStructureLocal(connectionID int) (*DatabaseStructure, error) {
	structure := make(DatabaseStructure)

	// Create a connection with the database
	db := database.GetPostgresDBConnection()

	// Fetch schema names for the connection
	var schemaNames []models.SchemaName
	if err := db.Where("connection_id = ?", connectionID).Find(&schemaNames).Error; err != nil {
		fmt.Println("Error fetching schema names:", err)
		return nil, err
	}

	// Fetch table names and column names for each schema
	for _, schema := range schemaNames {
		var tableNames []models.TableName
		if err := db.Where("schema_id = ?", schema.ID).Find(&tableNames).Error; err != nil {
			fmt.Println("Error fetching table names:", err)
			return nil, err
		}

		for _, table := range tableNames {
			var columnNames []models.ColumnName
			if err := db.Where("table_id = ?", table.ID).Find(&columnNames).Error; err != nil {
				fmt.Println("Error fetching column names:", err)
				return nil, err
			}

			for _, column := range columnNames {
				if _, ok := structure[schema.Name]; !ok {
					structure[schema.Name] = make(map[string][]string)
				}
				if _, ok := structure[schema.Name][table.Name]; !ok {
					structure[schema.Name][table.Name] = []string{}
				}
				structure[schema.Name][table.Name] = append(structure[schema.Name][table.Name], fmt.Sprintf("%s:%s", column.Name, column.DataType))
			}
		}
	}
	return &structure, nil
}

// // func GetDBStructureSchema(connectionID int, schemaName string) (*DatabaseStructure, error) {
// // 	DB := connectors.GetDBConnection(connectionID)

// // 	if DB == nil {
// // 		return nil, fmt.Errorf("database connection for connectionID %d is nil", connectionID)
// // 	}

// // 	// Fetch the ConnectionMasterID for the given connectionID
// // 	connectionMasterID, err := fetchConnectionMasterID(connectionID)
// // 	if err != nil {
// // 		return nil, fmt.Errorf("error fetching ConnectionMasterID: %v", err)
// // 	}

// // 	// Fetch the queries from the database using ConnectionMasterID
// // 	queries, err := fetchQueries(connectionMasterID)
// // 	if err != nil {
// // 		return nil, fmt.Errorf("error fetching queries: %v", err)
// // 	}

// // 	structure := make(DatabaseStructure)

// // 	// Ensure the query uses the correct placeholder for Snowflake
// // 	query := queries.TableQuery

// // 	// Execute the query with the schema name parameter
// // 	rows, err := DB.Query(query, schemaName)
// // 	if err != nil {
// // 		return nil, fmt.Errorf("error executing query: %v", err)
// // 	}
// // 	defer rows.Close()

// // 	var data []models.ColumnInfo

// // 	for rows.Next() {
// // 		var info models.ColumnInfo
// // 		if err := rows.Scan(&info.TableName, &info.ColumnName, &info.DataType); err != nil {
// // 			return nil, fmt.Errorf("error scanning row: %v", err)
// // 		}

// // 		// Ensure schemaName is used correctly in the structure
// // 		if _, ok := structure[schemaName]; !ok {
// // 			structure[schemaName] = make(map[string][]string)
// // 		}
// // 		if _, ok := structure[schemaName][info.TableName]; !ok {
// // 			structure[schemaName][info.TableName] = []string{}
// // 		}
// // 		columnName := fmt.Sprintf("%s:%s", info.ColumnName, info.DataType)
// // 		structure[schemaName][info.TableName] = append(structure[schemaName][info.TableName], columnName)
// // 		data = append(data, info)
// // 	}

// // 	if err := rows.Err(); err != nil {
// // 		return nil, fmt.Errorf("error processing rows: %v", err)
// // 	}

// // 	// Insert data in the background
// // 	go InsertDataInBackgroundschema(schemaName, data, connectionID)

// // 	return &structure, nil
// // }

// func InsertDataInBackgroundschema(schemaName string, data []models.ColumnInfo, connectionID int) {
// 	db := database.GetPostgresDBConnection()
// 	// Fetch the existing schema by name
// 	var schema models.SchemaName
// 	if err := db.Where("name = ? AND connection_id = ?", schemaName, connectionID).First(&schema).Error; err != nil {
// 		log.Printf("error fetching schema: %v", err)
// 		return
// 	}

// 	// Delete corresponding tables and columns
// 	if err := deleteExistingSchemaData(db, schema.ID); err != nil {
// 		log.Printf("error deleting existing schema data: %v", err)
// 		return
// 	}

// 	// Insert new data
// 	insertNewData(data, connectionID, schema.ID)
// }

// // deleteExistingSchemaData deletes the tables and columns for the given schemaID.
// func deleteExistingSchemaData(db *gorm.DB, schemaID int) error {
// 	// Delete from ColumnName
// 	if err := db.Where("schema_id = ?", schemaID).Delete(&models.ColumnName{}).Error; err != nil {
// 		return err
// 	}

// 	// Delete from TableName
// 	if err := db.Where("schema_id = ?", schemaID).Delete(&models.TableName{}).Error; err != nil {
// 		return err
// 	}

// 	return nil
// }

// func insertNewData(data []models.ColumnInfo, connectionID int, schemaID int) {
// 	db := database.GetPostgresDBConnection()

// 	// Collect table names
// 	tableNames := collectTableName(data, connectionID, schemaID)
// 	insertTableNames(db, tableNames)

// 	// Fetch table IDs after insertion
// 	tableNameMap := fetchTableIDs(db, connectionID)

// 	// Insert column names using schema and table IDs
// 	columnNames := collectColumnName(data, schemaID, tableNameMap, connectionID)
// 	insertColumnNames(db, columnNames)

// 	// Clear the data slice to free memory
// 	data = nil
// }

// func collectTableName(data []models.ColumnInfo, connectionID int, schemaID int) []models.TableName {
// 	var tableNames []models.TableName

// 	tableNameSet := make(map[string]struct{})

// 	for _, info := range data {
// 		tableKey := fmt.Sprintf("%s.%s", info.TableSchema, info.TableName)
// 		if _, exists := tableNameSet[tableKey]; !exists {
// 			tableNames = append(tableNames, models.TableName{
// 				Name:         info.TableName,
// 				SchemaID:     schemaID,
// 				ConnectionID: connectionID,
// 			})
// 			tableNameSet[tableKey] = struct{}{}
// 		}
// 	}

// 	return tableNames
// }

// func collectColumnName(data []models.ColumnInfo, schemaID int, tableNameMap map[string]int, connectionID int) []models.ColumnName {
// 	var columnNames []models.ColumnName

// 	for _, info := range data {
// 		tableKey := fmt.Sprintf("%d.%s", schemaID, info.TableName)
// 		tableID, tableExists := tableNameMap[tableKey]
// 		if !tableExists {
// 			fmt.Printf("TableID not found for table: %s in schema: %s\n", info.TableName, info.TableSchema)
// 			continue
// 		}

// 		columnNames = append(columnNames, models.ColumnName{
// 			Name:         info.ColumnName,
// 			SchemaID:     schemaID,
// 			ConnectionID: connectionID,
// 			TableID:      tableID,
// 			DataType:     info.DataType,
// 		})
// 	}

// 	return columnNames
// }

// GetDBStructureTable retrieves the database structure for a specific table in a specific schema in Snowflake.
func GetDBStructureTable(connectionID int, schemaName, tableName string) (*DatabaseStructure, error) {
	DB := connectors.GetDBConnection(connectionID)

	if DB == nil {
		return nil, fmt.Errorf("database connection for connectionID %d is nil", connectionID)
	}

	// Fetch the ConnectionMasterID for the given connectionID
	connectionMasterID, err := fetchConnectionMasterID(connectionID)
	if err != nil {
		return nil, fmt.Errorf("error fetching ConnectionMasterID: %v", err)
	}

	// Fetch the queries from the database using ConnectionMasterID
	queries, err := fetchQueries(connectionMasterID)
	if err != nil {
		return nil, fmt.Errorf("error fetching queries: %v", err)
	}

	structure := make(DatabaseStructure)

	// Ensure the query uses the correct placeholder for Snowflake
	query := queries.ColumnQuery

	// Execute the query with the schema and table name parameters
	rows, err := DB.Query(query, schemaName, tableName)
	if err != nil {
		return nil, fmt.Errorf("error executing query: %v", err)
	}
	defer rows.Close()

	var data []models.ColumnInfo

	for rows.Next() {
		var info models.ColumnInfo
		if err := rows.Scan(&info.ColumnName, &info.DataType); err != nil {
			return nil, fmt.Errorf("error scanning row: %v", err)
		}

		// Ensure schemaName and tableName are used correctly in the structure
		if _, ok := structure[schemaName]; !ok {
			structure[schemaName] = make(map[string][]string)
		}
		if _, ok := structure[schemaName][tableName]; !ok {
			structure[schemaName][tableName] = []string{}
		}
		columnName := fmt.Sprintf("%s:%s", info.ColumnName, info.DataType)
		structure[schemaName][tableName] = append(structure[schemaName][tableName], columnName)
		data = append(data, info)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error processing rows: %v", err)
	}

	// Insert data in the background
	// go InsertDataInBackgroundtable(schemaName, tableName, data, connectionID)

	return &structure, nil
}

// // InsertDataInBackgroundtable replaces the existing table data in the database.
// func InsertDataInBackgroundtable(schemaName, tableName string, data []models.ColumnInfo, connectionID int) {
// 	db := database.GetPostgresDBConnection()

// 	// Fetch schema and table IDs
// 	schemaIDs := fetchSchemaIDs(db, connectionID)
// 	tableIDs := fetchTableIDs(db, connectionID)

// 	schemaID, schemaExists := schemaIDs[schemaName]
// 	if !schemaExists {
// 		log.Printf("schema %s not found", schemaName)
// 		return
// 	}

// 	tableKey := fmt.Sprintf("%d.%s", schemaID, tableName)
// 	tableID, tableExists := tableIDs[tableKey]
// 	if !tableExists {
// 		log.Printf("table %s not found in schema %s", tableName, schemaName)
// 		return
// 	}

// 	// Delete corresponding columns
// 	if err := deleteExistingTableData(db, tableID); err != nil {
// 		log.Printf("error deleting existing table data: %v", err)
// 		return
// 	}

// 	// Insert new data
// 	insertNewColumnData(data, connectionID, tableID, schemaID)
// }

// // deleteExistingTableData deletes the columns for the given tableID.
// func deleteExistingTableData(db *gorm.DB, tableID int) error {
// 	// Delete from ColumnName
// 	if err := db.Where("table_id = ?", tableID).Delete(&models.ColumnName{}).Error; err != nil {
// 		return err
// 	}
// 	return nil
// }

// func insertNewColumnData(data []models.ColumnInfo, connectionID int, tableID int, schemaID int) {
// 	db := database.GetPostgresDBConnection()

// 	// Insert column names using table IDs
// 	columnNames := collectColumnNamess(data, connectionID, tableID, schemaID)
// 	insertColumnNames(db, columnNames)
// 	// Clear the data slice to free memory
// 	data = nil
// }

// func collectColumnNamess(data []models.ColumnInfo, connectionID int, tableID int, schemaID int) []models.ColumnName {
// 	var columnNames []models.ColumnName

// 	for _, info := range data {
// 		columnNames = append(columnNames, models.ColumnName{
// 			Name:         info.ColumnName,
// 			TableID:      tableID,
// 			ConnectionID: connectionID,
// 			SchemaID:     schemaID,
// 			DataType:     info.DataType,
// 		})
// 	}

// 	return columnNames
// }

func RefreshStructure(connectionID int, OrganizationID int) (*DatabaseStructure, map[string][]map[string]interface{}, error) {
	DB := connectors.GetDBConnection(connectionID)
	if DB == nil {
		return nil, nil, fmt.Errorf("database connection for connectionID %d is nil", connectionID)
	}

	// Fetch the ConnectionMasterID for the given connectionID
	connectionMasterID, err := fetchConnectionMasterID(connectionID)
	if err != nil {
		return nil, nil, fmt.Errorf("error fetching ConnectionMasterID: %v", err)
	}

	// Fetch the queries from the database using ConnectionMasterID
	queries, err := fetchQueries(connectionMasterID)
	if err != nil {
		return nil, nil, fmt.Errorf("error fetching queries: %v", err)
	}

	structure := make(DatabaseStructure)

	// Use the fetched schema query
	rows, err := DB.Query(queries.SchemaQuery)
	if err != nil {
		return nil, nil, fmt.Errorf("error fetching columns: %v", err)
	}
	defer rows.Close()

	var data []models.ColumnInfo

	for rows.Next() {
		var schemaName, tableName, columnName, dataType sql.NullString

		if err := rows.Scan(&schemaName, &tableName, &columnName, &dataType); err != nil {
			return nil, nil, fmt.Errorf("error scanning row: %v", err)
		}

		sName := defaultToNull(schemaName)
		tName := defaultToNull(tableName)
		cName := defaultToNull(columnName)
		dType := defaultToNull(dataType)

		data = append(data, models.ColumnInfo{
			TableSchema: sName,
			TableName:   tName,
			ColumnName:  cName,
			DataType:    dType,
		})

		if _, ok := structure[sName]; !ok {
			structure[sName] = make(map[string][]string)
		}
		if _, ok := structure[sName][tName]; !ok {
			structure[sName][tName] = []string{}
		}
		structure[sName][tName] = append(structure[sName][tName], fmt.Sprintf("%s:%s", cName, dType))
	}

	if err := rows.Err(); err != nil {
		return nil, nil, fmt.Errorf("error processing rows: %v", err)
	}

	// Insert data and compare schemas
	compareResult, err := InsertDataInBgTemp(data, connectionID, OrganizationID)
	if err != nil {
		return nil, nil, fmt.Errorf("error inserting data in background: %v", err)
	}

	// Clear the `data` slice to free memory
	data = nil

	// Return the structure and comparison result
	return &structure, compareResult, nil
}

func GetDBStructure(connectionID int, OrganizationID int) (*DatabaseStructure, error) {
	DB := connectors.GetDBConnection(connectionID)
	db := database.DB

	if DB == nil {
		return nil, fmt.Errorf("database connection for connectionID %d is nil", connectionID)
	}

	// Fetch the ConnectionMasterID for the given connectionID
	connectionMasterID, err := fetchConnectionMasterID(connectionID)
	if err != nil {
		return nil, fmt.Errorf("error fetching ConnectionMasterID: %v", err)
	}

	// Fetch the queries from the database using ConnectionMasterID
	queries, err := fetchQueries(connectionMasterID)
	if err != nil {
		return nil, fmt.Errorf("error fetching queries: %v", err)
	}

	structure := make(DatabaseStructure)

	// Use the fetched schema query
	rows, err := DB.Query(queries.SchemaQuery)
	if err != nil {
		return nil, fmt.Errorf("error fetching columns: %v", err)
	}
	defer rows.Close()

	var data []models.ColumnInfo

	for rows.Next() {
		var schemaName, tableName, columnName, dataType sql.NullString

		if err := rows.Scan(&schemaName, &tableName, &columnName, &dataType); err != nil {
			return nil, fmt.Errorf("error scanning row: %v", err)
		}

		sName := defaultToNull(schemaName)
		tName := defaultToNull(tableName)
		cName := defaultToNull(columnName)
		dType := defaultToNull(dataType)

		data = append(data, models.ColumnInfo{
			TableSchema: sName,
			TableName:   tName,
			ColumnName:  cName,
			DataType:    dType,
		})

		if _, ok := structure[sName]; !ok {
			structure[sName] = make(map[string][]string)
		}
		if _, ok := structure[sName][tName]; !ok {
			structure[sName][tName] = []string{}
		}
		structure[sName][tName] = append(structure[sName][tName], fmt.Sprintf("%s:%s", cName, dType))
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error processing rows: %v", err)
	}

	// Construct the schema table name dynamically with the test database and org_tables schema
	schemaNamesTable := fmt.Sprintf("org_tables.schema_names_%d", OrganizationID) // Referring to org_tables schema in the test DB

	// Query to check if the connection_id already exists in the schema_names table
	var exists bool
	query := fmt.Sprintf("SELECT EXISTS(SELECT 1 FROM %s WHERE connection_id = ?)", schemaNamesTable)
	// Using db.Raw to execute the raw SQL query and scan the result into exists variable
	err = db.Raw(query, connectionID).Scan(&exists).Error
	if err != nil {
		return nil, fmt.Errorf("error checking if connection_id exists in schema_names table: %v", err)
	}
	fmt.Println(exists)

	// If the connection_id doesn't exist, proceed with insertion
	if !exists {
		log.Printf("Inserting data as connection_id %d does not exist in %s", connectionID, schemaNamesTable)
		go InsertDataInBackground(data, connectionID, OrganizationID)
	} else {
		log.Printf("Skipping InsertDataInBackground: connection_id %d already exists in %s", connectionID, schemaNamesTable)
	}

	return &structure, nil
}



func InsertDataInBackground(data []models.ColumnInfo, connectionID, OrganizationID int) {
	db := database.GetPostgresDBConnection()

	// Use the dynamic table names based on OrganizationID
	schemaNamesTable := fmt.Sprintf("org_tables.schema_names_%d", OrganizationID)
	tableNamesTable := fmt.Sprintf("org_tables.table_names_%d", OrganizationID)
	columnNamesTable := fmt.Sprintf("org_tables.column_names_%d", OrganizationID)

	// Insert schema names
	schemaNames := collectSchemaNames(data, connectionID)
	insertSchemaNames(db, schemaNames, schemaNamesTable)

	// Fetch schema IDs after insertion
	schemaNameMap := fetchSchemaIDs(db, connectionID, schemaNamesTable)

	// Insert table names using schema IDs
	tableNames := collectTableNames(data, connectionID, schemaNameMap)
	insertTableNames(db, tableNames, tableNamesTable)

	// Fetch table IDs after insertion
	tableNameMap := fetchTableIDs(db, connectionID, tableNamesTable)

	// Insert column names using schema and table IDs
	columnNames := collectColumnNames(data, schemaNameMap, tableNameMap, connectionID)
	insertColumnNames(db, columnNames, columnNamesTable)

	// Clear the data slice to free memory
	data = nil
}

func defaultToNull(ns sql.NullString) string {
	if ns.Valid {
		return ns.String
	}
	return "NULL" // Default value if the field is NULL
}

func insertSchemaNames(db *gorm.DB, schemaNames []models.SchemaName, schemaNamesTable string) {
	// Use dynamic table name in the insert query
	if err := db.Table(schemaNamesTable).CreateInBatches(&schemaNames, 10000).Error; err != nil {
		fmt.Printf("error inserting schema names into %s: %v\n", schemaNamesTable, err)
	}
}

func fetchSchemaIDs(db *gorm.DB, connectionID int, schemaNamesTable string) map[string]int {
	var schemaNames []models.SchemaName
	schemaNameMap := make(map[string]int)

	// Query the dynamic table name
	db.Table(schemaNamesTable).Where("connection_id = ?", connectionID).Find(&schemaNames)
	for _, schema := range schemaNames {
		schemaNameMap[schema.Name] = schema.ID
	}

	return schemaNameMap
}

func insertTableNames(db *gorm.DB, tableNames []models.TableName, tableNamesTable string) {
	// Use dynamic table name in the insert query
	if err := db.Table(tableNamesTable).CreateInBatches(&tableNames, 10000).Error; err != nil {
		fmt.Printf("error inserting table names into %s: %v\n", tableNamesTable, err)
	}
}

func fetchTableIDs(db *gorm.DB, connectionID int, tableNamesTable string) map[string]int {
	var tableNames []models.TableName
	tableNameMap := make(map[string]int)

	// Query the dynamic table name
	db.Table(tableNamesTable).Where("connection_id = ?", connectionID).Find(&tableNames)
	for _, table := range tableNames {
		tableKey := fmt.Sprintf("%d.%s", table.SchemaID, table.Name)
		tableNameMap[tableKey] = table.ID
	}

	return tableNameMap
}

func insertColumnNames(db *gorm.DB, columnNames []models.ColumnName, columnNamesTable string) {
	// Use dynamic table name in the insert query
	if err := db.Table(columnNamesTable).CreateInBatches(&columnNames, 10000).Error; err != nil {
		fmt.Printf("error inserting column names into %s: %v\n", columnNamesTable, err)
	}
}
func InsertDataInBgTemp(data []models.ColumnInfo, connectionID, OrganizationID int) (map[string][]map[string]interface{}, error) {
	// Establish a connection to the PostgreSQL database
	db := database.GetPostgresDBConnection()

	// Dynamic table names based on OrganizationID
	schemaNamesTable := fmt.Sprintf("org_tables.temp_schema_names_%d", OrganizationID)
	tableNamesTable := fmt.Sprintf("org_tables.temp_table_names_%d", OrganizationID)

	// Insert schema names
	schemaNames := collectSchemaNames(data, connectionID)
	insertSchemaNameTemp(db, schemaNames, schemaNamesTable)

	// Fetch schema IDs after insertion
	schemaNameMap := fetchSchemaIDsTemp(db, connectionID, schemaNamesTable)

	// Insert table names using schema IDs
	tableNames := collectTableNames(data, connectionID, schemaNameMap)
	insertTableNamesTemp(db, tableNames, tableNamesTable)

	// Call schema comparison function
	compareSchemaResult, err := CompareSchemaNamess(OrganizationID)
	if err != nil {
		return nil, fmt.Errorf("error in schema comparison: %v", err)
	}

	// Call table comparison function
	compareTableResult, err := CompareTableNames(OrganizationID)
	if err != nil {
		return nil, fmt.Errorf("error in table comparison: %v", err)
	}

	// Aggregate both results into a map
	comparisonResults := map[string][]map[string]interface{}{
		"schemaComparison": compareSchemaResult,
		"tableComparison":  compareTableResult,
	}

	// Log the comparison results
	fmt.Println("Comparison result for schemas:", compareSchemaResult)
	fmt.Println("Comparison result for tables:", compareTableResult)

	return comparisonResults, nil
}



func callCompareSchemaFunction(connectionID int, OrgID int) error {
	// Prepare the SQL call to the PostgreSQL function
	query := fmt.Sprintf("SELECT CompareSchema($1, $2, $3)")
	db := database.GetPostgresDBConnection()

	// Execute the function with required parameters
	_ = db.Exec(query, connectionID, GenerateTempSchemaName(OrgID), GenerateSchemaName(OrgID))
	// if err != nil {
	// 	return fmt.Errorf("failed to call update_table_names: %w", err)
	// }

	log.Printf("Function update_table_names executed successfully for connection_id: %d", connectionID)
	return nil
}
func callCompareTablesFunction(connectionID int, OrgID int) error {
	// Prepare the SQL call to the PostgreSQL function
	// GenerateTempSchemaName(OrgID), GenerateSchemaName(OrgID), ConnId
	query := fmt.Sprintf("SELECT CompareTables($1, $2, $3)")
	db := database.GetPostgresDBConnection()

	// Execute the function with required parameters
	_ = db.Exec(query, connectionID, GenerateTempSchemaName(OrgID), GenerateSchemaName(OrgID))
	// if err != nil {
	// 	return fmt.Errorf("failed to call update_table_names: %w", err)
	// }

	log.Printf("Function update_table_names executed successfully for connection_id: %d", connectionID)
	return nil
}

// func fetchTableIDsTemp(db *gorm.DB, connectionID int, tableNamesTable string) map[string]int {
// 	var tableNames []models.TableName
// 	tableNameMap := make(map[string]int)

// 	// Query the dynamic table name
// 	db.Table(tableNamesTable).Where("connection_id = ?", connectionID).Find(&tableNames)
// 	for _, table := range tableNames {
// 		tableKey := fmt.Sprintf("%d.%s", table.SchemaID, table.Name)
// 		tableNameMap[tableKey] = table.ID
// 	}

// 	return tableNameMap
// }

func insertSchemaNameTemp(db *gorm.DB, schemaNames []models.SchemaName, schemaNamesTable string) {
	// Use dynamic table name in the insert query
	if err := db.Table(schemaNamesTable).CreateInBatches(&schemaNames, 10000).Error; err != nil {
		fmt.Printf("error inserting schema names into %s: %v\n", schemaNamesTable, err)
	}
	fmt.Println("inserted schema names temp")
}

func fetchSchemaIDsTemp(db *gorm.DB, connectionID int, schemaNamesTable string) map[string]int {
	var schemaNames []models.SchemaName
	schemaNameMap := make(map[string]int)

	// Query the dynamic table name
	if err := db.Table(schemaNamesTable).Where("connection_id = ?", connectionID).Find(&schemaNames).Error; err != nil {
		fmt.Printf("error fetching schema IDs from %s: %v\n", schemaNamesTable, err)
	}

	for _, schema := range schemaNames {
		schemaNameMap[schema.Name] = schema.ID
	}

	return schemaNameMap
}

func insertTableNamesTemp(db *gorm.DB, tableNames []models.TableName, tableNamesTable string) {
	// Use dynamic table name in the insert query
	if err := db.Table(tableNamesTable).CreateInBatches(&tableNames, 10000).Error; err != nil {
		fmt.Printf("error inserting table names into %s: %v\n", tableNamesTable, err)
		fmt.Println("data inserted for schemas")

	}
	fmt.Println("data inserted for tables")

}

// func fetchTableIDsTemp(db *gorm.DB, connectionID int, tableNamesTable string) map[string]int {
// 	var tableNames []models.TableName
// 	tableNameMap := make(map[string]int)

// 	// Query the dynamic table name
// 	if err := db.Table(tableNamesTable).Where("connection_id = ?", connectionID).Find(&tableNames).Error; err != nil {
// 		fmt.Printf("error fetching table IDs from %s: %v\n", tableNamesTable, err)
// 	}

// 	for _, table := range tableNames {
// 		tableNameMap[table.Name] = table.ID
// 	}

// 	return tableNameMap
// }

// func insertColumnNamesTemp(db *gorm.DB, columnNames []models.ColumnName, columnNamesTable string) {
// 	// Use dynamic table name in the insert query
// 	if err := db.Table(columnNamesTable).CreateInBatches(&columnNames, 10000).Error; err != nil {
// 		fmt.Printf("error inserting column names into %s: %v\n", columnNamesTable, err)
// 	}
// }

func CompareSchemas(OrgID int, ConnId int) bool {
	// Get the database connection
	db := database.DB

	// Generate schema names
	tempSchemaName := GenerateTempSchemaName(OrgID)
	schemaName := GenerateSchemaName(OrgID)

	// Convert ConnId to string
	connIdStr := strconv.Itoa(ConnId)

	// Execute the function in PostgreSQL
	result := db.Exec("SELECT CompareSchema(?, ?, ?)", connIdStr, schemaName, tempSchemaName)

	// Check for errors
	if result.Error != nil {
		fmt.Println("Error executing function:", result.Error)
		return false
	}
	fmt.Println(result)
	// Log success and optionally the number of rows affected
	fmt.Println("Function executed successfully")
	fmt.Println("Rows affected:", result.RowsAffected)

	return true
}

func CompareTables(OrgID int, ConnId int) bool {
	// Get the database connection
	db := database.DB

	// Generate schema names
	tempSchemaName := GenerateTempTableTableName(OrgID)
	TableName := GenerateTableName(OrgID)

	// Convert ConnId to string
	connIdStr := strconv.Itoa(ConnId)
	log.Print(TableName, tempSchemaName)
	// Execute the function in PostgreSQL
	result := db.Exec("SELECT CompareTables(?, ?, ?)", connIdStr, TableName, tempSchemaName)

	// Check for errors
	if result.Error != nil {
		fmt.Println("Error executing function:", result.Error)
		return false
	}

	// Log success and optionally the number of rows affected
	fmt.Println("Function executed successfully")
	fmt.Println("Rows affected:", result.RowsAffected)

	return true
}

func GenerateSchemaName(suffix int) string {
	return "schema_names_" + strconv.Itoa(suffix)
}

func GenerateTempSchemaName(suffix int) string {
	return "temp_schema_names_" + strconv.Itoa(suffix)
}

func GenerateTableName(suffix int) string {
	return "org_tables.table_names_" + strconv.Itoa(suffix)
}

func GenerateTempTableTableName(suffix int) string {
	return "temp_table_names_" + strconv.Itoa(suffix)
}
func CompareSchemaNamess(orgID int) ([]map[string]interface{}, error) {
	// Define the result type
	type ComparisonResult struct {
		ID        int
		SchemaName string
		IsMapped   int
		IsFound    int
	}

	db := database.DB

	// Placeholder for table names
	schemaNames := fmt.Sprintf("org_tables.schema_names_%d", orgID)
	tempSchemaNames := fmt.Sprintf("org_tables.temp_schema_names_%d", orgID)

	// SQL query to compare schema names, including the ID
	query := fmt.Sprintf(`
        SELECT
            s.id AS id,
            s.name AS schema_name,
            s.is_mapped AS is_mapped,
            COALESCE(CASE WHEN t.name IS NULL THEN 0 ELSE 1 END, 0) AS is_found
        FROM %s s
        LEFT JOIN %s t ON s.name = t.name
        UNION ALL
        SELECT
            t.id AS id,
            t.name AS schema_name,
            0 AS is_mapped,
            -1 AS is_found
        FROM %s t
        LEFT JOIN %s s ON s.name = t.name
        WHERE s.name IS NULL
    `, schemaNames, tempSchemaNames, tempSchemaNames, schemaNames)

	// Execute the query
	var results []ComparisonResult
	if err := db.Raw(query).Scan(&results).Error; err != nil {
		return nil, fmt.Errorf("error executing schema comparison: %v", err)
	}

	// Slice to store schemas to return with ID and Name
	var toUpdateOrDelete []map[string]interface{}

	// Process the results
	for _, result := range results {
		switch {
		case result.IsMapped == 1 && result.IsFound == 0:
			// Add schemas that need to be updated or deleted
			fmt.Printf("Schema to update/delete: %s (ID: %d)\n", result.SchemaName, result.ID)
			toUpdateOrDelete = append(toUpdateOrDelete, map[string]interface{}{
				"id":   result.ID,
				"name": result.SchemaName,
			})

		case result.IsMapped == 1 && result.IsFound == 1:
			// No change needed
			fmt.Printf("No change for schema: %s (ID: %d)\n", result.SchemaName, result.ID)

		case result.IsMapped == 0 && result.IsFound == -1:
			// Insert new schema into schema_names
			fmt.Printf("Inserting new schema: %s\n", result.SchemaName)
			insertQuery := fmt.Sprintf(`
                INSERT INTO %s (connection_id, name, is_mapped, is_found, last_updated)
                VALUES (?, ?, 0, 1, NOW())
            `, schemaNames)
			if err := db.Exec(insertQuery, orgID, result.SchemaName).Error; err != nil {
				return nil, fmt.Errorf("error inserting new schema: %v", err)
			}

		case result.IsMapped == 0 && result.IsFound == 0:
			// Delete schema from schema_names
			fmt.Printf("Deleting schema: %s (ID: %d)\n", result.SchemaName, result.ID)
			deleteQuery := fmt.Sprintf(`
                DELETE FROM %s WHERE id = ?
            `, schemaNames)
			if err := db.Exec(deleteQuery, result.ID).Error; err != nil {
				return nil, fmt.Errorf("error deleting schema: %v", err)
			}

		default:
			// Handle unhandled cases
			fmt.Printf("Unhandled case for schema: %s (ID: %d)\n", result.SchemaName, result.ID)
		}
	}

	// Delete temporary schema names table
	deleteTempQuery := fmt.Sprintf(`DELETE FROM %s`, tempSchemaNames)
	if err := db.Exec(deleteTempQuery).Error; err != nil {
		return nil, fmt.Errorf("error deleting temporary schema names: %v", err)
	}
	fmt.Printf("Deleted temp_schema_names table: %s\n", tempSchemaNames)

	// Return schemas with IDs and names for update/delete
	return toUpdateOrDelete, nil
}

func CompareTableNames(orgID int) ([]map[string]interface{}, error) {
	// Define the result type
	type ComparisonResult struct {
		ID         int
		TableName  string
		IsMapped   int
		IsFound    int
	}

	db := database.DB

	// Placeholder for table names
	tableNames := fmt.Sprintf("org_tables.table_names_%d", orgID)
	tempTableNames := fmt.Sprintf("org_tables.temp_table_names_%d", orgID)

	// SQL query to compare table names, including the ID
	query := fmt.Sprintf(`
        SELECT
            t.id AS id,
            t.name AS table_name,
            t.is_mapped AS is_mapped,
            COALESCE(CASE WHEN tt.name IS NULL THEN 0 ELSE 1 END, 0) AS is_found
        FROM %s t
        LEFT JOIN %s tt ON t.name = tt.name
        UNION ALL
        SELECT
            tt.id AS id,
            tt.name AS table_name,
            0 AS is_mapped,
            -1 AS is_found
        FROM %s tt
        LEFT JOIN %s t ON t.name = tt.name
        WHERE t.name IS NULL
    `, tableNames, tempTableNames, tempTableNames, tableNames)

	// Execute the query
	var results []ComparisonResult
	if err := db.Raw(query).Scan(&results).Error; err != nil {
		return nil, fmt.Errorf("error executing table comparison: %v", err)
	}

	// Slice to store tables to return with ID and Name
	var toUpdateOrDelete []map[string]interface{}

	// Process the results
	for _, result := range results {
		switch {
		case result.IsMapped == 1 && result.IsFound == 0:
			// Add tables that need to be updated or deleted
			fmt.Printf("Table to update/delete: %s (ID: %d)\n", result.TableName, result.ID)
			toUpdateOrDelete = append(toUpdateOrDelete, map[string]interface{}{
				"id":   result.ID,
				"name": result.TableName,
			})

		case result.IsMapped == 1 && result.IsFound == 1:
			// No change needed
			fmt.Printf("No change for table: %s (ID: %d)\n", result.TableName, result.ID)

		case result.IsMapped == 0 && result.IsFound == -1:
			// Insert new table into table_names
			fmt.Printf("Inserting new table: %s\n", result.TableName)
			insertQuery := fmt.Sprintf(`
                INSERT INTO %s (connection_id, name, is_mapped, is_found, last_updated)
                VALUES (?, ?, 0, 1, NOW())
            `, tableNames)
			if err := db.Exec(insertQuery, orgID, result.TableName).Error; err != nil {
				return nil, fmt.Errorf("error inserting new table: %v", err)
			}

		case result.IsMapped == 0 && result.IsFound == 0:
			// Delete table from table_names
			fmt.Printf("Deleting table: %s (ID: %d)\n", result.TableName, result.ID)
			deleteQuery := fmt.Sprintf(`
                DELETE FROM %s WHERE id = ?
            `, tableNames)
			if err := db.Exec(deleteQuery, result.ID).Error; err != nil {
				return nil, fmt.Errorf("error deleting table: %v", err)
			}

		default:
			// Handle unhandled cases
			fmt.Printf("Unhandled case for table: %s (ID: %d)\n", result.TableName, result.ID)
		}
	}

	// Delete temporary table names table
	deleteTempQuery := fmt.Sprintf(`DELETE FROM %s`, tempTableNames)
	if err := db.Exec(deleteTempQuery).Error; err != nil {
		return nil, fmt.Errorf("error deleting temporary table names: %v", err)
	}
	fmt.Printf("Deleted temp_table_names table: %s\n", tempTableNames)

	// Return tables with IDs and names for update/delete
	return toUpdateOrDelete, nil
}

func UpdateSchema(user models.User, requestedData models.Schemareq) error {
	db := database.DB

	// Placeholder for table name
	schemaNames := fmt.Sprintf("org_tables.schema_names_%d", user.OrganizationID)

	// SQL query to update schema name
	query := fmt.Sprintf(`
        UPDATE %s
        SET name = ?, connection_id = ?, is_mapped = 0, is_found = 1, last_updated = NOW()
        WHERE id = ?
    `, schemaNames)

	// Execute the update query
	if err := db.Exec(query, requestedData.Name, requestedData.ConnectionID, requestedData.ID).Error; err != nil {
		return fmt.Errorf("error updating schema name with ID %d: %v", requestedData.ID, err)
	}

	fmt.Printf("Successfully updated schema name to: %s (ID: %d)\n", requestedData.Name, requestedData.ID)
	return nil
}



func DeleteSchema(requestedData models.Schemareq,user models.User) error {
	db := database.DB

	// Placeholder for table name
	schemaNames := fmt.Sprintf("org_tables.schema_names_%d", user.OrganizationID)

	// SQL query to delete schema name
	query := fmt.Sprintf(`DELETE FROM %s WHERE name = ? and connection_id=?`, schemaNames,requestedData.ConnectionID)

	// Execute the delete query
	if err := db.Exec(query, requestedData.Name).Error; err != nil {
		return fmt.Errorf("error deleting schema name: %v", err)
	}

	fmt.Printf("Successfully deleted schema name: %s\n", requestedData.Name)
	return nil
}





func UpdateTable(user models.User, requestedData models.Tablereq) error {
	db := database.DB

	// Placeholder for table name
	tableNames := fmt.Sprintf("org_tables.table_names_%d", user.OrganizationID)

	// SQL query to update table name
	query := fmt.Sprintf(`
        UPDATE %s
        SET name = ?, connection_id = ?, is_mapped = 0, is_found = 1, last_updated = NOW()
        WHERE id = ?
    `, tableNames)

	// Execute the update query
	if err := db.Exec(query, requestedData.Name, requestedData.ConnectionID, requestedData.ID).Error; err != nil {
		return fmt.Errorf("error updating table name with ID %d: %v", requestedData.ID, err)
	}

	fmt.Printf("Successfully updated table name to: %s (ID: %d)\n", requestedData.Name, requestedData.ID)
	return nil
}


func DeleteTable(requestedData models.Tablereq, user models.User) error {
	db := database.DB

	// Placeholder for table name
	tableNames := fmt.Sprintf("org_tables.table_names_%d", user.OrganizationID)

	// SQL query to delete table name
	query := fmt.Sprintf(`DELETE FROM %s WHERE name = ? AND connection_id = ?`, tableNames)

	// Execute the delete query
	if err := db.Exec(query, requestedData.Name, requestedData.ConnectionID).Error; err != nil {
		return fmt.Errorf("error deleting table name: %v", err)
	}

	fmt.Printf("Successfully deleted table name: %s\n", requestedData.Name)
	return nil
}






























