package handlers

import (
	// "DynViz/internal/connectors"
	// "DynViz/internal/security"
	"DynViz/models"
	"DynViz/utils"
	"strconv"

	// "DynViz/utils"
	// "DynViz/utils"
	// "DynViz/internal/database"
	"encoding/json"
	// "log"
	// "gorm.io/gorm"
	"fmt"
	// "math/rand"
	"DynViz/pkg/connections"
	"DynViz/pkg/user"

	// "DynViz/pkg/user"
	"net/http"
)

func GetConnectionMaster(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	// email := r.Context().Value("LoggedUserEmail").(string)

	// LoggedUser := user.GetLoggedUser(email)
	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call GetConn to fetch the connection
	connectionMaster, err := connections.GetConnectionMaster(int(ID))
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		response.Code = http.StatusOK
		response.Data = connectionMaster
		response.Message = "Connection fetched successfully!"
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

func GetAllConnectionsMaster(w http.ResponseWriter, r *http.Request) {

	// var response models.Response
	// email := r.Context().Value("LoggedUserEmail").(string)

	// LoggedUser := user.GetLoggedUser(email)
	// Fetch all connections
	response := connections.GetAllConnectionsMaster()

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

func CreateMasterConnection(w http.ResponseWriter, r *http.Request) {
	var requestData models.Connection
	var response models.Response

	// get connection values
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)
	if !utils.NameValidationfunc(requestData.Name) {
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

	// // Debugging: Print the decoded requestData and email
	// fmt.Printf("Decoded requestData: %+v\n", requestData)
	// fmt.Println("Email from token:", email)

	// Call the utility function to create a connection
	response = connections.CreateMasterConnection(&requestData, LoggedUser.ID)

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

func UpdateMasterConnection(w http.ResponseWriter, r *http.Request) {
	var requestData models.Connection
	var response models.Response

	// get connection values
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}
	if !utils.NameValidationfunc(requestData.Name) {
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

	requestData.ID = int(ID)

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)
	// Call the utility function to update a connection
	response = connections.UpdateMasterConnection(&requestData, LoggedUser.ID)

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

func DeleteMasterConnection(w http.ResponseWriter, r *http.Request) {
	var requestData models.Connection
	var response models.Response

	// get connection values
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	requestData.ID = int(ID)

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)
	// Call the utility function to update a connection
	response = connections.DeleteMasterConnection(&requestData, LoggedUser.ID)

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
