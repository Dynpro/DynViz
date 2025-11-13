package user

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/auth"
	"DynViz/utils"
	"fmt"
	"log"
	"net/http"

	// "os/user"
	"time"

	"github.com/jinzhu/copier"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Createuser(signup *models.SignUp) models.Response {

	var user models.User

	var response models.Response

	// set user ID
	user.ID = signup.ID

	// set organization details
	user.Name = signup.Name
	user.Email = signup.Email
	user.Password = signup.Password

	user.Country = signup.Country
	user.CountryCode = signup.CountryCode
	user.PhoneNo = signup.PhoneNo
	// user.RoleID = ""

	user.OrganizationID = signup.OrganizationID

	// set time

	// set ID
	user.CreatedByID = signup.CreatedByID
	user.LastModifiedBy = signup.CreatedByID

	// Encrypt the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		response.Message = "Error encrypting password"
		response.Code = http.StatusNotAcceptable

		return response
	}
	user.Password = string(hashedPassword)

	// fmt.Println(user)

	db := database.DB

	check := utils.NameValidationfunc(user.Name)
	if !check {
		response.Message = "Please fill the user Name correctly"
		response.Code = http.StatusNotAcceptable
		return response

	}

	// validate country
	CountryExists := utils.CountryExists(user.Country)
	if !CountryExists {
		response.Message = "Invalid Country Name"
		response.Code = http.StatusNotAcceptable
		return response
	}
	//validate country code
	CodeExists := utils.CountryCodeExists(user.CountryCode)
	if !CodeExists {
		response.Message = "Invalid Country Code"
		response.Code = http.StatusNotAcceptable
		return response
	}

	// validate patterns
	if !auth.ValidateEmail(user.Email) {

		response.Message = "Invalid User Email"
		response.Code = http.StatusNotAcceptable

		return response

	}

	if !auth.ValidatePhone(user.PhoneNo) {

		response.Message = "Invalid User Phone No."
		response.Code = http.StatusNotAcceptable

		return response

	}

	// verify in database
	if auth.VerifyEmail(user.Email, db.Model(&user)) > 0 {

		response.Message = "User with the same Email already exists"
		response.Code = http.StatusNotAcceptable

		return response

	}

	if auth.VerifyPhone(user.PhoneNo, db.Model(&user)) > 0 {

		response.Message = "User with the same phone number already exists"
		response.Code = http.StatusNotAcceptable

		return response
	} else {
		if err := db.Create(&user).Error; err != nil {

			log.Println(err)
			response.Message = "Unable to create user"
			response.Code = http.StatusInternalServerError

			return response
		} else {

			response.Message = fmt.Sprintf("User : %s (%d) created successfully!", user.Name, user.ID)
			response.Code = http.StatusCreated

			return response
		}

	}

}

func GetUserByID(id int) (models.User, error) {

	var user models.User
	db := database.DB
	// db.Where("id = ?", id).First(&user)

	if err := db.Where("id = ? AND status = ?", id, 1).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Println("User not found for the provided ID")
			return user, err
		} else {
			log.Println("Failed to fetch organization data")
			return user, err
		}

	}
	return user, nil
}

func GetUserByEmail(email string) (models.User, error) {

	var user models.User
	db := database.DB
	// db.Where("id = ?", id).First(&user)

	if err := db.Where("email = ? AND status = ?", email, 1).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Println("User not found for the provided ID")
			return user, err
		} else {
			log.Println("Failed to fetch organization data")
			return user, err
		}

	}
	return user, nil
}

func GetUserLoginPayload(e string) models.UserPayload {
	var userPayload models.UserPayload
	var user models.User
	db := database.DB
	// result := db.Where("user_email_id = ?", userEmailId).First(&user)

	db.Where("email = ? AND status = ?", e, 1).Preload("Organization").Preload("Team").First(&user)
	copier.Copy(&userPayload, &user)
	userPayload.OrganizationName = user.Organization.Name
	fmt.Print(userPayload)
	return userPayload

}

func GetUsersByTeam(id int) ([]models.User, error) {

	var user []models.User

	// var userIDs []int
	db := database.DB
	// db.Where("team_id = ?", id).First(&user)

	// result := db.Where("name = ?", nameToFind).Find(&users)

	if err := db.Where("team_id = ? AND status = ?", id, 1).Find(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Println("User not found for the provided ID")
			return user, err
		} else {
			log.Println("Failed to fetch organization data")
			return user, err
		}

	}

	fmt.Printf("User IDs for Team(%d) are:\n", id)
	// for _, users := range user {
	// 	fmt.Println(users.ID)
	// 	userIDs = append(userIDs, users.ID)
	// }
	return user, nil
}

