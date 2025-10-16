package utils

import (
	"DynViz/internal/database"
	"DynViz/models"
	querymaster "DynViz/pkg/querymaster"
	"bytes"
	"encoding/csv"
	"encoding/gob"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math"
	"math/rand"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/xuri/excelize/v2"
	"gorm.io/gorm"

	"crypto/aes"
	"crypto/cipher"
	cryptoRand "crypto/rand" // Alias for crypto/rand
	"encoding/base64"
	"io"
)

var (
	idCounter int64
	mu        sync.Mutex
)

// demo line

func getNextID() int64 {
	mu.Lock()
	defer mu.Unlock()
	idCounter++
	return idCounter
}

func generateTimestampBasedID() int64 {
	timestamp := int64(time.Now().UnixNano())
	id := (timestamp << 16) | (getNextID() & 0xFFFF)
	return id
}

func CountryCodeExists(countryCode string) bool {
	db := database.DB

	var count int64
	err := db.Model(&models.CountryCode{}).Where("country_code = ?", countryCode).Count(&count).Error
	if err != nil {
		log.Println("Error querying country code:", err)
		return false
	}

	return count > 0
}

func CountryExists(country string) bool {
	db := database.DB

	var count int64
	err := db.Model(&models.CountryCode{}).Where("country = ?", country).Count(&count).Error
	if err != nil {
		log.Println("Error querying country:", err)
		return false
	}

	return count > 0
}
func MatchCodeAndCountry(countryCode, country string) bool {

	db := database.DB

	var count int64
	err := db.Model(&models.CountryCode{}).Where("country_code = ? AND country = ?", countryCode, country).Count(&count).Error
	if err != nil {
		log.Println("Error querying country and country code:", err)
		return false
	}

	return count > 0
}

// func ValidateCountryCode(countryCode string) bool {
// 	return CountryCodeExists(countryCode)
// }

// func ValidateCountry(country string) bool {
// 	return CountryExists(country)
// }

// if CountryExists(Country, countries) {
// 	return true
// } else {
// 	return false
// }

func IsActive(status int) bool {
	return status == 1
}

func GetCountryCode(country string) models.Response {
	var CountryCode []string
	var response models.Response

	// creating connection with database
	db := database.DB

	// Query the database for country code details
	if err := db.Model(&models.CountryCode{}).Where("country = ?", country).Pluck("country_code", &CountryCode).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.Message = "Country Code Details not found for the provided country"
			response.Code = http.StatusNotFound
		} else {
			response.Message = "Failed to fetch country code data"
			response.Code = http.StatusInternalServerError
		}
		return response
	}

	// Construct the response
	response.Message = "Data fetched successfully"
	response.Data = CountryCode
	response.Code = http.StatusOK
	return response
}

