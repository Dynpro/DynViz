package auth

import (
	"DynViz/internal/database"
	"DynViz/models"
	"fmt"
	"net/http"
	"regexp"

	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// verify functions
var count int64

func VerifyEmail(email string, table *gorm.DB) int64 {
	// also check for status
	table.Where("email = ?", email).Count(&count)
	return count
}

func VerifyPhone(phone string, table *gorm.DB) int64 {
	// also check for status
	table.Where("phone_no = ?", phone).Count(&count)
	return count
}

func VerifyUser(user models.User) bool {

	var UserCheck models.User

	db := database.DB

	// find user in database
	if err := db.Where("email = ?", user.Email).First(&UserCheck).Error; err != nil {
		return false
	}

	// Verify the password
	if err := bcrypt.CompareHashAndPassword([]byte(UserCheck.Password), []byte(user.Password)); err != nil {
		fmt.Println("Password not valid")
		return false
	}
	return true

}

func verifyJWT() {

}

// validate functions

func ValidateEmail(email string) bool {
	regex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	match, _ := regexp.MatchString(regex, email)
	return match
}

func ValidatePhone(phoneNumber string) bool {
	regex := `^[0-9]{10}$`
	match, _ := regexp.MatchString(regex, phoneNumber)
	return match
}

func ValidateInputs() {
	// Implement data visualization logic
	fmt.Println("V data...")
}

func VisualizeData(w http.ResponseWriter, r *http.Request) {
	// Implement data visualization logic
	fmt.Println("Visualizing data...")
}

func GenerateRandomint() int {
	// Get the current time
	now := time.Now()

	// Extract the date and time components
	year := now.Year()
	month := now.Month()
	day := now.Day()
	hour := now.Hour()
	minute := now.Minute()
	second := now.Second()
	fraction := now.Nanosecond() / 100000 // 100000 fraction of a second

	// Create a unique number by combining these components
	randomNumber := int(year)*100000000000000 +
		int(month)*1000000000000 +
		int(day)*10000000000 +
		int(hour)*100000000 +
		int(minute)*1000000 +
		int(second)*10000 +
		int(fraction)

	return randomNumber
}
