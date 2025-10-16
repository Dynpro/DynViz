package menu

import (
	"DynViz/internal/database"
	"DynViz/models"

	// "DynViz/pkg/organizat ion"
	"fmt"
	"net/http"

	"gorm.io/gorm"
)

func GetAllMenus(organizationID int) models.Response {
	var menus []models.MenuResponse
	var response models.Response

	// Create a connection with the database
	db := database.DB

	// Fetch all menus, selecting only the ID and Name fields
	if err := db.Table("menus").Select("id, name").Scan(&menus).Where("status = ? AND organization_id = ?", 1, organizationID).Error; err != nil {
		response.Message = "Failed to fetch menus"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Set response data
	response.Message = "Menus fetched successfully"
	response.Data = menus
	response.Code = http.StatusOK
	return response
}

func CreateMenu(db *gorm.DB, menu *models.Menu) error {
	if err := db.Create(&menu).Error; err != nil {
		return fmt.Errorf("unable to create Menu: %v", err)
	}
	return nil
}
