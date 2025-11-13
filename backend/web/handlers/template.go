package handlers

import (
	"DynViz/models"
	templatemasters "DynViz/pkg/templateMasters"
	"DynViz/pkg/user"
	"DynViz/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func CreateMasterTemplate(w http.ResponseWriter, r *http.Request) {
	var requestData models.TemplateMasterPayload
	var response models.Response

	// get connection values
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	// if !utils.NameValidationfunc(requestData.Templatemaster.Name) {

	// 	response = models.Response{
	// 		Message: "Please fill the Name correctly",
	// 		Code:    http.StatusNotAcceptable,
	// 	}
	// 	// Encode and send the error response
	// 	responseData, _ := json.Marshal(response)
	// 	w.Header().Set("Content-Type", "application/json")
	// 	w.WriteHeader(response.Code)
	// 	w.Write(responseData)
	// 	return
	// }

	// Call the utility function to create a connection
	response = templatemasters.CreateTemplateMaster(&requestData, LoggedUser)

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

func UpdateMasterTemplate(w http.ResponseWriter, r *http.Request) {
	var requestData models.TemplateMaster
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
	// Call the utility function to update a connection
	response = templatemasters.UpdateTemplateMaster(&requestData, LoggedUser.ID)

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

func DeleteMasterTemplate(w http.ResponseWriter, r *http.Request) {
	var requestData models.TemplateMaster
	var response models.Response

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
	response = templatemasters.DeleteTemplateMaster(&requestData, LoggedUser.ID)

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

func GetTemplateMasterTest(w http.ResponseWriter, r *http.Request) {
	var response models.Response
	var tiledatabloclpayload models.Tiledatablockpayload

	// set template
	if err := json.NewDecoder(r.Body).Decode(&tiledatabloclpayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	vars := mux.Vars(r)
	TemplateID := vars["TemplateID"]

	// Convert Template from string to int
	Template_ID, err := strconv.Atoi(TemplateID)
	if err != nil {
		http.Error(w, "Invalid Template ID parameter", http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)
	// dashboard_ID := 1
	// Call the utility function to update a connection
	response = templatemasters.GetMasterTemplateTest(Template_ID, tiledatabloclpayload, LoggedUser)

	// Encode the response data to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
		return
	}

	// Write the response
	w.WriteHeader(response.Code)
	w.Write(responseData)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
}

func GetAllTemplateMaster(w http.ResponseWriter, r *http.Request) {
	var response models.Response
	// var tm models.TemplateMaster

	// if err := json.NewDecoder(r.Body).Decode(&tm); err != nil {
	// 	http.Error(w, err.Error(), http.StatusBadRequest)
	// 	return
	// }

	// email := r.Context().Value("LoggedUserEmail").(string)

	// LoggedUser := user.GetLoggedUser(email)
	// Call the utility function to update a connection
	// response = templatemasters.GetAllTemplateMaster(tm.Type)
	response = templatemasters.GetAllTemplateMaster()

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
