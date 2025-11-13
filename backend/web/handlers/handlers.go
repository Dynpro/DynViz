package handlers

import (
	"DynViz/internal/security"
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
)

func verifyToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return security.SecretKey, nil
	})
	if err != nil {
		return err
	}
	if !token.Valid {
		return fmt.Errorf("Invalid token")
	}
	return nil
}

func ProtectedHandler(w http.ResponseWriter, r *http.Request) (string, error) {
	w.Header().Set("Content-Type", "application/json")
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprint(w, "Missing authorization header")
		return "", fmt.Errorf("Missing authorization header")
	}
	tokenString = tokenString[len("Bearer "):]

	// err := verifyToken(tokenString)
	// if err != nil {
	// 	w.WriteHeader(http.StatusUnauthorized)
	// 	fmt.Fprint(w, "Invalid token")
	// 	return "", fmt.Errorf("Missing authorization header")
	// }

	email, err := security.GetUserFromToken(tokenString)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprint(w, "Invalid token")
		return "", err
	}

	return email, nil

}
