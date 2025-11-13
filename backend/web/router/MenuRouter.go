package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitMenuRouter() (*mux.Router, error) {
	// Initialize the router
	// router := mux.NewRouter()
	router, _ = InitRouter()


	// Register the handler for the /getallmenus endpoint
	router.HandleFunc("/getall", handlers.GetAllMenus).Methods("GET")

	return router, nil
}
