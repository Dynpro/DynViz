package commonmenu

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/menu"
	"DynViz/pkg/role"

	// "encoding/json"
	"errors"
	"fmt"
	"log"

	// "math/rand"
	"net/http"

	// "sync"
	"time"

	"gorm.io/gorm"
)

func CreateCommonMenu(requestData *models.CommonMenuRequest, users *models.User) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Create a new CommonMenu record
	commonMenu := models.CommonMenu{
		Name:           requestData.Name,
		Description:    requestData.Description,
		CreatedByID:    users.ID,
		LastModifiedBy: users.ID,
	}

	// Insert the CommonMenu record into the database
	if err := db.Create(&commonMenu).Error; err != nil {
		log.Println("Error creating common menu:", err)
		response.Message = "Unable to create common menu"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Create a new Menu record associated with the CommonMenu
	menus := models.Menu{
		Name:           requestData.Name,
		CommonMenuID:   &commonMenu.ID,
		IsCommon:       true,
		OrganizationID: &users.OrganizationID,
	}

	if err := menu.CreateMenu(db, &menus); err != nil {
		log.Println(err)
		response.Message = err.Error()
		response.Code = http.StatusInternalServerError
		return response
	}

	// rolename := user.GetRoleOfUser(users.RoleID)
	// Add role for the newly created menu using the menu ID after insertion
	if err := role.AddRole(db, *users, menus.ID); err != nil {
		log.Println(err)
		response.Message = err.Error()
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = "Common menu created successfully"
	response.Code = http.StatusCreated
	return response
}

func UpdateCommonMenu(ID int, requestData *models.CommonMenuRequest, userID int) models.Response {

	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the CommonMenu record to be updated
	var commonMenu models.CommonMenu
	if err := db.Where("id = ?", ID).First(&commonMenu).Error; err != nil {
		log.Println("Error fetching common menu:", err)
		response.Message = "Unable to fetch common menu"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Update the CommonMenu fields
	// commonMenu.Name = requestData.Name
	// commonMenu.Description = requestData.Description
	// commonMenu.Status = requestData.Status
	// commonMenu.LastModifiedBy = userID
	// commonMenu.LastModifiedDate = time.Now()
	updatedData := map[string]interface{}{
		"Name":           requestData.Name,
		"Description":    requestData.Description,
		"LastModifiedBy": userID,
		"LastModifiedDate": time.Now(),
	}



	// Update the CommonMenu record
	if err := db.Model(&commonMenu).Where("id = ?", ID).Updates(updatedData).Error; err != nil {
		log.Println("Error updating common menu:", err)
		response.Message = "Unable to update common menu"
		response.Code = http.StatusInternalServerError
		return response
	}
	// Save the updated CommonMenu record
	// if err := db.Save(&commonMenu).Error; err != nil {
	// 	log.Println("Error updating common menu:", err)
	// 	response.Message = "Unable to update common menu"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	// Fetch the associated Menu record
	var menu models.Menu
	if err := db.Where("common_menu_id = ?", commonMenu.ID).First(&menu).Error; err != nil {
		log.Println("Error fetching menu:", err)
		response.Message = "Unable to fetch menu"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Update the Menu fields
	// menu.Name = requestData.Name
	updatedDatas := map[string]interface{}{
		"Name": requestData.Name,
	}


	// Update the Menu record
	if err := db.Model(&menu).Where("common_menu_id = ?", commonMenu.ID).Updates(updatedDatas).Error; err != nil {
		log.Println("Error updating menu:", err)
		response.Message = "Unable to update menu"
		response.Code = http.StatusInternalServerError
		return response
	}
	// Save the updated Menu record
	// if err := db.Save(&menu).Error; err != nil {
	// 	log.Println("Error updating menu:", err)
	// 	response.Message = "Unable to update menu"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	response.Message = "Common menu updated successfully"
	response.Code = http.StatusOK
	return response
}

func DeleteCommonMenu(ID int, userID int) models.Response {
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch the CommonMenu record to be updated
	var commonMenu models.CommonMenu
	if err := db.Where("id = ?", ID).First(&commonMenu).Error; err != nil {
		log.Println("Error fetching common menu:", err)
		response.Message = "Unable to fetch common menu"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Update the CommonMenu fields

	// commonMenu.Status = 0
	// commonMenu.DeactivateByID = userID
	// commonMenu.DeactivateDate = time.Now()
	updatedData := map[string]interface{}{
		"Status":         0,
		"DeactivateByID": userID,
		"DeactivateDate": time.Now(),
	}


	// Update the CommonMenu record
	if err := db.Model(&commonMenu).Where("id = ?", ID).Updates(updatedData).Error; err != nil {
		log.Println("Error deleting common menu:", err)
		response.Message = "Unable to delete common menu"
		response.Code = http.StatusInternalServerError
		return response
	}
	// Save the updated CommonMenu record
	// if err := db.Save(&commonMenu).Error; err != nil {
	// 	log.Println("Error deleting common menu:", err)
	// 	response.Message = "Unable to deleting common menu"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	// Fetch the associated Menu record
	var menu models.Menu
	if err := db.Where("common_menu_id = ?", commonMenu.ID).First(&menu).Error; err != nil {
		log.Println("Error fetching menu:", err)
		response.Message = "Unable to fetch menu"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Update the Menu fields
	// menu.Status = 0
	updatedData = map[string]interface{}{
		"Status": 0,
	}

	if err := db.Model(&menu).Where("common_menu_id = ?", commonMenu.ID).Updates(updatedData).Error; err != nil {
		log.Println("Error deleting menu:", err)
		response.Message = "Unable to delete menu"
		response.Code = http.StatusInternalServerError
		return response
	}
	// Save the updated Menu record
	// if err := db.Save(&menu).Error; err != nil {
	// 	log.Println("Error deleting menu:", err)
	// 	response.Message = "Unable to delete menu"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	response.Message = "Common menu deleted successfully"
	response.Code = http.StatusOK
	return response
}

func GetCommonMenu(ID int) (models.CommonMenu, error) {

	var cm models.CommonMenu

	db := database.DB

	// Fetch the connection by ID and ensure it is active
	if err := db.Where("id = ? AND status = ?", ID, 1).First(&cm).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("Record not found:", err)
			return cm, err
		} else {
			fmt.Println("Error fetching connection:", err)
			return cm, err
		}
	}

	return cm, nil
}

func GetAllCommonMenu() models.Response {
	var commonMenu []models.CommonMenu
	var response models.Response

	// creating connection with database
	db := database.DB

	// Query the database for common menus with specific organization ID and active status
	if err := db.Where(" status = ?", 1).Find(&commonMenu).Error; err != nil {
		response.Message = "Failed to find common menus"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = "Common menus data fetched successfully"

	response.Data = commonMenu
	response.Code = http.StatusOK
	// response.Total = len(commonMenu)
	return response
}
