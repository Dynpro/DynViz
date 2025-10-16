package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitFolderRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateFolder).Methods("POST")
	router.HandleFunc("/getall", handlers.GetMultipleFolders).Methods("GET")
	router.HandleFunc("/get", handlers.GetFolder).Methods("GET")
	router.HandleFunc("/update", handlers.UpdateFolder).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteFolder).Methods("DELETE")

	return router, nil
}
