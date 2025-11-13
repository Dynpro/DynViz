package handlers

import (
	"DynViz/models"
	"strconv"

	// "log"
	"DynViz/pkg/embedapi"
	// "DynViz/pkg/user"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

func CreateEmbedAPI(w http.ResponseWriter, r *http.Request) {
    var Embed models.EmbedDashboardReqPayload
    var response models.Response

    // Decode request body into EmbedPayload
    if err := json.NewDecoder(r.Body).Decode(&Embed); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }


    // Call the controller function to create the Embed APIs
    response = embedapi.CreateEmbedAPIs(Embed)

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

func UpdateEmbedAPI(w http.ResponseWriter, r *http.Request) {
	var Embed models.EmbedDashboardReqPayload
	var response models.Response
	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}
	// set dashbaord
	if err := json.NewDecoder(r.Body).Decode(&Embed); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// email := r.Context().Value("LoggedUserEmail").(string)
	// LoggedUser := user.GetLoggedUser(email)

	// Call the controller function to create the dashboard
	// response = datablock.CreateDataBlock(datablockPayload, LoggedUser)
	response = embedapi.UpdateEmbedAPIs(ID, Embed)
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

func DeleteEmbedAPI(w http.ResponseWriter, r *http.Request) {

	var Embed models.EmbedDashboardReqPayload
	var response models.Response
	// ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	// if err != nil {
	// 	// Handle the error if the conversion fails
	// 	http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
	// 	return
	// }

	// set dashbaord
	if err := json.NewDecoder(r.Body).Decode(&Embed); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// email := r.Context().Value("LoggedUserEmail").(string)
	// LoggedUser := user.GetLoggedUser(email)

	// Call the controller function to create the dashboard
	// response = datablock.CreateDataBlock(datablockPayload, LoggedUser)
	response = embedapi.DeleteEmbedAPIs ( Embed)
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

func GetEmbedAPI(w http.ResponseWriter, r *http.Request) {
	var response models.Response
	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}


	// Get the origin from the request header
	origin := r.Header.Get("Origin")

	// Parse the origin URL
	parsedURL, err := url.Parse(origin)
	if err != nil {
		http.Error(w, "Invalid origin", http.StatusBadRequest)
		return
	}

	// Extract the domain (host) from the parsed URL
	Domain := parsedURL.Host

	// Print the domain
	fmt.Println("Domain:", Domain)


	response = embedapi.GetEmbedAPI (ID, Domain)
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
