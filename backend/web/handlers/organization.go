package handlers

import (
	// "DynViz/internal/database"

	"strconv"

	"DynViz/models"
	"DynViz/pkg/organization"
	"DynViz/pkg/role"
	"DynViz/pkg/user"
	"DynViz/utils"
	"encoding/json"
	"fmt"
	"net/http"
	// "github.com/golang-jwt/jwt/v5"
	// "time"
)

func CreateOrganization(w http.ResponseWriter, r *http.Request) {

	var signup models.SignUp

	var response, orgResponse models.Response

	// get signup values
	if err := json.NewDecoder(r.Body).Decode(&signup); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// set user ID
	signup.CreatedByID = signup.ID
	signup.LastModifiedBy = signup.ID

	// set organization ID
	check := utils.NameValidationfunc(signup.Name)

	if check {
		// get response
		orgResponse = organization.CreateOrganization(&signup)


		// create user only if organization is created
		if orgResponse.Code == http.StatusCreated {



			org := organization.GetOrganizationByEmail(signup.Email)
			responsee:= utils.CreateTables(org.ID)
			if responsee.Code!= http.StatusCreated{
				responsee.Message = "Unable to create organization tables for db structure"
				responsee.Code = http.StatusNotAcceptable
			}
			signup.OrganizationID = org.ID

			// get response
			response = user.Createuser(&signup)
			var rolresponse models.Response
			if response.Code == http.StatusCreated {

				checkUser, err := user.GetUserByEmail(signup.Email)

				if err != nil {
					response.Code = http.StatusInternalServerError
					response.Message = response.Message + " | Unable to get the created user by email | " + err.Error()
				} else {
					rolresponse = role.Assignadmin(&checkUser)
				}

			}

			// rolresponse := role.Assignadmin(&signup)

			// set response message
			response.Message = orgResponse.Message + " | " + response.Message + " | " + rolresponse.Message
		}

		if orgResponse.Code != response.Code {
			// delete organization

			// set response message
			if response.Code > 0 {
				response.Message = orgResponse.Message + " | " + response.Message
			} else {
				response.Message = orgResponse.Message
			}

		}

		// set response code
		response.Code = orgResponse.Code
	} else {
		response.Message = "Fill the Name Correctly"
		response.Code = http.StatusNotAcceptable
	}

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

func DeleteOrganization(w http.ResponseWriter, r *http.Request) {

	// var org models.Organization
	var response models.Response

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	// Call the controller function to update the organization
	orgResponse := organization.DeleteOrg(int(ID), LoggedUser)
	// user.DeleteusrwithOrg(&org) //need to use after role module

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

func UpdateOrganization(w http.ResponseWriter, r *http.Request) {

	var org models.Organization
	var response models.Response

	// Decode JSON request body into the Organization struct
	if err := json.NewDecoder(r.Body).Decode(&org); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	org.ID = int(ID)
	check := utils.NameValidationfunc(org.Name)
	if check {

		// Call the controller function to update the organization
		response = organization.UpdateOrg(&org, &LoggedUser)
	} else {
		response.Message = "Please fill the name correctly"
		response.Code = http.StatusNotAcceptable

	}
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

func GetOrganization(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	if LoggedUser.OrganizationID == int(ID) {

		response = organization.GetOrganization(int(ID))

	} else {

		response.Code = http.StatusUnauthorized
		response.Message = "You are not authorized to get information from other organizations"

	}

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
func GetAllOrganizations(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	// email := r.Context().Value("LoggedUserEmail").(string)

	// LoggedUser := user.GetLoggedUser(email)

	// if LoggedUser.OrganizationID == getOrganization.ID {

	response = organization.GetAllOrganizations()

	// } else {

	// 	response.Code = http.StatusUnauthorized
	// 	response.Message = "You are not authorized to get information from other organizations"

	// }

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
