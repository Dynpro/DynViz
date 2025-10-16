package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitDBStructureRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/Getdb", handlers.GetDBStructure).Methods("GET")
	router.HandleFunc("/Getdblocal", handlers.GetDBStructureLocal).Methods("GET")
	// router.HandleFunc("Pull", handlers.PullDBStructure).Methods("GET")
	router.HandleFunc("/Get", handlers.PullDBStructure).Methods("GET")

	// router.HandleFunc("/Getdbschema", handlers.GetDBStructureschema).Methods("POST")
	// router.HandleFunc("/Getdbtable", handlers.GetDBStructureColumns).Methods("POST")

	
	return router, nil
}
