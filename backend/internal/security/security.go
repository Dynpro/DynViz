package security

import (
	"DynViz/models"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var (
	SecretKey = []byte("secret -key")
)

func CreateNewToken(User models.UserPayload) models.Response {
	var Login models.Login
	var response models.Response

	expiryTime := time.Now().Add(time.Minute * 120).Unix()
	currentTime := time.Now().Unix()
	expiryInSeconds := expiryTime - currentTime

	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": User.Email,
			"exp":      expiryTime,
		})

	tokenString, err := token.SignedString(SecretKey)
	if err != nil {
		response.Message = "Unable to Generate Token"
		response.Code = http.StatusBadRequest
		return response
	}
	Login.JWTToken = tokenString
	Login.ExpiryTime = expiryInSeconds
	Login.UserData = User

	response.Message = "Logged in Successfully."
	response.Data = Login
	response.Code = http.StatusAccepted
	return response
}

func RefreshOldToken(username string, expirationTime time.Time) (string, error) {

	fmt.Print(username)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": username,
			"exp":      expirationTime.Unix(),
		})
	tokenString, err := token.SignedString(SecretKey)

	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func VerifyToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return SecretKey, nil
	})
	if err != nil {
		return err
	}
	if !token.Valid {
		return fmt.Errorf("invalid token")
	}
	return nil
}

func DeleteJwtToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": username,
			"exp":      time.Now().Unix() - 1, // Set expiry to current time
		})
	tokenString, err := token.SignedString(SecretKey)
	if err != nil {
		return "", err // Return the error if token signing fails
	}
	return tokenString, nil
}

func TimeRemaining(tokenString string) models.Response {
	var TimeRemainingResponse models.Response

	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return SecretKey, nil
	})
	if err != nil {
		TimeRemainingResponse.Code = http.StatusNotAcceptable
		TimeRemainingResponse.Message = "Error in parsing token"
		return TimeRemainingResponse
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		expiryTime := int64(claims["exp"].(float64))
		currentTime := time.Now().Unix()
		remainingTime := expiryTime - currentTime
		if remainingTime < 0 {
			remainingTime = 0 // Token has expired
		}
		TimeRemainingResponse.Code = http.StatusAccepted
		TimeRemainingResponse.Data = remainingTime
		TimeRemainingResponse.Message = "Time Remaining"
		return TimeRemainingResponse
	}
	TimeRemainingResponse.Code = http.StatusNotAcceptable
	TimeRemainingResponse.Message = "Invalid Token"
	return TimeRemainingResponse
}
func GetUserFromToken(tokenString string) (string, error) {
	claims := jwt.MapClaims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return SecretKey, nil
	})
	if err != nil || !token.Valid {
		fmt.Println("Invalid token")
		return "", err
	}

	// Extract expiration time from claims
	_, ok := claims["exp"].(float64)
	if !ok {

		fmt.Println("Invalid token claims")
		return "", err
	}

	fmt.Println(claims["username"].(string))

	return claims["username"].(string), nil
}
