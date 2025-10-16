package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitConnectionMasterRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/getall", handlers.GetAllConnectionsMaster).Methods("GET")
	router.HandleFunc("/get", handlers.GetConnectionMaster).Methods("GET")
	router.HandleFunc("/create", handlers.CreateMasterConnection).Methods("POST")
	router.HandleFunc("/update", handlers.UpdateMasterConnection).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteMasterConnection).Methods("DELETE")

	// router.HandleFunc("/snowflakeTest", handlers.SnowflakeConnectionHandler).Methods("PUT","POST")
	// router.HandleFunc("/snowflakeTables", handlers.SnowflakeTablesHandler).Methods("PUT","POST")

	return router, nil
}
