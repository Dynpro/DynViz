package handlers

import (
	"DynViz/internal/security"
	"DynViz/models"

	"DynViz/pkg/auth"
	"DynViz/pkg/role"
	"DynViz/pkg/user"

	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// func FetchUserFromJWT(w http.ResponseWriter, r *http.Request) models.User {
// 	//get logged user details
// 	tokenString := r.Header.Get("Authorization")
// 	if tokenString == "" {
// 		w.WriteHeader(http.StatusUnauthorized)
// 		fmt.Fprint(w, "Missing authorization header")
// 		// return
// 	}
// 	tokenString = tokenString[len("Bearer "):]
// 	claims := jwt.MapClaims{}
// 	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
// 		return security.SecretKey, nil
// 	})
// 	if err != nil || !token.Valid {
// 		w.WriteHeader(http.StatusUnauthorized)
// 		fmt.Fprint(w, "Invalid token")
// 		// return
// 	}
// 	username, ok := claims["username"].(string)
// 	if !ok {
// 		w.WriteHeader(http.StatusBadRequest)
// 		fmt.Fprint(w, "Invalid token claims")
// 		// return
// 	}

// 	// AdminUsr := user.GetLoggedUserfinal(username)
// 	return user.GetLoggedUser(username)
// 	//logged user ended
// }

// Function to signin and create a JWT token for the user
func Signin(w http.ResponseWriter, r *http.Request) {

	var User models.User
	var UserData models.UserPayload
	var LoginResponse models.Response

	// get signup values
	if err := json.NewDecoder(r.Body).Decode(&User); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// check if user is logged in

	if auth.VerifyUser(User) {
		UserData = user.GetUserLoginPayload(User.Email)
		UserData.AccessControl = role.GetRole(UserData.RoleID, UserData.ID)
		LoginResponse = security.CreateNewToken(UserData)
	} else {
		LoginResponse.Code = http.StatusUnauthorized
		LoginResponse.Message = "Invalid username or password"
		return
	}

	// prepare response
	responseData, err := json.Marshal(LoginResponse)
	if err != nil {
		// Handle error gracefully, log it, and return an appropriate error response
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// write status
	w.WriteHeader(LoginResponse.Code)

	// write response
	w.Write(responseData)

	// set header type
	w.Header().Set("Content-Type", "application/json")

	// Set content length for efficiency
	w.Header().Set("Content-Length", fmt.Sprint(len(responseData)))

}

func RefreshTokenHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Extract the token from the request
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprint(w, "Missing authorization header")
		return
	}
	tokenString = tokenString[len("Bearer "):]

	// Verify the token
	claims := jwt.MapClaims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return security.SecretKey, nil
	})
	if err != nil || !token.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprint(w, "Invalid token")
		return
	}

	// Extract expiration time from claims
	exp, ok := claims["exp"].(float64)
	if !ok {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Invalid token claims")
		return
	}

	// Calculate time remaining
	expirationTime := time.Unix(int64(exp), 0)
	// timeRemaining := expirationTime.Sub(time.Now())
	timeRemaining := time.Until(expirationTime)

	// If time remaining is less than 5 minutes, generate a new token
	if timeRemaining < 9*time.Minute {
		username, ok := claims["username"].(string)
		fmt.Println(username)
		if !ok {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprint(w, "Invalid token claims")
			return
		}

		// Generate a new token with an extended expiration time
		newExpirationTime := time.Now().Add(time.Minute * 10)
		newTokenString, err := security.RefreshOldToken(username, newExpirationTime)
		fmt.Print(newTokenString)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Failed to generate token: %v", err)
			return
		}

		// Return the new token
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, newTokenString)
		return
	}

	// If time remaining is more than 5 minutes, no action needed
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "No need to refresh token")
}

func TimeRemainingHandler(w http.ResponseWriter, r *http.Request) {
	var TimeRemainingResponse models.Response
	w.Header().Set("Content-Type", "application/json")

	// Extract the token from the request
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprint(w, "Missing authorization header")
		return
	}
	tokenString = tokenString[len("Bearer "):]

	// Verify the token

	// Return time remaining in seconds
	TimeRemainingResponse = security.TimeRemaining(tokenString)
	jsonResponse, err := json.Marshal(TimeRemainingResponse)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Failed to marshal JSON response: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func Signout(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// var u models.User

	// Extract the token from the request
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprint(w, "Missing authorization header")
		return
	}
	tokenString = tokenString[len("Bearer "):]

	// Verify the token
	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return security.SecretKey, nil
	})
	if err != nil || !token.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprint(w, "Invalid token")
		return
	}

	tokenString, err = security.DeleteJwtToken(tokenString)
	if err != nil {
		w.WriteHeader(http.StatusNotAcceptable)
		fmt.Fprint(w, "Unable to logout")
		return
	}

	// Return time remaining in seconds
	response := struct {
		LoggedOut string `json:"LoggedOut"`
	}{
		LoggedOut: string("Logged Out Successfully."),
	}
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Failed to marshal JSON response: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}