func GetUsersByRole(id int, organization_id int) ([]models.User, error) {

	var user []models.User

	// var userIDs []int
	db := database.DB
	// db.Where("team_id = ?", id).First(&user)

	// result := db.Where("name = ?", nameToFind).Find(&users)

	if err := db.Where("role_id = ?", id).Where("organization_id = ? AND status = ?", organization_id, 1).Find(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Println("User not found for the provided ID")
			return user, err
		} else {
			log.Println("Failed to fetch organization data")
			return user, err
		}

	}

	fmt.Printf("User IDs for Role:(%d) are:\n", id)
	// for _, users := range user {
	// 	fmt.Println(users.ID)
	// 	userIDs = append(userIDs, users.ID)
	// }
	return user, nil
}

func GetUsersByOrganization(organizationID int) ([]models.Userres, error) {
	var users []models.User
	db := database.DB

	// Fetch users by organization ID
	if err := db.Where("organization_id = ? AND status = ?", organizationID, 1).Find(&users).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Println("User not found for the provided organization ID")
			return nil, err
		} else {
			log.Println("Failed to fetch organization data")
			return nil, err
		}
	}

	var userResponses []models.Userres

	// Fetch associated role, team, and organization names
	for _, user := range users {
		var role models.Role
		if err := db.Where("id = ? AND status = ?", user.RoleID, 1).First(&role).Error; err != nil {
			log.Printf("Failed to fetch role for user %d: %v", user.ID, err)
		}

		var team models.Team
		if err := db.Where("id = ? AND status = ?", user.TeamID, 1).First(&team).Error; err != nil {
			log.Printf("Failed to fetch team for user %d: %v", user.ID, err)
		}

		var organization models.Organization
		if err := db.Where("id = ? AND status = ?", user.OrganizationID, 1).First(&organization).Error; err != nil {
			log.Printf("Failed to fetch organization for user %d: %v", user.ID, err)
		}

		// Map to Userres struct
		userRes := models.Userres{
			ID:               user.ID,
			Name:             user.Name,
			Email:            user.Email,
			Password:         user.Password,
			RoleID:           user.RoleID,
			Role:             role.Name,
			Status:           user.Status,
			TeamID:           user.TeamID,
			Team:             team.Name,
			OrganizationID:   user.OrganizationID,
			Organization:     organization.Name,
			CountryCode:      user.CountryCode,
			Country:          user.Country,
			PhoneNo:          user.PhoneNo,
			CreatedByID:      user.CreatedByID,
			CreatedDate:      user.CreatedDate,
			LastModifiedBy:   user.LastModifiedBy,
			LastModifiedDate: user.LastModifiedDate,
			DeactivateByID:   user.DeactivateByID,
			DeactivateDate:   user.DeactivateDate,
		}

		userResponses = append(userResponses, userRes)
	}

	return userResponses, nil
}

func GetLoggedUser(e string) models.User {

	var user models.User

	db := database.DB

	db.Where("email = ?", e).First(&user)
	return user
}

func DeleteUser(Ids models.DeleteMultipleUsersRequest, loggeduser models.User) models.Response {
	var response models.Response

	db := database.DB

	updates := map[string]interface{}{
		"Status":           0,
		"DeactivateDate":   time.Now(),
		"DeactivateByID":   loggeduser.ID,
		"LastModifiedBy":   loggeduser.ID,
		"LastModifiedDate": time.Now(),
	}
	result := db.Model(&models.User{}).Where("id IN (?) AND status = ?", Ids.IDs, 1).Updates(updates)
	if result.Error != nil || result.RowsAffected == 0 {
		response.Message = "Unable to delete user"
		response.Code = http.StatusBadRequest
		return response
	} else {
		response.Message = "User deleted successfully"
		response.Code = http.StatusOK
		return response

	}

	// return response
}

func DeleteAllUsers(orgid int, loggeduser models.User) models.Response {
	var response models.Response

	// var User models.User
	// User = GetLoggedUser("gayatris@gmail.com")
	db := database.DB
	var usr models.User

	updates := map[string]interface{}{"Status": 0, "DeactivateDate": time.Now(), "DeactivateByID": loggeduser.ID}

	result := db.Model(&usr).Where("Organization_Id = ? and Status =?", orgid, 1).Updates(updates)
	if result.Error != nil || result.RowsAffected == 0 {
		response.Message = "Unable to delete user"
		response.Code = http.StatusBadRequest
		// return response
	} else {
		response.Message = "User Deleted deleted successfully"
		response.Code = http.StatusOK
		// return response

	}

	return response
}

