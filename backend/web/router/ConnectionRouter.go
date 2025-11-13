package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitConnectionRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/getall", handlers.GetAllConnections).Methods("GET")
	router.HandleFunc("/check", handlers.CheckConnection).Methods("POST")
	router.HandleFunc("/get", handlers.GetConnection).Methods("GET", "POST")
	router.HandleFunc("/create", handlers.CreateConnection).Methods("POST")
	router.HandleFunc("/update", handlers.UpdateConnection).Methods("PUT")
	router.HandleFunc("/Refresh", handlers.RefreshConnection).Methods("GET")
	router.HandleFunc("/delete", handlers.DeleteConnection).Methods("DELETE")



	return router, nil
}
