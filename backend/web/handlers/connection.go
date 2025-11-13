package handlers

import (
	"DynViz/internal/connectors"
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/connections"
	"DynViz/pkg/organization"
	"DynViz/pkg/user"
	"DynViz/utils"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

func CreateConnection(w http.ResponseWriter, r *http.Request) {

	var connection models.Connection
	var response models.Response
	var err error

	// get connection values
	if err := json.NewDecoder(r.Body).Decode(&connection); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	connection.CreatedByID = LoggedUser.ID
	connection.LastModifiedBy = LoggedUser.ID
	connection.OrganizationID = LoggedUser.OrganizationID

	connection.ConnectionMaster, err = connections.GetConnectionMaster(connection.ConnectionMasterID)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
		utils.PrepareResponse(w, response)
		return
	} else {
		// Validate the Name field using the NameValidationfunc function
		if !utils.NameValidationfunc(connection.Name) {
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
		connection, err = connections.CreateConnection(&connection)
		if err != nil {
			response.Code = http.StatusInternalServerError
			response.Message = err.Error()
			utils.PrepareResponse(w, response)
			return
		} else {
			// set connection in map
			err = connectors.SetDBConnection(connection)
			if err != nil {
				response.Code = http.StatusInternalServerError
				response.Message = err.Error()
				// utils.PrepareResponse(w, response)
				// return
			} else {
				// check the set connection
				response = connections.CheckConnection(connection.ID)

			}

		}

	}

	if response.Code != http.StatusOK {
		connectors.UnSetConnection(connection.ID)
		response = connections.DeleteConn(connection.ID)
	}

	utils.PrepareResponse(w, response)
	// return

	// // prepare response
	// responseData, err := json.Marshal(response)
	// if err != nil {
	// 	// Handle error gracefully, log it, and return an appropriate error response
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }

	// // write status
	// w.WriteHeader(response.Code)

	// // write response
	// w.Write(responseData)

	// // set header type
	// w.Header().Set("Content-Type", "application/json")

	// // Set content length for efficiency
	// w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
}

func GetConnection(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	// email := r.Context().Value("LoggedUserEmail").(string)

	// LoggedUser := user.GetLoggedUser(email)
	// fmt.Println(LoggedUser)

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	// Call GetConn to fetch the connection
	response = connections.GetConn(int(ID))
	utils.PrepareResponse(w, response)
	// // Encode the response data to JSON
	// responseData, err := json.Marshal(response)
	// if err != nil {
	// 	http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
	// 	return
	// }

	// // Set header type
	// w.Header().Set("Content-Type", "application/json")
	// // Set content length for efficiency
	// w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
	// // Write status
	// w.WriteHeader(response.Code)
	// // Write response
	// w.Write(responseData)
}

func RefreshConnection(w http.ResponseWriter, r *http.Request) {

	db := database.DB
	email := r.Context().Value("LoggedUserEmail").(string)
	LoggedUser := user.GetLoggedUser(email)
	// fmt.Println(LoggedUser)
	var connectionIDs []int

	// Fetch the connection IDs that match the given organization and are active
	if err := db.Model(&models.Connection{}).
		Where("organization_id IN (?) AND status = ?", LoggedUser.OrganizationID, 1).
		Pluck("id", &connectionIDs).Error; err != nil {
		http.Error(w, "Failed to fetch connection IDs", http.StatusInternalServerError)
		return
	}

	// Refresh each connection ID
	var allResponses []models.Response
	for _, id := range connectionIDs {
		resp := connectors.RefreshConnection(id)
		allResponses = append(allResponses, resp)
	}

	combinedResponse := models.Response{
		Message: "Connections refreshed successfully",
		Code:    http.StatusOK,
		Data:    allResponses,
	}

	utils.PrepareResponse(w, combinedResponse)
}

func GetAllConnections(w http.ResponseWriter, r *http.Request) {

	var response models.Response

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)
	fmt.Println(LoggedUser)

	// Fetch all countries
	response = connections.GetAllConnections(LoggedUser.OrganizationID)

	utils.PrepareResponse(w, response)
	// // prepare response
	// responseData, err := json.Marshal(response)
	// if err != nil {
	// 	// Handle error gracefully, log it, and return an appropriate error response
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }

	// // write status
	// w.WriteHeader(response.Code)

	// // write response
	// w.Write(responseData)

	// // set header type
	// w.Header().Set("Content-Type", "application/json")

	// // Set content length for efficiency
	// w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
}

