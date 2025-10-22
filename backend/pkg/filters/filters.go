package filters

import (
	// "DynViz/internal/connectors"
	"DynViz/internal/database"
	"DynViz/models"

	// "DynViz/pkg/organization"
	"errors"
	"fmt"
	"log"
	"net/http"
	"regexp"
	"strings"

	"gorm.io/gorm"
)

func VerifyFil(name string, db *gorm.DB, orgID int) bool {
	var count int64

	// Query to check for duplicates
	err := db.Model(&models.Filter{}).
		Where("name = ? AND organization_id = ?  AND status = ?", name, orgID, 1).
		Count(&count).Error

	if err != nil {
		log.Printf("Error verifying filter existence: %v", err)
		return false
	}
	fmt.Println(count)
	return count > 0
}

func CreateFilter(requestData *models.Filter, users *models.User) models.Response {
	var response models.Response
	var fil models.Filter
	// fmt.Println(requestData.SetID)
	// Create a connection with the database
	db := database.DB
	tableName := fmt.Sprintf("org_tables.column_names_%d", users.OrganizationID)
	var column_names models.ColumnName

	if err := db.Table(tableName).Where("id = ?", requestData.ColumnID).Take(&column_names).Error; err != nil {
		log.Println("Error finding column ID in table:", tableName, "Error:", err)
		response.Message = "Invalid column ID"
		response.Code = http.StatusBadRequest
		return response
	}

	// Create a new record for the set
	payload := models.Filter{
		Name:           requestData.Name,
		D_Type:         column_names.DataType,
		Query:          requestData.Query,
		ColumnID:       requestData.ColumnID,
		VarID:          requestData.VarID,
		SetID:          requestData.SetID,
		Type:           requestData.Type,
		OrganizationID: users.OrganizationID,
		CreatedByID:    users.ID,
		LastModifiedBy: users.ID,
	}
	if VerifyFil(requestData.Name, db, users.OrganizationID) {
		response.Message = "Filter with the same name already exists"
		response.Code = http.StatusNotAcceptable
		return response
	}
	// Insert the set record into the database
	if err := db.Create(&payload).Error; err != nil {
		log.Println("Error creating filter:", err)
		response.Message = "Unable to create filter"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Construct the success response
	response.Message = fmt.Sprintf("Filter created successfully with ID %d", payload.ID)
	response.Data = fil // Include table names in response if needed
	response.Code = http.StatusCreated
	return response
}

func UpdateFilter(ID int, requestData *models.Filter, user models.User) models.Response {

	// log.Println("in set pkg update")
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the Set record to be updated
	var Filter models.Filter
	if err := db.Where("id = ?", ID).First(&Filter).Error; err != nil {
		log.Println("Error fetching Filter:", err)
		response.Message = "Unable to fetch Filter"
		response.Code = http.StatusInternalServerError
		return response
	}

	if VerifyFil(requestData.Name, db, user.OrganizationID) {
		response.Message = "Filter with the same name already exists"
		response.Code = http.StatusNotAcceptable
		return response
	}
	// Query, err := utils.EncryptAES(requestData.Query)
	// if err != nil {
	// 	log.Println("Error encrypting  query:", err)

	// }
	// varName := fmt.Sprintf("$(%s)", requestData.Name)

	// Update the Set fields
	Filter.Name = requestData.Name
	Filter.D_Type = requestData.D_Type
	Filter.Type = requestData.Type
	Filter.Query = requestData.Query
	Filter.LastModifiedBy = user.ID
	// Save the delete set record
	if err := db.Model(&Filter).Where("id = ?", ID).Updates(map[string]interface{}{
		"name":             requestData.Name,
		"d_type":           requestData.D_Type,
		"type":             requestData.Type,
		"query":            requestData.Query,
		"last_modified_by": user.ID,
	}).Error; err != nil {
		log.Println("Error update Filter:", err)
		response.Message = "Unable to update Filter"
		response.Code = http.StatusInternalServerError
		return response
	}
	// fmt.Println("a")

	response.Message = fmt.Sprintf("Filter updated successfully with ID %d", Filter.ID)
	response.Code = http.StatusOK
	return response
}

func DeleteFilter(ID int, user models.User) models.Response {

	// log.Println("in set pkg update")
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the Set record to be updated
	var Filter models.Filter
	if err := db.Where("id = ?", ID).First(&Filter).Error; err != nil {
		log.Println("Error fetching Filter:", err)
		response.Message = "Unable to fetch Filter"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Attempt to delete the filter mappings associated with the filter ID
	if !DeleteFilterMappingUsingFilID(ID, &user) { // Assuming the function returns a boolean
		log.Println("Error deleting Filter Mapping")
		response.Message = "Unable to delete Filter Mapping"
		response.Code = http.StatusInternalServerError
		return response
	}
	// Query, err := utils.EncryptAES(requestData.Query)
	// if err != nil {
	// 	log.Println("Error encrypting  query:", err)

	// }
	// varName := fmt.Sprintf("$(%s)", requestData.Name)

	// Update the Set fields
	// Filter.Status = 0
	// Filter.DeactivateByID = user.ID
	updateddata := map[string]interface{}{
		"status":           0,
		"deactivate_by_id": user.ID,
		"last_modified_by": user.ID,
		
	}

	// Save the delete set record
	if err := db.Model(&Filter).Where("id = ?", ID).Updates(updateddata).Error; err != nil {
		log.Println("Error deleting Filter:", err)
		response.Message = "Unable to Deleting Filter"
		response.Code = http.StatusInternalServerError
		return response
	}
	// Save the delete set record
	// if err := db.Save(&Filter).Error; err != nil {
	// 	log.Println("Error update Filter:", err)
	// 	response.Message = "Unable to update Filter"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }
	// fmt.Println("a")

	response.Message = "Filter Deleted successfully"
	response.Code = http.StatusOK
	return response
}
func DeleteFilterMappingUsingFilID(FilterID int, user *models.User) bool {
	// Ensure the Filter ID is valid
	if FilterID == 0 {
		log.Println("Filter ID is required to delete mapping.")
		return false
	}

	// Initialize database connection
	db := database.DB

	// Delete filter mappings with the given Filter ID
	if err := db.Where("filter_id = ?", FilterID).Delete(&models.FilterDataBlockMapping{}).Error; err != nil {
		log.Printf("Error deleting Filter Mapping for Filter ID %d: %v", FilterID, err)
		return false
	}

	log.Printf("Filter Mapping for Filter ID %d deleted successfully.", FilterID)
	return true
}
func GetFilter(ID int) (models.FilRes, error) {
	var filter models.Filter
	var filRes models.FilRes

	// Establish a connection with the database
	db := database.DB

	// Fetch the Filter by ID and ensure it is active (status = 1)
	err := db.Where("id = ? AND status = ?", ID, 1).Take(&filter).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("Filter with ID %d not found or inactive: %v", ID, err)
			return filRes, fmt.Errorf("Filter not found or inactive")
		}
		log.Printf("Error fetching Filter with ID %d: %v", ID, err)
		return filRes, fmt.Errorf("error fetching Filter: %v", err)
	}

	// Map Filter model to FilRes struct
	filRes = models.FilRes{
		ID:               filter.ID,
		Name:             filter.Name,
		Query:            filter.Query,
		Status:           filter.Status,
		Type:             filter.Type,
		SetID:            filter.SetID,
		VarID:            filter.VarID,
		ColumnID:         filter.ColumnID,
		D_Type:           filter.D_Type,
		OrganizationID:   filter.OrganizationID,
		CreatedByID:      filter.CreatedByID,
		CreatedDate:      filter.CreatedDate,
		LastModifiedBy:   filter.LastModifiedBy,
		LastModifiedDate: filter.LastModifiedDate,
		DeactivateByID:   filter.DeactivateByID,
		DeactivateDate:   filter.DeactivateDate,
	}

	return filRes, nil
}
func GetAllFilters(user models.User) models.Response {
	var filters []models.Filter
	var filterResponses []models.FilRes
	var response models.Response

	// Establish a connection with the database
	db := database.DB

	// Fetch all active filters for the given organization ID
	err := db.Where("status = ? AND organization_id = ?", 1, user.OrganizationID).Find(&filters).Error
	if err != nil {
		log.Printf("Error fetching Filters for organization ID %d: %v", user.OrganizationID, err)
		response.Message = "Failed to fetch Filters"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Map the Filter model to FilRes
	for _, filter := range filters {
		filterResponses = append(filterResponses, models.FilRes{
			ID:               filter.ID,
			Name:             filter.Name,
			Query:            filter.Query,
			Status:           filter.Status,
			Type:             filter.Type,
			SetID:            filter.SetID,
			VarID:            filter.VarID,
			ColumnID:         filter.ColumnID,
			D_Type:           filter.D_Type,
			OrganizationID:   filter.OrganizationID,
			CreatedByID:      filter.CreatedByID,
			CreatedDate:      filter.CreatedDate,
			LastModifiedBy:   filter.LastModifiedBy,
			LastModifiedDate: filter.LastModifiedDate,
			DeactivateByID:   filter.DeactivateByID,
			DeactivateDate:   filter.DeactivateDate,
		})
	}

	// Build the response
	response.Message = "Filter data fetched successfully"
	response.Data = filterResponses
	response.Code = http.StatusOK
	response.Total = len(filterResponses)

	return response
}

func GetFiltersByDashboardID(ID int) ([]models.FilRes, error) {
	var filterMappings []models.FilterDataBlockMapping
	var filters []models.Filter
	var filterResponses []models.FilRes

	// Establish a connection with the database
	db := database.DB

	// Fetch all filter mappings for the given dashboard ID
	err := db.Where("dashboard_id = ?", ID).Find(&filterMappings).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("No filters found for dashboard ID %d: %v", ID, err)
			return nil, fmt.Errorf("No filters found for the given dashboard ID")
		}
		log.Printf("Error fetching filter mappings for dashboard ID %d: %v", ID, err)
		return nil, fmt.Errorf("Error fetching filter mappings: %v", err)
	}

	// Extract FilterIDs from the fetched mappings
	filterIDs := make([]int, len(filterMappings))
	for i, mapping := range filterMappings {
		filterIDs[i] = mapping.FilterID
	}

	// Fetch filters based on the extracted FilterIDs
	err = db.Where("id IN ?", filterIDs).Find(&filters).Error
	if err != nil {
		log.Printf("Error fetching filters for IDs %v: %v", filterIDs, err)
		return nil, fmt.Errorf("Error fetching filters: %v", err)
	}

	// Map Filter model data to FilRes model
	for _, filter := range filters {
		filterResponses = append(filterResponses, models.FilRes{
			ID:               filter.ID,
			Name:             filter.Name,
			Query:            filter.Query,
			Status:           filter.Status,
			Type:             filter.Type,
			SetID:            filter.SetID,
			VarID:            filter.VarID,
			ColumnID:         filter.ColumnID,
			D_Type:           filter.D_Type,
			OrganizationID:   filter.OrganizationID,
			CreatedByID:      filter.CreatedByID,
			CreatedDate:      filter.CreatedDate,
			LastModifiedBy:   filter.LastModifiedBy,
			LastModifiedDate: filter.LastModifiedDate,
			DeactivateByID:   filter.DeactivateByID,
			DeactivateDate:   filter.DeactivateDate,
		})
	}

	return filterResponses, nil
}

