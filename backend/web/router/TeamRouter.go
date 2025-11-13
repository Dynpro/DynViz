package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitTeamRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/create", handlers.CreateTeam).Methods("POST")
	router.HandleFunc("/get", handlers.GetTeam).Methods("GET")
	router.HandleFunc("/getall", handlers.GetAllTeams).Methods("GET")
	router.HandleFunc("/update", handlers.UpdateTeam).Methods("PUT")
	router.HandleFunc("/delete", handlers.DeleteTeam).Methods("DELETE")

	return router, nil
}
