package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitOrganizationRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/signup", handlers.CreateOrganization).Methods("POST")
	router.HandleFunc("/getall", handlers.GetAllOrganizations).Methods("GET")
	router.HandleFunc("/get", handlers.GetOrganization).Methods("GET")
	router.HandleFunc("/delete", handlers.DeleteOrganization).Methods("DELETE")
	router.HandleFunc("/update", handlers.UpdateOrganization).Methods("PUT")

	return router, nil
}
