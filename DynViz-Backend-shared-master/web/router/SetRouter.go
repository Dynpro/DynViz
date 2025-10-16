package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitSetRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateSet).Methods("POST")
	router.HandleFunc("/get", handlers.GetSet).Methods("GET")
	router.HandleFunc("/getall", handlers.GetAllSets).Methods("GET")
	router.HandleFunc("/update", handlers.UpdateSet).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteSet).Methods("PUT")

	return router, nil
}
