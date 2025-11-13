package handlers

import (
	"DynViz/models"
	"DynViz/pkg/filters"
	"DynViz/pkg/user"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	// "strings"
)

func CreateFilter(w http.ResponseWriter, r *http.Request) {
	var requestData models.Filter
	var response models.Response

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Log the received requestData for debugging
	// log.Printf("Received request data: %+v\n", requestData.ConnectionMasterID)

	email := r.Context().Value("LoggedUserEmail").(string)
	user := user.GetLoggedUser(email)

	// Call the utility function to create a connection
	response = filters.CreateFilter(&requestData, &user)

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

func UpdateFilter(w http.ResponseWriter, r *http.Request) {
	var requestData models.Filter
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

	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)
	// fmt.Println("a")

	// Call the utility function to update the query
	response = filters.UpdateFilter(intID, &requestData, user)

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

func DeleteFilter(w http.ResponseWriter, r *http.Request) {
	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	// Call the utility function to update the query
	response = filters.DeleteFilter(intID, user)

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

func GetAllFilter(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	// fmt.Println(user)

	// Fetch all connections
	response := filters.GetAllFilters(user)

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

func GetFilter(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call  to fetch the query  controller
	cm, err := filters.GetFilter(intID)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		response.Code = http.StatusOK
		response.Data = cm

		response.Message = "Variable fetched successfully!"
	}
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

func GetFiltersByDashboardID(w http.ResponseWriter, r *http.Request) {
	// Initialize the response structure
	var response models.Response

	// Parse the "id" parameter from the URL query
	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid or missing ID parameter", http.StatusBadRequest)
		return
	}

	// Fetch filters by dashboard ID
	cm, err := filters.GetFiltersByDashboardID(intID)
	if err != nil {
		// Handle the error and prepare the response
		response.Code = http.StatusInternalServerError
		response.Message = fmt.Sprintf("Error fetching filters: %v", err)
	} else {
		// Success response
		response.Code = http.StatusOK
		response.Data = cm
		response.Message = "Filters fetched successfully!"
	}

	// Serialize the response to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize response data", http.StatusInternalServerError)
		return
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))

	// Write the status code and response body
	w.WriteHeader(response.Code)
	_, writeErr := w.Write(responseData)
	if writeErr != nil {
		log.Printf("Error writing response: %v", writeErr)
	}
}

func GetFiltersBySetID(w http.ResponseWriter, r *http.Request) {
	// Initialize the response structure
	var response models.Response

	// Parse the "id" parameter from the URL query
	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid or missing ID parameter", http.StatusBadRequest)
		return
	}

	// Fetch filters by dashboard ID
	cm, err := filters.GetFiltersBySetID(intID)
	if err != nil {
		// Handle the error and prepare the response
		response.Code = http.StatusInternalServerError
		response.Message = fmt.Sprintf("Error fetching filters: %v", err)
	} else {
		// Success response
		response.Code = http.StatusOK
		response.Data = cm
		response.Message = "Filters fetched successfully!"
	}

	// Serialize the response to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize response data", http.StatusInternalServerError)
		return
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))

	// Write the status code and response body
	w.WriteHeader(response.Code)
	_, writeErr := w.Write(responseData)
	if writeErr != nil {
		log.Printf("Error writing response: %v", writeErr)
	}
}
