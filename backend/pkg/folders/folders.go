package folders

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/menu"
	"DynViz/pkg/role"
	"DynViz/pkg/worksheet"
	"fmt"

	// "log"

	// "math/rand"
	"net/http"
	"time"

	"gorm.io/gorm"
)

func Verifyfolder(name string, table *gorm.DB, org_id int, proj_id int) int64 {
	var count int64
	table.Where("name = ? AND organization_id = ? AND project_id = ? AND status = ?", name, org_id, proj_id, 1).Count(&count)
	return count
}

func CreateFolder(folderpl models.Folder, loggeduser models.User) models.Response {
	db := database.DB
	var folder models.Folder
	var response models.Response

	id := loggeduser.ID

	folder.Name = folderpl.Name
	folder.ProjectID = folderpl.ProjectID
	folder.OrganizationID = loggeduser.OrganizationID
	folder.CreatedByID = id
	folder.LastModifiedBy = id

	if Verifyfolder(folder.Name, db.Model(&folder), folder.OrganizationID, folder.ProjectID) > 0 {
		response.Message = "Folder with the same name already exists"
		response.Code = http.StatusNotAcceptable
		return response
	}

	if err := db.Create(&folder).Error; err != nil {
		response.Message = "Unable to create folder"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message = fmt.Sprintf("Folder: %d created successfully", folder.ID)
	response.Code = http.StatusCreated

	// Create a new Menu record associated with the CommonMenu
	menus := models.Menu{
		Name:           folder.Name,
		FolderID:       &folder.ID,
		IsFolder:       true,
		OrganizationID: &loggeduser.OrganizationID,
	}

	if err := menu.CreateMenu(db, &menus); err != nil {
		response.Message = "Unable to create menu"
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message += fmt.Sprintf(" | Menu: %d created successfully", menus.ID)

	// Fetch predefined roles
	// predefinedRoles, err := role.GetDefaultRoles()
	// if err != nil {
	// 	response.Message = "Unable to fetch default roles"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	// // Determine roles to process
	// rolename := user.GetRoleOfUser(loggeduser.RoleID)
	// rolesToProcess := predefinedRoles

	// isPredefinedRole := false
	// for _, role := range predefinedRoles {
	// 	if rolename == role {
	// 		isPredefinedRole = true
	// 		break
	// 	}
	// }

	// if !isPredefinedRole {
	// 	rolesToProcess = append(rolesToProcess, rolename)
	// }

	// // Add roles
	// for _, roleName := range rolesToProcess {
	// 	if err := role.AddRole(db, loggeduser, menus.ID); err != nil {
	// 		response.Message = "Unable to add role: " + err.Error()
	// 		response.Code = http.StatusInternalServerError
	// 		return response
	// 	}
	// }

	if err := role.AddRole(db, loggeduser, menus.ID); err != nil {
		response.Message = "Unable to add role: " + err.Error()
		response.Code = http.StatusInternalServerError
		return response
	}

	response.Message += fmt.Sprintf(" | Roles added successfully")

	//creating worksheet
	var defalutworksheet models.Worksheet
	defalutworksheet.Name = "worksheet_1"
	defalutworksheet.ProjectID = folder.ProjectID
	defalutworksheet.FolderID = folder.ID

	worksheet.CreateWorksheet(defalutworksheet, loggeduser)
	response.Message += fmt.Sprintf(" | Default Worksheet for projct created successfully")
	return response
}

func GetAllFolder(ID int, loggeduser models.User) models.Response {
	var response models.Response
	// var usr models.User

	// Get database connection
	db := database.DB

	var folders []models.Folder
	// // id, _ := user.GetLoggedUser("gayatris@gmail.com")
	// id := u

	// db.Where("ID = ?", id).First(&usr)

	// Retrieve all projects

	if err := db.Where("organization_id = ? AND project_id = ?  AND Status = ?", loggeduser.OrganizationID, ID, 1).Find(&folders).Error; err != nil {
		response.Message = "Failed to fetch project"
		response.Code = http.StatusInternalServerError
		return response
	} else {
		response.Message = "Folders fetched successfully"
		response.Data = folders
		response.Code = http.StatusOK
	}
	return response
}

func GetFolder(ID int) models.Response {
	var response models.Response
	var folder models.Folder
	db := database.DB
	// var project models.Project

	if err := db.Where("Id = ? AND status = ?", ID, 1).Preload("Project").Preload("Organization").Find(&folder).Error; err != nil {
		response.Message = "Failed to fetch Folder"
		response.Code = http.StatusInternalServerError
		return response
	} else {
		response.Message = "Folder fetched successfully"
		response.Data = folder
		response.Code = http.StatusOK
	}

	return response

}

func UpdateFolder(folderpl *models.Folder, loggeduser models.User) models.Response {
	var response models.Response
	db := database.DB
	var existingfolder models.Folder
	// id, _ := user.GetLoggedUser("gayatris@gmail.com")
	// id := int(123345)
	// r := "Admin"

	if err := db.Where("Id = ? AND status = ?", folderpl.ID, 1).First(&existingfolder).Error; err != nil {
		response.Message = "folder Not Found"
		response.Code = http.StatusOK
	}
	Updateddata := map[string]interface{}{
		"Name":           folderpl.Name,
		"LastModifiedBy": loggeduser.ID,
	}
	// existingfolder.Name = folderpl.Name
	// existingfolder.LastModifiedBy = loggeduser.ID
	fmt.Println(existingfolder)

	// Save the updated project to the database
	if Verifyfolder(folderpl.Name, db.Model(&existingfolder), existingfolder.OrganizationID, existingfolder.ProjectID) > 0 {
		response.Message = "folder with the same name already exists"
		response.Code = http.StatusNotAcceptable
	} else {
		// update the project in the database
		if err := db.Model(&existingfolder).Updates(Updateddata).Error; err != nil {
			response.Message = "failed to update folder"
			response.Code = http.StatusInternalServerError
			return response
		
		// if err := db.Save(existingfolder).Error; err != nil {
		// 	response.Message = "failed to update Folder"
		// 	response.Code = http.StatusInternalServerError
		} else {
			response.Message = "Folder Updated Successfully"
			response.Code = http.StatusOK
		}
	}

	return response
}

func DeleteFolder(ID int, loggeduser models.User) models.Response {
	var response models.Response
	var existingfolder models.Folder
	db := database.DB
	// id, _ := user.GetLoggedUser("gayatris@gmail.com")
	// id := int(123345)

	if err := db.Where("Id = ? AND status = ?", ID, 1).First(&existingfolder).Error; err != nil {
		response.Message = "Folder Not Found"
		response.Code = http.StatusOK
	}

	update := map[string]interface{}{
		"status":             0,
		"last_modified_by":   loggeduser.ID,
		"last_modified_date": time.Now(),
		"deactivate_by_id":   loggeduser.ID,
		"deactivate_date":    time.Now(),
	}

	// Save the updated folder to the database
	if err := db.Model(&existingfolder).Updates(update).Error; err != nil {
		response.Message = "failed to delete Folder"
		response.Code = http.StatusInternalServerError
	} else {
		response.Message = "Folder deleted Successfully"
		response.Code = http.StatusOK
	}

	return response
}
