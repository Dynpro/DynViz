package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitWorksheetRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateWorksheet).Methods("POST")
	router.HandleFunc("/getall", handlers.GetAllWorksheetsforUser).Methods("GET")   //get all for user
	router.HandleFunc("/getlastused", handlers.GetLastUsedWorksheet).Methods("GET") //get all for user
	router.HandleFunc("/get/{worksheetID}", handlers.GetWorksheet).Methods("GET")
	router.HandleFunc("/update", handlers.UpdateWorksheet).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteWorksheet).Methods("DELETE")

	return router, nil

}
