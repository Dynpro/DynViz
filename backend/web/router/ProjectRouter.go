package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitProjectRouter() (*mux.Router, error) {

	router, _ = InitRouter()
	router.HandleFunc("/create", handlers.CreateProject).Methods("POST")
	router.HandleFunc("/getall", handlers.GetMultipleProjects).Methods("GET")
	router.HandleFunc("/update", handlers.UpdateProject).Methods("PUT")
	router.HandleFunc("/get", handlers.GetProject).Methods("GET")
	router.HandleFunc("/delete", handlers.DeleteProject).Methods("DELETE")
	router.HandleFunc("/{projectID}/worksheet",handlers.GetMultipleWorksheets).Methods(("GET"))
	router.HandleFunc("/{projectID}/{folderID}/worksheet",handlers.GetMultipleWorksheets).Methods("GET")

	return router, nil
}
