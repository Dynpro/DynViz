package role

import (
	"DynViz/internal/database"
	"DynViz/models"
	"fmt"
	"net/http"
)

func CheckUserAccess(menuID int, userID int) models.Response {
	var user models.User
	var roles []models.Role
	db := database.DB

	// Retrieve the user details based on the provided user ID

	if err := db.Where("id = ?", userID).First(&user).Error; err != nil {
		return models.Response{Message: fmt.Sprintf("Error retrieving user: %v", err), Code: http.StatusInternalServerError}
	}

	roleID := user.RoleID

	// Retrieve the active roles for the user associated with the provided menu ID
	if err := db.Where("id = ? AND menu_id = ? AND status = ?", roleID, menuID, 1).Find(&roles).Error; err != nil {
		return models.Response{Message: fmt.Sprintf("Error fetching active roles: %v", err), Code: http.StatusInternalServerError}
	}

	// If no roles found for the provided menu ID, return an error
	if len(roles) == 0 {
		return models.Response{Message: "No active roles found for the provided menuID", Code: http.StatusForbidden}
	}

	// Fetch the organization ID for the provided menuID
	var menu models.Menu
	if err := db.Where("id = ?", menuID).First(&menu).Error; err != nil {
		return models.Response{Message: fmt.Sprintf("Error retrieving menu: %v", err), Code: http.StatusInternalServerError}
	}

	// Check access for the provided menuID and RoleUsersID
	for _, role := range roles {
		fmt.Println(role.Write_access)
		fmt.Println(role.Read_access)

		if !role.Read_access {
			return models.Response{Message: "No access to read", Code: http.StatusForbidden}
		}
		if !role.Write_access {

			return models.Response{Message: "No access to write", Code: http.StatusForbidden}
		}
	}

	return models.Response{Message: "Access granted", Code: http.StatusOK}
}
