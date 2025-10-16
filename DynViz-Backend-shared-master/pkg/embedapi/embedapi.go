package embedapi

import (
	"DynViz/internal/database"
	"DynViz/models"
	Dashboard "DynViz/pkg/dashboard"
	"fmt"
	"log"
	"net/http"
	"os"
)

func CreateEmbedAPIs(EmbedPayload models.EmbedDashboardReqPayload) models.Response {
	fmt.Println(EmbedPayload)
	HostName := os.Getenv("SERVER_HOST")
	Endpoint := "EmbedAPI/GetDashboard?id="

	var response models.Response
	db := database.DB

	var URLs []string

	// Iterate over the DashboardIDs and create a new record for each one
	for _, dashboardID := range EmbedPayload.DIDs {
		Embedd := models.EmbedAPI{
			TestDomain:     EmbedPayload.TestDomain,
			ProdDomain:     EmbedPayload.ProdDomain,
			HostName:       HostName,
			Endpoint:       Endpoint,
			Istest:         EmbedPayload.IsTest,
			IsProd:         EmbedPayload.IsProd,
			OrganizationID: EmbedPayload.OrganizationID,
			ProjectID:      EmbedPayload.ProjectID,
			DashboardID:    int(dashboardID),
		}
		if err := db.Create(&Embedd).Error; err != nil {
			log.Println("Error creating URL:", err)
			response.Message = "Unable to create URL"
			response.Code = http.StatusInternalServerError
			return response
		}

		url := HostName + Endpoint + fmt.Sprint(Embedd.ID)
		URLs = append(URLs, url)
	}

	response.Message = "URLs created successfully"
	response.Data = URLs
	response.Code = http.StatusOK
	return response
}

func UpdateEmbedAPIs(ID int, EmbedPayload models.EmbedDashboardReqPayload) models.Response {
	HostName := os.Getenv("SERVER_HOST")
	Endpoint := "EmbedAPI/Get?id="

	var response models.Response
	var ExistingEMbedAPI models.EmbedAPI
	db := database.DB

	var URLs []string
	if err := db.Where("id = ?", ID).First(&ExistingEMbedAPI).Error; err != nil {
		log.Println("Error fetching Embeding API:", err)
		response.Message = "Unable to fetch Embeding API"
		response.Code = http.StatusInternalServerError
		return response
	}

	Updateddata := map[string]interface{}{
		"TestDomain":     EmbedPayload.TestDomain,
		"ProdDomain":     EmbedPayload.ProdDomain,
		"HostName":       HostName,
		"Endpoint":       Endpoint,
		"Istest":         EmbedPayload.IsTest,
		"IsProd":         EmbedPayload.IsProd,
		"OrganizationID": EmbedPayload.OrganizationID,
		"ProjectID":      EmbedPayload.ProjectID,
	}
	if err := db.Model(&ExistingEMbedAPI).Where("id = ?", ID).Updates(Updateddata).Error; err != nil {
		log.Println("Error updating URL:", err)
		response.Message = "Unable to update URL"		
		response.Code = http.StatusInternalServerError
		return response
	}

	// // Update existing records for each DashboardID
	// for _, dashboardID := range EmbedPayload.DIDs {
	// 	ExistingEMbedAPI.TestDomain = EmbedPayload.TestDomain
	// 	ExistingEMbedAPI.ProdDomain = EmbedPayload.ProdDomain
	// 	ExistingEMbedAPI.Istest = EmbedPayload.IsTest
	// 	ExistingEMbedAPI.IsProd = EmbedPayload.IsProd
	// 	ExistingEMbedAPI.ProjectID = EmbedPayload.ProjectID
	// 	ExistingEMbedAPI.DashboardID = int(dashboardID)

	// 	if err := db.Model(&ExistingEMbedAPI).Updates(ExistingEMbedAPI).Error; err != nil {
	// 		log.Println("Error updating URL:", err)
	// 		response.Message = "Unable to update URL"
	// 		response.Code = http.StatusInternalServerError
	// 		return response
	// 	}

	// 	url := HostName + Endpoint + fmt.Sprint(ID)
	// 	URLs = append(URLs, url)
	// }

	response.Message = "URLs updated successfully"
	response.Data = URLs
	response.Code = http.StatusOK
	return response
}

func DeleteEmbedAPIs(EmbedPayload models.EmbedDashboardReqPayload) models.Response {
	var response models.Response
	db := database.DB

	// Iterate over the DashboardIDs and update the status for each one
	for _, dashboardID := range EmbedPayload.DIDs {
		var ExistingEMbedAPI models.EmbedAPI

		if err := db.Where("id = ? ", dashboardID).First(&ExistingEMbedAPI).Error; err != nil {
			log.Println("Error fetching Embedding API:", err)
			response.Message = "Unable to fetch Embedding API"
			response.Code = http.StatusInternalServerError
			return response
		}

		// ExistingEMbedAPI.Status = 0
		updateddata := map[string]interface{}{
			"Status": 0,
		}
		if err := db.Model(&ExistingEMbedAPI).Updates(updateddata).Error; err != nil {
			log.Println("Error updating URL:", err)
			response.Message = "Unable to update URL"
			response.Code = http.StatusInternalServerError
			return response
		}

	}

	response.Message = "URLs deleted successfully"
	response.Code = http.StatusOK
	return response
}

func GetEmbedAPI(ID int, Domain string) models.Response {
	var response models.Response
	var EmbedAPI models.EmbedAPI
	db := database.DB

	// Fetch the EmbedAPI record from the database
	if err := db.Where("id = ? AND status = ?", ID, 1).First(&EmbedAPI).Error; err != nil {
		response.Message = "Failed to fetch dashboard"
		response.Code = http.StatusNotFound
		return response
	}
	fmt.Println(EmbedAPI)
	// Compare the Domain from the payload with the Domain in the fetched EmbedAPI record
	if Domain == EmbedAPI.TestDomain || Domain == EmbedAPI.ProdDomain {
		response.Message = "Domain matched"
		response.Code = http.StatusOK
	} else {
		response.Message = "Domain not matched"
		response.Code = http.StatusBadRequest
		return response
	}

	// Get the dashboard information
	Response := Dashboard.GetDashboard(EmbedAPI.DashboardID)
	// response = res(EmbedAPI.DashboardID, Domain)

	response.Data = Response.Data

	return response
}