func UpdateConnection(w http.ResponseWriter, r *http.Request) {

	var requestData models.Connection
	var response models.Response

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	requestData.ID = int(ID)

	// Print the Content-Type header for debugging
	fmt.Println("Content-Type:", r.Header.Get("Content-Type"))

	// get connection values
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)
	if !utils.NameValidationfunc(requestData.Name) {
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

	// Debugging: Print the decoded requestData and email
	// fmt.Printf("Decoded requestData: %+v\n", requestData)
	// fmt.Println("Email from token:", email)

	requestData.ConnectionMaster, err = connections.GetConnectionMaster(requestData.ConnectionMasterID)
	if err != nil {
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {
		// set connection in map
		connectors.SetDBConnection(requestData)

		// check the set connection
		response = connections.CheckConnection(requestData.ID)
		if response.Code == http.StatusOK {

			// create connection if check is passed
			response = connections.UpdateConn(&requestData, LoggedUser.ID)
		}
	}
	// // Call the utility function to update a connection
	// response = connections.UpdateConn(&requestData, LoggedUser.ID)
	utils.PrepareResponse(w, response)
	// // Encode the response data to JSON
	// responseData, err := json.Marshal(response)
	// if err != nil {
	// 	http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
	// 	return
	// }

	// // Set header type
	// w.Header().Set("Content-Type", "application/json")
	// // Set content length for efficiency
	// w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
	// // Write status
	// w.WriteHeader(response.Code)
	// // Write response
	// w.Write(responseData)
}

func CheckConnection(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	var connection models.Connection

	// Extract the token from the request
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprint(w, "Missing authorization header")
		return
	}

	// get connection values
	if err := json.NewDecoder(r.Body).Decode(&connection); err != nil {
		// change response type
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// tokenString = tokenString[len("Bearer "):]

	// email := security.GetUserFromToken(tokenString)

	// LoggedUser := user.GetLoggedUser(email)

	var err error
	// create connection ID
	connection.ConnectionMaster, err = connections.GetConnectionMaster(connection.ConnectionMasterID)
	if err != nil {
		// Handle error gracefully, log it, and return an appropriate error response
		response.Code = http.StatusInternalServerError
		response.Message = err.Error()
	} else {

		// set connection in map
		connectors.SetDBConnection(connection)

		// check the set connection
		response = connections.CheckConnection(connection.ID)

		// unset connection
		connectors.UnSetConnection(connection.ID)

	}

	utils.PrepareResponse(w, response)
	// // prepare response
	// responseData, err := json.Marshal(response)
	// if err != nil {
	// 	// Handle error gracefully, log it, and return an appropriate error response
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }

	// // write status
	// w.WriteHeader(response.Code)

	// // write response
	// w.Write(responseData)

	// // set header type
	// w.Header().Set("Content-Type", "application/json")

	// // Set content length for efficiency
	// w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))

}

func DeleteConnection(w http.ResponseWriter, r *http.Request) {
	var requestData models.Connection
	var response models.Response

	ID, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		// Handle the error if the conversion fails
		http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
		return
	}

	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	// Debugging: Print the decoded requestData and email
	fmt.Printf("Decoded requestData: %+v\n", requestData)
	fmt.Println("Email from token:", email)

	// Call the utility function to update a connection
	response = connections.DeleteConnection(int(ID), LoggedUser.ID)

	utils.PrepareResponse(w, response)
	// // Encode the response data to JSON
	// responseData, err := json.Marshal(response)
	// if err != nil {
	// 	http.Error(w, "Failed to serialize data", http.StatusInternalServerError)
	// 	return
	// }

	// // Set header type
	// w.Header().Set("Content-Type", "application/json")
	// // Set content length for efficiency
	// w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))
	// // Write status
	// w.WriteHeader(response.Code)
	// // Write response
	// w.Write(responseData)
}

func UploadFile(w http.ResponseWriter, r *http.Request) {

	var response models.Response
	var FileUpload models.FileUpload
	var Organization models.Organization
	var filename string

	// Parse the incoming request with a maximum memory limit
	err := r.ParseMultipartForm(10 << 20) // 10MB limit
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	// Retrieve the file from the form-data
	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	defer file.Close()
	connectionid := r.FormValue("connection_id")
	if err != nil {
		http.Error(w, "Error retrieving the connectionID", http.StatusBadRequest)
		return
	}

	connectionID, err := strconv.Atoi(connectionid)
	if err != nil {
		// Handle the error if the string is not a valid integer
		fmt.Println("Error converting string to integer:", err)
		return
	}

	// if err := json.NewDecoder(r.Body).Decode(&FileUpload); err != nil {
	// 	// change response type
	// 	http.Error(w, err.Error(), http.StatusBadRequest)
	// 	return
	// }
	email := r.Context().Value("LoggedUserEmail").(string)

	LoggedUser := user.GetLoggedUser(email)

	//check file and upload code from here
	ext := filepath.Ext(handler.Filename)
	// Check if the extension is .csv or .xlsx and remove it
	if ext == ".csv" || ext == ".xlsx" {
		filename = strings.TrimSuffix(handler.Filename, ext)
	}

	checkFile := utils.CheckFileInDB(filename, LoggedUser)
	if checkFile == true {
		UploadFileDir := `N:\Github\fileUpload`
		// UploadFileDir := `./var/www/fileUploadDir`
		if _, err := os.Stat(UploadFileDir); os.IsNotExist(err) {
			os.MkdirAll(UploadFileDir, os.ModePerm)
		}

		Organization = organization.GetOrganizationByEmail(email)

		// Create the organization-specific directory if it doesn't exist
		organizationDir := filepath.Join(UploadFileDir, Organization.Name)
		if _, err := os.Stat(organizationDir); os.IsNotExist(err) {
			if err := os.MkdirAll(organizationDir, os.ModePerm); err != nil {
				http.Error(w, "Unable to create directory", http.StatusInternalServerError)
				return
			}
		}

		// Create the file path in the organization's directory
		filePath := filepath.Join(organizationDir, handler.Filename)
		dest, err := os.Create(filePath)
		if err != nil {
			http.Error(w, "Unable to save file", http.StatusInternalServerError)
			return
		}
		defer dest.Close()

		// Copy the uploaded file data to the destination
		if _, err = io.Copy(dest, file); err != nil {
			http.Error(w, "Unable to save file", http.StatusInternalServerError)
			return
		}

		FileUpload.FileURL = filePath

		// Process the file and store its data into the PostgreSQL database
		response = connections.ProcessFileAndStoreInDB(filename, FileUpload, LoggedUser, Organization, connectionID)
		utils.PrepareResponse(w, response)
	} else {
		response.Message = "File Already Present!!!"
		response.Code = http.StatusNotAcceptable
		utils.PrepareResponse(w, response)
	}

}
