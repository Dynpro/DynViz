package handlers

import (
	"DynViz/models"
	"DynViz/pkg/uac"
	"DynViz/pkg/user"
	"encoding/json"
	"fmt"
	"net/http"
)

func CreateUAC(w http.ResponseWriter, r *http.Request) {

	var createUACpayload models.CreateUACPayload

	var response, userResponse models.Response

	// get create UAC values
	if err := json.NewDecoder(r.Body).Decode(&createUACpayload); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	var usersByTeam []models.User

	// create UAC with teamID
	for _, teamId := range createUACpayload.TeamID {
		fmt.Println(teamId)

		usersByTeam, _ = user.GetUsersByTeam(teamId)

		for _, users := range usersByTeam {
			fmt.Println(users.ID)

			// check if both users are from the same organization
			if LoggedUser.OrganizationID == users.OrganizationID {

				response = uac.CreateUAC(users.ID, createUACpayload.RoleID, users.TeamID, LoggedUser.OrganizationID, LoggedUser.ID)

				if response.Code == http.StatusCreated {
					userResponse = user.UpdateUser(&users, &LoggedUser)
					response.Message = response.Message + " | " + userResponse.Message
				}

				if userResponse.Code != response.Code {
					// delete uac

					// set response
					if userResponse.Code > 0 {
						response.Message = response.Message + " | " + userResponse.Message
					}

				}

			} else {
				response.Message = "You are not authorized to create UAC for users from other organizations"
				response.Code = http.StatusUnauthorized
			}

		}

	}

	// create UAC without teamID
	for _, userID := range createUACpayload.UserID {
		fmt.Println(userID)

		// get all user details
		checkUser, err := user.GetUserByID(userID)
		if err != nil {

			response.Message = "User does not exist"
			response.Code = http.StatusNotFound
			continue
		}

		// check if both users are from the same organization
		if LoggedUser.OrganizationID == checkUser.OrganizationID {

			if checkUser.TeamID != 0 {

				response = uac.CreateUAC(userID, createUACpayload.RoleID, checkUser.TeamID, LoggedUser.OrganizationID, LoggedUser.ID)

			} else {

				response = uac.CreateUAC(userID, createUACpayload.RoleID, 0, LoggedUser.OrganizationID, LoggedUser.ID)

			}

			if response.Code == http.StatusCreated {
				checkUser.RoleID = createUACpayload.RoleID
				userResponse = user.UpdateUser(&checkUser, &LoggedUser)
				response.Message = response.Message + " | " + userResponse.Message
			}

			if userResponse.Code != response.Code {
				// delete uac

				// set response
				if userResponse.Code > 0 {
					response.Message = response.Message + " | " + userResponse.Message
				}

			}

		} else {
			response.Message = "You are not authorized to create UAC for users from other organizations"
			response.Code = http.StatusUnauthorized
		}

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

func UpdateUAC(w http.ResponseWriter, r *http.Request) {

	var createUACpayload models.CreateUACPayload

	var response, userResponse models.Response

	// get create UAC values
	if err := json.NewDecoder(r.Body).Decode(&createUACpayload); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	var usersByTeam []models.User

	// create UAC with teamID
	for _, teamId := range createUACpayload.TeamID {
		fmt.Println(teamId)

		usersByTeam, _ = user.GetUsersByTeam(teamId)

		for _, users := range usersByTeam {
			fmt.Println(users.ID)

			// check if both users are from the same organization
			if LoggedUser.OrganizationID == users.OrganizationID {

				response = uac.UpdateUAC(createUACpayload.UACID, users.ID, createUACpayload.RoleID, users.TeamID, LoggedUser.OrganizationID, LoggedUser.ID)

				if response.Code == http.StatusCreated {
					userResponse = user.UpdateUser(&users, &LoggedUser)
					response.Message = response.Message + " | " + userResponse.Message
				}

				if userResponse.Code != response.Code {
					// delete uac

					// set response
					if userResponse.Code > 0 {
						response.Message = response.Message + " | " + userResponse.Message
					}

				}

			} else {
				response.Message = "You are not authorized to update UAC for users from other organizations"
				response.Code = http.StatusUnauthorized
			}

		}

	}

	// create UAC without teamID
	for _, userID := range createUACpayload.UserID {
		fmt.Println(userID)

		// get all user details
		checkUser, err := user.GetUserByID(userID)
		if err != nil {

			response.Message = "User does not exist"
			response.Code = http.StatusNotFound
			continue
		}

		// check if both users are from the same organization
		if LoggedUser.OrganizationID == checkUser.OrganizationID {
			response = uac.CreateUAC(userID, createUACpayload.RoleID, 0, LoggedUser.OrganizationID, LoggedUser.ID)

			if response.Code == http.StatusCreated {
				userResponse = user.UpdateUser(&checkUser, &LoggedUser)
				response.Message = response.Message + " | " + userResponse.Message
			}

			if userResponse.Code != response.Code {
				// delete uac

				// set response
				if userResponse.Code > 0 {
					response.Message = response.Message + " | " + userResponse.Message
				}

			}

		} else {
			response.Message = "You are not authorized to create UAC for users from other organizations"
			response.Code = http.StatusUnauthorized
		}

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

func GetUAC(w http.ResponseWriter, r *http.Request) {
	var getUACpayload models.GetUACPayload

	var response models.Response

	// get create UAC values
	if err := json.NewDecoder(r.Body).Decode(&getUACpayload); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	users, err := user.GetUsersByRole(getUACpayload.RoleID, LoggedUser.OrganizationID)

	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
		return
	}

	response.Code = http.StatusOK
	response.Message = string(rune(len(users))) + " users for the Role : " + string(rune(getUACpayload.RoleID)) + "fetched successfully"
	response.Data = users

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
