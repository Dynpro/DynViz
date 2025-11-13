package team

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/user"
	"DynViz/utils"
	"fmt"
	"log"
	"net/http"
	"time"

	"gorm.io/gorm"
)

func CreateTeams(teamModel *models.Team, CreateTeam *models.CreateTeamPayload, Users *models.User) models.Response {
	var response models.Response

	db := database.DB
	if CreateTeam.Name == "" {
		response.Message = "Team Name Cannot be Empty"
		response.Code = http.StatusNotAcceptable
		return response
	}
	if len(CreateTeam.UserID) == 0 {
		response.Message = "Cannot create team with no users"
		response.Code = http.StatusNotAcceptable
		return response
	}
	teamModel.Name = CreateTeam.Name
	teamModel.OrganizationID = Users.OrganizationID
	teamModel.Organization = Users.Organization
	teamModel.CreatedByID = Users.ID

	teamModel.LastModifiedBy = Users.ID

	if err := db.Create(&teamModel).Error; err != nil {
		log.Println(err)
		response.Message = "Unable to create Team"
		response.Code = http.StatusInternalServerError

		return response
	}
	if len(CreateTeam.UserID) != 0 {
		for i := 0; i < len(CreateTeam.UserID); i++ {

			UserData, err := user.GetUserByID(CreateTeam.UserID[i])
			fmt.Println("User Data:", UserData)
			if err != nil {
				response.Message = "User Not Available to add in team."
				response.Code = http.StatusInternalServerError
				return response
			}
			UserData.TeamID = teamModel.ID

			update := map[string]interface{}{"TeamID": teamModel.ID}
			result := db.Model(&models.User{}).Preload("organizations").Where("id = ? AND status = ?", UserData.ID, 1).Updates(update)
			if result.Error != nil || result.RowsAffected == 0 {
				response.Message = "Unable to create Team or invalid details"
				response.Code = http.StatusNotAcceptable
			}

			response.Message = fmt.Sprintf("Team : %s (%d) created successfully!", teamModel.Name, teamModel.ID)
			response.Code = http.StatusCreated
		}
	}
	return response
}

func GetAllTeams(organization_id int) models.Response {
	var response models.Response
	// var team []models.Team

	// Get database connection
	db := database.DB

	rows, err := db.Table("teams").Select("DISTINCT id, name").Where("organization_id = ? and status = ?", organization_id, 1).Rows()
	if err != nil {
		fmt.Println("Error fetching roles:", err)
		response.Message = "Failed to fetch teams data"
		response.Code = http.StatusInternalServerError
		return response
	}
	defer rows.Close()

	var distinctTeams []map[string]interface{}

	// Iterate through the result set
	for rows.Next() {
		var id int
		var name string
		if err := rows.Scan(&id, &name); err != nil {
			fmt.Println("Error scanning row:", err)
			response.Message = "Failed to fetch teams data"
			response.Code = http.StatusInternalServerError
			return response
		}
		totalUsers, err := user.GetUsersByTeam(id)
		if err != nil {
			response.Message = fmt.Sprintf("Error fetching users for the teams : %s (%d)", name, id)
			response.Code = http.StatusInternalServerError
			return response
		}

		team := map[string]interface{}{
			"id":         id,
			"name":       name,
			"users":      totalUsers,
			"user_count": len(totalUsers),
		}

		// Add the role to the distinctRoles slice
		distinctTeams = append(distinctTeams, team)
	}

	if len(distinctTeams) == 0 {
		response.Message = "No teams found"
		response.Code = http.StatusNotFound
		return response
	}

	// Set response data
	response.Message = "teams data fetched successfully"
	response.Data = distinctTeams
	response.Code = http.StatusOK
	response.Total = len(distinctTeams)
	return response
}

func GetTeam(TeamId int) models.Response {
	var response models.Response
	var team models.Team

	db := database.DB
	if err := db.Where("id = ? and status = ?", TeamId, 1).Preload("Organization").First(&team).Error; err != nil {
		response.Message = "Failed to fetch Teams"
		response.Code = http.StatusInternalServerError
		return response
	}
	response.Message = "Team fetched successfully"
	response.Data = team
	response.Code = http.StatusOK
	return response
}

