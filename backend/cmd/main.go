package main

import (
	"DynViz/internal/connectors"
	"DynViz/internal/database"
	"DynViz/web/server"
	"fmt"
)

func main() {
	fmt.Println("Starting BI Tool...")

	database.InitPostgresDB()

	if database.ResetDB(false) {
		database.UpdateSequences(true)
		database.PrefillDB(true)
	}

	connectors.InitDBConnections()

	server.StartServer()
}
