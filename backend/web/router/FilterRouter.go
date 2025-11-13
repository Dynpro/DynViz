package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitFilterRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateFilter).Methods("POST")
	router.HandleFunc("/get", handlers.GetFilter).Methods("GET")
	router.HandleFunc("/getall", handlers.GetAllFilter).Methods("GET")
	router.HandleFunc("/update", handlers.UpdateFilter).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteFilter).Methods("PUT")
	router.HandleFunc("/mapping", handlers.CreateFilterMapping).Methods("POST")
	router.HandleFunc("/deletemapping", handlers.DeleteFilterMapping).Methods("PUT")
	router.HandleFunc("/getmapping", handlers.GetFilterMapping).Methods("POST")
	router.HandleFunc("/getfiltersbydashID", handlers.GetFiltersByDashboardID).Methods("GET")
	router.HandleFunc("/getfiltersbySetID", handlers.GetFiltersBySetID).Methods("GET")


	return router, nil
}