func GetAllCountries() models.Response {
	var countries []string
	var response models.Response

	// creating connection with database
	db := database.DB

	// Query the database for all country details
	if err := db.Model(&models.CountryCode{}).Pluck("country", &countries).Error; err != nil {
		response.Message = "Failed to fetch country data"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Construct the response
	response.Message = "Data fetched successfully"
	response.Data = countries
	response.Code = http.StatusOK
	return response
}

func ParseMenuID(menuID string) int {
	// Your logic to parse string menuID to int
	// Assuming menuID is always a valid integer string
	id, _ := strconv.ParseInt(menuID, 10, 64)
	return int(id)
}

// GenerateUniqueRandomInt generates a random integer of 5 to 7 digits and ensures it's unique
func GenerateUniqueRandomInt(minDigits, maxDigits int) (int, error) {
	// rand.Seed(time.Now().UnixNano()) // Seed with current time for randomness

	for {
		// Generate random number of digits between min and max
		numDigits := minDigits + rand.Intn(maxDigits-minDigits+1)

		// Create a slice to hold digits (initially zeros)
		digits := make([]int, numDigits)
		for i := range digits {
			digits[i] = 0
		}

		// Fill the slice with random digits (1-9)
		for i := range digits {
			digits[i] = 1 + rand.Intn(9)
		}

		// Convert slice to integer (handling potential overflow for 7 digits)
		var number int64
		for i, digit := range digits {
			number += int64(digit) * int64(math.Pow10(numDigits-i-1))
			if number > math.MaxInt32 && numDigits == 7 {
				// If overflow occurs while generating 7 digits, restart
				continue
			}
		}

		// Check if number already exists in a set (use map for efficient lookup)
		seen := make(map[int64]bool)
		if _, ok := seen[number]; !ok {
			seen[number] = true
			return int(number), nil // Convert to int and return
		}
	}
}

func PrepareResponse(w http.ResponseWriter, response models.Response) {
	// prepare response
	responseData, err := json.Marshal(response)
	if err != nil {
		// Handle error gracefully, log it, and return an appropriate error response
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// write status
	w.WriteHeader(response.Code)

	// write response
	w.Write(responseData)

	// set header type
	w.Header().Set("Content-Type", "application/json")

	// Set content length for efficiency
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
}

// func CascadeDelete(branchElement string, ID int, loggeduserID int) models.Response {
// 	var response models.Response

// 	update := map[string]interface{}{
// 		"status":             0,
// 		"last_modified_by":   loggeduserID,
// 		"last_modified_date": time.Now(),
// 		"deactivate_by_id":   loggeduserID,
// 		"deactivate_date":    time.Now(),
// 	}
// 	var branch []string
// 	items := []string{"organization", "project", "folder", "dashboard", "tile"}
// 	for i := range items {
// 		if items[i] == branchElement {
// 			branch = items[i+1:]
// 		}

// 	}
// 	print(branch)
// 	response.Message = "brach printed"
// 	return response

// }

// NameValidationfunc checks if the input string is empty, contains only whitespace, or contains special characters
func NameValidationfunc(NameValidationfunc string) bool {

	// Check if the input string is empty or contains only whitespace
	if strings.TrimSpace(NameValidationfunc) == "" {
		return false
	}

	// Define a regex pattern that matches any special symbols, double quotes, or single quotes
	specialCharPattern := `[^\w\s]` // This pattern allows only alphanumeric characters and whitespace

	// Compile the regex
	specialCharRegex := regexp.MustCompile(specialCharPattern)

	// Check if the input string contains any special characters, double quotes, or single quotes
	if specialCharRegex.MatchString(NameValidationfunc) {
		return false
	}

	// If the input is valid, you can set the appropriate response
	return true
}

// EncryptAES encrypts the given plaintext using AES encryption with a key from environment variable
func EncryptAES(plaintext string) (string, error) {
	key := []byte("dynviz_secure_key_256_2024") // 32 bytes key for AES-256
	if len(key) != 16 && len(key) != 24 && len(key) != 32 {
		return "", errors.New("key length must be 16, 24, or 32 bytes")
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	ciphertext := make([]byte, aes.BlockSize+len(plaintext))
	iv := ciphertext[:aes.BlockSize]

	if _, err := io.ReadFull(cryptoRand.Reader, iv); err != nil {
		return "", err
	}

	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], []byte(plaintext))

	return base64.StdEncoding.EncodeToString(ciphertext), nil
}

const key = "12345678901234567890123456789012"

// DecryptAES decrypts the given base64 encoded ciphertext using AES encryption with a key from environment variable
func DecryptAES(ciphertextBase64 string) (string, error) {

	// 32-byte key for AES-256

	// Convert the key to []byte
	keyBytes := []byte(key)

	ciphertext, err := base64.StdEncoding.DecodeString(ciphertextBase64)
	if err != nil {
		return "", err
	}

	if len(ciphertext) < aes.BlockSize {
		return "", errors.New("ciphertext too short")
	}

	// Extract the IV
	iv := ciphertext[:aes.BlockSize]
	ciphertext = ciphertext[aes.BlockSize:]

	block, err := aes.NewCipher(keyBytes)
	if err != nil {
		return "", err
	}

	// Create a stream for decryption
	stream := cipher.NewCFBDecrypter(block, iv)

	// Decrypt the data
	plaintext := make([]byte, len(ciphertext))
	stream.XORKeyStream(plaintext, ciphertext)
	fmt.Println(string(plaintext))
	return string(plaintext), nil
}

func ParseCSV(file *os.File) ([]string, [][]string, error) {
	reader := csv.NewReader(file)
	headers, err := reader.Read() // Read the first line for headers
	if err != nil {
		return nil, nil, err
	}

	var records [][]string
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, nil, err
		}
		records = append(records, record)
	}

	return headers, records, nil
}

// parseExcel reads an Excel file and returns headers and records from the first sheet
func ParseExcel(filePath string) ([]string, [][]string, error) {
	f, err := excelize.OpenFile(filePath)
	if err != nil {
		return nil, nil, err
	}
	defer f.Close()

	// Assume the first sheet
	sheetName := f.GetSheetName(1)
	rows, err := f.GetRows(sheetName)
	if err != nil || len(rows) == 0 {
		return nil, nil, fmt.Errorf("error reading rows or no data found")
	}

	headers := rows[0]
	records := rows[1:] // Skip the header row

	return headers, records, nil
}

