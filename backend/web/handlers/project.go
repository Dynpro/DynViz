package handlers

import (
	"DynViz/models"
	"DynViz/pkg/project"
	"DynViz/pkg/user"
	"DynViz/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func CreateProject(w http.ResponseWriter, r *http.Request) {
	var projpayload models.ProjectPayload
	var response models.Response

	// set project
	if err := json.NewDecoder(r.Body).Decode(&projpayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)
	if !utils.NameValidationfunc(projpayload.Name) {
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

	// Call the controller function to create the project
	orgResponse := project.CreateProject(&projpayload, LoggedUser)

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

func GetProject(w http.ResponseWriter, r *http.Request) {
	// var proj models.Project
	// // set project
	// if err := json.NewDecoder(r.Body).Decode(&proj); err != nil {
	// 	http.Error(w, err.Error(), http.StatusBadRequest)
	// 	return
	// }

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	response := project.GetProject(int(intID))

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

func GetMultipleProjects(w http.ResponseWriter, r *http.Request) {
	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)
	// response := project.GetAllProjects(FetchUserFromJWT(w, r))
	response := project.GetAllProjects(LoggedUser)

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

func UpdateProject(w http.ResponseWriter, r *http.Request) {
	var proj models.Project
	var response models.Response
	// set project
	if err := json.NewDecoder(r.Body).Decode(&proj); err != nil {
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
	LoggedUser := user.GetLoggedUser(email)

	if !utils.NameValidationfunc(proj.Name) {
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

	// Call the controller function to create the project
	// orgResponse := project.UpdateProject(int(intID), &proj, FetchUserFromJWT(w, r))
	orgResponse := project.UpdateProject(int(intID), &proj, LoggedUser)

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

func DeleteProject(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)
	// Call the controller function to create the project
	// orgResponse := project.DeleteProject(int(intID), FetchUserFromJWT(w, r))
	orgResponse := project.DeleteProject(int(intID), LoggedUser)

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