func ApplyFilter(filterID int, datablockID int, query string, selectedValues []string) string {
	var response models.Response

	// Create a connection with the database
	db := database.DB
	var filter models.Filter
	// Fetch the FilterDataBlockMapping record to be updated
	var FilterDataBlockMapping models.FilterDataBlockMapping

	log.Println("_________________________________________________________________________________________________________________________________________")
	log.Println(filterID)
	log.Println(datablockID)

	log.Println("_________________________________________________________________________________________________________________________________________")
	if err := db.Where("filter_id = ? AND data_block_id = ?", filterID, datablockID).First(&FilterDataBlockMapping).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("No FilterDataBlockMapping found for filter ID %d and datablock ID %d", filterID, datablockID)
			response.Message = "No FilterDataBlockMapping found"
			response.Code = http.StatusNotFound
			return query
		} else {
			log.Printf("Error fetching FilterDataBlockMapping for filter ID %d and datablock ID %d: %v", filterID, datablockID, err)
			response.Message = "Unable to fetch FilterDataBlockMapping"
			response.Code = http.StatusInternalServerError
			return query
		}
		log.Println(query)
		return query
	}
	if err := db.Where("id = ? ", filterID).First(&filter).Error; err != nil {
		log.Printf("Error fetching FilterDataBlockMapping for filter ID %d and datablock ID %d: %v", filterID, datablockID, err)
		response.Message = "Unable to fetch FilterDataBlockMapping"
		response.Code = http.StatusInternalServerError
		return query
	}

	// Get query
	// var query string
	// // Fetch the full name of the filter (schema.table.column) using GetName
	// email := r.Context().Value("LoggedUserEmail").(string)

	// user := user.GetLoggedUser(email)

	schema, tableName, columnName, err := GetName(filterID, filter.OrganizationID)
	if err != nil {
		log.Printf("Error fetching full name for filter ID %d: %v", filterID, err)
		response.Message = "Unable to fetch full name"
		response.Code = http.StatusInternalServerError

		return query
	}
	// fmt.Println(fullName)
	// Get filter column name
	// var columnName string
	// Get filter table name
	// var tableName string
	// Get filter schema name
	// var schema string
	fmt.Println("schema name:%s table name:%s column name:%s", schema, tableName, columnName)
	// Get filter database name
	// var database string

	foundQuery, is_found := findTableInQuery(query, "", schema, tableName, columnName, selectedValues)

	// if findTableInQuery(query, database, schema, tableName, columnName) {
	if is_found {
		fmt.Println("Table found")
	} else {
		fmt.Println("Table not found")
	}

	return foundQuery
}

