package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitVariableRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateVariables).Methods("POST")
	router.HandleFunc("/get", handlers.GetVariables).Methods("GET")
	router.HandleFunc("/getall", handlers.GetAllVariables).Methods("GET")
	router.HandleFunc("/update", handlers.UpdateVariables).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteVariables).Methods("PUT")
	router.HandleFunc("/getall", handlers.GetAllVariables).Methods("GET")

	return router, nil
}
