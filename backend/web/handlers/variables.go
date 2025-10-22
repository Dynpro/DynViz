package handlers

import (
	"DynViz/models"
	"DynViz/pkg/user"
	"DynViz/pkg/variables"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	// "strings"
)

func CreateVariables(w http.ResponseWriter, r *http.Request) {
	var requestData models.Variables
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
	response = variables.CreateVariables(&requestData, &user)

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

func UpdateVariables(w http.ResponseWriter, r *http.Request) {
	var requestData models.Variables
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
	response = variables.UpdateVariables(intID, &requestData, user)

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

func DeleteVariables(w http.ResponseWriter, r *http.Request) {
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
	response = variables.DeleteVariables(intID, user)

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

func GetAllVariables(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	// fmt.Println(user)
	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Fetch all
	response := variables.GetAllVariables(intID, user)

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

func GetVariables(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call  to fetch the query  controller
	cm, err := variables.GetVariables(intID)
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

func GetVariablesbySetID(w http.ResponseWriter, r *http.Request) {
	var response models.Response

	// Parse and validate the "id" query parameter
	idParam := r.URL.Query().Get("id")
	intID, err := strconv.Atoi(idParam)
	if err != nil || intID <= 0 {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Simulated user information (Replace with actual user context)
	user := models.User{
		OrganizationID: 1, // Example organization ID; replace with actual user context
	}

	// Call the service to fetch variables by SetID
	cm := variables.GetVariablesBySetID(intID, user)

	// Handle the response from the service
	if cm.Code != http.StatusOK {
		response.Code = cm.Code
		response.Message = cm.Message
	} else {
		response = cm
	}

	// Encode the response to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		log.Printf("Failed to serialize response data: %v", err)
		http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
		return
	}

	// Set headers and write the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.Code)
	_, writeErr := w.Write(responseData)
	if writeErr != nil {
		log.Printf("Failed to write response: %v", writeErr)
	}
}
