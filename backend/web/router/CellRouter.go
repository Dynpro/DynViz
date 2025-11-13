package router

import (
	"DynViz/web/handlers"
	// "DynViz/web/middleware"

	"github.com/gorilla/mux"
)

func InitCellRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	// router.HandleFunc("/create", handlers.CreateEmbedAPI).Methods("POST")
	router.HandleFunc("/create", handlers.CreateCell).Methods("POST")
	router.HandleFunc("/update", handlers.UpdateCell).Methods("PUT")
	router.HandleFunc("/Getallcells", handlers.GetAllCells).Methods("GET")
	// router.HandleFunc("/getall", handlers.GetAllEmbedAPI).Methods("GET")
	// router.HandleFunc("/delete", handlers.DeleteEmbedAPI).Methods("DELETE")
	router.HandleFunc("/delete", handlers.DeleteCell).Methods("DELETE")
	router.HandleFunc("/runcell", handlers.RunCell).Methods("PUT")
	router.HandleFunc("/Getcell", handlers.GetCells).Methods("GET")

	return router, nil
}
