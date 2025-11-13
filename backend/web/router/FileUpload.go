package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitFileUploadRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/fileupload", handlers.UploadFile).Methods("POST")

	return router, nil
}
