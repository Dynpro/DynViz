package role

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/user"
	"DynViz/utils"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"gorm.io/gorm"
)

func Assignadmin(signup *models.User) models.Response {
	var response models.Response

	// Get the database connection
	db := database.DB

	// Fetch the first role with roleid = 1 (Admin Role)
	var role models.Role
	if err := db.Where("id = ? AND status = ?", 10001, 1).First(&role).Error; err != nil {
		fmt.Println("Error fetching role:", err)
		response.Message = "Error fetching role"
		response.Code = http.StatusInternalServerError // Internal Server Error
		return response
	}

	// Update the user's role_id to the id of the fetched role
	if err := db.Model(&models.User{}).Where("id = ? AND status = ?", signup.ID, 1).Update("role_id", role.ID).Error; err != nil {
		fmt.Println("Error updating user role:", err)
		response.Message = "Error updating user role"
		response.Code = http.StatusInternalServerError // Internal Server Error
		return response
	}

	response.Message = role.Name + " Role Assigned Successfully"
	response.Code = http.StatusAccepted
	return response
}

func CreateRole(roleData *models.RoleData, userID int, OrganizationID int) models.Response {
	db := database.DB
	var response models.Response

	// Fetch all common menus where status is 1 and is_common is true
	var commonMenus []models.Menu
	if err := db.Where("status = ? AND is_common = ?", 1, true).Find(&commonMenus).Error; err != nil {
		fmt.Println("Error fetching common menus:", err)
		response.Message = "Error fetching common menus"
		response.Code = http.StatusInternalServerError // Internal Server Error
		return response
	}

	// Fetch all menus with the user's organization_id
	var userOrgMenus []models.Menu
	if err := db.Where("organization_id = ? AND status = ?", OrganizationID, 1).Find(&userOrgMenus).Error; err != nil {
		fmt.Println("Error fetching menus with user's organization_id:", err)
		response.Message = "Error fetching menus"
		response.Code = http.StatusInternalServerError // Internal Server Error
		return response
	}

	// Create sets for easy lookup
	commonMenuIDs := make(map[int64]bool)
	for _, menu := range commonMenus {
		commonMenuIDs[int64(menu.ID)] = true
	}

	userOrgMenuIDs := make(map[int64]bool)
	for _, menu := range userOrgMenus {
		userOrgMenuIDs[int64(menu.ID)] = true
	}

	// Check if the payload contains all required common menu IDs
	allCommonMenuIDsPresent := true
	for _, menu := range commonMenus {
		if _, present := roleData.Permission[strconv.FormatInt(int64(menu.ID), 10)]; !present {
			allCommonMenuIDsPresent = false
			break
		}
	}

	// Check if the payload contains all required user organization menu IDs
	allUserOrgMenuIDsPresent := true
	for _, menu := range userOrgMenus {
		if _, present := roleData.Permission[strconv.FormatInt(int64(menu.ID), 10)]; !present {
			allUserOrgMenuIDsPresent = false
			break
		}
	}

	if !allCommonMenuIDsPresent || !allUserOrgMenuIDsPresent {
		response.Message = "Payload does not contain all required menu IDs"
		response.Code = http.StatusBadRequest // Bad Request
		return response
	}

	// Generate a unique RoleID for this set of roles
	ID, err := utils.GenerateUniqueRandomInt(4, 8)
	if err != nil {
		log.Printf("Unable to generate ID for role : %s, (%d). Hence, generating random value for ID\nError: %s\n", roleData.Name, roleData.ID, err)
		ID = int(rand.Int())
	}

	// Iterate through permissions to set access and menu
	for menuIDStr, permissions := range roleData.Permission {
		menuID, err := strconv.ParseInt(menuIDStr, 10, 32)
		if err != nil {
			fmt.Println("Error parsing menu ID:", err)
			continue
		}

		role := models.Role{
			ID:               ID,
			Name:             roleData.Name,
			MenuID:           int(menuID),
			Read_access:      permissions["R"],
			Write_access:     permissions["W"],
			OrganizationID:   OrganizationID,
			CreatedByID:      userID,
			LastModifiedBy:   userID,
			LastModifiedDate: time.Now(), // ensure the date is set properly
		}

		// Save the role to the database
		if err := db.Create(&role).Error; err != nil {
			fmt.Println("Error saving role:", err)
			response.Message = "Error saving role"
			response.Code = http.StatusInternalServerError // Internal Server Error
			return response
		}

		// Print the role details for verification
		fmt.Printf("Role created: %+v\n", role)
	}

	response.Message = "Role Created Successfully"
	response.Code = http.StatusAccepted
	return response
}

