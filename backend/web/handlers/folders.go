package handlers

import (
	"DynViz/models"
	"DynViz/pkg/folders"
	"DynViz/pkg/user"
	"DynViz/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func CreateFolder(w http.ResponseWriter, r *http.Request) {
	var folderpl models.Folder
	var response models.Response

	// set folder
	if err := json.NewDecoder(r.Body).Decode(&folderpl); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)
	if !utils.NameValidationfunc(folderpl.Name) {
		response = models.Response{
			Message: "Please fill the Name correctly",
			Code:    http.StatusNotAcceptable,
		}
		// Encode and send the error response
		responseData, _ := json.Marshal(response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(response.Code)
		w.Write(responseData)
		return
	}

	// Call the controller function to create the folder
	orgResponse := folders.CreateFolder(folderpl, LoggedUser)

	// Set the response
	response.Code = orgResponse.Code
	response.Message = orgResponse.Message

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

func GetMultipleFolders(w http.ResponseWriter, r *http.Request) {

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	response := folders.GetAllFolder(int(intID), LoggedUser)

	// Marshal the response data
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize projects data", http.StatusInternalServerError)
		return
	}

	// Write the response
	w.WriteHeader(response.Code)
	w.Write(responseData)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
}

func GetFolder(w http.ResponseWriter, r *http.Request) {
	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}
	response := folders.GetFolder(int(intID))

	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize Folder data", http.StatusInternalServerError)
		return
	}

	// Write the response
	w.WriteHeader(response.Code)
	w.Write(responseData)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))

}

func UpdateFolder(w http.ResponseWriter, r *http.Request) {
	var folderpl models.Folder
	var response models.Response
	// set project
	if err := json.NewDecoder(r.Body).Decode(&folderpl); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	folderpl.ID = int(intID)
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	if !utils.NameValidationfunc(folderpl.Name) {
		response = models.Response{
			Message: "Please fill the Name correctly",
			Code:    http.StatusNotAcceptable,
		}
		// Encode and send the error response
		responseData, _ := json.Marshal(response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(response.Code)
		w.Write(responseData)
		return
	}

	// Call the controller function to update the folder
	orgResponse := folders.UpdateFolder(&folderpl, LoggedUser)

	// Set the response
	response.Code = orgResponse.Code
	response.Message = orgResponse.Message

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

func DeleteFolder(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	// set project

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	// Call the controller function to delete folder
	orgResponse := folders.DeleteFolder(int(intID), LoggedUser)

	// Set the response
	response.Code = orgResponse.Code
	response.Message = orgResponse.Message

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
