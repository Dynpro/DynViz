package router

import (
	"DynViz/web/handlers"
	// "DynViz/web/middleware"

	"github.com/gorilla/mux"
)

func InitRoleRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateRole).Methods("POST")
	router.HandleFunc("/update", handlers.UpdateRole).Methods("PUT")
	router.HandleFunc("/get", handlers.GetRolesByRoleID).Methods("GET")
	router.HandleFunc("/getall", handlers.GetAllRoles).Methods("GET")
	router.HandleFunc("/delete", handlers.DeleteRole).Methods("DELETE")

	// router.HandleFunc("/getrole", handlers.GetRole).Methods("GET","POST")

	return router, nil
}
