package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitChartMasterRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateChart).Methods("POST")
	router.HandleFunc("/getall", handlers.GetMultipleCharts).Methods("GET")
	router.HandleFunc("/get", handlers.GetChart).Methods("GET")
	router.HandleFunc("/delete", handlers.DeleteChartMaster).Methods("DELETE")
	router.HandleFunc("/update", handlers.UpdateChartMaster).Methods("PUT")

	return router, nil

}
