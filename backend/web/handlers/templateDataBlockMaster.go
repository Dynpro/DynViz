package handlers

import (
	"DynViz/models"
	templateDataBlockMaster "DynViz/pkg/templateDataBlockMaster"
	"DynViz/pkg/user"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

// func CreateTemplateDataBlock(w http.ResponseWriter, r *http.Request) {
// 	var templatedatablockmasterPayload models.TemplateDataBlockMaster
// 	var response models.Response

// 	// set dashbaord
// 	if err := json.NewDecoder(r.Body).Decode(&templatedatablockmasterPayload); err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}
// 	email := r.Context().Value("LoggedUserEmail").(string)
// 	LoggedUser := user.GetLoggedUser(email)

// 	// Call the controller function to create the dashboard
// 	response = templateDataBlockMaster.CreateTemplateDataBlock(templatedatablockmasterPayload, LoggedUser)

// 	// Prepare response data
// 	responseData, err := json.Marshal(response)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// Set response headers
// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(response.Code)

// 	// Write response data
// 	_, err = w.Write(responseData)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// }

func UpdateTemplateDataBlock(w http.ResponseWriter, r *http.Request) {
	var templatedatablockmasterPayload models.TemplateDataBlockMaster
	var response models.Response
	var err error

	// templatedatablockmasterPayload.ID = ID
	// set dashbaord
	if err := json.NewDecoder(r.Body).Decode(&templatedatablockmasterPayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	templatedatablockmasterPayload.ID, err = strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
	}

	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	// Call the controller function to create the dashboard
	response = templateDataBlockMaster.UpdateTemplateDataBlock(templatedatablockmasterPayload, LoggedUser)

	// Prepare response data
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.Code)

	// Write response data
	_, err = w.Write(responseData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

func DeleteTemplateDataBlock(w http.ResponseWriter, r *http.Request) {
	var templatedatablockmasterPayload models.TemplateDataBlockMaster
	var response models.Response
	var err error

	// templatedatablockmasterPayload.ID = ID
	// set dashbaord
	if err := json.NewDecoder(r.Body).Decode(&templatedatablockmasterPayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	templatedatablockmasterPayload.ID, err = strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
	}

	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	// Call the controller function to create the dashboard
	response = templateDataBlockMaster.DeleteTemplateDataBlock(templatedatablockmasterPayload.ID, LoggedUser)

	// Prepare response data
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.Code)

	// Write response data
	_, err = w.Write(responseData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

// GetTemplateDataBlock handles the request to get the template data block
func GetTemplateDataBlock(w http.ResponseWriter, r *http.Request) {
	var templatedatablockmasterPayload models.TemplateDataBlockMaster
	var response models.Response
	var err error

	if err := json.NewDecoder(r.Body).Decode(&templatedatablockmasterPayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call the controller function to get the template data block master
	response = templateDataBlockMaster.GetTemplateDataBlockMaster(ID)

	// Prepare response data
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.Code)

	// Write response data
	if _, err := w.Write(responseData); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func GetAllTemplateDataBlockMaster(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	// email := r.Context().Value("LoggedUserEmail").(string)
	// LoggedUser := user.GetLoggedUser(email)

	// Fetch all connections
	response = templateDataBlockMaster.GetAllTemplateDataBlockMaster()

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
