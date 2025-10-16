package router

import (
	"DynViz/web/handlers"
	// "DynViz/web/middleware"

	"github.com/gorilla/mux"
)

func InitUtilsRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/countrycode", handlers.GetCountryCodes).Methods("POST")

	router.HandleFunc("/countries", handlers.GetAllCountries).Methods("GET")

	router.HandleFunc("/getallschemas", handlers.GetAllSchema).Methods("GET")

	router.HandleFunc("/getalltables", handlers.GetAllTables).Methods("GET")

	router.HandleFunc("/getallcolumns", handlers.GetAllColumns).Methods("GET")

	router.HandleFunc("/getallvalues", handlers.GetAllDistinctValues).Methods("GET")


	router.HandleFunc("/insertschema", handlers.InsertSchema).Methods("POST")

	router.HandleFunc("/deleteschema", handlers.DeleteSchema).Methods("DELETE")

	return router, nil
}
