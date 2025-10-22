package handlers

import (
	// "DynViz/internal/connectors"

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

	commonmenu "DynViz/pkg/commonMenu"
	"DynViz/pkg/user"
	"net/http"
)

func CreateCommonMenu(w http.ResponseWriter, r *http.Request) {
	var requestData models.CommonMenuRequest
	var response models.Response

	// Decode the JSON payload
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	// Get the logged user's email from the context
	email := r.Context().Value("LoggedUserEmail").(string)
	user := user.GetLoggedUser(email)

	// Validate the Name field using the NameValidationfunc function
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

	// Call the utility function to create a common menu
	response = commonmenu.CreateCommonMenu(&requestData, &user)

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

func UpdateCommonMenu(w http.ResponseWriter, r *http.Request) {
	var requestData models.CommonMenuRequest
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

	// Validate the Name field using the NameValidationfunc function
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
	// Call the utility function to update the common menu
	response = commonmenu.UpdateCommonMenu(intID, &requestData, user.ID)

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

func DeleteCommonMenu(w http.ResponseWriter, r *http.Request) {
	// var requestData models.CommonMenuRequest
	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	// Call the utility function to update the common menu
	response = commonmenu.DeleteCommonMenu(intID, user.ID)

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

func GetAllCommonMenu(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	fmt.Println(user)

	// Fetch all connections
	response := commonmenu.GetAllCommonMenu()

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

func GetCommonMenu(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call  to fetch the common menu controller
	cm, err := commonmenu.GetCommonMenu(intID)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		response.Code = http.StatusOK
		response.Data = cm

		response.Message = "common menu fetched successfully!"
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
