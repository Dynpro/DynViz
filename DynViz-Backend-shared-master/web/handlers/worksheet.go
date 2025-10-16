package handlers

import (
	"DynViz/models"
	"DynViz/pkg/user"
	"DynViz/pkg/worksheet"
	"DynViz/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func CreateWorksheet(w http.ResponseWriter, r *http.Request) {
	var worksheetpayload models.Worksheet
	var response models.Response

	// set dashbaord
	if err := json.NewDecoder(r.Body).Decode(&worksheetpayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	if !utils.NameValidationfunc(worksheetpayload.Name) {
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

	// Call the controller function to create the worksheet
	orgResponse := worksheet.CreateWorksheet(worksheetpayload, LoggedUser)

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

func DeleteWorksheet(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)
	// Call the controller function to delete Worksheet
	orgResponse := worksheet.DeleteWorksheet(int(intID), LoggedUser.ID)

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

func UpdateWorksheet(w http.ResponseWriter, r *http.Request) {
	var worksheetpayload models.Worksheet
	var response models.Response

	// set Worksheet
	if err := json.NewDecoder(r.Body).Decode(&worksheetpayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	worksheetpayload.ID = int(intID)
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	if !utils.NameValidationfunc(worksheetpayload.Name) {
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
	// Call the controller function to create the Worksheet
	orgResponse := worksheet.UpdateWorksheet(worksheetpayload, LoggedUser)

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

func GetMultipleWorksheets(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	projectIDStr := vars["projectID"]
	folderIDStr := vars["folderID"]

	// Convert projectID from string to int
	projectID, err := strconv.Atoi(projectIDStr)
	if err != nil {
		http.Error(w, "Invalid Project ID parameter", http.StatusBadRequest)
		return
	}

	// Convert folderID from string to int if present
	var folderID int
	if folderIDStr != "" {
		folderID, err = strconv.Atoi(folderIDStr)
		if err != nil {
			http.Error(w, "Invalid Folder ID parameter", http.StatusBadRequest)
			return
		}
	}

	response := worksheet.GetAllWorksheets(projectID, folderID)

	// Marshal the response data
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize Worksheet data", http.StatusInternalServerError)
		return
	}

	// Write the response
	w.WriteHeader(response.Code)
	w.Write(responseData)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
}

func GetLastUsedWorksheet(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	response := worksheet.GetLastUsedWorksheet(LoggedUser)

	// Marshal the response data
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize Worksheet data", http.StatusInternalServerError)
		return
	}

	// Write the response
	w.WriteHeader(response.Code)
	w.Write(responseData)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
}

func GetWorksheet(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	worksheetID := vars["worksheetID"]

	// Convert worksheetID from string to int
	worksheet_ID, err := strconv.Atoi(worksheetID)
	if err != nil {
		http.Error(w, "Invalid worksheet ID parameter", http.StatusBadRequest)
		return
	}

	response := worksheet.GetWorksheet(worksheet_ID)
	fmt.Println(response)

	// Marshal the response data
	responseData, err := json.Marshal(response)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to serialize worksheet data", http.StatusInternalServerError)
		return
	}

	// Write the response
	w.WriteHeader(response.Code)
	w.Write(responseData)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
}

func GetAllWorksheetsforUser(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	response := worksheet.GetAllWorksheetsforUser(LoggedUser)

	// Marshal the response data
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize Worksheet data", http.StatusInternalServerError)
		return
	}

	// Write the response
	w.WriteHeader(response.Code)
	w.Write(responseData)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
}
