package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitTemplateMasterRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateMasterTemplate).Methods("POST")
	router.HandleFunc("/update", handlers.UpdateMasterTemplate).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteMasterTemplate).Methods("DELETE")
	// router.HandleFunc("/get", handlers.GetTemplateMasterTest).Methods("GET")
	router.HandleFunc("/get/{TemplateID}", handlers.GetTemplateMasterTest).Methods("POST")
	// router.HandleFunc("/getall", handlers.GetAllTemplateMaster).Methods("POST")
	router.HandleFunc("/getall", handlers.GetAllTemplateMaster).Methods("GET")

	return router, nil
}
