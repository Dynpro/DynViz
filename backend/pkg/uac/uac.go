package uac

import (
	"DynViz/internal/database"
	"DynViz/models"
	"fmt"
	"log"
	"net/http"
)

func CreateUAC(userID int, roleID int, team_id int, organizationID int, LoggedUser int) models.Response {

	var uac models.UAC
	var response models.Response

	uac.UserID = userID
	uac.RoleID = roleID
	if team_id != 0 {
		uac.TeamID = team_id
	}
	uac.OrganizationID = organizationID
	uac.CreatedByID = LoggedUser
	uac.LastModifiedBy = LoggedUser

	db := database.DB

	if err := db.Create(&uac).Error; err != nil {

		log.Println(err)
		response.Message = "Unable to create UAC"
		response.Code = http.StatusInternalServerError

		return response
	} else {

		response.Message = fmt.Sprintf("UAC : (%d) created successfully!", uac.ID)
		response.Code = http.StatusCreated

		return response
	}

}

// func UpdateUAC(uacID int, userID int, roleID int, team_id int, organizationID int, LoggedUser int) models.Response {

// 	var uac models.UAC
// 	var response models.Response
// 	db := database.DB

// 	// var existingUser models.User
// 	if err := db.Where("id = ?", uacID).First(&uac).Error; err != nil {
// 		return models.Response{
// 			Message: "UAC not found",
// 			Code:    http.StatusBadRequest,
// 		}
// 	}

// 	uac.UserID = userID
// 	uac.RoleID = roleID
// 	if team_id != 0 {
// 		uac.TeamID = team_id
// 	}
// 	uac.OrganizationID = organizationID
// 	// uac.CreatedByID = createdBy
// 	// uac.CreatedDate = time.Now()
// 	uac.LastModifiedBy = LoggedUser

// 	if err := db.Save(&uac).Error; err != nil {

// 		log.Println(err)
// 		response.Message = "Unable to update UAC"
// 		response.Code = http.StatusInternalServerError

// 		return response
// 	} else {

// 		response.Message = fmt.Sprintf("UAC : (%d) created successfully!", uac.ID)
// 		response.Code = http.StatusCreated

// 		return response
// 	}

// }

func UpdateUAC(uacID int, userID int, roleID int, team_id int, organizationID int, LoggedUser int) models.Response {

	var uac models.UAC
	var response models.Response
	db := database.DB

	// var existingUser models.User
	if err := db.Where("id = ?", uacID).First(&uac).Error; err != nil {
		return models.Response{
			Message: "UAC not found",
			Code:    http.StatusBadRequest,
		}
	}

	updatefields := make(map[string]interface{})

	updatefields["UserID"] = userID
	updatefields["RoleID"] = roleID
	updatefields["OrganizationID"] = organizationID
	updatefields["LastModifiedBy"] = LoggedUser
	if team_id != 0 {
		updatefields["TeamID"] = team_id
	}
	if err := db.Model(&uac).Updates(updatefields).Error; err != nil {
		log.Println(err)
// =======
// 	// uac.UserID = userID
// 	// uac.RoleID = roleID
// 	// if team_id != 0 {
// 	// 	uac.TeamID = team_id
// 	// }
// 	// uac.OrganizationID = organizationID
// 	// // uac.CreatedByID = createdBy
// 	// // uac.CreatedDate = time.Now()
// 	// uac.LastModifiedBy = LoggedUser
// 	updatedData := map[string]interface{}{
// 		"UserID":         userID,
// 		"RoleID":         roleID,
// 		"TeamID":         team_id,
// 		"OrganizationID": organizationID,
// 		"LastModifiedBy": LoggedUser,
// 	}

// 	// if err := db.Save(&uac).Error; err != nil {

// 	// 	log.Println(err)
// 	// 	response.Message = "Unable to update UAC"
// 	// 	response.Code = http.StatusInternalServerError

// 	// 	return response
// 	// } else {

// 	// 	response.Message = fmt.Sprintf("UAC : (%d) created successfully!", uac.ID)
// 	// 	response.Code = http.StatusCreated

// 	// 	return response
// 	// }

// 	if err := db.Model(&uac).Updates(updatedData).Error; err != nil {

// 		log.Println(err)		
// >>>>>>> test
		response.Message = "Unable to update UAC"
		response.Code = http.StatusInternalServerError

		return response	
	}else{

		response.Message = fmt.Sprintf("UAC : (%d) updated successfully!", uac.ID)
		response.Code = http.StatusCreated

		return response
	}

}
