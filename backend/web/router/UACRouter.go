package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitUACRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateUAC).Methods("POST", "GET")

	return router, nil
}
