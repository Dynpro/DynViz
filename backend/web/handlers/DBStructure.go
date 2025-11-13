package handlers

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/dbstructure"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

// GetDBStructure handles the request to get the entire database structure
func GetDBStructure(w http.ResponseWriter, r *http.Request) {
	db := database.DB

	connectionID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Fetch the existing connection
	var conn models.Connection
	if err := db.First(&conn, connectionID).Error; err != nil {
		log.Println("Error fetching connection:", err)
		http.Error(w, "Connection not found", http.StatusNotFound)
		return
	}

	var response models.ResponseDBStructure

	response.Structure, err = dbstructure.GetDBStructure(connectionID,conn.OrganizationID)
	if err != nil {
		response.Error = fmt.Sprintf("error getting  database structure: %v", err)
	}

	// Marshal the response to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, fmt.Sprintf("error marshaling response data: %v", err), http.StatusInternalServerError)
		return
	}

	// Set the response headers and write the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseData)
}

// GetDBStructure handles the request to get the entire database structure
func GetDBStructureLocal(w http.ResponseWriter, r *http.Request) {
	db := database.DB

	connectionID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Fetch the existing connection
	var conn models.Connection
	if err := db.First(&conn, connectionID).Error; err != nil {
		log.Println("Error fetching connection:", err)
		http.Error(w, "Connection not found", http.StatusNotFound)
		return
	}

	var response models.ResponseDBStructure

	response.Structure, err = dbstructure.GetDBStructureLocal(connectionID)
	if err != nil {
		response.Error = fmt.Sprintf("error getting  database structure: %v", err)
	}

	// Marshal the response to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, fmt.Sprintf("error marshaling response data: %v", err), http.StatusInternalServerError)
		return
	}

	// Set the response headers and write the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseData)
}

// GetDBStructure handles the request to get the entire database structure

// func GetDBStructureschema(w http.ResponseWriter, r *http.Request) {
// 	db := database.GetPostgresDBConnection()
//     var schemaName models.SchemaName
// 	if err := json.NewDecoder(r.Body).Decode(&schemaName); err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}
// 	connectionID, err := strconv.Atoi(r.URL.Query().Get("id"))
// 	if err != nil {
// 		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
// 		return
// 	}

// 	// Fetch the existing connection
// 	var conn models.Connection
// 	if err := db.First(&conn, connectionID).Error; err != nil {
// 		log.Println("Error fetching connection:", err)
// 		http.Error(w, "Connection not found", http.StatusNotFound)
// 		return
// 	}

// 	var response models.ResponseDBStructure
    

// 	response.Structure,err= dbstructure.GetDBStructureSchema(connectionID, schemaName.Name)
	

// 	// Marshal the response to JSON
// 	responseData, err := json.Marshal(response)
// 	if err != nil {
// 		http.Error(w, fmt.Sprintf("error marshaling response data: %v", err), http.StatusInternalServerError)
// 		return
// 	}

// 	// Set the response headers and write the response
// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	w.Write(responseData)
// }




// // Handler function for getting the structure of specific columns in a table
// func GetDBStructureColumns(w http.ResponseWriter, r *http.Request) {
//     db := database.GetPostgresDBConnection()
//     var info models.ColumnInfo
//     if err := json.NewDecoder(r.Body).Decode(&info); err != nil {
//         http.Error(w, err.Error(), http.StatusBadRequest)
//         return
//     }
//     connectionID, err := strconv.Atoi(r.URL.Query().Get("id"))
//     if err != nil {
//         http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
//         return
//     }

//     // Fetch the existing connection
//     var conn models.Connection
//     if err := db.First(&conn, connectionID).Error; err != nil {
//         log.Println("Error fetching connection:", err)
//         http.Error(w, "Connection not found", http.StatusNotFound)
//         return
//     }
//     fmt.Println(info.TableName,info.TableSchema)
//     var response models.ResponseDBStructure

//     response.Structure, err = dbstructure.GetDBStructureTable(connectionID, info.TableSchema, info.TableName)
//     if err != nil {
//         http.Error(w, fmt.Sprintf("error fetching DB structure: %v", err), http.StatusInternalServerError)
//         return
//     }

//     // Marshal the response to JSON
//     responseData, err := json.Marshal(response)
//     if err != nil {
//         http.Error(w, fmt.Sprintf("error marshaling response data: %v", err), http.StatusInternalServerError)
//         return
//     }

//     // Set the response headers and write the response
//     w.Header().Set("Content-Type", "application/json")
//     w.WriteHeader(http.StatusOK)
//     w.Write(responseData)
// }

func PullDBStructure(w http.ResponseWriter, r *http.Request) {
	db := database.GetPostgresDBConnection()

	// Parse the connection ID from the request query
	connectionID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Fetch the existing connection
	var conn models.Connection
	if err := db.First(&conn, connectionID).Error; err != nil {
		log.Println("Error fetching connection:", err)
		http.Error(w, "Connection not found", http.StatusNotFound)
		return
	}

	// Initialize the response
	var response models.ResponseStructure

	// Call RefreshStructure and handle its return values
	structure, compareResults, err := dbstructure.RefreshStructure(connectionID, conn.OrganizationID)
	if err != nil {
		response.Error = fmt.Sprintf("error getting  database structure: %v", err)
	} else {
		// Assign the results to the response fields
		response.Structure = &models.ResponseDBStructure{
			Structure: structure,
		}

		// Assign both IDs and names to the CompareResult field
		response.CompareResult = extractCompareResultData(compareResults)
	}

	// Marshal the response to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, fmt.Sprintf("error marshaling response data: %v", err), http.StatusInternalServerError)
		return
	}

	// Set the response headers and write the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseData)
}

// Helper function to extract IDs and names from compare results
func extractCompareResultData(compareResults map[string][]map[string]interface{}) []string {
	var result []string
	for key, entries := range compareResults {
		for _, entry := range entries {
			id, idOk := entry["id"]
			name, nameOk := entry["name"]

			if idOk && nameOk {
				// Format: "Key: <key>, ID: <id>, Name: <name>"
				result = append(result, fmt.Sprintf("Key: %s, ID: %v, Name: %v", key, id, name))
			}
		}
	}
	return result
}




// Handler function for getting the structure of specific columns in a table
func GetDBStructureColumns(w http.ResponseWriter, r *http.Request) {
	db := database.DB
	var info models.ColumnInfo
	if err := json.NewDecoder(r.Body).Decode(&info); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	connectionID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Fetch the existing connection
	var conn models.Connection
	if err := db.First(&conn, connectionID).Error; err != nil {
		log.Println("Error fetching connection:", err)
		http.Error(w, "Connection not found", http.StatusNotFound)
		return
	}
	fmt.Println(info.TableName, info.TableSchema)
	var response models.ResponseDBStructure

	response.Structure, err = dbstructure.GetDBStructureTable(connectionID, info.TableSchema, info.TableName)
	if err != nil {
		http.Error(w, fmt.Sprintf("error fetching DB structure: %v", err), http.StatusInternalServerError)
		return
	}

	// Marshal the response to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, fmt.Sprintf("error marshaling response data: %v", err), http.StatusInternalServerError)
		return
	}

	// Set the response headers and write the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseData)
}
