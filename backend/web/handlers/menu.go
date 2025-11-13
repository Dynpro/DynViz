package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"DynViz/pkg/user"
	"DynViz/pkg/menu"
	
)

func GetAllMenus(w http.ResponseWriter, r *http.Request) {
	// Call the function to get all menus
	
	email := r.Context().Value("LoggedUserEmail").(string)
	user := user.GetLoggedUser(email)
	
	response := menu.GetAllMenus(user.OrganizationID)
	// Prepare response
	responseData, err := json.Marshal(response)
	if err != nil {
		// Handle error gracefully, log it, and return an appropriate error response
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))

	// Write status code
	w.WriteHeader(response.Code)

	// Write response
	w.Write(responseData)
}
