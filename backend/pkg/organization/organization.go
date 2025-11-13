package organization

import (
	"DynViz/internal/database"
	"DynViz/models"
	"DynViz/pkg/auth"
	"DynViz/utils"
	"fmt"
	"log"
	"net/http"
	"time"

	"gorm.io/gorm"
)

func DeleteOrg(ID int, loggeduser models.User) models.Response {
	//deactivated date, by, status-inactive
	var organization models.Organization
	var response models.Response
	// var User models.User
	db := database.DB

	// id, r := user.GetLoggedUser("gayatris@gmail.com")
	id := loggeduser.ID
	// r:="Admin"
	db.Where("ID = ?", ID).First(&organization)
	// fmt.Println(organization.Email,organization.ID)

	updates := map[string]interface{}{"Status": 0, "DeactivateDate": time.Now(), "DeactivateByID": id}
	result := db.Model(&organization).Where("id = ? and status = ?", ID, 1).Updates(updates)

	if result.Error != nil || result.RowsAffected == 0 {
		response.Message = "Unable to delete organization or invalid details"
		response.Code = http.StatusBadRequest
		return response
	} else {
		response.Message = "Organization deleted successfully"
		response.Code = http.StatusOK
	}

	return response

}

func CreateOrganization(signup *models.SignUp) models.Response {

	var org models.Organization

	var response models.Response

	// create organization ID
	org.ID = signup.OrganizationID

	// set organization details
	org.Name = signup.Organization
	org.Email = signup.Email
	org.Domain = signup.Domain
	org.AccountType = signup.AccountType

	org.Country = signup.Country
	org.CountryCode = signup.CountryCode
	org.PhoneNo = signup.PhoneNo

	// set ID
	org.CreatedByID = signup.CreatedByID
	org.LastModifiedBy = signup.CreatedByID

	db := database.DB

	//validate country code
	CodeExists := utils.CountryCodeExists(org.CountryCode)
	if !CodeExists {
		response.Message = "Invalid Country Code"
		response.Code = http.StatusNotAcceptable
		return response
	}
	check := utils.NameValidationfunc(org.Name)
	if !check {
		response.Message = "Please fill the Organization Name correctly"
		response.Code = http.StatusNotAcceptable
		return response

	}
	//validate country
	CountryExists := utils.CountryExists(org.Country)
	if !CountryExists {
		response.Message = "Invalid Country Name"
		response.Code = http.StatusNotAcceptable
		return response
	}

	// validate patterns
	if !auth.ValidateEmail(org.Email) {

		response.Message = "Invalid Organization Email"
		response.Code = http.StatusNotAcceptable

		return response

	}

	if !auth.ValidatePhone(org.PhoneNo) {

		response.Message = "Invalid Organization Phone No."
		response.Code = http.StatusNotAcceptable

		return response

	}

	// verify in database
	if auth.VerifyEmail(org.Email, db.Model(&org)) > 0 {

		response.Message = "Organization with the same Email already exists"
		response.Code = http.StatusNotAcceptable

		return response

	}

	if auth.VerifyPhone(org.PhoneNo, db.Model(&org)) > 0 {

		response.Message = "Organization with the same phone number already exists"
		response.Code = http.StatusNotAcceptable

		return response
	} else {
		if err := db.Create(&org).Error; err != nil {

			log.Println(err)
			response.Message = "Unable to create organization"
			response.Code = http.StatusInternalServerError

			return response
		} else {

			response.Message = fmt.Sprintf("Organization : %s (%d) created successfully!", org.Name, org.ID)
			response.Code = http.StatusCreated

			return response
		}

	}
}

func GetOrganization(id int) models.Response {
	var org models.Organization
	var response models.Response

	// creating connection with database

	db := database.DB

	if err := db.Where("id = ? AND status = ?", id, 1).First(&org).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.Message = "Organization Details not found for the provided ID"
			response.Code = http.StatusNotFound
		} else {
			response.Message = "Failed to fetch organization data"
			response.Code = http.StatusInternalServerError
		}
		return response
	}

	response.Message = "Organization data fetched successfully"
	response.Data = org
	response.Code = http.StatusOK
	return response
}

func GetOrganizationByEmail(email string) models.Organization {
	var org models.Organization

	// creating connection with database

	db := database.DB

	if err := db.Where("email = ? AND status = ?", email, 1).First(&org).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Printf("Organization Details not found for the provided ID")
		} else {
			log.Printf("Failed to fetch organization data")
		}
		return org
	}

	return org
}

func GetAllOrganizations() models.Response {

	var organization []models.Organization

	var response models.Response

	db := database.DB

	if err := db.Find(&organization).Where("status = ?", 1).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.Code = http.StatusNoContent
			response.Message = "Organizations not found!"
			return response
		} else {
			response.Code = http.StatusInternalServerError
			response.Message = "Failed to fetch organizations"
			return response
		}

	}

	response.Code = http.StatusOK
	response.Data = organization
	response.Message = string(rune(len(organization))) + " organizations fetched successfully!"

	return response
}

func UpdateOrg(organization *models.Organization, LoggedUser *models.User) models.Response {
	var response models.Response

	db := database.DB
	//validate is status is active
	isact := utils.IsActive(organization.Status)
	if !isact {
		response.Message = "you are not an active customer to update the fields"
		response.Code = http.StatusNotAcceptable
		return response
	}
	//validate country codes
	CodeExists := utils.CountryCodeExists(organization.CountryCode)
	if !CodeExists {
		response.Message = "Invalid Country Code"
		response.Code = http.StatusNotAcceptable
		return response
	}

	//validate country
	CountryExists := utils.CountryExists(organization.Country)
	if !CountryExists {
		response.Message = "Invalid Country Name"
		response.Code = http.StatusNotAcceptable
		return response
	}

	matchcountryandcode := utils.MatchCodeAndCountry(organization.CountryCode, organization.Country)
	if !matchcountryandcode {
		response.Message = "Country and Country Code are not matching"
		response.Code = http.StatusNotAcceptable
		return response
	}

	// Validate organization email
	if !auth.ValidateEmail(organization.Email) {
		response.Message = "Invalid Organization Email"
		response.Code = http.StatusNotAcceptable
		return response
	}

	// Validate organization phone number
	if !auth.ValidatePhone(organization.PhoneNo) {
		response.Message = "Invalid Organization Phone No."
		response.Code = http.StatusNotAcceptable
		return response
	}

	Updateddata := map[string]interface{}{
		"Name":           organization.Name,
		"LastModifiedBy": LoggedUser.ID,
		"Email":          organization.Email,
		"Domain":         organization.Domain,
		"AccountType":    organization.AccountType,
		"Country":        organization.Country,
		"CountryCode":    organization.CountryCode,
		"PhoneNo":        organization.PhoneNo,
		"Logo":           organization.Logo,
	}
	// Update the LastModifiedBy field
	// organization.LastModifiedBy = LoggedUser.ID

	// Save the updated organization to the database
	if err := db.Model(&organization).Updates(Updateddata).Error; err != nil {
		response.Message = "Failed to update organization"
		response.Code = http.StatusInternalServerError
		return response
	}

	// Set success response
	response.Message = "Organization updated successfully"
	response.Code = http.StatusOK
	return response
}