func findTableInQuery(query, database, schema, table, columnName string, selectedValues []string) (string, bool) {
	// Define regex patterns to match the table in various formats
	// patterns := []string{
	// 	fmt.Sprintf(`"%s"\."%s"\."%s"`, database, schema, table),
	// 	fmt.Sprintf(`"%s"\."%s"\.%s`, database, schema, table),
	// 	fmt.Sprintf(`"%s"\.%s\.%s`, database, schema, table),
	// 	fmt.Sprintf(`%s\."%s"\."%s"`, database, schema, table),
	// 	fmt.Sprintf(`%s\."%s"\.%s`, database, schema, table),
	// 	fmt.Sprintf(`"%s"\.%s\."%s"`, database, schema, table),
	// 	fmt.Sprintf(`%s\.%s\."%s"`, database, schema, table),
	// 	fmt.Sprintf(`%s\.%s\.%s`, database, schema, table),
	// 	fmt.Sprintf(`%s\.%s`, schema, table),
	// 	fmt.Sprintf(`"%s"\.%s`, schema, table),
	// 	fmt.Sprintf(`%s\."%s"`, schema, table),
	// 	fmt.Sprintf(`"%s"\."%s"`, schema, table),
	// 	fmt.Sprintf(`"%s"`, table),
	// 	table,
	// }
	fmt.Println("schema name:%s ,table name:%s ,column name:%s ,Query:%s,selected values: %s", schema, table, columnName, query, selectedValues)
	patterns := []string{
		// fmt.Sprintf(`\b"%s"\."%s"\."%s"\b`, database, schema, table),
		// fmt.Sprintf(`\b"%s"\."%s"\.%s\b`, database, schema, table),
		// fmt.Sprintf(`\b"%s"\.%s\.%s\b`, database, schema, table),
		// fmt.Sprintf(`\b%s\."%s"\."%s"\b`, database, schema, table),
		// fmt.Sprintf(`\b%s\."%s"\.%s\b`, database, schema, table),
		// fmt.Sprintf(`\b"%s"\.%s\."%s"\b`, database, schema, table),
		// fmt.Sprintf(`\b%s\.%s\."%s"\b`, database, schema, table),
		// fmt.Sprintf(`\b%s\.%s\.%s\b`, database, schema, table),
		fmt.Sprintf(`\b%s\.%s\b`, schema, table),
		fmt.Sprintf(`\b"%s"\.%s\b`, schema, table),
		fmt.Sprintf(`\b%s\."%s"\b`, schema, table),
		fmt.Sprintf(`\b"%s"\."%s"\b`, schema, table),
		fmt.Sprintf(`\b"%s"\b`, table),
		`\b` + table + `\b`,
	}

	// // Compile and check each pattern
	// for _, pattern := range patterns {
	// 	re := regexp.MustCompile(pattern)
	// 	matches := re.FindStringIndex(query)
	// 	if matches != nil {
	// 		// Check for WHERE, AS, or alias after the table
	// 		subQuery := query[matches[1]:]
	// 		subQuery = strings.TrimSpace(subQuery)
	// 		if strings.HasPrefix(strings.ToUpper(subQuery), "WHERE") {
	// 			addColumnToWhereClause(&query, "new_column", []string{"value1", "value2"})
	// 			return true
	// 		}
	// 		if strings.HasPrefix(strings.ToUpper(subQuery), "AS") || isAliasPresent(subQuery) {
	// 			replaceTableWithSubquery(&query, table, "col", []string{"value1", "value2"})
	// 			return true
	// 		}
	// 		// Add a WHERE clause if not present
	// 		if !strings.Contains(strings.ToUpper(query), "WHERE") {
	// 			addWhereClause(&query, "new_column", []string{"value1", "value2"})
	// 			return true
	// 		}
	// 	}
	// }

	// Compile and check each pattern
	for _, pattern := range patterns {
		re := regexp.MustCompile(pattern)
		matches := re.FindStringIndex(query)
		if matches != nil {
			// Replace the table with the subquery
			replaceTableWithSubquery(&query, query, database, schema, table, columnName, selectedValues)
			fmt.Println(": " + query)
			return query, true
		}
	}

	return query, false
}