func DeleteTeam(ID int, UserId int) models.Response {
	var response models.Response
	var db = database.GetPostgresDBConnection()

	updates := map[string]interface{}{"Status": 0, "DeactivateDate": time.Now(), "DeactivateByID": UserId}
	result := db.Model(&models.Team{}).Where("id = ? AND status = ?", ID, 1).Updates(updates)
	if result.Error != nil || result.RowsAffected == 0 {
		response.Message = "Unable to delete Team or invalid details"
		response.Code = http.StatusBadRequest
		return response
	} else {
		var updateErrors []string
		UserData, err := user.GetUsersByTeam(ID)
		if err != nil {
			response.Message = "Failed to get users for this specific teams"
			response.Code = http.StatusInternalServerError
			return response
		}

		update := map[string]interface{}{"TeamID": nil}
		for i := 0; i < len(UserData); i++ {
			userID := UserData[i]
			result := db.Model(&models.User{}).Preload("organizations").Where("id = ? AND status = ?", userID.ID, 1).Updates(update)
			if result.Error != nil || result.RowsAffected == 0 {
				updateErrors = append(updateErrors, fmt.Sprintf("User %d: update failed", userID.ID))
			}
		}

		if len(updateErrors) > 0 {
			response.Message = fmt.Sprintf("Team updated with errors: %v", updateErrors)
			response.Code = http.StatusPartialContent
			return response
		}
	}

	response.Message = "Team deleted successfully"
	response.Code = http.StatusOK

	return response
}

func UpdateTeam(UpdateTeamPayload *models.UpdateTeamPayload, Users *models.User) models.Response {
	var response models.Response
	var team models.Team

	db := database.DB
	if UpdateTeamPayload.Name == "" {
		response.Message = "Team Name Cannot be Empty"
		response.Code = http.StatusNotAcceptable
		return response
	}
	if len(UpdateTeamPayload.UserID) == 0 {
		response.Message = "Cannot Update team with no users"
		response.Code = http.StatusNotAcceptable
		return response
	}
	if err := db.Where("id = ? AND status = ?", UpdateTeamPayload.ID, 1).First(&team).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.Message = "Teams Details not found for the provided ID"
			response.Code = http.StatusNotFound
			return response
		}
		response.Message = "Database error"
		response.Code = http.StatusInternalServerError
		return response
	}

	// team.Name = UpdateTeamPayload.Name
	// team.LastModifiedBy = Users.ID
	updateddata := map[string]interface{}{
		"Name":         UpdateTeamPayload.Name,
		"LastModifiedBy": Users.ID,
	}

	if !utils.IsActive(team.Status) {
		response.Message = "Not an active Team."
		response.Code = http.StatusNotAcceptable
		return response
	}

	if err := db.Model(&team).Where("id = ?", UpdateTeamPayload.ID).Updates(updateddata).Error; err != nil {
		response.Message = "Failed to update Team"
		response.Code = http.StatusInternalServerError
		return response
	}
	// if err := db.Save(&team).Error; err != nil {
	// 	response.Message = "Failed to update Team"
	// 	response.Code = http.StatusInternalServerError
	// 	return response
	// }

	var updateErrors []string
	for _, userID := range UpdateTeamPayload.UserID {
		UserData, err := user.GetUserByID(userID)
		if err != nil {
			updateErrors = append(updateErrors, fmt.Sprintf("User %d: %v", userID, err))
			continue
		}

		update := map[string]interface{}{"TeamID": team.ID}
		result := db.Model(&models.User{}).Preload("organizations").Where("id = ? AND status = ?", UserData.ID, 1).Updates(update)
		if result.Error != nil || result.RowsAffected == 0 {
			updateErrors = append(updateErrors, fmt.Sprintf("User %d: update failed", userID))
		}
	}

	// Set TeamID to null for users not in the updated list
	if len(UpdateTeamPayload.UserID) > 0 {
		if err := db.Model(&models.User{}).
			Where("team_id = ? AND id NOT IN (?) AND status = ?", team.ID, UpdateTeamPayload.UserID, 1).
			Update("TeamID", nil).Error; err != nil {
			updateErrors = append(updateErrors, "Failed to update some users to have TeamID as null")
		}
	} else {
		// If no users provided in the payload, set TeamID to null for all users in the team
		if err := db.Model(&models.User{}).Where("team_id = ? AND status = ?", team.ID, 1).Update("TeamID", nil).Error; err != nil {
			updateErrors = append(updateErrors, "Failed to update users to have TeamID as null")
		}
	}

	if len(updateErrors) > 0 {
		response.Message = fmt.Sprintf("Team updated with errors: %v", updateErrors)
		response.Code = http.StatusPartialContent
		return response
	}

	response.Message = "Team updated successfully"
	response.Code = http.StatusOK
	return response
}
