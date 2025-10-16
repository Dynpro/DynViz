package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitTileRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateTile).Methods("POST")
	router.HandleFunc("/getall", handlers.GetMultipleTiles).Methods("GET")
	router.HandleFunc("/get", handlers.GetTile).Methods("GET")
	router.HandleFunc("/update", handlers.UpdateTile).Methods("PUT")
	router.HandleFunc("/TileLoc", handlers.CreateTileLoc).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteTile).Methods("DELETE")

	return router, nil

}
