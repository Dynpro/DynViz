package handlers

import (
	"DynViz/models"
	datablock "DynViz/pkg/datablock"
	"DynViz/pkg/user"
	"DynViz/utils"

	// "DynViz/utils"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

// func CreateDataBlock(w http.ResponseWriter, r *http.Request) {
// 	var datablockPayload models.DataBlock
// 	var response models.Response

// 	// set dashbaord
// 	if err := json.NewDecoder(r.Body).Decode(&datablockPayload); err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}
// 	email := r.Context().Value("LoggedUserEmail").(string)
// 	LoggedUser := user.GetLoggedUser(email)

// 	// Call the controller function to create the dashboard
// 	response = datablock.CreateDataBlock(datablockPayload, 00000, LoggedUser)   commented for some time

// 	// Prepare response data
// 	responseData, err := json.Marshal(response)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	// Set response headers
// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(response.Code)

// 	// Write response data
// 	_, err = w.Write(responseData)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// }

func UpdateDataBlock(w http.ResponseWriter, r *http.Request) {
	var datablockPayload []models.DataBlock
	var response models.Response
	var err error

	// templatedatablockmasterPayload.ID = ID
	// set dashbaord
	if err := json.NewDecoder(r.Body).Decode(&datablockPayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// datablockPayload.ID, err = strconv.Atoi(r.URL.Query().Get("id"))
	// if err != nil {
	// 	// Handle the error if the conversion fails
	// 	http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
	// }

	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	// Call the controller function to create the dashboard
	response = datablock.UpdateDataBlocks(datablockPayload, LoggedUser)

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

func DeleteDataBlock(w http.ResponseWriter, r *http.Request) {
	var datablockPayload models.DataBlock
	var response models.Response
	var err error

	// templatedatablockmasterPayload.ID = ID
	// set dashbaord
	if err := json.NewDecoder(r.Body).Decode(&datablockPayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	datablockPayload.ID, err = strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
	}

	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)

	// Call the controller function to create the dashboard
	response = datablock.DeleteDataBlock(datablockPayload.ID, LoggedUser)

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

// GetTemplateDataBlock handles the request to get the template data block
func GetDataBlock(w http.ResponseWriter, r *http.Request) {
	var templatedatablockmasterPayload models.TemplateDataBlockMaster
	var response models.Response
	var err error

	var dataBlockFilterMapping models.DataBlockFilterMapping

	if err := json.NewDecoder(r.Body).Decode(&dataBlockFilterMapping); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&templatedatablockmasterPayload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call the controller function to get the template data block master
	response = datablock.GetDataBlock(ID)

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
	if _, err := w.Write(responseData); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func GetAllDataBlock(w http.ResponseWriter, r *http.Request) {

	var TileFilterMapping models.DataBlockFilterMapping
	var response models.Response
	// intID, err := strconv.Atoi(r.URL.Query().Get("id"))
	// if err != nil {
	// 	// Handle the error if the conversion fails
	// 	http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
	// 	return
	// }

	if err := json.NewDecoder(r.Body).Decode(&TileFilterMapping); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// // set filter
	utils.SetFilter(TileFilterMapping.Filters)

	// email := r.Context().Value("LoggedUserEmail").(string)
	// LoggedUser := user.GetLoggedUser(email)

	fmt.Println(TileFilterMapping.TileID)

	// Fetch all connections
	response = datablock.GetAllDataBlock(TileFilterMapping.TileID)

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

func ApplyDataBlock(w http.ResponseWriter, r *http.Request) {
	var dat models.Applydatareq
	var response models.Response
	var err error

	// Decode the incoming JSON request into the Applydatareq struct
	if err := json.NewDecoder(r.Body).Decode(&dat); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Retrieve the logged user's email from the context
	// email, ok := r.Context().Value("LoggedUserEmail").(string)
	// if !ok {
	//     http.Error(w, "Invalid or missing LoggedUserEmail", http.StatusUnauthorized)
	//     return
	// }

	// LoggedUser := user.GetLoggedUser(email)
	// fmt.
	// Call the ApplyDataBlock function with the necessary parameters
	// fmt.Println("handler working")
	response, err = datablock.ApplyResultToDatablock(dat)
	if err != nil {
		fmt.Println(response, ":response")
		// If an error occurred, the response will already have the appropriate code and message
		responseData, _ := json.Marshal(response)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(response.Code)
		w.Write(responseData)
		return
	}

	// response.Data = utils.DecodeBinaryString(response.Data)
	// response.Data = json.RawMessage(utils.DecodeBinaryString(response.Data).(interface{}).(string))

	// Prepare and send the successful response
	responseData, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set response headers and write the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.Code)
	w.Write(responseData)
}
