package router

import (
	"DynViz/web/handlers"

	"github.com/gorilla/mux"
)

func InitUserRouter() (*mux.Router, error) {

	router, _ = InitRouter()

	router.HandleFunc("/getall", handlers.GetAllUsers).Methods("GET")

	router.HandleFunc("/create", handlers.CreateUser).Methods("POST")
	router.HandleFunc("/delete", handlers.DeleteUser).Methods("DELETE")
	router.HandleFunc("/add", handlers.AddNewUser).Methods("POST")
	router.HandleFunc("/get", handlers.GetUser).Methods("POST")

	router.HandleFunc("/update", handlers.UpdateUser).Methods("PUT")

	router.HandleFunc("/getbyteam", handlers.GetUsersByTeam).Methods("GET")
	router.HandleFunc("/getbyrole", handlers.GetUsersByRole).Methods("GET")

	return router, nil
}
