package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitDashboardRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateDashboard).Methods("POST")
	router.HandleFunc("/getall", handlers.GetMultipleDashboard).Methods("GET")
	router.HandleFunc("/get", handlers.GetDashboard).Methods("GET")
	router.HandleFunc("/update", handlers.UpdateDashboard).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteDashboard).Methods("DELETE")
	

	return router, nil
}
