package handlers

import (
	"DynViz/models"
	"DynViz/pkg/cells"
	"DynViz/utils"
	"log"

	// "DynViz/pkg/user"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	// "strings"
)

func CreateCell(w http.ResponseWriter, r *http.Request) {
	var requestData models.Cell
	var response models.Response

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Log the received requestData for debugging
	// log.Printf("Received request data: %+v\n", requestData.ConnectionMasterID)

	// email := r.Context().Value("LoggedUserEmail").(string)
	// user := user.GetLoggedUser(email)

	// Call the utility function to create a connection
	// response = querymaster.CreateQuery(&requestData, &user)
	response = cells.Createcell(&requestData)
	// Encode the response data to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
		return
	}

	// Set header type
	w.Header().Set("Content-Type", "application/json")
	// Set content length for efficiency
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
	// Write status
	w.WriteHeader(response.Code)
	// Write response
	w.Write(responseData)
}

func UpdateCell(w http.ResponseWriter, r *http.Request) {
	var requestData models.Cell
	var response models.Response

	// update cm
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// email := r.Context().Value("LoggedUserEmail").(string)

	// user := user.GetLoggedUser(email)

	// Call the utility function to update the query
	response = cells.UpdateCell(intID, &requestData)

	// Encode the response data to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
		return
	}

	// Set header type
	w.Header().Set("Content-Type", "application/json")
	// Set content length for efficiency
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
	// Write status
	w.WriteHeader(response.Code)
	// Write response
	w.Write(responseData)
}

func DeleteCell(w http.ResponseWriter, r *http.Request) {
	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// email := r.Context().Value("LoggedUserEmail").(string)

	// user := user.GetLoggedUser(email)

	// Call the utility function to update the query
	// response = querymaster.DeleteQuery(intID, user.ID)
	response = cells.DeleteCell(intID)

	// Encode the response data to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
		return
	}

	// Set header type
	w.Header().Set("Content-Type", "application/json")
	// Set content length for efficiency
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
	// Write status
	w.WriteHeader(response.Code)
	// Write response
	w.Write(responseData)
}

func GetAllCells(w http.ResponseWriter, r *http.Request) {
	var requestData models.Cell
	// email := r.Context().Value("LoggedUserEmail").(string)

	// user := user.GetLoggedUser(email)

	// fmt.Println(user)
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Fetch all connections
	response := cells.GetAllCells(requestData.WorksheetID)

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

func RunCell(w http.ResponseWriter, r *http.Request) {
	var requestData models.Cell
	var response models.QueryResponse

	// Decode the request body into the requestData struct
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Convert the "id" query parameter to an integer
	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Set the ID of requestData based on the converted "id" query parameter
	requestData.ID = intID
	Queries, err := utils.DecryptAES(requestData.Query)
	if err != nil {
		log.Println("Error decrypting cell query:", err)
		return
	}
	requestData.Query = Queries
	// Call the CellQuery function to execute the query
	response, err = cells.CellQuery(requestData, -1)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to run cell query: %v", err), http.StatusInternalServerError)
		return
	}

	// Encode the response data to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
		return
	}

	// Set the appropriate headers and write the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseData)
}

func GetCells(w http.ResponseWriter, r *http.Request) {
	// email := r.Context().Value("LoggedUserEmail").(string)

	// user := user.GetLoggedUser(email)

	// fmt.Println(user)
	// Convert the "id" query parameter to an integer
	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}
	// fmt.Println(db.TileID)
	// Fetch all connections
	response := cells.GetCells(intID)

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
