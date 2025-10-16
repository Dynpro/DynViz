package handlers

import (
	"DynViz/models"
	filtermapping "DynViz/pkg/filterMapping"
	"DynViz/pkg/user"
	"encoding/json"
	"fmt"
	"net/http"
	// "strings"
)

// CreateFilterMapping handles the POST /filtermapping endpoint. It takes in a
// JSON payload representing a new FilterMapping and creates it in the database.
// The response is a JSON-encoded Response struct with a status code and a
// message. The status code is 201 if the mapping was created successfully or
// 400 if there was an error with the request.
func CreateFilterMapping(w http.ResponseWriter, r *http.Request) {
	var requestData models.CreateFilterMappingPayloadNew
	var response models.Response

	// if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
	// 	http.Error(w, err.Error(), http.StatusBadRequest)
	// 	return
	// }

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)
	user := user.GetLoggedUser(email)
	
	// Call the utility function to create a connection
	response = filtermapping.CreateFilterMappings(&requestData, &user)

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

// DeleteFilterMapping handles the DELETE /filtermapping endpoint. It accepts a JSON payload
// containing the Filter ID and Dashboard ID to identify the mapping to be deleted. The function
// retrieves the logged-in user's email from the request context to determine the user performing
// the operation. It then calls the appropriate utility function to delete the filter mapping.
// The response is a JSON-encoded Response struct with a status code indicating the success or
// failure of the operation.
func DeleteFilterMapping(w http.ResponseWriter, r *http.Request) {
	var requestData models.DeleteFilterMappingPayloadNew
	var response models.Response

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)
	user := user.GetLoggedUser(email)
	response = filtermapping.DeleteFilterMappings(&requestData, &user)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.Code)
	json.NewEncoder(w).Encode(response)
}

func GetFilterMapping(w http.ResponseWriter, r *http.Request) {
	var requestData models.GetFilterMappingPayload
	var response models.Response

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)
	user := user.GetLoggedUser(email)
	response = filtermapping.GetFilterMappings(&requestData, &user)
	
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize dashboard data", http.StatusInternalServerError)
		return
	}
	
	// Write the response
	w.WriteHeader(response.Code)
	w.Write(responseData)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
}