func CheckFileInDB(filename string, LoggedUser models.User) bool {
	var FileUpload models.FileUpload
	db := database.DB

	if err := db.Where("name = ?", filename).First(&FileUpload).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// No record found
			return true
		}
	}
	// Record found
	return false
}

// Reformat a single value into the desired JSON structure
func Reformattext(cellResult interface{}) (json.RawMessage, error) {
	// Create the desired JSON structure
	resultJSON := map[string]interface{}{
		// "name":  nil, // You can use nil if you want the value to be null in JSON
		"value": cellResult,
	}

	// Marshal the resultJSON into JSON
	queryResponseJSON, err := json.Marshal(resultJSON)
	if err != nil {
		fmt.Println("error in marshaling reformattext result")
		return nil, err
	}

	return json.RawMessage(queryResponseJSON), nil
}

// Reformat a table structure (multiple rows and columns)
func Reformattable(columns []string, rows [][]interface{}) (json.RawMessage, error) {
	// Create the desired JSON structure for a table
	resultTable := map[string]interface{}{
		"columns": columns,
		"rows":    rows,
	}

	// Marshal the resultTable into JSON
	queryResponseJSON, err := json.Marshal(resultTable)
	if err != nil {
		fmt.Println("error in marshaling reformattable result")
		return nil, err
	}

	return json.RawMessage(queryResponseJSON), nil
}
func ReformatComboChart(cellResult json.RawMessage) (json.RawMessage, json.RawMessage, json.RawMessage, error) {
	// Define a structure matching the input JSON
	var result struct {
		Columns []string        `json:"columns"`
		Rows    [][]interface{} `json:"rows"`
	}

	// Unmarshal the input JSON into the structure
	if err := json.Unmarshal(cellResult, &result); err != nil {
		return nil, nil, nil, fmt.Errorf("error unmarshaling combo chart data: %w", err)
	}

	// Validate that we have a header row and at least one data row with at least two columns
	if len(result.Rows) < 2 || len(result.Columns) < 2 {
		return nil, nil, nil, fmt.Errorf("insufficient data to reformat combo chart")
	}

	// Extract x-axis labels from the first column (skip header row)
	var xAxisLabels []interface{}
	for i := 1; i < len(result.Rows); i++ {
		row := result.Rows[i]
		if len(row) > 0 {
			xAxisLabels = append(xAxisLabels, row[0])
		} else {
			xAxisLabels = append(xAxisLabels, nil)
		}
	}

	// Number of series = total columns minus 1 (first column is x-axis labels)
	numSeries := len(result.Columns) - 1

	// Create the series array, one object per series column
	seriesArr := make([]map[string]interface{}, numSeries)
	for j := 0; j < numSeries; j++ {
		seriesArr[j] = map[string]interface{}{
			"name":  result.Columns[j+1],
			"type":  "bar",  // default type; modify as needed
			"yAxis": "left", // default yAxis assignment; modify as needed
			"data":  []interface{}{},
		}
	}

	// Populate series data from each row (starting at row 1, skipping header)
	for i := 1; i < len(result.Rows); i++ {
		row := result.Rows[i]
		for j := 1; j < len(result.Columns); j++ {
			if j < len(row) {
				seriesArr[j-1]["data"] = append(seriesArr[j-1]["data"].([]interface{}), row[j])
			} else {
				seriesArr[j-1]["data"] = append(seriesArr[j-1]["data"].([]interface{}), nil)
			}
		}
	}

	// Create the yAxis array with corresponding series names
	yaxisArr := make([]map[string]interface{}, numSeries)
	for j := 0; j < numSeries; j++ {
		yaxisArr[j] = map[string]interface{}{
			"seriesName": result.Columns[j+1],
			"title": map[string]interface{}{
				"text": result.Columns[j+1],
			},
			"opposite": false, // Default setting; modify if needed
		}
	}

	// Marshal the x-axis labels, series array, and yAxis configuration into JSON
	xAxisJSON, err := json.Marshal(xAxisLabels)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("error marshaling x-axis labels: %w", err)
	}

	seriesJSON, err := json.Marshal(seriesArr)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("error marshaling series data: %w", err)
	}

	yAxisJSON, err := json.Marshal(yaxisArr)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("error marshaling yAxis data: %w", err)
	}

	// Debug print statements
	fmt.Println("yAxisData---------------------------------------------------------------------------------------------")
	fmt.Println(string(yAxisJSON))
	fmt.Println("yAxisData---------------------------------------------------------------------------------------------")

	// Return the three JSON values
	return json.RawMessage(xAxisJSON), json.RawMessage(seriesJSON), json.RawMessage(yAxisJSON), nil
}

