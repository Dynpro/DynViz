package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitCommonMenuRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/getall", handlers.GetAllCommonMenu).Methods("GET")
	router.HandleFunc("/get", handlers.GetCommonMenu).Methods("GET")

	router.HandleFunc("/create", handlers.CreateCommonMenu).Methods("POST")
	router.HandleFunc("/update", handlers.UpdateCommonMenu).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteCommonMenu).Methods("DELETE")

	return router, nil
}