// // UpdateRole updates the role permissions and returns a response
// func UpdateRole(updateData *models.RoleData, userID int) models.Response {
// 	db := database.DB
// 	var response models.Response

// 	// Fetch roles using RoleUsersID
// 	var roles []models.Role
// 	if err := db.Where("id = ? AND status = ?", updateData.ID, 1).Find(&roles).Error; err != nil {
// 		if errors.Is(err, gorm.ErrRecordNotFound) {
// 			fmt.Println("Roles not found")
// 			response.Message = "Roles not found"
// 			response.Code = http.StatusNotFound // 404 Not Found
// 			return response
// 		}
// 		fmt.Println("Error fetching roles:", err)
// 		response.Message = "Error fetching roles"
// 		response.Code = http.StatusInternalServerError // 500 Internal Server Error
// 		return response
// 	}

// 	// Update role name and permissions
// 	for _, role := range roles {
// 		// Update role name if provided
// 		if updateData.Name != "" {
// 			role.Name = updateData.Name
// 		}

// 		// Update permissions for the corresponding menu
// 		if permissions, ok := updateData.Permission[strconv.FormatInt(int64(role.MenuID), 10)]; ok {
// 			role.Read_access = permissions["R"]
// 			role.Write_access = permissions["W"]
// 		}

// 		// Update last modified details
// 		role.LastModifiedBy = userID

// 		// Update organization ID to match the user's organization
// 		// role.OrganizationID = user.OrganizationID

// 		// Save the updated role to the database
// 		if err := db.Save(&role).Error; err != nil {
// 			fmt.Println("Error updating role:", err)
// 			response.Message = "Error updating role"
// 			response.Code = http.StatusInternalServerError // 500 Internal Server Error
// 			return response
// 		}

// 		// Print the updated role details for verification
// 		fmt.Printf("Role updated: %+v\n", role)
// 	}

// 	response.Message = "Role Updated Successfully"
// 	response.Code = http.StatusAccepted // 202 Accepted
// 	return response
// }

func GetRole(ID int, userID int) models.Response {
	var roles []models.Role
	var response models.Response

	// Create a connection with the database
	db := database.DB
	// fmt.Print(userID)

	// Fetch all active roles associated with the given RoleID
	if err := db.Where("id = ? AND status = ?", ID, 1).Preload("Menu").Find(&roles).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.Message = "Active roles not found for the provided RoleID"
			response.Code = http.StatusNotFound
		} else {
			fmt.Println("Error fetching active roles:", err)
			response.Message = "Failed to fetch active roles data"
			response.Code = http.StatusInternalServerError
		}
		return response
	}

	if len(roles) == 0 {
		response.Message = "No active roles found for the provided RoleID"
		response.Code = http.StatusNotFound
		return response
	}

	// Map to aggregate access control data by role ID
	roleMap := make(map[int]map[string]interface{})
	for _, role := range roles {
		if _, exists := roleMap[role.ID]; !exists {
			roleMap[role.ID] = map[string]interface{}{
				"id":             role.ID,
				"name":           role.Name,
				"access_control": make(map[int]map[string]interface{}),
			}
		}
		accessControl := map[string]interface{}{
			"name":         role.Menu.Name,
			"read_access":  role.Read_access,
			"write_access": role.Write_access,
			"is_common":    role.Menu.IsCommon,
			"is_project":   role.Menu.IsProject,
			"is_folder":    role.Menu.IsFolder,
		}
		roleMap[role.ID]["access_control"].(map[int]map[string]interface{})[role.Menu.ID] = accessControl
	}

	// Convert roleMap to slice
	var transformedRoles []map[string]interface{}
	for _, roleData := range roleMap {
		transformedRoles = append(transformedRoles, roleData)
	}

	// Set response data
	response.Message = "Active roles data fetched successfully"
	response.Data = map[string]interface{}{
		"roles": transformedRoles,
	}
	response.Code = http.StatusOK

	return response
}

