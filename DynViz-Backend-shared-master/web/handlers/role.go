package handlers

import (
	"DynViz/models"
	"DynViz/pkg/role"
	"DynViz/pkg/user"
	"DynViz/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func CreateRole(w http.ResponseWriter, r *http.Request) {
	var requestData models.RoleData

	// Get the logged user's email from the context
	email := r.Context().Value("LoggedUserEmail").(string)
	user := user.GetLoggedUser(email)

	// Decode the JSON payload
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	// Validate the role name using NameValidationfunc function
	if !utils.NameValidationfunc(requestData.Name) {
		response := models.Response{
			Message: "Please fill the Name correctly",
			Code:    http.StatusNotAcceptable,
		}
		responseData, _ := json.Marshal(response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write(responseData)
		return
	}

	// Create the role using the role service
	response := role.CreateRole(&requestData, user.ID, user.OrganizationID)

	// Encode the response data to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
		return
	}

	// Set header type
	w.Header().Set("Content-Type", "application/json")
	// Write status
	w.WriteHeader(http.StatusOK)
	// Write response
	w.Write(responseData)
}
func UpdateRole(w http.ResponseWriter, r *http.Request) {
	var requestData models.RoleData

	// Get the logged user's email from the context
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	// Extract and validate the ID from the URL query parameters
	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Decode the JSON payload
	err = json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	// Set the ID in the requestData
	requestData.ID = ID

	// Validate the role name using the NameValidationfunc function
	if !utils.NameValidationfunc(requestData.Name) {
		response := models.Response{
			Message: "Please fill the Name correctly",
			Code:    http.StatusNotAcceptable,
		}
		// Encode and send the error response
		responseData, _ := json.Marshal(response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotAcceptable)
		w.Write(responseData)
		return
	}

	// Update the role using the role service
	updatedRole := role.UpdateRole(&requestData, LoggedUser.ID)

	// Encode the updated role data to JSON
	responseData, err := json.Marshal(updatedRole)
	if err != nil {
		http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
		return
	}

	// Set header type
	w.Header().Set("Content-Type", "application/json")
	// Write status
	w.WriteHeader(http.StatusOK)
	// Write response
	w.Write(responseData)
}

func GetAllRoles(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	response := role.GetAllRoles(LoggedUser.OrganizationID)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.Code)
	json.NewEncoder(w).Encode(response)
}

func GetRolesByRoleID(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Pass the decoded payload to the GETROLE controller function
	response := role.GetRole(int(ID), LoggedUser.ID)

	// Encode the response data to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize data: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Set header type and write the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.Code)
	w.Write(responseData)

}

func DeleteRole(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call the controller function to delete the role
	response := role.DeleteRole(int(ID), LoggedUser.ID)

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
	w.WriteHeader(http.StatusOK)
	// Write response
	w.Write(responseData)
}
