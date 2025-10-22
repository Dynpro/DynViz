package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitTemplateDataBlockMasterRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	// router.HandleFunc("/create", handlers.CreateTemplateDataBlock).Methods("POST")
	router.HandleFunc("/update", handlers.UpdateTemplateDataBlock).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteTemplateDataBlock).Methods("DELETE")
	router.HandleFunc("/get", handlers.GetTemplateDataBlock).Methods("GET")
	router.HandleFunc("/getall", handlers.GetAllTemplateDataBlockMaster).Methods("GET")

	return router, nil
}