// GetAllRoles fetches distinct roles and the users associated with those roles for the given organization.
func GetAllRoles(organizationID int) models.Response {
	var response models.Response
	db := database.DB

	// Fetch distinct id and name from the roles table
	// rows, err := db.Table("roles").Where("is_default = ? OR organization_id = ? AND status = ?", true, organizationID, 1).Select("DISTINCT name, id").Rows()
	rows, err := db.Where("organization_id = ? AND status = ? ", organizationID, 1).Select("DISTINCT name, id").Find(&models.Role{}).Rows()
	if err != nil {
		log.Println("Error fetching roles:", err)
		response.Message = "Failed to fetch roles data"
		response.Code = http.StatusInternalServerError
		return response
	}
	defer rows.Close()

	var distinctRoles []map[string]interface{}

	// Iterate through the result set
	for rows.Next() {
		var id int
		var name string
		if err := rows.Scan(&name, &id); err != nil {
			log.Println("Error scanning row:", err)
			response.Message = "Failed to fetch roles data"
			response.Code = http.StatusInternalServerError
			return response
		}
		totalUsers, err := user.GetUsersByRole(id, organizationID)
		if err != nil {
			log.Printf("Error fetching users for the role : %s\n", name)
			response.Message = fmt.Sprintf("Error fetching users for the role : %s", name)
			response.Code = http.StatusInternalServerError
			return response
		}

		role := map[string]interface{}{
			"id":    id,
			"name":  name,
			"users": totalUsers,
			"count": len(totalUsers),
		}

		// Add the role to the distinctRoles slice
		distinctRoles = append(distinctRoles, role)
	}

	if len(distinctRoles) == 0 {
		response.Message = "No roles found"
		response.Code = http.StatusNotFound
		return response
	}

	// Set response data
	response.Message = "Roles data fetched successfully"
	response.Data = distinctRoles
	response.Code = http.StatusOK
	response.Total = len(distinctRoles)
	return response
}

// func DeleteRole(ID int, userID int) models.Response {
// 	db := database.DB
// 	var response models.Response

// 	// Fetch roles using Role ID
// 	var roles []models.Role
// 	if err := db.Where("id = ? AND status = ?", ID, 1).Find(&roles).Error; err != nil {
// 		if errors.Is(err, gorm.ErrRecordNotFound) {
// 			fmt.Println("Roles not found")
// 			response.Message = "Roles not found"
// 			response.Code = http.StatusNotFound // 404 Not Found
// 			return response
// 		}
// 		fmt.Println("Error fetching roles:", err)
// 		response.Message = "Error fetching roles"
// 		response.Code = http.StatusInternalServerError // 500 Internal Server Error
// 		return response
// 	}

// 	// Check if all roles are already inactive
// 	allInactive := true
// 	for _, role := range roles {
// 		if role.Status != 0 {
// 			allInactive = false
// 			break
// 		}
// 	}

// 	if allInactive {
// 		response.Message = "No active role exists for this role ID"
// 		response.Code = http.StatusConflict // 409 Conflict
// 		return response
// 	}

// 	// Update status to 'inactive' for all roles with the provided Role ID
// 	for _, role := range roles {
// 		role.Status = 0
// 		// Update last modified details
// 		role.DeactivateByID = userID
// 		now := time.Now()
// 		role.DeactivateDate = &now // Set the LastModifiedDate

// 		// Save the updated role to the database
// 		if err := db.Save(&role).Error; err != nil {
// 			fmt.Println("Error updating role:", err)
// 			response.Message = "Error updating role"
// 			response.Code = http.StatusInternalServerError // 500 Internal Server Error
// 			return response
// 		}

// 		// Print the updated role details for verification
// 		fmt.Printf("Role updated: %+v\n", role)
// 	}

// 	response.Message = "Role Deleted Successfully"
// 	response.Code = http.StatusAccepted // 202 Accepted
// 	return response
// }

// func AddRole(db *gorm.DB, loggeduser models.User, menuID int, roleName string) error {
// 	var role models.Role
// 	role.ID = loggeduser.RoleID
// 	role.Name = roleName
// 	role.MenuID = menuID
// 	role.Read_access = true
// 	role.Write_access = true
// 	role.OrganizationID = loggeduser.OrganizationID
// 	role.CreatedByID = loggeduser.ID
// 	role.LastModifiedBy = loggeduser.ID

// 	if err := db.Create(&role).Error; err != nil {
// 		return fmt.Errorf("unable to add Role : %v", err)
// 	}

// 	return nil
// }

func AddRole(db *gorm.DB, loggeduser models.User, menuID int) error {

	roles, err := GetRoles(loggeduser.OrganizationID)
	if err != nil {
		return err
	}

	for _, role := range roles {

		role.MenuID = menuID
		role.Read_access = true
		role.Write_access = true
		role.CreatedByID = loggeduser.ID
		role.LastModifiedBy = loggeduser.ID
		role.OrganizationID = loggeduser.OrganizationID

		if err := db.Create(&role).Error; err != nil {
			return fmt.Errorf("unable to add Role : %v", err)
		}
	}

	return nil
}

