package handlers

import (
	"DynViz/models"
	"DynViz/pkg/dbstructure"
	"DynViz/pkg/user"
	"strconv"

	"DynViz/utils"
	"encoding/json"
	"fmt"
	"net/http"
)

func GetCountryCodes(w http.ResponseWriter, r *http.Request) {
	var response models.Response

	// Decode the JSON payload
	var requestData map[string]string
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	// Extract the country from the decoded JSON payload
	country, exists := requestData["country"]
	if !exists {
		response.Message = "Country is empty"
		response.Code = http.StatusBadRequest
	} else {
		response = utils.GetCountryCode(country)
	}

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

func GetAllCountries(w http.ResponseWriter, r *http.Request) {
	var response models.Response

	// Fetch all countries
	response = utils.GetAllCountries()

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

func GetAllSchema(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call  to fetch the query  controller
	cm := utils.GetAllSchemas(intID, user)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		response.Code = http.StatusOK
		response.Data = cm

		response.Message = "schemas fetched successfully!"
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


func GetAllTables(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call  to fetch the query  controller
	cm := utils.GetAllTables(intID, user)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		response.Code = http.StatusOK
		response.Data = cm

		response.Message = "Tables fetched successfully!"
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


func GetAllColumns(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call  to fetch the query  controller
	cm := utils.GetAllColumns(intID, user)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		response.Code = http.StatusOK
		response.Data = cm

		response.Message = "Columns fetched successfully!"
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

func GetAllDistinctValues(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call  to fetch the query  controller
	cm := utils.GetAllDistinctValues(intID, user)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		response.Code = http.StatusOK
		response.Data = cm

		response.Message = "Distinct values of a column fetched successfully!"
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



func InsertSchema(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	var requestData models.Schemareq
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	// Call  to fetch the query  controller
	cm := dbstructure.UpdateSchema(user,requestData)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		response.Code = http.StatusOK
		response.Data = cm

		response.Message = "Distinct values of a column fetched successfully!"
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


func DeleteSchema(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	var requestData models.Schemareq
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	// Call  to fetch the query  controller
	cm := dbstructure.DeleteSchema(requestData,user)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		response.Code = http.StatusOK
		response.Data = cm

		response.Message = "Distinct values of a column fetched successfully!"
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