func Reformatpie(cellResult json.RawMessage) (json.RawMessage, json.RawMessage, error) {
	// Define a structure to unmarshal the cell result
	var result struct {
		Columns []string        `json:"columns"`
		Rows    [][]interface{} `json:"rows"`
	}

	// Print the raw input for debugging
	fmt.Printf("Raw cellResult: %s\n", string(cellResult))

	// Unmarshal the cellResult into the result structure
	err := json.Unmarshal(cellResult, &result)
	if err != nil {
		fmt.Println("Error unmarshaling cell result for pie chart")
		return nil, nil, err
	}

	// Print the parsed result for debugging
	// fmt.Printf("Parsed result: %+v\n", result)

	// Ensure there are rows and at least two columns for pie chart formatting
	if len(result.Rows) == 0 || len(result.Columns) < 2 {
		return nil, nil, fmt.Errorf("insufficient data to reformat pie chart")
	}

	// Create labels using the first column and series using the second column
	var labels []interface{}
	var series []interface{}

	if len(result.Rows) >= 2 {
		for _, row := range result.Rows {
			if len(row) > 0 {
				labels = append(labels, row[0]) // First column holds labels
			} else {
				labels = append(labels, nil)
			}

			if len(row) > 1 {
				if row[1] != nil {
					series = append(series, row[1]) // Second column holds series data
				} else {
					series = append(series, 0) // Handle null or missing values
				}
			} else {
				series = append(series, 0) // Ensure series has a value
			}
		}
	} else {
		for _, label := range result.Columns {
			labels = append(labels, label)
		}

		for _, value := range result.Rows[0] {
			series = append(series, value)
		}

	}
	// Print the labels and series for debugging
	// fmt.Printf("Labels: %+v\n", labels)
	// fmt.Printf("Series: %+v\n", series)

	//check for type of series element and convert them into number
	convertedseries, err := ConvertToNumber(series)
	if err != nil {
		fmt.Println("Error converting labels:", err)
		return nil, nil, err
	}

	// Marshal labels and series into JSON
	labelsJSON, err := json.Marshal(CheckNullForLabels(labels))
	if err != nil {
		fmt.Println("Error marshaling labels for pie chart")
		return nil, nil, err
	}

	seriesJSON, err := json.Marshal(convertedseries)
	if err != nil {
		fmt.Println("Error marshaling series for pie chart")
		return nil, nil, err
	}

	// Debug print: Convert the JSON back to a string to inspect it
	// fmt.Printf("Labels JSON: %s\n", string(labelsJSON))
	// fmt.Printf("Series JSON: %s\n", string(seriesJSON))

	return json.RawMessage(labelsJSON), json.RawMessage(seriesJSON), nil
}

func Reformatdonut(cellResult json.RawMessage) (json.RawMessage, json.RawMessage, error) {
	// Define a structure to unmarshal the cell result
	var result struct {
		Columns []string        `json:"columns"`
		Rows    [][]interface{} `json:"rows"`
	}

	// Print the raw input for debugging
	fmt.Printf("Raw cellResult: %s\n", string(cellResult))

	// Unmarshal the cellResult into the result structure
	err := json.Unmarshal(cellResult, &result)
	if err != nil {
		fmt.Println("Error unmarshaling cell result for pie chart")
		return nil, nil, err
	}

	// Print the parsed result for debugging
	// fmt.Printf("Parsed result: %+v\n", result)

	// Ensure there are rows and at least two columns for pie chart formatting
	if len(result.Rows) == 0 || len(result.Columns) < 2 {
		return nil, nil, fmt.Errorf("insufficient data to reformat donut chart")
	}

	// Create labels using the first column and series using the second column
	var labels []interface{}
	var series []interface{}

	if len(result.Rows) >= 2 {
		for _, row := range result.Rows {
			if len(row) > 0 {
				labels = append(labels, row[0]) // First column holds labels
			} else {
				labels = append(labels, nil)
			}

			if len(row) > 1 {
				if row[1] != nil {
					series = append(series, row[1]) // Second column holds series data
				} else {
					series = append(series, 0) // Handle null or missing values
				}
			} else {
				series = append(series, 0) // Ensure series has a value
			}
		}
	} else {
		for _, label := range result.Columns {
			labels = append(labels, label)
		}

		for _, value := range result.Rows[0] {
			series = append(series, value)
		}

	}
	// Print the labels and series for debugging
	// fmt.Printf("Labels: %+v\n", labels)
	// fmt.Printf("Series: %+v\n", series)

	//check for type of series element and convert them into number
	convertedseries, err := ConvertToNumber(series)
	if err != nil {
		fmt.Println("Error converting labels:", err)
		return nil, nil, err
	}

	// Marshal labels and series into JSON
	labelsJSON, err := json.Marshal(CheckNullForLabels(labels))
	if err != nil {
		fmt.Println("Error marshaling labels for pie chart")
		return nil, nil, err
	}

	seriesJSON, err := json.Marshal(convertedseries)
	if err != nil {
		fmt.Println("Error marshaling series for pie chart")
		return nil, nil, err
	}

	// Debug print: Convert the JSON back to a string to inspect it
	// fmt.Printf("Labels JSON: %s\n", string(labelsJSON))
	// fmt.Printf("Series JSON: %s\n", string(seriesJSON))

	return json.RawMessage(labelsJSON), json.RawMessage(seriesJSON), nil
}

