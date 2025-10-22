package handlers

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/tile"
	"DynViz/pkg/user"
	"DynViz/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func CreateTile(w http.ResponseWriter, r *http.Request) {
	var tilepayload models.TileRequestPayloadMaster
	var response models.Response

	// set Tile
	if err := json.NewDecoder(r.Body).Decode(&tilepayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	if !utils.NameValidationfunc(tilepayload.TileReqP.Name) {
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

	// Call the controller function to create the dashboard
	orgResponse := tile.CreateTile(tilepayload, LoggedUser)

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

func GetMultipleTiles(w http.ResponseWriter, r *http.Request) {
	// Parse the ID from the query parameters
	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Get database connection
	db := database.DB
	var dashboard models.Dashboard

	// Fetch the dashboard
	if err := db.Where("id = ? AND status = ?", intID, 1).First(&dashboard).Error; err != nil {
		http.Error(w, "Failed to fetch dashboard", http.StatusNotFound)
		return
	}

	// Fetch the tiles (assuming GetAllTiles returns a models.Response)
	responseOld, _ := tile.GetAllTiles(intID)
	if responseOld.Code != http.StatusOK {
		// Return an error response if tiles couldn't be fetched
		http.Error(w, responseOld.Message, responseOld.Code)
		return
	}

	// Convert the dashboard.Configs (a JSON string) into a JSON object.
// Convert the dashboard.Configs (a JSON string) into a JSON object.
var configObj interface{}
if len(dashboard.Configs) > 0 {
	var jsonStr string
	// First, unmarshal the JSON string into a Go string
	if err := json.Unmarshal(dashboard.Configs, &jsonStr); err != nil {
		fmt.Println("Error unmarshaling JSON string:", err)
		configObj = nil
	} else {
		// Second, unmarshal the Go string into a JSON object
		if err := json.Unmarshal([]byte(jsonStr), &configObj); err != nil {
			fmt.Println("Error unmarshaling JSON object:", err)
			configObj = nil
		}
	}
}



	// Combine dashboard and tiles data.
	// Only include the dashboard's Name and the parsed Configs along with the tiles data.
	var response models.Response
	response.Data = map[string]interface{}{
		"dashboard": map[string]interface{}{
			"Name":    dashboard.Name,
			"Configs": configObj,
		},
		"tiles": responseOld.Data,
	}
	
	// Set the HTTP status code to 200 OK
	response.Code = http.StatusOK

	// Marshal the response data into JSON
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to serialize response data", http.StatusInternalServerError)
		return
	}

	// Set response headers and write the response
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
	w.WriteHeader(response.Code)
	w.Write(responseData)
}





func GetTile(w http.ResponseWriter, r *http.Request) {

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	response := tile.GetTile(int(intID))
	// fmt.Println(response)

	// Marshal the response data
	responseData, err := json.Marshal(response)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to serialize Tile data", http.StatusInternalServerError)
		return
	}

	// Write the response
	w.WriteHeader(response.Code)
	w.Write(responseData)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
}

func UpdateTile(w http.ResponseWriter, r *http.Request) {
	var tilepayload []models.Tile
	var response models.Response

	// set Tile
	if err := json.NewDecoder(r.Body).Decode(&tilepayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	// if err != nil {
	// 	// Handle the error if the conversion fails
	// 	http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
	// 	return
	// }

	// tilepayload.ID = int(intID)
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	// if !utils.NameValidationfunc(tilepayload.Name) {   //////need to change logic as now passing array of tiles
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
	// Call the controller function to create the tile
	orgResponse := tile.UpdateTiles(tilepayload, LoggedUser)

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

func DeleteTile(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)
	// Call the controller function to delete Tile
	orgResponse := tile.DeleteTile(int(intID), LoggedUser.ID)

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


func CreateTileLoc(w http.ResponseWriter, r *http.Request) {
	var requestData models.Dashboard
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
	// response = set.CreateSet(&requestData, &user)
	response = tile.CreateTileLoc(&requestData, &user)
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