func replaceTableWithSubquery(query *string, originalQuery, database, schema, table, columnName string, values []string) {
	// Dereference the *string pointer to work with the query value
	q := *query

	// Convert query to lowercase for case-insensitive search but do not modify the original query
	qLower := strings.ToLower(q)

	// Find where the table is located in the query (case-insensitive)
	tableIndex := strings.Index(qLower, strings.ToLower(table))
	// fmt.Println(tableIndex)
	if tableIndex == -1 {
		return
	}

	tableEndIndex := tableIndex + len(table)
	// fmt.Println(tableEndIndex)

	// Find the last occurrence of "FROM" before the table (case-insensitive)
	fromIndex := strings.LastIndex(qLower[:tableIndex], "from")
	// fmt.Println(fromIndex)
	if fromIndex == -1 {
		return
	}

	// Extract the part from FROM to the table (case-insensitive)
	fromToTablePart := q[fromIndex+len("FROM ") : tableIndex]
	// fmt.Println(q[fromIndex : tableEndIndex+1])
	fmt.Println(fromToTablePart)

	existingName := q[fromIndex+len("FROM ") : tableEndIndex+1]

	fmt.Println(existingName[:len(existingName)-len(table)])

	if strings.HasSuffix(existingName, ")") {
		existingName = existingName[:len(existingName)-len(")")]
	}

	fmt.Println(existingName)

	// fullyQualifiedTable := fmt.Sprintf("%s.%s.%s", database, schema, table)
	// fmt.Println(fullyQualifiedTable)
	// if !strings.Contains(fullyQualifiedTable, " ") {
	// 	fromToTablePart = strings.TrimSpace(fromToTablePart)
	// }

	// Create the subquery to replace the table
	valueList := strings.Join(values, "', '")
	// subQuery := fmt.Sprintf("(SELECT * FROM %s.%s.%s WHERE %s IN ('%s')) ", database, schema, table, columnName, valueList)
	subQuery := fmt.Sprintf("(SELECT * FROM %s.%s WHERE %s IN ('%s')) ", schema, table, columnName, valueList)

	fmt.Println(fromToTablePart + subQuery)

	// Replace the portion from FROM to table with the subquery
	*query = strings.Replace(*query, existingName, subQuery, 1)
	// *query = strings.Replace(*query, fromToTablePart+table, fromToTablePart+subQuery, 1)
}
func GetName(ID, orgID int) (string, string, string, error) {
	var filter models.Filter
	var schemaName, tableName, columnName string
	var set models.Set
	var variable models.Variables

	db := database.DB

	// Construct the dynamic table names based on orgID
	schemaTable := fmt.Sprintf("org_tables.schema_names_%d", orgID)
	tableTable := fmt.Sprintf("org_tables.table_names_%d", orgID)
	columnTable := fmt.Sprintf("org_tables.column_names_%d", orgID)

	// Fetch the filter
	err := db.Where("id = ? AND status = ?", ID, 1).First(&filter).Error
	if err != nil {
		log.Printf("Error fetching filter with ID %d: %v", ID, err)
		return "", "", "", fmt.Errorf("error fetching filter: %v", err)
	}

	// Fetch the associated Set
	err = db.Where("id = ?", filter.SetID).First(&set).Error
	if err != nil {
		log.Printf("Error fetching Set with ID %d: %v", filter.SetID, err)
		return "", "", "", fmt.Errorf("error fetching set: %v", err)
	}

	// Fetch the associated Variable
	err = db.Where("id = ?", filter.VarID).First(&variable).Error
	if err != nil {
		log.Printf("Error fetching Variable with ID %d: %v", filter.VarID, err)
		return "", "", "", fmt.Errorf("error fetching variable: %v", err)
	}

	// Fetch schema name using SchemaID
	err = db.Table(schemaTable).
		Select("name").
		Where("id = ?", set.SchemaID).
		Scan(&schemaName).Error
	if err != nil {
		log.Printf("Error fetching schema name for SchemaID %d in table %s: %v", set.SchemaID, schemaTable, err)
		return "", "", "", fmt.Errorf("error fetching schema name: %v", err)
	}

	// Fetch table name using Variable.TableID
	err = db.Table(tableTable).
		Select("name").
		Where("id = ?", variable.TableID).
		Scan(&tableName).Error
	if err != nil {
		log.Printf("Error fetching table name for TableID %d in table %s: %v", variable.TableID, tableTable, err)
		return "", "", "", fmt.Errorf("error fetching table name: %v", err)
	}

	// Fetch column name using ColumnID, TableID, and SchemaID
	err = db.Table(columnTable).
		Select("name").
		Where("id = ? AND table_id = ? AND schema_id = ?", filter.ColumnID, variable.TableID, set.SchemaID).
		Scan(&columnName).Error
	if err != nil {
		log.Printf("Error fetching column name for ColumnID %d in table %s: %v", filter.ColumnID, columnTable, err)
		return "", "", "", fmt.Errorf("error fetching column name: %v", err)
	}

	return schemaName, tableName, columnName, nil
}

