package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitAuthRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/login", handlers.Signin).Methods("POST")
	router.HandleFunc("/time-remaining", handlers.TimeRemainingHandler).Methods("GET")
	router.HandleFunc("/refresh-token", handlers.RefreshTokenHandler).Methods("POST")
	router.HandleFunc("/logout", handlers.Signout).Methods("POST")

	return router, nil
}