func AddNewUser(user models.User, loggeduser models.User) models.Response {

	var response models.Response
	db := database.DB

	// var org models.Organization

	// id := loggeduser.ID
	// r := GetRole(id)

	// db.Where("created_by_id = ?", id).First(&org)
	user.RoleID = 0
	user.TeamID = 0
	user.LastModifiedBy = loggeduser.ID
	user.OrganizationID = loggeduser.OrganizationID
	user.CreatedByID = loggeduser.ID

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		response.Message = "Error encrypting password"
		response.Code = http.StatusNotAcceptable

		return response
	}
	user.Password = string(hashedPassword)

	// validate patterns
	if !auth.ValidateEmail(user.Email) {

		response.Message = "Invalid User Email"
		response.Code = http.StatusNotAcceptable

		return response

	}

	if !auth.ValidatePhone(user.PhoneNo) {

		response.Message = "Invalid User Phone No."
		response.Code = http.StatusNotAcceptable

		return response

	}

	// verify in database
	if auth.VerifyEmail(user.Email, db.Model(&user)) > 0 {

		response.Message = "User with the same Email already exists"
		response.Code = http.StatusNotAcceptable

		return response

	}

	if auth.VerifyPhone(user.PhoneNo, db.Model(&user)) > 0 {

		response.Message = "User with the same phone number already exists"
		response.Code = http.StatusNotAcceptable

		return response
	} else {
		if err := db.Create(&user).Error; err != nil {

			log.Println(err)
			response.Message = "Unable to create user"
			response.Code = http.StatusInternalServerError

			return response
		} else {

			response.Message = fmt.Sprintf("User : %s (%d) created successfully!", user.Name, user.ID)
			response.Code = http.StatusCreated

			return response
		}

	}

}

func UpdateUser(user *models.User, Loggeduser *models.User) models.Response {
	// var response models.Response

	// Validate status
	if !utils.IsActive(Loggeduser.Status) {
		return models.Response{
			Message: "YOU ARE NOT AN ACTIVE USER",
			Code:    http.StatusNotAcceptable,
		}
	}

	// Validate country and country code
	if !utils.CountryExists(user.Country) {
		return models.Response{
			Message: "Invalid Country Name",
			Code:    http.StatusNotAcceptable,
		}
	}
	if !utils.MatchCodeAndCountry(user.CountryCode, user.Country) {
		return models.Response{
			Message: "not matching country and country code",
			Code:    http.StatusNotAcceptable,
		}
	}
	if !utils.CountryCodeExists(user.CountryCode) {
		return models.Response{
			Message: "Invalid Country Code",
			Code:    http.StatusNotAcceptable,
		}
	}

	// Validate organization email and phone number
	if !auth.ValidateEmail(user.Email) {
		return models.Response{
			Message: "Invalid Organization Email",
			Code:    http.StatusNotAcceptable,
		}
	}
	if !auth.ValidatePhone(user.PhoneNo) {
		return models.Response{
			Message: "Invalid Organization Phone No.",
			Code:    http.StatusNotAcceptable,
		}
	}

	// Get database connection
	db := database.DB

	// Fetch the existing user from the database based on the provided ID
	var existingUser models.User
	if err := db.Where("id = ?", user.ID).First(&existingUser).Error; err != nil {
		return models.Response{
			Message: "User not found",
			Code:    http.StatusBadRequest,
		}
	}

	// Update the LastModifiedBy field
	user.LastModifiedBy = Loggeduser.ID

	// Handle password:
	// If no new password is provided, preserve the existing one.
	// Otherwise, hash the new password.
	if user.Password == "" {
		user.Password = existingUser.Password
	} else {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			return models.Response{
				Message: "Error encrypting password",
				Code:    http.StatusNotAcceptable,
			}
		}
		user.Password = string(hashedPassword)
	}

	// Build update fields map for only the allowed fields
	updateFields := map[string]interface{}{
		"Name":           user.Name,
		"Country":        user.Country,
		"CountryCode":    user.CountryCode,
		"Email":          user.Email,
		"PhoneNo":        user.PhoneNo,
		"Password":       user.Password,
		"LastModifiedBy": user.LastModifiedBy,
		// Add any other fields that are allowed to be updated...
	}

	// Update only the specific fields in the existing user record
	if err := db.Model(&models.User{}).Where("id = ?", user.ID).Updates(updateFields).Error; err != nil {
		return models.Response{
			Message: "Failed to update user",
			Code:    http.StatusInternalServerError,
		}
	}

	// Return a success response
	return models.Response{
		Message: "User updated successfully",
		Code:    http.StatusCreated,
	}
}


func GetRoleOfUser(id int) string {
	var role models.Role
	db := database.DB
	db.Where("id=?", id).First(&role)
	return role.Name
}
