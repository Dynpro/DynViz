package handlers

import (
	"DynViz/models"
	"DynViz/pkg/team"
	"DynViz/pkg/user"
	"DynViz/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func CreateTeam(w http.ResponseWriter, r *http.Request) {
	var teamModel models.Team
	var CreateTeam models.CreateTeamPayload
	var response models.Response

	email := r.Context().Value("LoggedUserEmail").(string)

	if err := json.NewDecoder(r.Body).Decode(&CreateTeam); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	LoggedUser := user.GetLoggedUser(email)

	if !utils.NameValidationfunc(CreateTeam.Name) {
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
	response = team.CreateTeams(&teamModel, &CreateTeam, &LoggedUser)

	// write status
	w.WriteHeader(response.Code)

	// write response
	w.Write([]byte(response.Message))

	// set header type
	w.Header().Set("Content-Type", "application/json")

	// Set content length for efficiency
	w.Header().Set("Content-Length", fmt.Sprint(len(response.Message)))
}

func GetTeam(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	email := r.Context().Value("LoggedUserEmail").(string)

	// LoggedUser := user.GetLoggedUser(email)
	user.GetLoggedUser(email)

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	response = team.GetTeam(int(ID))

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

func GetAllTeams(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)
	// user.GetLoggedUser(email)

	response := team.GetAllTeams(LoggedUser.OrganizationID)

	// Marshal the response data
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize organizations data", http.StatusInternalServerError)
		return
	}

	// Write the response
	w.WriteHeader(response.Code)
	w.Write(responseData)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))

}

func DeleteTeam(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	var teamResponse models.Response

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	teamResponse = team.DeleteTeam(int(ID), LoggedUser.ID)

	// Set the response
	response.Code = teamResponse.Code
	response.Message = teamResponse.Message

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

func UpdateTeam(w http.ResponseWriter, r *http.Request) {

	var UpdateTeam models.UpdateTeamPayload
	var teamResponse models.Response

	w.Header().Set("Content-Type", "application/json")

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&UpdateTeam); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	UpdateTeam.ID = int(ID)
	if !utils.NameValidationfunc(UpdateTeam.Name) {
		teamResponse = models.Response{
			Message: "Please fill the Name correctly",
			Code:    http.StatusNotAcceptable,
		}
		// Encode and send the error response
		responseData, _ := json.Marshal(teamResponse)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(teamResponse.Code)
		w.Write(responseData)
		return
	}
	teamResponse = team.UpdateTeam(&UpdateTeam, &LoggedUser)

	responseData, err := json.Marshal(teamResponse)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(teamResponse.Code)

	// Write response data
	_, err = w.Write(responseData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}
