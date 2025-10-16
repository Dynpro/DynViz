package router

import (
	"DynViz/web/middleware"
	"fmt"

	"github.com/gorilla/mux"
)

var router *mux.Router

func InitRouter() (*mux.Router, error) {
	router = mux.NewRouter()
	router.Use(middleware.Middleware)

	if router == nil {
		return nil, fmt.Errorf("failed to create router")
	}

	// router.HandleFunc("/login", handlers.Signin).Methods("POST", "GET")

	return router, nil
}
