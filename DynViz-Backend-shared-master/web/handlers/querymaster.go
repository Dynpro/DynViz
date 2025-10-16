package handlers

import (
	"DynViz/models"
	"DynViz/pkg/querymaster"
	"DynViz/pkg/user"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	// "strings"
)

func CreateQuery(w http.ResponseWriter, r *http.Request) {
	var requestData models.QueryMaster
	var response models.Response

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Log the received requestData for debugging
	// log.Printf("Received request data: %+v\n", requestData.ConnectionMasterID)

	email := r.Context().Value("LoggedUserEmail").(string)
	user := user.GetLoggedUser(email)
	
	// Call the utility function to create a connection
	response = querymaster.CreateQuery(&requestData, &user)

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

func UpdateQuery(w http.ResponseWriter, r *http.Request) {
	var requestData models.QueryMaster
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

	// Call the utility function to update the query
	response = querymaster.UpdateQuery(intID, &requestData, user.ID)

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

func DeleteQuery(w http.ResponseWriter, r *http.Request) {
	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	// Call the utility function to update the query
	response = querymaster.DeleteQuery(intID, user.ID)

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

func GetAllQuery(w http.ResponseWriter, r *http.Request) {

	email := r.Context().Value("LoggedUserEmail").(string)

	user := user.GetLoggedUser(email)

	fmt.Println(user)

	// Fetch all connections
	response := querymaster.GetAllQueries()

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

func GetQuery(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call  to fetch the query  controller
	cm, err := querymaster.GetQuery(intID)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		response.Code = http.StatusOK
		response.Data = cm

		response.Message = "query fetched successfully!"
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

// ExecuteQueryHandler is the handler function for executing a query
func ExecuteQuery(w http.ResponseWriter, r *http.Request) {
	var req models.QueryRequest
	var response models.Response

	// Decode the request payload
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Extract the connection ID from the URL query parameters
	connectionID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Wrap the query with backticks
	// Use strings.ReplaceAll to ensure no ` is inside the query itself
	req.Query = fmt.Sprintf("%s", req.Query)

	// Log the query for debugging
	fmt.Println(req.Query)

	// Execute the query
	cm, err := querymaster.TileQuery(req, connectionID)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		response.Code = http.StatusOK
		response.Data = cm
		response.Message = "Query fetched successfully!"
	}

	// Encode the response data to JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
		return
	}

	// Set header type and content length
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))

	// Write status and response
	w.WriteHeader(response.Code)
	w.Write(responseData)
}
