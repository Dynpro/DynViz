package project

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/menu"
	"DynViz/pkg/role"
	"DynViz/pkg/worksheet"
	"fmt"
	"net/http"
	"time"

	// "github.com/apache/arrow/go/v15/arrow/internal"
	"gorm.io/gorm"
)

func VerifyProject(name string, table *gorm.DB, org_id int) int64 {
	var count int64
	table.Where("name = ? AND organization_id = ? AND status = ?", name, org_id, 1).Count(&count)
	return count
}

func CreateProject(projpl *models.ProjectPayload, loggeduser models.User) models.Response {

	db := database.DB
	var proj models.Project
	// var menus models.Menu
	var response models.Response
	// var org models.Organization
	// id := int(123345)
	// r := user.GetRoleOfUser(loggeduser.RoleID)
	// db.Where("created_by_id = ?", ).First(&org)

	proj.Name = projpl.Name
	proj.OrganizationID = loggeduser.OrganizationID
	proj.CreatedByID = loggeduser.ID
	proj.LastModifiedBy = loggeduser.ID

	response.Message = "Project Created Successfully"
	response.Code = http.StatusOK

	if VerifyProject(proj.Name, db.Model(&proj), proj.OrganizationID) > 0 {
		response.Message = "Project with the same name already exists"
		response.Code = http.StatusNotAcceptable
		return response
	}
	if err := db.Create(&proj).Error; err != nil {
		// log.Println(err)
		response.Message = "Unable to create Project"
		response.Code = http.StatusInternalServerError
		return response
	}
	response.Message = fmt.Sprintf("Project: %d created successfully", proj.ID)
	response.Code = http.StatusCreated

	// Create a new Menu record associated with the CommonMenu
	menus := models.Menu{
		Name:           proj.Name,
		ProjectID:      &proj.ID,
		IsProject:      true,
		OrganizationID: &loggeduser.OrganizationID,
	}

	if err := menu.CreateMenu(db, &menus); err != nil {
		// log.Println(err)
		response.Message = "Unable to create Menu"
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

	// Add roles
	// for _, roleName := range rolesToProcess {
	// 	if err := role.AddRole(db, loggeduser, menus.ID, roleName); err != nil {
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
	defalutworksheet.Name = "proj_worksheet_1"
	defalutworksheet.ProjectID = proj.ID
	// defalutworksheet.FolderID = 0

	worksheet.CreateWorksheet(defalutworksheet, loggeduser)

	response.Message += fmt.Sprintf(" | Defalut worksheet created for project succesfully")
	response.Code = http.StatusCreated
	return response
}

func GetAllProjects(loggeduser models.User) models.Response {
	var response models.Response
	// var usr models.User

	// Get database connection

	db := database.DB

	var projects []models.Project
	// id, _ := user.GetLoggedUser("gayatris@gmail.com")
	// id := int(123345)
	// // r := "Admin"
	// db.Where("ID = ?", id).First(&usr)

	// Retrieve all projects
	// r :=getRole(id)

	if err := db.Where("organization_id = ? AND status = ?", loggeduser.OrganizationID, 1).Preload("Organization").Find(&projects).Error; err != nil {
		response.Message = "Failed to fetch project"
		response.Code = http.StatusInternalServerError
		return response
	} else {
		response.Message = "Project fetched successfully"
		response.Data = projects
		response.Code = http.StatusOK
	}
	return response
}

func UpdateProject(projID int, proj *models.Project, loggeduser models.User) models.Response {
	var response models.Response

	db := database.DB
	var existingproj models.Project
	// id, _ := user.GetLoggedUser("gayatris@gmail.com")

	if err := db.Where("id = ? AND status = ?", projID, 1).First(&existingproj).Error; err != nil {
		response.Message = "Project Not Found"
		response.Code = http.StatusOK
		return response
	}
	existingproj.Name = proj.Name
	existingproj.LastModifiedBy = loggeduser.ID
	fmt.Println(existingproj)

	// Save the updated project to the database
	if VerifyProject(proj.Name, db.Model(&proj), existingproj.OrganizationID) > 0 {
		response.Message = "Project with the same name already exists"
		response.Code = http.StatusNotAcceptable
		return response
	} else {
		if err := db.Model(&existingproj).Updates(map[string]interface{}{
			"Name":           proj.Name,
			"LastModifiedBy": loggeduser.ID,
		}).Error; err != nil {
			response.Message = "failed to update Project"
			response.Code = http.StatusInternalServerError
			return response
		} else {
			response.Message = "Project Updated Successfully"
			response.Code = http.StatusOK
			return response
		}
	}
	// return response
}

func GetProject(ProjID int) models.Response {
	var response models.Response

	db := database.DB
	var project models.Project
	fmt.Println("id = ", ProjID)
	if err := db.Where("id = ? and status = ?", ProjID, 1).Preload("Organization").First(&project).Error; err != nil {
		response.Message = "Failed to fetch Project"
		response.Code = http.StatusNotFound
		return response
	}
	response.Message = "Project fetched successfully"
	response.Data = project
	response.Code = http.StatusOK
	return response

	// fmt.Println(project.ID,project.ID)
	// return response

}

func DeleteProject(ID int, loggeduser models.User) models.Response {
	var response models.Response
	var existingproj models.Project

	db := database.DB
	// id, _ := user.GetLoggedUser("gayatris@gmail.com")
	// id := int(123345)
	// r := "Admin"

	// r := getRole()
	if err := db.Where("id = ? AND status = ?", ID, 1).First(&existingproj).Error; err != nil {
		response.Message = "Project Not Found"
		response.Code = http.StatusOK
		return response
	}
	existingproj.Status = 0
	existingproj.LastModifiedBy = loggeduser.ID
	existingproj.DeactivateByID = loggeduser.ID
	existingproj.DeactivateDate = &existingproj.LastModifiedDate
	fmt.Println(existingproj)

	// Save the updated project to the database
	if err := db.Model(&existingproj).Updates(map[string]interface{}{
		"Status":         0,
		"LastModifiedBy": loggeduser.ID,
		"DeactivateByID": loggeduser.ID,
		"DeactivateDate": time.Now(),
	}).Error; err != nil {
		response.Message = "failed to update Project"
		response.Code = http.StatusInternalServerError
		return response
	} else {
		response.Message = "Project updated Successfully"
		response.Code = http.StatusOK
		return response
	}

}
