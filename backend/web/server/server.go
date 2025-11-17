package server

import (
	"DynViz/web/router"
	"fmt"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func StartServer() {

	r := mux.NewRouter()

	// register router for every module

	// auth module
	AuthRouter, err := router.InitAuthRouter()
	if err != nil {
		fmt.Println("Error initializing auth router:", err)
		return
	}
	r.PathPrefix("/auth").Handler(http.StripPrefix("/auth", AuthRouter))

	// user module
	UserRouter, err := router.InitUserRouter()
	if err != nil {
		fmt.Println("Error initializing user router:", err)
		return
	}
	r.PathPrefix("/user").Handler(http.StripPrefix("/user", UserRouter))

	//Organization Module
	OrganizationRouter, err := router.InitOrganizationRouter()
	if err != nil {
		fmt.Println("Error initializing auth router:", err)
		return
	}
	r.PathPrefix("/organization").Handler(http.StripPrefix("/organization", OrganizationRouter))

	// folder module
	FolderRouter, err := router.InitFolderRouter()
	if err != nil {
		fmt.Println("Error initializing folder router:", err)
		return
	}
	r.PathPrefix("/folder").Handler(http.StripPrefix("/folder", FolderRouter))

	// Project module
	ProjectRouter, err := router.InitProjectRouter()
	if err != nil {
		fmt.Println("Error initializing Project router:", err)
		return
	}
	r.PathPrefix("/project").Handler(http.StripPrefix("/project", ProjectRouter))

	//   uac module
	UACRouter, err := router.InitUACRouter()
	if err != nil {
		fmt.Println("Error initializing UAC router:", err)
		return
	}
	r.PathPrefix("/uac").Handler(http.StripPrefix("/uac", UACRouter))

	//Team Module
	TeamRouter, err := router.InitTeamRouter()
	if err != nil {
		fmt.Println("Error initializing Team router:", err)
		return
	}
	r.PathPrefix("/team").Handler(http.StripPrefix("/team", TeamRouter))

	// utils module
	UtilsRouter, err := router.InitUtilsRouter()
	if err != nil {
		fmt.Println("Error initializing utils router:", err)
		return
	}
	r.PathPrefix("/utils").Handler(http.StripPrefix("/utils", UtilsRouter))

	// connections module
	ConnectionRouter, err := router.InitConnectionRouter()
	if err != nil {
		fmt.Println("Error initializing Connections router:", err)
		return
	}
	r.PathPrefix("/connection").Handler(http.StripPrefix("/connection", ConnectionRouter))

	// role module
	RoleRouter, err := router.InitRoleRouter()
	if err != nil {
		fmt.Println("Error initializing Roles router:", err)
		return
	}
	r.PathPrefix("/role").Handler(http.StripPrefix("/role", RoleRouter))

	// Menu module
	MenuRouter, err := router.InitMenuRouter()
	if err != nil {
		fmt.Println("Error initializing menu router:", err)
		return
	}
	r.PathPrefix("/menu").Handler(http.StripPrefix("/menu", MenuRouter))

	// common menu module
	CommonMenuRouter, err := router.InitCommonMenuRouter()
	if err != nil {
		fmt.Println("Error initializing common menu router:", err)
		return
	}
	r.PathPrefix("/commonmenu").Handler(http.StripPrefix("/commonmenu", CommonMenuRouter))

	// connection masters module
	ConnectionMastersRouter, err := router.InitConnectionMasterRouter()
	if err != nil {
		fmt.Println("Error initializing Connection masters router:", err)
		return
	}
	r.PathPrefix("/ConnectionMaster").Handler(http.StripPrefix("/ConnectionMaster", ConnectionMastersRouter))

	// connection masters module
	TemplateMastersRouter, err := router.InitTemplateMasterRouter()
	if err != nil {
		fmt.Println("Error initializing Connection masters router:", err)
		return
	}
	r.PathPrefix("/TemplateMaster").Handler(http.StripPrefix("/TemplateMaster", TemplateMastersRouter))

	// dashboard module
	DashboardRouter, err := router.InitDashboardRouter()
	if err != nil {
		fmt.Println("Error initializing Dashboard router:", err)
		return
	}

	r.PathPrefix("/dashboard").Handler(http.StripPrefix("/dashboard", DashboardRouter))

	// connection masters module
	TemplateDataBlockMastersRouter, err := router.InitTemplateDataBlockMasterRouter()
	if err != nil {
		fmt.Println("Error initializing Connection masters router:", err)
		return
	}
	r.PathPrefix("/TemplateMaster").Handler(http.StripPrefix("/TemplateMaster", TemplateDataBlockMastersRouter))

	// DB Structure module
	DBStructureRouter, err := router.InitDBStructureRouter()
	if err != nil {
		fmt.Println("Error initializing DB structure router:", err)
		return
	}

	r.PathPrefix("/DBStructure").Handler(http.StripPrefix("/DBStructure", DBStructureRouter))

	// DB query master module
	QueryMasterRouter, err := router.InitQueryMasterRouter()
	if err != nil {
		fmt.Println("Error initializing query router:", err)
		return
	}

	r.PathPrefix("/query").Handler(http.StripPrefix("/query", QueryMasterRouter))

	TileRouter, err := router.InitTileRouter()
	if err != nil {
		fmt.Println("Error initializing Tile router:", err)
		return
	}

	r.PathPrefix("/tile").Handler(http.StripPrefix("/tile", TileRouter))

	// ChartMaster module
	ChartMasterRouter, err := router.InitChartMasterRouter()
	if err != nil {
		fmt.Println("Error initializing CharMaster router:", err)
		return
	}

	r.PathPrefix("/chartmaster").Handler(http.StripPrefix("/chartmaster", ChartMasterRouter))

	// Worksheet module
	WorksheetRouter, err := router.InitWorksheetRouter()
	if err != nil {
		fmt.Println("Error initializing Worksheet router:", err)
		return
	}

	r.PathPrefix("/worksheet").Handler(http.StripPrefix("/worksheet", WorksheetRouter))

	// EmbedAPI module
	EmbedAPI, err := router.InitEmbedAPIRouter()
	if err != nil {
		fmt.Println("Error initializing EmbedAPI router:", err)
		return
	}
	r.PathPrefix("/EmbedAPI").Handler(http.StripPrefix("/EmbedAPI", EmbedAPI))


		// Cell module
		Cell, err := router.InitCellRouter()
		if err != nil {
			fmt.Println("Error initializing Cell router:", err)
			return
		}
		r.PathPrefix("/Cell").Handler(http.StripPrefix("/Cell", Cell))
	
	// datablock module
	DataBlockRouter, err := router.InitDataBlockRouter()
	if err != nil {
		fmt.Println("Error initializing Worksheet router:", err)
		return
	}

	r.PathPrefix("/datablock").Handler(http.StripPrefix("/datablock", DataBlockRouter))

	FileUploadRouter, err := router.InitFileUploadRouter()
	if err != nil {
		fmt.Println("Error initializing auth router:", err)
		return
	}
	r.PathPrefix("/fileupload").Handler(http.StripPrefix("/fileupload", FileUploadRouter))

	SetRouter, err := router.InitSetRouter()
	if err != nil {
		fmt.Println("Error initializing auth router:", err)
		return
	}
	r.PathPrefix("/Set").Handler(http.StripPrefix("/Set", SetRouter))

	// variable module
	VariableRouter, err := router.InitVariableRouter()
	if err != nil {
		fmt.Println("Error initializing utils router:", err)
		return
	}
	r.PathPrefix("/var").Handler(http.StripPrefix("/var", VariableRouter))

	FilterRouter, err := router.InitFilterRouter()
	if err != nil {
		fmt.Println("Error initializing filter router:", err)
		return
	}
	r.PathPrefix("/filter").Handler(http.StripPrefix("/filter", FilterRouter))

	

	// submit mux router to http
	http.Handle("/", r)

	// Enable CORS middleware
	cors := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	handler := cors(r)

	// Start the server
	fmt.Println("Starting HTTP server on port 8080...")
	http.ListenAndServe(":8080", handler)
}
