package router

import (
	"DynViz/web/handlers"
	// "DynViz/web/middleware"

	"github.com/gorilla/mux"
)

func InitEmbedAPIRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateEmbedAPI).Methods("POST")
	router.HandleFunc("/update", handlers.UpdateEmbedAPI).Methods("PUT")
	router.HandleFunc("/GETEMBED", handlers.GetEmbedAPI).Methods("GET")
	// router.HandleFunc("/getall", handlers.GetAllEmbedAPI).Methods("GET")
	router.HandleFunc("/delete", handlers.DeleteEmbedAPI).Methods("DELETE")


	return router, nil
}