// func Reformatbar(cellResult json.RawMessage) (json.RawMessage, json.RawMessage, error) {
//     // Define a structure to unmarshal the cell result
//     var result struct {
//         Columns []string        `json:"columns"`
//         Rows    [][]interface{} `json:"rows"`
//     }

//     // Print the raw input for debugging
//     fmt.Printf("Raw cellResult: %s\n", string(cellResult))

func ReformatBarChart(cellResult json.RawMessage) (json.RawMessage, json.RawMessage, error) {
	// Define a structure to unmarshal the cell result
	var result struct {
		Columns []string        `json:"columns"`
		Rows    [][]interface{} `json:"rows"`
	}

	// Print the raw input for debugging
	fmt.Printf("Raw cellResult: %s\n", string(cellResult))

	// Unmarshal the cellResult into the result structure
	err := json.Unmarshal(cellResult, &result)
	if err != nil {
		fmt.Println("Error unmarshaling cell result for pie chart")
		return nil, nil, err
	}

	// Print the parsed result for debugging
	// fmt.Printf("Parsed result: %+v\n", result)

	// Ensure there are rows and at least two columns for pie chart formatting
	if len(result.Rows) == 0 || len(result.Columns) < 2 {
		return nil, nil, fmt.Errorf("insufficient data to reformat pie chart")
	}

	// Create labels using the first column and series using the second column
	var labels []interface{}
	var series []interface{}

	if len(result.Rows) >= 2 {
		for _, row := range result.Rows {
			if len(row) > 0 {
				labels = append(labels, row[0]) // First column holds labels
			} else {
				labels = append(labels, nil)
			}

			if len(row) > 1 {
				if row[1] != nil {
					series = append(series, row[1]) // Second column holds series data
				} else {
					series = append(series, 0) // Handle null or missing values
				}
			} else {
				series = append(series, 0) // Ensure series has a value
			}
		}
	} else {
		for _, label := range result.Columns {
			labels = append(labels, label)
		}

		for _, value := range result.Rows[0] {
			series = append(series, value)
		}
	}
	// Print the labels and series for debugging
	// fmt.Printf("Labels: %+v\n", labels)
	// fmt.Printf("Series: %+v\n", series)

	//check for type of series element and convert them into number
	convertedseries, err := ConvertToNumber(series)
	if err != nil {
		fmt.Println("Error converting labels:", err)
		return nil, nil, err
	}
	// Marshal labels and series into JSON
	labelsJSON, err := json.Marshal(CheckNullForLabels(labels))
	if err != nil {
		fmt.Println("Error marshaling labels for Bar chart")
		return nil, nil, err
	}

	seriesJSON, err := json.Marshal(convertedseries)
	if err != nil {
		fmt.Println("Error marshaling series for Bar chart")
		return nil, nil, err
	}

	// Debug print: Convert the JSON back to a string to inspect it
	// fmt.Printf("Labels JSON: %s\n", string(labelsJSON))
	// fmt.Printf("Series JSON: %s\n", string(seriesJSON))

	return json.RawMessage(labelsJSON), json.RawMessage(seriesJSON), nil
}

// Reformat a table structure (multiple rows and columns) for a line chart
func ReformatLineChart(cellResult json.RawMessage) (json.RawMessage, error) {
	// Unmarshal the JSON result
	var data [][]interface{}
	if err := json.Unmarshal(cellResult, &data); err != nil {
		fmt.Println("error unmarshaling line chart data")
		return nil, err
	}

	if len(data) < 1 {
		return nil, fmt.Errorf("insufficient data to reformat line chart")
	}

	// Extract the labels and series for the line chart
	var labels []interface{}
	var series []map[string]interface{}

	for _, row := range data {
		if len(row) >= 2 {
			labels = append(labels, row[0]) // First column for labels
			series = append(series, map[string]interface{}{
				"name": row[0],  // Assuming name is in the first column
				"data": row[1:], // Remaining data goes into the series
			})
		}
	}

	// Prepare the result format for the line chart
	resultLine := map[string]interface{}{
		"Labels": labels,
		"Series": series,
	}

	// Marshal the result into JSON
	lineJSON, err := json.Marshal(resultLine)
	if err != nil {
		fmt.Println("error marshaling line chart result")
		return nil, err
	}

	return json.RawMessage(lineJSON), nil
}

