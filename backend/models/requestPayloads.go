package models

import "encoding/json"

type User_login struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type CreateTeamPayload struct {
	Name   string
	UserID []int
}

type UpdateTeamPayload struct {
	ID     int
	Name   string
	UserID []int
}

type CreateUACPayload struct {
	UACID  int
	RoleID int
	TeamID []int
	UserID []int
}

type GetUACPayload struct {
	RoleID int
}

type GetIDPayload struct {
	ID []int
}

type GetDashboardPayload struct {
	ID          int
	Name        string
	Description string
	FolderID    int
	ProjectID   int
}

type EstablishConnectionPayload struct {
	Host     string
	Port     int
	User     string
	Password string
	DBname   string
}

type CommonMenuRequest struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Status      int    `json:"status"`
}

type DeleteMultipleUsersRequest struct {
	IDs []uint `json:"ids"`
}
type EmbedDashboardReqPayload struct {
	DIDs           []uint `json:"dids"`
	TestDomain     string `json:"testDomain"`
	ProdDomain     string `json:"prodDomain"`
	IsTest         bool   `json:"isTest"`
	IsProd         bool   `json:"isProd"`
	OrganizationID int    `json:"organizationID"`
	ProjectID      int    `json:"projectID"`
}
type DeleteMultipleUS3Files struct {
	IDs []int `json:"ids"`
}

type S3RequestBody struct {
	ID          int    `json:"id"`
	HTMLContent string `json:"htmlContent"`
}

type TileRequestPayload struct {
	ID               int
	Name             string
	DashboardID      int
	TemplateMasterID int
	// Height           int
	// Width            int
	// Color            string
	URL     string
	Layout  json.RawMessage
	Styles  json.RawMessage
	Configs json.RawMessage
	Type    string
}

type DataBlockRequestPayload struct {
	ID                        int
	DashboardID               int
	TileID                    int
	ChartMasterID             int
	TemplateDataBlockMasterID int
	CellID                    int
	Data                      json.RawMessage
	Configs                   json.RawMessage
	IsStatic                  bool
	Type                      string
	Styles                    json.RawMessage
	Name                      string
	Query                     string //used to assign value of tdbm to cell refer createtile
	Library                   string
}

type TileRequestPayloadMaster struct {
	TileReqP   TileRequestPayload
	DataBlocks []DataBlockRequestPayload `gorm:"type:json"`
}

type TemplateMasterPayload struct {
	Templatemaster TemplateMaster
	TDBM           []TemplateDataBlockMaster `gorm:"type:json"`
}

type Applydatareq struct {
	// Query string
	DatablockID int
	CellID      int
	// ConnectionID int

}

type Tiledatablockpayload struct {
	DashboardID  int
	ConnectionID int
	ProjectID    int
}

type CreateFilterMappingPayloadNew struct {
	DashboardID int          `json:"DashboardID"` // Single Dashboard ID
	FilterID    int          `json:"FilterID"`    // Single Filter ID
	DataBlockID map[int]bool `json:"DataBlockID"` // Map of DataBlock IDs with boolean values
}

type DeleteFilterMappingPayloadNew struct {
	FilterID    int `json:"FilterID"`    // Single Filter ID
	DashboardID int `json:"DashboardID"` // Single Dashboard ID
}

type GetFilterMappingPayload struct {
	FilterID    int `json:"FilterID"`    // Single Filter ID
	DashboardID int `json:"DashboardID"` // Single Dashboard ID
}

type Schemareq struct {
	ID           int
	Name         string
	ConnectionID string
}
type Tablereq struct {
	ID           int
	Name         string
	ConnectionID string
}
type DataBlockFilterMapping struct {
	TileID  int
	Filters map[int][]string
}

// type TileRequestPayloadMaster struct {
// 	Name             string
// 	DashboardID      int
// 	TemplateMasterID int
// 	Height           int
// 	Width            int
// 	Color            string

// 	TileRequestPayload TileRequestPayload
// 	Template           TemplateMaster `gorm:"type:json"`
// 	DataBlock         []DataBlock      `gorm:"type:json"`
// 	ChartMaster        ChartMaster    `gorm:"type:json"`
// }
type IdsRequest struct {
    Ids []int `json:"Ids"`
}