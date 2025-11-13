package handlers

import (
	// "DynViz/internal/security"
	"DynViz/models"
	"DynViz/utils"
	"strconv"

	"DynViz/pkg/user"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	// "os/user"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	// var org models.Organization
	var user models.User
	// email := r.Context().Value("LoggedUserEmail").(string)

	// LoggedUser := user.GetLoggedUser(email)
	// set organization
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user.LastModifiedBy = user.CreatedByID

	fmt.Println(user)

}

func GetUser(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	var GetIDPayload models.GetIDPayload
	var users []models.User

	// get create UAC values
	if err := json.NewDecoder(r.Body).Decode(&GetIDPayload); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	response.Code = http.StatusOK

	for _, ID := range GetIDPayload.ID {

		user, err := user.GetUserByID(ID)
		if err != nil {
			response.Code = http.StatusNotFound
			response.Message = err.Error()
			break
		}

		if user.OrganizationID != LoggedUser.OrganizationID {
			response.Code = http.StatusUnauthorized
			response.Message = "You are not authorized to view users from other organization"
			break
		}

		users = append(users, user)

	}

	if response.Code == http.StatusOK {
		response.Message = fmt.Sprintf("%d users fetched from the organization : %d", len(users), LoggedUser.OrganizationID)
		response.Data = users
		response.Total = len(users)
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

func GetAllUsers(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	users, err := user.GetUsersByOrganization(LoggedUser.OrganizationID)

	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
		return
	}

	response.Code = http.StatusOK
	response.Message = string(rune(len(users))) + " users for the Organization : " + string(rune(LoggedUser.OrganizationID)) + "fetched successfully"
	response.Data = users
	response.Total = len(users)

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

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	var users models.User
	var response models.Response

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)
	fmt.Println(LoggedUser)
	// Decode JSON request body into the User struct
	if err := json.NewDecoder(r.Body).Decode(&users); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}
	check := utils.NameValidationfunc(users.Name)
	if check {
		users.ID = int(ID)

		// Call the controller function to update the user
		response = user.UpdateUser(&users, &LoggedUser)
	} else {
		response.Message = "Please fill the Name correctly"
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

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	var AdminUsr models.User
	var response models.Response
	var Ids models.DeleteMultipleUsersRequest

	// Decode JSON request body into the Organization struct
	if err := json.NewDecoder(r.Body).Decode(&Ids); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	AdminUsr = user.GetLoggedUser(email)
	//logged user ended

	// ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	// if err != nil {
	// 	// Handle the error if the conversion fails
	// 	http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
	// 	return
	// }

	// Call the controller function to update the organization

	usrResponse := user.DeleteUser(Ids, AdminUsr)
	// Set the response
	response.Code = usrResponse.Code
	response.Message = usrResponse.Message

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

func AddNewUser(w http.ResponseWriter, r *http.Request) {
	var usr, AdminUsr models.User
	var response models.Response

	// Decode JSON request body into the Organization struct
	if err := json.NewDecoder(r.Body).Decode(&usr); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	AdminUsr = user.GetLoggedUser(email)
	//logged user ended
	check := utils.NameValidationfunc(usr.Name)
	if check {

		usrResponse := user.AddNewUser(usr, AdminUsr)
		// Set the response
		response.Code = usrResponse.Code
		response.Message = usrResponse.Message
	} else {
		response.Message = "Please fill the Name correctly"
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

func GetUsersByTeam(w http.ResponseWriter, r *http.Request) {
	var response models.Response

	// email := r.Context().Value("LoggedUserEmail").(string)

	// LoggedUser := user.GetLoggedUser(email)

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	users, err := user.GetUsersByTeam(int(intID))
	if err != nil {
		http.Error(w, "Failed to fetch users by team", http.StatusInternalServerError)
		return
	}
	if len(users) == 0 {
		response.Message = "No users found"
		response.Code = http.StatusNotFound
		responseData, err := json.Marshal(response)
		if err != nil {
			http.Error(w, "Failed to serialize response", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		if _, err := w.Write(responseData); err != nil {
			log.Println("Failed to write response:", err)
		}
		return
	}

	// Include the total number of users in the response
	response.Message = "Users fetched successfully"
	response.Code = http.StatusOK
	response.Total = len(users)
	response.Data = users

	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize users by team data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if _, err := w.Write(responseData); err != nil {
		log.Println("Failed to write response:", err)
	}
}

func GetUsersByRole(w http.ResponseWriter, r *http.Request) {
	var response models.Response
	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	users, err := user.GetUsersByRole(int(intID), LoggedUser.OrganizationID)
	if err != nil {
		http.Error(w, "Failed to fetch users by role", http.StatusInternalServerError)
		return
	}

	if len(users) == 0 {
		response.Message = "No users found"
		response.Code = http.StatusNotFound
		responseData, err := json.Marshal(response)
		if err != nil {
			http.Error(w, "Failed to serialize response", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		if _, err := w.Write(responseData); err != nil {
			log.Println("Failed to write response:", err)
		}
		return
	}

	// Include the total number of users in the response
	response.Message = "Users fetched successfully"
	response.Code = http.StatusOK
	response.Total = len(users)
	response.Data = users

	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize users by role data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if _, err := w.Write(responseData); err != nil {
		log.Println("Failed to write response:", err)
	}
}