func ConvertToNumber(labels []interface{}) ([]interface{}, error) {
	convertedLabels := make([]interface{}, len(labels))

	for i, label := range labels {
		switch v := label.(type) {
		case int, float64:
			// If the type is already int or float, keep it as is
			convertedLabels[i] = v
		case string:
			// Try to convert string to int
			if intValue, err := strconv.Atoi(v); err == nil {
				convertedLabels[i] = intValue
			} else {
				// Try to convert string to float
				if floatValue, err := strconv.ParseFloat(v, 64); err == nil {
					convertedLabels[i] = floatValue
				} else {
					// Leave it as a string if neither int nor float conversion works
					convertedLabels[i] = v
				}
			}
		default:
			// Keep it as is if the type doesn't match int, float, or string
			convertedLabels[i] = v
		}
	}

	return convertedLabels, nil
}

func CheckNullForLabels(Labels []interface{}) []interface{} {
	convertedLabels := make([]interface{}, len(Labels))
	for i, label := range Labels {
		if label != nil {
			convertedLabels[i] = label
		} else {
			convertedLabels[i] = "~"
		}

	}
	return convertedLabels
}

// CreateTables creates dynamic tables based on OrganizationID
func CreateTables(OrganizationID int) models.Response {
	var response models.Response
	db := database.GetPostgresDBConnection() // Get your DB connection

	// Dynamic table names based on OrganizationID
	schemaNamesTable := fmt.Sprintf("org_tables.schema_names_%d", OrganizationID)
	tableNamesTable := fmt.Sprintf("org_tables.table_names_%d", OrganizationID)
	columnNamesTable := fmt.Sprintf("org_tables.column_names_%d", OrganizationID)
	tempSchemaNamesTable := fmt.Sprintf("org_tables.temp_schema_names_%d", OrganizationID)
	tempTableNamesTable := fmt.Sprintf("org_tables.temp_table_names_%d", OrganizationID)

	// SQL queries to create the tables using the models
	createSchemaNamesTable := fmt.Sprintf(`
		CREATE TABLE IF NOT EXISTS %s (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) DEFAULT NULL,
			connection_id INT NOT NULL,
			is_mapped INT NOT NULL,
			is_found INT NOT NULL,
			Status INT,
			mapped INT DEFAULT 1,
			last_updated TIMESTAMP DEFAULT NOW()
		)`, schemaNamesTable)

	createTableNamesTable := fmt.Sprintf(`
		CREATE TABLE IF NOT EXISTS %s (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) DEFAULT NULL,
			Status INT,
			is_mapped INT NOT NULL,
			is_found INT NOT NULL,
			schema_id INT NOT NULL REFERENCES %s(id),
			connection_id INT NOT NULL,
			last_updated TIMESTAMP DEFAULT NOW()
		)`, tableNamesTable, schemaNamesTable)

	createColumnNamesTable := fmt.Sprintf(`
		CREATE TABLE IF NOT EXISTS %s (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) DEFAULT NULL,
			data_type VARCHAR(255) NOT NULL,

			schema_id INT NOT NULL REFERENCES %s(id),
			table_id INT NOT NULL REFERENCES %s(id),
			connection_id INT NOT NULL,
			last_updated TIMESTAMP DEFAULT NOW()
		)`, columnNamesTable, schemaNamesTable, tableNamesTable)

	createTempSchemaNamesTable := fmt.Sprintf(`
		CREATE TABLE IF NOT EXISTS %s (
			id SERIAL PRIMARY KEY,
			connection_id INT NOT NULL,
			name VARCHAR(255) DEFAULT NULL,
			is_mapped INT NOT NULL,
			is_found INT NOT NULL,
			last_updated TIMESTAMP DEFAULT NOW()
		)`, tempSchemaNamesTable)

	createTempTableNamesTable := fmt.Sprintf(`
		CREATE TABLE IF NOT EXISTS %s (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) DEFAULT NULL,
			is_mapped INT NOT NULL,
			is_found INT NOT NULL,
			schema_id INT NOT NULL ,
			connection_id INT NOT NULL,
			last_updated TIMESTAMP DEFAULT NOW()
		)`, tempTableNamesTable)

	// Execute the SQL queries to create the tables
	err := db.Exec(createSchemaNamesTable).Error
	if err != nil {
		response.Message = fmt.Sprintf("Failed to create table %s: %s", schemaNamesTable, err.Error())
		response.Code = http.StatusInternalServerError
		return response
	}

	err = db.Exec(createTableNamesTable).Error
	if err != nil {
		response.Message = fmt.Sprintf("Failed to create table %s: %s", tableNamesTable, err.Error())
		response.Code = http.StatusInternalServerError
		return response
	}

	err = db.Exec(createColumnNamesTable).Error
	if err != nil {
		response.Message = fmt.Sprintf("Failed to create table %s: %s", columnNamesTable, err.Error())
		response.Code = http.StatusInternalServerError
		return response
	}

	err = db.Exec(createTempSchemaNamesTable).Error
	if err != nil {
		response.Message = fmt.Sprintf("Failed to create table %s: %s", tempSchemaNamesTable, err.Error())
		response.Code = http.StatusInternalServerError
		return response
	}

	err = db.Exec(createTempTableNamesTable).Error
	if err != nil {
		response.Message = fmt.Sprintf("Failed to create table %s: %s", tempTableNamesTable, err.Error())
		response.Code = http.StatusInternalServerError
		return response
	}

	// If all tables are created successfully
	response.Message = "org_tables created successfully"
	fmt.Println("tables created succesffullyyy")
	response.Code = http.StatusCreated
	return response
}

