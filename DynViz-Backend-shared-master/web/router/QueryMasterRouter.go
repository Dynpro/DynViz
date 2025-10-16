package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitQueryMasterRouter() (*mux.Router, error) {

	router, _ = InitRouter()





	router.HandleFunc("/create", handlers.CreateQuery).Methods("POST")
	router.HandleFunc("/update", handlers.UpdateQuery).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteQuery).Methods("PUT")
	router.HandleFunc("/get", handlers.GetQuery).Methods("GET")
	router.HandleFunc("/getall", handlers.GetAllQuery).Methods("GET")

	router.HandleFunc("/tilequery", handlers.ExecuteQuery).Methods("POST")



	return router, nil
}
