package handlers

import (
	"DynViz/models"
	"DynViz/pkg/dashboard"
	"DynViz/pkg/user"
	"DynViz/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func CreateDashboard(w http.ResponseWriter, r *http.Request) {
	var dashpayload models.GetDashboardPayload
	var response models.Response

	// set dashbaord
	if err := json.NewDecoder(r.Body).Decode(&dashpayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	if !utils.NameValidationfunc(dashpayload.Name) {
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

	// Call the controller function to create the dashboard
	orgResponse := dashboard.CreateDashboard(dashpayload, LoggedUser)

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

func GetMultipleDashboard(w http.ResponseWriter, r *http.Request) {
	// var dashpayload models.GetDashboardPayload

	// set dashbaord
	// if err := json.NewDecoder(r.Body).Decode(&dashpayload); err != nil {
	// 	http.Error(w, err.Error(), http.StatusBadRequest)
	// 	return
	// }

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	response := dashboard.GetAllDashboard(int(intID))

	// Marshal the response data
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

func GetDashboard(w http.ResponseWriter, r *http.Request) {

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	response := dashboard.GetDashboard(int(intID))

	// Marshal the response data
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

func UpdateDashboard(w http.ResponseWriter, r *http.Request) {
	var dashpayload models.GetDashboardPayload
	var response models.Response

	// set dashbaord
	if err := json.NewDecoder(r.Body).Decode(&dashpayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	dashpayload.ID = int(intID)
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	if !utils.NameValidationfunc(dashpayload.Name) {
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

	// Call the controller function to create the dashboard
	orgResponse := dashboard.UpdateDashboard(dashpayload, LoggedUser)

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

func DeleteDashboard(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)
	// Call the controller function to delete Dashbaord
	orgResponse := dashboard.DeleteDashboard(int(intID), LoggedUser)

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