func GetDefaultRoles() ([]string, error) {
	var roles []models.Role // Declare a slice of roles
	var roleNames []string
	db := database.DB

	// Query the database for roles where organization_id and is_default are true
	if err := db.Where("is_default = ? AND status = ?", true, 1).Find(&roles).Error; err != nil {
		return nil, err
	}

	// Extract the names of the roles
	for _, role := range roles {
		roleNames = append(roleNames, role.Name)
	}

	distinctMap := make(map[string]bool)
	distinctList := []string{}

	for _, item := range roleNames {
		if !distinctMap[item] {
			distinctMap[item] = true
			distinctList = append(distinctList, item)
		}
	}

	return distinctList, nil
}

func GetRoles(organization_id int) ([]models.Role, error) {
	var roles []models.Role // Declare a slice of roles

	db := database.DB

	// Query the database for roles where organization_id and is_default are true
	if err := db.Distinct("id", "name").Where("is_default = ?", true).Or("organization_id = ?", organization_id).Find(&roles).Error; err != nil {
		return nil, err
	}

	return roles, nil
}

func DeleteRole(ID int, userID int) models.Response {
	db := database.DB
	var response models.Response

	// Fetch roles using Role ID
	var roles []models.Role
	if err := db.Where("id = ? AND status = ?", ID, 1).Find(&roles).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("Roles not found")
			response.Message = "Roles not found"
			response.Code = http.StatusNotFound // 404 Not Found
			return response
		}
		fmt.Println("Error fetching roles:", err)
		response.Message = "Error fetching roles"
		response.Code = http.StatusInternalServerError // 500 Internal Server Error
		return response
	}

	// Check if all roles are already inactive
	allInactive := true
	for _, role := range roles {
		if role.Status != 0 {
			allInactive = false
			break
		}
	}

	if allInactive {
		response.Message = "No active role exists for this role ID"
		response.Code = http.StatusConflict // 409 Conflict
		return response
	}

	// Update status to 'inactive' for all roles with the provided Role ID
	for _, role := range roles {
		now := time.Now()
		// Prepare the fields for update
		updates := map[string]interface{}{
			"status":           0,
			"deactivate_by_id": userID,
			"deactivate_date":  &now,
			"last_modified_by": userID,
		}

		// Save the updated role to the database
		if err := db.Model(&role).Where("id = ?", role.ID).Updates(updates).Error; err != nil {
			fmt.Println("Error updating role:", err)
			response.Message = "Error updating role"
			response.Code = http.StatusInternalServerError // 500 Internal Server Error
			return response
		}

		// Print the updated role details for verification
		fmt.Printf("Role updated: %+v\n", role)
	}

	response.Message = "Role Deleted Successfully"
	response.Code = http.StatusAccepted // 202 Accepted
	return response
}

// UpdateRole updates the role permissions and returns a response
func UpdateRole(updateData *models.RoleData, userID int) models.Response {
	db := database.DB
	var response models.Response

	// Fetch roles using RoleUsersID
	var roles []models.Role
	if err := db.Where("id = ? AND status = ?", updateData.ID, 1).Find(&roles).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("Roles not found")
			response.Message = "Roles not found"
			response.Code = http.StatusNotFound // 404 Not Found
			return response
		}
		fmt.Println("Error fetching roles:", err)
		response.Message = "Error fetching roles"
		response.Code = http.StatusInternalServerError // 500 Internal Server Error
		return response
	}

	// Update role name and permissions
	for _, role := range roles {
		updatefields := make(map[string]interface{})
		// Update role name if provided
		if updateData.Name != "" {
			updatefields["Name"] = updateData.Name
		}

		// Update permissions for the corresponding menu
		if permissions, ok := updateData.Permission[strconv.FormatInt(int64(role.MenuID), 10)]; ok {
			updatefields["Read_access"] = permissions["R"]
			updatefields["Write_access"] = permissions["W"]
		}

		// Update last modified details
		updatefields["LastModifiedBy"] = userID

		// Update organization ID to match the user's organization
		// role.OrganizationID = user.OrganizationID

		// Save the updated role to the database
		if err := db.Model(&role).Where("id = ?", role.ID).Updates(updatefields).Error; err != nil {
			fmt.Println("Error updating role:", err)
			response.Message = "Error updating role"
			response.Code = http.StatusInternalServerError // 500 Internal Server Error
			return response
		}

		// Print the updated role details for verification
		fmt.Printf("Role updated: %+v\n", role)
	}

	response.Message = "Role Updated Successfully"
	response.Code = http.StatusAccepted // 202 Accepted
	return response
}
