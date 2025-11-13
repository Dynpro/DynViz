package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitDataBlockRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	// router.HandleFunc("/create", handlers.CreateDashboard).Methods("POST")
	router.HandleFunc("/getall", handlers.GetAllDataBlock).Methods("POST")
	// router.HandleFunc("/get", handlers.GetDashboard).Methods("GET")
	router.HandleFunc("/update", handlers.UpdateDataBlock).Methods("PUT")
	// router.HandleFunc("/delete", handlers.DeleteDashboard).Methods("DELETE")
	router.HandleFunc("/apply", handlers.ApplyDataBlock).Methods("PUT")

	return router, nil
}
