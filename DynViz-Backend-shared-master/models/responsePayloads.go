package models

import (
	// "encoding/json"
	"encoding/json"
	"time"
)

type Response struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
	Data    interface{}
	Total   int `json:"Total"`
}

type Jsonn struct {
	CountryCode string `json:"CountryCode"`
	Country     string `json:"Country"`
}

type Login struct {
	JWTToken   string
	ExpiryTime int64
	UserData   UserPayload
}

type SignUp struct {
	ID             int
	Name           string
	Email          string
	Password       string
	Domain         string
	AccountType    string
	OrganizationID int
	Organization   string
	CreatedByID    int
	LastModifiedBy int
	CountryCode    string
	Country        string
	PhoneNo        string
}

type OrganizationPayload struct {
	ID          int
	Name        string
	Email       string
	Domain      string
	AccountType string
	Status      string
	Country     string
	CountryCode string
	PhoneNo     string
	Logo        string
}

type UserPayload struct {
	ID            int
	Name          string
	Email         string
	RoleID        int
	RoleName      string
	AccessControl interface{}
	Status        string
	TeamID        int

	TeamName string

	OrganizationID   int
	OrganizationName string
	CountryCode      string
	Country          string
	PhoneNo          string
}

type RolePayload struct {
	ID           int
	Name         string
	MenuID       int
	Menu         MenuPayload
	Read_access  bool
	Write_access bool
}

type TeamPayload struct {
	TeamID     int
	Name       string
	TotalUsers int
}

type MenuPayload struct {
	ID           int
	Name         string
	CommonMenuID int
	CommonMenu   CommonMenuPayload
	ProjectID    int
	Project      ProjectPayload
	FolderID     int
	Folder       FolderPayload
	IsCommon     string
	IsProject    string
	IsFolder     string
}

type MenuPay struct {
	ID           int
	Name         string
	CommonMenuID *int
	CommonMenu   string
	ProjectID    *int
	Project      string
	FolderID     *int
	Folder       string
	IsCommon     bool
	IsProject    bool
	IsFolder     bool
}

type ProjectPayload struct {
	ID   int
	Name string
}

type FolderPayload struct {
	ID        int
	Name      string
	ProjectID int
}

type CommonMenuPayload struct {
	ID          int
	Name        string
	Description string
}

type UACPayload struct {
	ID     int
	Name   string
	UserID int
	RoleID int
	TeamID int
}

// type ConnectionParameters struct {
// 	Account   string `json:"account"`
// 	Username  string `json:"username"`
// 	Password  string `json:"password"`
// 	Database  string `json:"database"`
// 	Schema    string `json:"schema"`
// 	Warehouse string `json:"warehouse"`
// 	Role      string `json:"role"`
// }

// type TableColumn struct {
// 	TableName string   `json:"table_name"`
// 	Columns   []Column `json:"columns"`
// }

// type Column struct {
//     Name         string
//     Type         string
//     DefaultValue string
// 	Nullable string
//     Comment      string
//     IsNullable   string
//     IsIdentity   string
//     IsFrozen     string
//     IsHidden     string
//     IsPrimary    string
//     Ordinal      string
//     Kind         string
// }

type Userres struct {
	ID               int
	Name             string
	Email            string
	Password         string
	RoleID           int
	Role             string
	Status           int
	TeamID           int
	Team             string
	OrganizationID   int
	Organization     string
	CountryCode      string
	Country          string
	PhoneNo          string
	CreatedByID      int
	CreatedDate      time.Time
	LastModifiedBy   int
	LastModifiedDate time.Time
	DeactivateByID   int
	DeactivateDate   *time.Time
}

type MenuResponse struct {
	ID   int
	Name string
}

type ResponseDBStructure struct {
	Structure interface{} `json:"structure"`
	Error     string      `json:"error,omitempty"`
}

type ColumnInfo struct {
	TableSchema string
	TableName   string
	ColumnName  string
	DataType    string
}

type TDBMPartial struct {
	ID               int
	TemplateMasterID int
	ChartMasterID    int
	ChartMaster      ChartMaster
	Configs          json.RawMessage
	FontSize         string
	FontWeight       string
	FontStyle        string
	FontColor        string
	FontFamily       string
	DefaultValue     string
}
type TemplateResponse struct {
	TemplateMasterID int
	// TDBMS            []TemplateDataBlockMaster
	TDBMS []TDBMPartial

	// TDBMS json.RawMessage
	// IDs []int
}

type DashboardTilesResponse struct{
	Dashboard Dashboard
	Tiles []Tile
}