func GetAllSchemas(ConnectionID int, user models.User) models.Response {
	var response models.Response
	var schemaNames []models.SchemaName // To store only schema names
	// var count int
	db := database.DB

	// Dynamically generate the schema table name based on OrganizationID
	tableName := fmt.Sprintf("org_tables.schema_names_%d", user.OrganizationID)
	log.Println("Fetching schema names from:", tableName)

	// Fetch only the 'Name' column matching the ConnectionID
	if err := db.Table(tableName).Where("connection_id = ?", ConnectionID).Find(&schemaNames).Error; err != nil {
		log.Println("Error fetching schema names from table:", tableName, "Error:", err)
		response.Message = "Error fetching schema names"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Count the number of schema names
	// count = len(schemaNames)

	// Prepare response
	response.Code = http.StatusOK
	response.Data = schemaNames
	response.Total = len(schemaNames)
	response.Message = "Schema names fetched successfully"
	return response
}

func GetAllTables(SchemaID int, user models.User) models.Response {
	var response models.Response
	var tableNames []models.TableName // To store only the table names
	// var count int
	db := database.DB

	// Dynamically generate the table name based on OrganizationID
	tableName := fmt.Sprintf("org_tables.table_names_%d", user.OrganizationID)
	log.Println("Fetching table names from:", tableName)

	// Fetch only the 'Name' column matching the SchemaID
	if err := db.Table(tableName).Where("schema_id = ?", SchemaID).Find(&tableNames).Error; err != nil {
		log.Println("Error finding table names in table:", tableName, "Error:", err)
		response.Message = "Error fetching table names"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Count the number of table names
	// count = len(tableNames)

	// Prepare response
	response.Code = http.StatusOK
	response.Data = tableNames
	response.Total = len(tableNames)
	response.Message = "Table names fetched successfully"

	return response
}

func GetAllColumns(TableID int, user models.User) models.Response {
	var response models.Response
	var ColumnNames []models.ColumnName // To store the distinct column names
	db := database.DB

	// Dynamically generate the table name based on OrganizationID
	tableName := fmt.Sprintf("org_tables.column_names_%d", user.OrganizationID)
	log.Println("Fetching distinct column names from:", tableName)

	// Fetch distinct 'Name' column matching the TableID
	if err := db.Table(tableName).
		Select("DISTINCT name,id").
		Where("table_id = ?", TableID).
		Find(&ColumnNames).Error; err != nil {
		log.Println("Error finding distinct column names in table:", tableName, "Error:", err)
		response.Message = "Error fetching distinct column names"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Prepare response
	response.Code = http.StatusOK
	response.Data = ColumnNames
	response.Total = len(ColumnNames)
	response.Message = "Distinct column names fetched successfully"

	return response
}

func GetAllDistinctValues(ColumnID int, user models.User) models.Response {
	var response models.Response
	var column models.ColumnName // To store the column details
	var tableName string         // To store the table name
	var schemaName string        // To store the schema name
	db := database.DB

	// Dynamically generate the metadata table names based on OrganizationID
	metaTableName := fmt.Sprintf("org_tables.column_names_%d", user.OrganizationID)
	metaTableNames := fmt.Sprintf("org_tables.table_names_%d", user.OrganizationID)
	metaSchemaName := fmt.Sprintf("org_tables.schema_names_%d", user.OrganizationID)

	log.Println("Fetching column details from:", metaTableName)

	// Fetch the column details using ColumnID
	if err := db.Table(metaTableName).Where("id = ?", ColumnID).First(&column).Error; err != nil {
		log.Println("Error finding column details in table:", metaTableName, "Error:", err)
		response.Message = "Error fetching column details"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Fetch the table name using the table ID from the column details
	if err := db.Table(metaTableNames).Select("name").Where("id = ?", column.TableID).Scan(&tableName).Error; err != nil {
		log.Println("Error finding table name in table:", metaTableNames, "Error:", err)
		response.Message = "Error fetching table name"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Fetch the schema name using the schema ID from the column details
	if err := db.Table(metaSchemaName).Select("name").Where("id = ?", column.SchemaID).Scan(&schemaName).Error; err != nil {
		log.Println("Error finding schema name in table:", metaSchemaName, "Error:", err)
		response.Message = "Error fetching schema name"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Check if the column name is found
	if column.Name == "" {
		log.Println("No column name found for ColumnID:", ColumnID)
		response.Message = "Column name not found"
		response.Code = http.StatusNotFound
		return response
	}

	// Dynamically construct the query to fetch distinct values
	distinctQuery := fmt.Sprintf("SELECT DISTINCT %s FROM %s.%s", column.Name, schemaName, tableName)
	log.Println("Executing query:", distinctQuery)

	// Execute the query using the `TileQuery` method
	queryResponse, err := querymaster.TileQuery(models.QueryRequest{Query: distinctQuery}, column.ConnectionID)
	if err != nil {
		log.Printf("Error executing TileQuery for ColumnID %d: %v", ColumnID, err)
		response.Message = "Error fetching distinct values"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Handle the QueryResponse model
	if queryResponse.Error != "" {
		log.Println("Query execution error:", queryResponse.Error)
		response.Message = "Error fetching distinct values"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Prepare response data
	data := map[string]interface{}{
		"columns": queryResponse.Columns,
		"rows":    queryResponse.Rows,
	}

	// Prepare response
	response.Code = http.StatusOK
	response.Data = data
	response.Total = len(queryResponse.Rows)
	response.Message = "Distinct values fetched successfully"

	return response
}

func FindOccurrences(s string) []string {
	pattern := regexp.MustCompile(`\$\([^)]+\)`)
	matches := pattern.FindAllString(s, -1)
	return matches
}

// func ReplaceOccurrences(s string) string {
// 	matches := FindOccurrences(s)
// 	if len(matches) == 0 {
// 		return s
// 	}
// 	for _, match := range matches {
// 		matchMap := vars[match]
// 		s = strings.Replace(s, match, "("+matchMap["query"].(string)+")", 1)
// 		fmt.Println(s, "\n\n")
// 	}
// 	return ReplaceOccurrences(s)
// }

var Filters map[int][]string

func SetFilter(filters map[int][]string) {

	fmt.Println(filters)
	Filters = filters
}

func GetFilter() map[int][]string {

	fmt.Println(Filters)
	return Filters
}

var DataBlockID int

func BinaryStringToJSON(binaryString string) (string, error) {
	// Decode the hexadecimal string into a byte slice
	data, err := hex.DecodeString(binaryString)
	if err != nil {
		return "", fmt.Errorf("failed to decode hexadecimal string: %w", err)
	}

	// Decode the byte slice into a JSON object
	var jsonData interface{}
	if err := json.Unmarshal(data, &jsonData); err != nil {
		return "", fmt.Errorf("failed to unmarshal JSON: %w", err)
	}

	// Marshal the JSON object back into a string
	jsonBytes, err := json.Marshal(jsonData)
	if err != nil {
		return "", fmt.Errorf("failed to marshal JSON: %w", err)
	}

	return string(jsonBytes), nil
}

func DecodeBinaryString(encodedString interface{}) interface{} {
	// Decode Base64 string into binary data
	binaryData, err := base64.StdEncoding.DecodeString(encodedString.(string))
	if err != nil {
		return fmt.Errorf("failed to decode base64 string: %v", err)
	}

	// Decode binary data using gob
	var decodedData models.DataBlock
	buf := bytes.NewBuffer(binaryData)
	decoder := gob.NewDecoder(buf)
	if err := decoder.Decode(&decodedData); err != nil {
		return fmt.Errorf("failed to decode binary data: %v", err)
	}

	// Print the decoded struct
	decodedString := fmt.Sprintf("%+v", decodedData)
	fmt.Println()
	fmt.Println(decodedString)
	return decodedString
}