func GetFiltersBySetID(setID int) ([]models.FilRes, error) {
	var filters []models.Filter
	var filterResponses []models.FilRes

	// Establish a connection with the database
	db := database.DB

	// Fetch all filters for the given SetID
	err := db.Where("set_id = ?", setID).Find(&filters).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			log.Printf("No filters found for SetID %d: %v", setID, err)
			return nil, fmt.Errorf("no filters found for the given SetID")
		}
		log.Printf("Error fetching filters for SetID %d: %v", setID, err)
		return nil, fmt.Errorf("error fetching filters: %v", err)
	}

	// Map Filter model data to FilRes model
	for _, filter := range filters {
		filterResponses = append(filterResponses, models.FilRes{
			ID:               filter.ID,
			Name:             filter.Name,
			Query:            filter.Query,
			Status:           filter.Status,
			Type:             filter.Type,
			SetID:            filter.SetID,
			VarID:            filter.VarID,
			ColumnID:         filter.ColumnID,
			D_Type:           filter.D_Type,
			OrganizationID:   filter.OrganizationID,
			CreatedByID:      filter.CreatedByID,
			CreatedDate:      filter.CreatedDate,
			LastModifiedBy:   filter.LastModifiedBy,
			LastModifiedDate: filter.LastModifiedDate,
			DeactivateByID:   filter.DeactivateByID,
			DeactivateDate:   filter.DeactivateDate,
		})
	}

	return filterResponses, nil
}