type SetRes struct {
	ID           int        `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	Name         string     `gorm:"not null" json:"Name,omitempty"`
	SchemaID     int        `gorm:"not null" json:"SchemaID,omitempty"`
	// SchemaName   SchemaName `gorm:"foreignKey:SchemaID"`
	ConnectionID int        `gorm:"not null" json:"ConnectionID,omitempty"`
	// Connection   Connection `gorm:"foreignKey:ConnectionID"`
	// Result           json.RawMessage `gorm:"default:null" json:"Data,omitempty"`
	Is_Found         int          `gorm:"default:1" json:"Is_Found,omitempty"`
	Status           int          `gorm:"default:1" json:"Status,omitempty"`
	Is_mapped        bool         `gorm:"default:1" json:"Is_mapped,omitempty"`
	OrganizationID   int          `gorm:"not null"  json:"OrganizationID,omitempty"`
	// Organization     Organization `gorm:"foreignKey:OrganizationID"`
	CreatedByID      int          `gorm:"not null" json:"CreatedByID,omitempty"`
	CreatedDate      time.Time    `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
	LastModifiedBy   int          `gorm:"not null" json:"LastModifiedBy,omitempty"`
	LastModifiedDate time.Time    `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	DeactivateByID   int          `gorm:"default:null" json:"DeactivateByID,omitempty"`
	DeactivatedDate  time.Time    `gorm:"autoUpdateTime" json:"DeactivatedDate,omitempty"`

}



type VarRes struct {
	ID           int        `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	Name         string     `gorm:"not null" json:"Name,omitempty"`
	SetID        int        `gorm:"not null" json:"SetID,omitempty"`
	// Set          Set        `gorm:"foreignKey:SetID"`
	TableID      int        `gorm:"not null" json:"TableID,omitempty"`
	// TableName    TableName  `gorm:"foreignKey:TableID"`
	ConnectionID int        `gorm:"not null" json:"ConnectionID,omitempty"`
	// Connection   Connection `gorm:"foreignKey:ConnectionID"`
	// Result           json.RawMessage `gorm:"default:null" json:"Data,omitempty"`
	Query     string `gorm:"not null" json:"Query,omitempty"`
	Is_Custom int    `gorm:"default:0" json:"Is_Custom,omitempty"`

	Is_Found         int          `gorm:"default:1" json:"Is_Found,omitempty"`
	Status           int          `gorm:"default:1" json:"Status,omitempty"`
	Is_mapped        bool         `gorm:"default:1" json:"Is_mapped,omitempty"`
	OrganizationID   int          `gorm:"not null"  json:"OrganizationID,omitempty"`
	// Organization     Organization `gorm:"foreignKey:OrganizationID"`
	CreatedByID      int          `gorm:"not null" json:"CreatedByID,omitempty"`
	CreatedDate      time.Time    `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
	LastModifiedBy   int          `gorm:"not null" json:"LastModifiedBy,omitempty"`
	LastModifiedDate time.Time    `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	DeactivateByID   int          `gorm:"default:null" json:"DeactivateByID,omitempty"`
	DeactivateDate   time.Time    `gorm:"autoUpdateTime" json:"DeactivateDate,omitempty"`

	// Cell []Cell `gorm:"foreignKey:VariableID"`
}

type FilRes struct {
	ID               int          `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	Name             string       `gorm:"not null" json:"Name,omitempty"`
	Query            string       `gorm:"not null" json:"Query,omitempty"`
	Status           int          `gorm:"default:1" json:"Status,omitempty"`
	Type             string       `gorm:"not null" json:"Type,omitempty"`
	SetID            int          `gorm:"not null" json:"SetID,omitempty"`
	// Set              Set          `gorm:"foreignKey:SetID"`
	VarID            int          `gorm:"not null" json:"VarID,omitempty"`
	ColumnID            int          `gorm:"not null" json:"ColumnID,omitempty"`

	// Variable         Variables    `gorm:"foreignKey:VarID"`
	D_Type           string       `gorm:"not null" json:"D_Type,omitempty"`
	OrganizationID   int          `gorm:"not null"  json:"OrganizationID,omitempty"`
	// Organization     Organization `gorm:"foreignKey:OrganizationID"`
	CreatedByID      int          `gorm:"not null" json:"CreatedByID,omitempty"`
	CreatedDate      time.Time    `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
	LastModifiedBy   int          `gorm:"not null" json:"LastModifiedBy,omitempty"`
	LastModifiedDate time.Time    `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	DeactivateByID   int          `gorm:"default:null" json:"DeactivateByID,omitempty"`
	DeactivateDate   time.Time    `gorm:"autoUpdateTime" json:"DeactivateDate,omitempty"`

	// Cell []Cell `gorm:"foreignKey:VariableID"`
}


type ResponseStructure struct {
	Structure     *ResponseDBStructure `json:"structure,omitempty"`
	CompareResult []string           `json:"compare_result,omitempty"`
	Error         string             `json:"error,omitempty"`
}
