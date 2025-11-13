package models

import (
	"encoding/json"
	"log"
	"time"

	"gorm.io/gorm"
)

type CountryCode struct {
	ID          int    `gorm:"primaryKey"`
	CountryCode string `gorm:"not null"`
	Country     string `gorm:"not null"`
}
type Organization struct {
	ID          int    `gorm:"primaryKey;autoIncrement"`
	Name        string `gorm:"not null"`
	Email       string `gorm:"unique;not null"`
	Domain      string `gorm:"default:null"`
	AccountType string `gorm:"not null"`
	Status      int    `gorm:"default:1"`
	Country     string `gorm:"not null"`
	CountryCode string `gorm:"not null"`
	PhoneNo     string `gorm:"not null"`
	Logo        string `gorm:"not null"`
	// loggin columns
	CreatedByID      int        `gorm:"not null"`
	CreatedDate      time.Time  `gorm:"autoCreateTime"`
	LastModifiedBy   int        `gorm:"not null"`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime"`
	DeactivateByID   int        `gorm:"default:null"`
	DeactivateDate   *time.Time `gorm:"default:null"`
	// foreign key references
	User       []User       `gorm:"foreignKey:OrganizationID"`
	Role       []Role       `gorm:"foreignKey:OrganizationID"`
	Team       []Team       `gorm:"foreignKey:OrganizationID"`
	UAC        []UAC        `gorm:"foreignKey:OrganizationID"`
	Connection []Connection `gorm:"foreignKey:OrganizationID"`
	Worksheet  []Worksheet  `gorm:"foreignKey:OrganizationID"`
	EmbedAPI   []EmbedAPI   `gorm:"foreignKey:OrganizationID"`
	FileUpload []FileUpload `gorm:"foreignKey:OrganizationID"`
	Dashboard  []Dashboard  `gorm:"foreignKey:OrganizationID"`
	Folder     []Folder     `gorm:"foreignKey:OrganizationID"`
	Menu       []Menu       `gorm:"foreignKey:OrganizationID"`
	Project    []Project    `gorm:"foreignKey:OrganizationID"`
}

type User struct {
	ID       int    `gorm:"primaryKey;autoIncrement"`
	Name     string `gorm:"not null"`
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
	RoleID   int    `gorm:"default:null"`
	Status   int    `gorm:"default:1"`
	TeamID   int    `gorm:"default:null"`
	Team     Team   `gorm:"foreignKey:TeamID"`

	OrganizationID int          `gorm:"not null"`
	Organization   Organization `gorm:"foreignKey:OrganizationID"`
	CountryCode    string       `gorm:"not null"`
	Country        string       `gorm:"not null"`
	PhoneNo        string       `gorm:"not null"`
	// loggin columns
	CreatedByID      int        `gorm:"not null"`
	CreatedDate      time.Time  `gorm:"autoCreateTime"`
	LastModifiedBy   int        `gorm:"not null"`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime"`
	DeactivateByID   int        `gorm:"default:null"`
	DeactivateDate   *time.Time `gorm:"default:null"`
	// foreign key references
	UAC []UAC `gorm:"foreignKey:UserID"`
}

type Role struct {
	SrNo   int    `gorm:"primaryKey;autoIncrement"`
	ID     int    `gorm:"not null"`
	Name   string `gorm:"not null"`
	MenuID int    `gorm:"not null"`
	Menu   Menu   `gorm:"foreignKey:MenuID"`
	// RoleusersID    int         `gorm:"not null"`
	Read_access    bool         `gorm:"default:false"`
	Write_access   bool         `gorm:"default:false"`
	OrganizationID int          `gorm:"default:null"`
	Organization   Organization `gorm:"foreignKey:OrganizationID"`
	Status         int          `gorm:"default:1"`
	IsDefault      bool         `gorm:"defalut:false"`

	// loggin columns
	CreatedByID      int        `gorm:"default:null"`
	CreatedDate      time.Time  `gorm:"autoCreateTime"`
	LastModifiedBy   int        `gorm:"default:null"`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime"`
	DeactivateByID   int        `gorm:"default:null"`
	DeactivateDate   *time.Time `gorm:"default:null"`
	// foreign key references

}

type Team struct {
	ID             int          `gorm:"primaryKey;autoIncrement"`
	Name           string       `gorm:"not null"`
	OrganizationID int          `gorm:"not null"`
	Organization   Organization `gorm:"foreignKey:OrganizationID"`
	// loggin columns
	CreatedByID      int        `gorm:"not null"`
	CreatedDate      time.Time  `gorm:"autoCreateTime"`
	LastModifiedBy   int        `gorm:"not null"`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime"`
	Status           int        `gorm:"default:1"`
	DeactivateByID   int        `gorm:"default:null"`
	DeactivateDate   *time.Time `gorm:"default:null"`
	// foreign key references
	UAC  []UAC  `gorm:"foreignKey:TeamID"`
	User []User `gorm:"foreignKey:TeamID"`
}

type UAC struct {
	ID             int          `gorm:"primaryKey;autoIncrement"`
	Name           string       `gorm:"not null"`
	UserID         int          `gorm:"not null"`
	User           User         `gorm:"foreignKey:UserID"`
	RoleID         int          `gorm:"not null"`
	TeamID         int          `gorm:"default:null"`
	Team           Team         `gorm:"foreignKey:TeamID"`
	OrganizationID int          `gorm:"not null"`
	Organization   Organization `gorm:"foreignKey:OrganizationID"`
	// loggin columns
	CreatedByID      int        `gorm:"not null"`
	CreatedDate      time.Time  `gorm:"autoCreateTime"`
	LastModifiedBy   int        `gorm:"not null"`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime"`
	DeactivateByID   int        `gorm:"default:null"`
	DeactivateDate   *time.Time `gorm:"default:null"`
}

type Project struct {
	ID             int          `gorm:"primaryKey;autoIncrement"`
	Name           string       `gorm:"not null"`
	OrganizationID int          `gorm:"not null"`
	Organization   Organization `gorm:"foreignKey:OrganizationID"`
	Status         int          `gorm:"default:1"`
	// loggin columns
	CreatedByID      int        `gorm:"not null"`
	CreatedDate      time.Time  `gorm:"autoCreateTime"`
	LastModifiedBy   int        `gorm:"not null"`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime"`
	DeactivateByID   int        `gorm:"default:null"`
	DeactivateDate   *time.Time `gorm:"default:null"`
	// foreign key references
	Menu      []Menu      `gorm:"foreignKey:ProjectID"`
	Folder    []Folder    `gorm:"foreignKey:ProjectID"`
	Worksheet []Worksheet `gorm:"foreignKey:ProjectID"`
	EmbedAPI  []EmbedAPI  `gorm:"foreignKey:ProjectID"`
	Dashboard []Dashboard `gorm:"foreignKey:ProjectID"`
}

type Menu struct {
	ID             int          `gorm:"primaryKey;autoIncrement"`
	Name           string       `gorm:"not null"`
	CommonMenuID   *int         `gorm:"default:null"`
	CommonMenu     CommonMenu   `gorm:"foreignKey:CommonMenuID"`
	ProjectID      *int         `gorm:"default:null"`
	Project        Project      `gorm:"foreignKey:ProjectID"`
	FolderID       *int         `gorm:"default:null"`
	Folder         Folder       `gorm:"foreignKey:FolderID"`
	Status         int          `gorm:"default:1"`
	IsCommon       bool         `gorm:"default:false"`
	IsProject      bool         `gorm:"default:false"`
	IsFolder       bool         `gorm:"default:false"`
	OrganizationID *int         `gorm:"default:null"`
	Organization   Organization `gorm:"foreignKey:OrganizationID"`
	// foreign key references
	Role []Role `gorm:"foreignKey:MenuID"`
}

type Folder struct {
	ID             int          `gorm:"primaryKey;autoIncrement"`
	Name           string       `gorm:"not null"`
	ProjectID      int          `gorm:"not null"`
	Project        Project      `gorm:"foreignKey:ProjectID"`
	OrganizationID int          `gorm:"not null"`
	Organization   Organization `gorm:"foreignKey:OrganizationID"`
	Status         int          `gorm:"default:1"`
	// loggin columns
	CreatedByID      int        `gorm:"not null"`
	CreatedDate      time.Time  `gorm:"autoCreateTime"`
	LastModifiedBy   int        `gorm:"not null"`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime"`
	DeactivateByID   int        `gorm:"default:null"`
	DeactivateDate   *time.Time `gorm:"default:null"`
	// foreign key references
	Menu      []Menu      `gorm:"foreignKey:FolderID"`
	Worksheet []Worksheet `gorm:"foreignKey:FolderID"`
	Dashboard []Dashboard `gorm:"foreignKey:FolderID"`
}

type RoleData struct {
	Name       string                     `json:"name"`
	ID         int                        `json:"ID"`
	Permission map[string]map[string]bool `json:"permission"`
}

type Connection struct {
	ID                 int              `gorm:"primaryKey;autoIncrement"`
	Name               string           `gorm:"not null"`
	Params             json.RawMessage  `gorm:"type:jsonb;not null"`
	DBType             string           `gorm:"not null"`
	Status             int              `gorm:"default:1"`
	ConnectionMasterID int              `gorm:"not null"`
	ConnectionMaster   ConnectionMaster `gorm:"foreignKey:ConnectionMasterID;references:ID"`
	OrganizationID     int              `gorm:"not null"`
	Organization       Organization     `gorm:"foreignKey:OrganizationID"`
	// logging columns
	CreatedByID      int        `gorm:"not null"`
	CreatedDate      time.Time  `gorm:"autoCreateTime"`
	LastModifiedBy   int        `gorm:"not null"`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime"`
	DeactivateByID   int        `gorm:"default:null"`
	DeactivateDate   *time.Time `gorm:"default:null"`

	ColumnName []ColumnName `gorm:"foreignKey:ConnectionID"`
	TableName  []TableName  `gorm:"foreignKey:ConnectionID"`
	SchemaName []SchemaName `gorm:"foreignKey:ConnectionID"`
}

type ConnectionMaster struct {
	ID     int             `gorm:"primaryKey;autoIncrement"`
	Name   string          `gorm:"not null"`
	Params json.RawMessage `gorm:"not null"`
	DBType string          `gorm:"not null"`
	Status int             `gorm:"default:1"`
	// logging columns
	CreatedByID      int       `gorm:"default:null"`
	CreatedDate      time.Time `gorm:"autoCreateTime"`
	LastModifiedBy   int       `gorm:"default:null"`
	LastModifiedDate time.Time `gorm:"autoUpdateTime"`
	DeactivateByID   int       `gorm:"default:null"`
	DeactivateDate   time.Time `gorm:"default:null"`
	// foreign key references
	Connection  []Connection  `gorm:"foreignKey:ConnectionMasterID;references:ID"`
	FileUpload  []FileUpload  `gorm:"foreignKey:ConnectionMasterID"`
	QueryMaster []QueryMaster `gorm:"foreignKey:ConnectionMasterID"`
}

type CommonMenu struct {
	ID          int    `gorm:"primaryKey;autoIncrement"`
	Name        string `gorm:"not null"`
	Description string `gorm:"default:null"`
	Status      int    `gorm:"default:1"`
	// loggin columns
	CreatedByID      int       `gorm:"default:null"`
	CreatedDate      time.Time `gorm:"autoCreateTime"`
	LastModifiedBy   int       `gorm:"default:null"`
	LastModifiedDate time.Time `gorm:"autoUpdateTime"`
	DeactivateByID   int       `gorm:"default:null"`
	DeactivateDate   time.Time `gorm:"default:null"`
	// foreign key references
	Menu []Menu `gorm:"foreignKey:CommonMenuID"`
}

type Dashboard struct {
	ID             int             `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	Name           string          `gorm:"not null" json:"Name,omitempty"`
	Description    string          `gorm:"default:null" json:"Description,omitempty"`
	Status         int             `gorm:"default:1" json:"Status,omitempty"`
	FolderID       int             `gorm:"not null" json:"FolderID,omitempty"`
	Folder         Folder          `gorm:"foreignKey:FolderID"`
	Configs        json.RawMessage `gorm:"default:null" json:"Configs,omitempty"`
	ProjectID      int             `gorm:"not null" json:"ProjectID,omitempty"`
	Project        Project         `gorm:"foreignKey:ProjectID"`
	OrganizationID int             `gorm:"not null" json:"OrganizationID,omitempty"`
	Organization   Organization    `gorm:"foreignKey:OrganizationID"`
	//login Columns
	CreatedByID      int        `gorm:"not null" json:"CreatedByID,omitempty"`
	CreatedDate      time.Time  `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
	LastModifiedBy   int        `gorm:"not null" json:"LastModifiedBy,omitempty`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	DeactivateByID   int        `gorm:"default:null" json:"DeactivateByID,omitempty"`
	DeactivateDate   *time.Time `gorm:"default:null" json:"DeactivateDate,omitempty"`

	EmbedAPI  []EmbedAPI  `gorm:"foreignKey:DashboardID"`
	DataBlock []DataBlock `gorm:"foreignKey:DashboardID"`
	Tile      []Tile      `gorm:"foreignKey:DashboardID"`
}

type Tile struct {
	ID               int            `gorm:"primaryKey;autoIncrement"`
	Name             string         `gorm:"not null" json:"Name,omitempty"`
	DashboardID      int            `gorm:"not null" json:"DashboardID,omitempty"`
	Dashboard        Dashboard      `gorm:"foreignKey:DashboardID"`
	TemplateMasterID int            `gorm:"not null" json:"TemplateMasterID,omitempty"`
	TemplateMaster   TemplateMaster `gorm:"foreignKey:TemplateMasterID"`
	// Height           int             `gorm:"not null"`
	Type    string          `gorm:"not null" json:"Type,omitempty"`
	Configs json.RawMessage `gorm:"default:null" json:"Configs,omitempty"`
	Layout  json.RawMessage `gorm:"default:null" json:"Layout,omitempty"`
	Styles  json.RawMessage `gorm:"default:null" json:"Styles,omitempty"`
	Status  int             `gorm:"default:1" json:"Status,omitempty"`
	Url     string          `gorm:"default:null" json:"Url,omitempty"` //tile endpoints
	//login Columns
	CreatedByID      int        `gorm:"not null" json:"CreatedByID,omitempty"`
	CreatedDate      time.Time  `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
	LastModifiedBy   int        `gorm:"not null" json:"LastModifiedBy,omitempty"`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	DeactivateByID   int        `gorm:"default:null" json:"DeactivateByID,omitempty"`
	DeactivateDate   *time.Time `gorm:"default:null" json:"DeactivateDate,omitempty"`

	DataBlocks []DataBlock `gorm:"foreignKey:TileID"`
}

// SchemaName represents the schema structure.
type SchemaName struct {
	ID           int    `gorm:"primaryKey;autoIncrement"`
	Name         string `gorm:"type:varchar(255);default:NULL" json:"Name,omitempty"`
	ConnectionID int    `gorm:"not null"`
	Is_mapped    int    `gorm:"default:0" json:"Is_mapped,omitempty"`
	Is_found     int    `gorm:"default:1" json:"Is_found,omitempty"`

	Connection  Connection `gorm:"foreignKey:ConnectionID"`
	LastUpdated time.Time  `gorm:"autoCreateTime"`

	// Relationships
	ColumnNames []ColumnName `gorm:"foreignKey:SchemaID"` // Changed to plural for consistency
	TableNames  []TableName  `gorm:"foreignKey:SchemaID"` // Changed to plural for consistency
}

// TableName method for SchemaName
func (SchemaName) TableName() string {
	return "org_tables.schema_names"
}

// TableName represents the table structure.
type TableName struct {
	ID           int        `gorm:"primaryKey;autoIncrement"`
	Name         string     `gorm:"type:varchar(255);default:NULL" json:"Name,omitempty"`
	SchemaID     int        `gorm:"not null"`
	Schema       SchemaName `gorm:"foreignKey:SchemaID"` // Changed field name from SchemaName to Schema
	ConnectionID int        `gorm:"not null"`
	Is_mapped    int        `gorm:"default:0" json:"Is_mapped,omitempty"`
	Is_found     int        `gorm:"default:1" json:"Is_found,omitempty"`
	Connection   Connection `gorm:"foreignKey:ConnectionID"`
	LastUpdated  time.Time  `gorm:"autoCreateTime"`

	// Relationships
	ColumnNames []ColumnName `gorm:"foreignKey:TableID"` // Changed to plural for consistency
}

// TableName method for TableName
func (TableName) TableName() string {
	return "org_tables.table_names"
}

// ColumnName represents the column structure.
type ColumnName struct {
	ID           int        `gorm:"primaryKey;autoIncrement"`
	Name         string     `gorm:"type:varchar(255);default:NULL" json:"Name,omitempty"`
	DataType     string     `gorm:"not null"`
	SchemaID     int        `gorm:"not null"`
	Schema       SchemaName `gorm:"foreignKey:SchemaID"` // Changed field name from SchemaName to Schema
	TableID      int        `gorm:"not null"`
	Table        TableName  `gorm:"foreignKey:TableID"` // Changed field name from TableName to Table
	ConnectionID int        `gorm:"not null"`
	Connection   Connection `gorm:"foreignKey:ConnectionID"`
	LastUpdated  time.Time  `gorm:"autoCreateTime"`
}

// TableName method for ColumnName
func (ColumnName) TableName() string {
	return "org_tables.column_names"
}

type TempSchemaName struct {
	ID           int        `gorm:"primaryKey;autoIncrement"`
	Name         string     `gorm:"type:varchar(255);default:NULL" json:"Name,omitempty"`
	ConnectionID int        `gorm:"not null"`
	Connection   Connection `gorm:"foreignKey:ConnectionID"`
	LastUpdated  time.Time  `gorm:"autoCreateTime"`

	TempTableName []TempTableName `gorm:"foreignKey:SchemaID"` // Reference to temp_table_names
}

// TableName method for TempSchemaName
func (TempSchemaName) TableName() string {
	return "org_tables.temp_schema_names"
}

type TempTableName struct {
	ID             int          `gorm:"primaryKey;autoIncrement"`
	Name           string       `gorm:"type:varchar(255);default:NULL" json:"Name,omitempty"`
	SchemaID       int          `gorm:"not null"` // Reference to TempSchemaName
	ConnectionID   int          `gorm:"not null"`
	Connection     Connection   `gorm:"foreignKey:ConnectionID"`
	LastUpdated    time.Time    `gorm:"autoCreateTime"`
	TempColumnName []ColumnName `gorm:"foreignKey:TableID"` // Reference to temp_column_names
}

// TableName method for TempTableName
func (TempTableName) TableName() string {
	return "org_tables.temp_table_names"
}

type QueryMaster struct {
	ID                 int              `gorm:"primaryKey;autoIncrement" json:"id"`
	SchemaQuery        string           `gorm:"not null" json:"schema_query"`
	TableQuery         string           `gorm:"not null" json:"table_query"`
	ColumnQuery        string           `gorm:"not null" json:"column_query"`
	ConnectionMasterID int              `gorm:"not null" json:"connection_master_id"`
	ConnectionMaster   ConnectionMaster `gorm:"foreignKey:ConnectionMasterID" json:"connection_master"`
	Description        string           `gorm:"not null" json:"description"`
	DBType             string           `gorm:"not null" json:"dbtype"`
	Status             int              `gorm:"default:1"`
	LastModifiedBy     int              `gorm:"not null" json:"last_modified_by"`
	LastModifiedDate   time.Time        `gorm:"autoUpdateTime" json:"last_modified_date"`
	DeactivateByID     int              `gorm:"default:null" json:"deactivate_by_id"`
	DeactivateDate     *time.Time       `gorm:"default:null" json:"deactivate_date"`
}

type DataBlock struct {
	ID          int       `gorm:"primaryKey;autoIncrement"`
	DashboardID int       `gorm:"not null" json:"DashboardID,omitempty"`
	Dashboard   Dashboard `gorm:"foreignKey:DashboardID"`
	Name        string    `gorm:"not null" json:"Name,omitempty"`
	TileID      int       `gorm:"not null" json:"TileID,omitempty"`

	// Tile                      Tile                    `gorm:"foreignKey:TileID"`
	ChartMasterID             int         `gorm:"not null"`
	ChartMaster               ChartMaster `gorm:"foreignKey:ChartMasterID"`
	TemplateDataBlockMasterID int         `gorm:"not null" json:"TemplateDataBlockMasterID,omitempty"`
	Status                    int         `gorm:"default:1" json:"Status,omitempty"`
	// TemplateDataBlockMaster   TemplateDataBlockMaster `gorm:"foreignKey:TemplateDataBlockMasterID"`
	Configs json.RawMessage `gorm:"not null" json:"Configs,omitempty"`
	// IsStatic bool            `gorm:"default:true"`
	// Query        string          `gorm:"default:null"`
	// ConnectionID int  `gorm:"default:-1"`
	CellID int  `gorm:"not null" json:"CellID,omitempty"`
	Cell   Cell `gorm:"foreignKey:CellID"`
	// Connection                Connection              `gorm:"foreignKey:ConnectionID"`
	// Value                     any                     `gorm:"default:null"`
	Data    json.RawMessage `gorm:"default:null" json:"Data,omitempty"`
	Styles  json.RawMessage `gorm:"default:null" json:"Styles,omitempty"`
	Type    string          `gorm:"not null" json:"Type,omitempty"`
	Library string          `gorm:"default:null" json:"Library,omitempty"`
	// Color string `gorm:"not null"`
}

// type TileDataBlockMaster struct {
// 	ID int `gorm:"primaryKey;autoIncrement"`
// }

// type TemplateMaster struct {
// 	ID      int             `gorm:"primaryKey;autoIncrement"`
// 	Name    string          `gorm:"not null"`
// 	Height  string          `gorm:"not null"`
// 	Width   string          `gorm:"not null"`
// 	Colour  string          `gorm:"not null"`
// 	Configs json.RawMessage `gorm:"not null"`
// 	Layout  json.RawMessage `gorm:"default:null"`
// 	Styles  json.RawMessage `gorm:"defalut:null"`
// 	Status  int             `gorm:"default:1"`
// 	//login Columns
// 	CreatedByID      int        `gorm:"not null"`
// 	CreatedDate      time.Time  `gorm:"autoCreateTime"`
// 	LastModifiedBy   int        `gorm:"not null"`
// 	LastModifiedDate time.Time  `gorm:"autoUpdateTime"`
// 	DeactivateByID   int        `gorm:"default:null"`
// 	DeactivateDate   *time.Time `gorm:"default:null"`

//		TDBM []TemplateDataBlockMaster `gorm:"foreignKey:TemplateMasterID;"`
//	}
// type TemplateMaster struct {
// 	ID      int             `gorm:"primaryKey;autoIncrement" json:"ID"`
// 	Name    string          `gorm:"not null" json:"Name,omitempty"`
// 	Height  string          `gorm:"not null" json:"Height,omitempty"`
// 	Width   string          `gorm:"not null" json:"Width,omitempty"`
// 	Colour  string          `gorm:"not null" json:"Colour,omitempty"`
// 	Configs json.RawMessage `gorm:"not null" json:"Configs,omitempty"`
// 	Layout  json.RawMessage `gorm:"default:null" json:"Layout,omitempty"`
// 	Styles  json.RawMessage `gorm:"default:null" json:"Styles,omitempty"`
// 	Status  int             `gorm:"default:1" json:"Status,omitempty"`
// 	//login Columns
// 	CreatedByID      int        `gorm:"not null" json:"CreatedByID,omitempty"`
// 	CreatedDate      time.Time  `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
// 	LastModifiedBy   int        `gorm:"not null" json:"LastModifiedBy,omitempty"`
// 	LastModifiedDate time.Time  `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
// 	DeactivateByID   int        `gorm:"default:null" json:"DeactivateByID,omitempty"`
// 	DeactivateDate   *time.Time `gorm:"default:null" json:"DeactivateDate,omitempty"`

//		TDBM []TemplateDataBlockMaster `gorm:"foreignKey:TemplateMasterID;" json:"TDBM,omitempty"`
//	}
type TemplateMaster struct {
	ID      int             `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	Name    string          `gorm:"not null" json:"Name,omitempty"`
	Configs json.RawMessage `gorm:"default:null" json:"Configs,omitempty"`
	Layout  json.RawMessage `gorm:"default:null" json:"Layout,omitempty"`
	Styles  json.RawMessage `gorm:"default:null" json:"Styles,omitempty"`
	Type    string          `gorm:"default:null"  json:"Type,omitempty"`
	Status  int             `gorm:"default:1" json:"Status,omitempty"`
	//login Columns
	CreatedByID      int        `gorm:"not null" json:"CreatedByID,omitempty"`
	CreatedDate      time.Time  `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
	LastModifiedBy   int        `gorm:"not null" json:"LastModifiedBy,omitempty"`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	DeactivateByID   int        `gorm:"default:null" json:"DeactivateByID,omitempty"`
	DeactivateDate   *time.Time `gorm:"default:null" json:"DeactivateDate,omitempty"`

	TDBM []TemplateDataBlockMaster `gorm:"foreignKey:TemplateMasterID;" json:"TDBM,omitempty"`
	Tile []Tile                    `gorm:"foreignKey:TemplateMasterID"`
}

// type TemplateDataBlockMaster struct {
// 	ID               int             `gorm:"primaryKey;autoIncrement"`
// 	Name             string          `gorm:"not null"`
// 	TemplateMasterID int             `gorm:"not null"`
// 	TemplateMaster   TemplateMaster  `gorm:"foreignKey:TemplateMasterID;references:ID"`
// 	ChartMasterID    int             `gorm:"not null"`
// 	ChartMaster      ChartMaster     `gorm:"foreignKey:ChartMasterID"`
// 	Configs          json.RawMessage `gorm:"not null"`
// 	FontSize         string          `gorm:"default:null"`
// 	FontWeight       string          `gorm:"default:null"`
// 	FontStyle        string          `gorm:"default:null"`
// 	FontColor        string          `gorm:"default:null"`
// 	FontFamily       string          `gorm:"default:null" json:"FontFamily,omitempty"`
// 	DefaultValue     string          `gorm:"default:null" json:"DefalutValue,omitempty"`
// 	Status           int             `gorm:"default:1"`
// 	//login Columns
// 	LastModifiedBy   int        `gorm:"not null"`
// 	LastModifiedDate time.Time  `gorm:"autoUpdateTime"`
// 	DeactivateByID   int        `gorm:"default:null"`
// 	DeactivateDate   *time.Time `gorm:"default:null"`
// 	// Height           string          `gorm:"default:null"`
// 	// Width            string          `gorm:"default:null"`
// 	// Colors           string          `gorm:"default:null"`
// }

//	type TemplateDataBlockMaster struct {
//		ID               int             `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
//		Name             string          `gorm:"not null" json:"Name,omitempty"`
//		TemplateMasterID int             `gorm:"not null" json:"TemplateMasterID,omitempty"`
//		TemplateMaster   TemplateMaster  `gorm:"foreignKey:TemplateMasterID;references:ID" json:"TemplateMaster,omitempty"`
//		ChartMasterID    int             `gorm:"not null" json:"ChartMasterID,omitempty"`
//		ChartMaster      ChartMaster     `gorm:"foreignKey:ChartMasterID" json:"ChartMaster,omitempty"`
//		Configs          json.RawMessage `gorm:"not null" json:"Configs,omitempty"`
//		FontSize         string          `gorm:"default:'null'" json:"FontSize,omitempty"`
//		FontWeight       string          `gorm:"default:'null'" json:"FontWeight,omitempty"`
//		FontStyle        string          `gorm:"default:'null'" json:"FontStyle,omitempty"`
//		FontColor        string          `gorm:"default:'null'" json:"FontColor,omitempty"`
//		FontFamily       string          `gorm:"default:'null'" json:"FontFamily,omitempty"`
//		DefaultValue     string          `gorm:"default:'null'" json:"DefaultValue,omitempty"`
//		Status           int             `gorm:"default:1" json:"Status,omitempty"`
//		//login Columns
//		LastModifiedBy   int        `gorm:"not null" json:"LastModifiedBy,omitempty"`
//		LastModifiedDate time.Time  `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
//		DeactivateByID   int        `gorm:"default:null" json:"DeactivateByID,omitempty"`
//		DeactivateDate   *time.Time `gorm:"default:null" json:"DeactivateDate,omitempty"`
//		// Height           string          `gorm:"default:'null'" json:"Height,omitempty"`
//		// Width            string          `gorm:"default:'null'" json:"Width,omitempty"`
//		// Colors           string          `gorm:"default:'null'" json:"Colors,omitempty"`
//	}
type TemplateDataBlockMaster struct {
	ID               int            `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	Name             string         `gorm:"not null" json:"Name,omitempty"`
	TemplateMasterID int            `gorm:"not null" json:"TemplateMasterID,omitempty"`
	TemplateMaster   TemplateMaster `gorm:"foreignKey:TemplateMasterID;references:ID" json:"TemplateMaster,omitempty"`
	ChartMasterID    int            `gorm:"not null" json:"ChartMasterID,omitempty"`
	ChartMaster      ChartMaster    `gorm:"foreignKey:ChartMasterID" json:"ChartMaster,omitempty"`
	Styles           json.RawMessage
	Data             json.RawMessage
	Configs          json.RawMessage
	Type             string
	Status           int    `gorm:"default:1"`
	Library          string `gorm:"default:null" json:"Library,omitempty"`
	//login Columns
	LastModifiedBy   int        `gorm:"not null" json:"LastModifiedBy,omitempty"`
	LastModifiedDate time.Time  `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	DeactivateByID   int        `gorm:"default:null" json:"DeactivateByID,omitempty"`
	DeactivateDate   *time.Time `gorm:"default:null" json:"DeactivateDate,omitempty"`

	DataBlocks []DataBlock `gorm:"foreignKey:TemplateDataBlockMasterID"`
}

//	type ChartMaster struct {
//		ID               int             `gorm:"primaryKey;autoIncrement"`
//		Name             string          `gorm:"not null"`
//		Configs          json.RawMessage `gorm:"not null"`
//		LastModifiedBy   int             `gorm:"not null"`
//		LastModifiedDate time.Time       `gorm:"autoUpdateTime"`
//		Category         string          `gorm:"not null"`
//		Status           int             `gorm:"default:1"`
//	}
type ChartMaster struct {
	ID               int             `gorm:"primaryKey;autoIncrement" json:"ID"`
	Name             string          `gorm:"not null" json:"Name,omitempty"`
	Configs          json.RawMessage `gorm:"not null" json:"Configs,omitempty"`
	LastModifiedBy   int             `gorm:"not null" json:"LastModifiedBy,omitempty"`
	LastModifiedDate time.Time       `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	Category         string          `gorm:"not null" json:"Category,omitempty"`
	Status           int             `gorm:"default:1" json:"Status,omitempty"`

	TDBM      []TemplateDataBlockMaster `gorm:"foreignKey:ChartMasterID;" json:"TDBM,omitempty"`
	DataBlock []DataBlock               `gorm:"foreignKey:ChartMasterID"`
}

type QueryRequest struct {
	Query string `json:"query"`
}

type QueryResponse struct {
	Columns []string        `json:"columns"`
	Rows    [][]interface{} `json:"rows"`
	Error   string          `json:"error,omitempty"`
}

// type TestDblock struct {
// 	ID      int             `gorm:"primaryKey;autoIncrement"`
// 	Configs json.RawMessage `gorm:"not null"`
// 	TileID  int             `gorm:"not null"`
// 	Tile    Tile            `gorm:"foreignKey:TileID"`
// }

type FileUpload struct {
	ID                 int              `gorm:"primaryKey;autoIncrement"`
	Name               string           `gorm:"not null"`
	OrganizationID     int              `gorm:"not null"`
	Organization       Organization     `gorm:"foreignKey:OrganizationID"`
	OrganizationName   string           `gorm:"not null"`
	ConnectionMasterID int              `gorm:"not null"`
	ConnectionMaster   ConnectionMaster `gorm:"foreignKey:ConnectionMasterID"`
	FileURL            string           `gorm:"not null"`

	//login Columns
	CreatedByID      int       `gorm:"not null"`
	CreatedDate      time.Time `gorm:"autoCreateTime"`
	LastModifiedBy   int       `gorm:"not null"`
	LastModifiedDate time.Time `gorm:"autoUpdateTime"`
	DeletedByID      int       `gorm:"default:null"`
	DeleatedDate     time.Time `gorm:"default:null"`
}

type EmbedAPI struct {
	ID             int          `gorm:"primaryKey;autoIncrement"`
	TestDomain     string       `gorm:"default:null"`
	ProdDomain     string       `gorm:"default:null"`
	HostName       string       `gorm:"not null"`
	Endpoint       string       `gorm:"not null"`
	Status         int          `gorm:"default:1"`
	DashboardID    int          `gorm:"not null" json:"DashboardID,omitempty"`
	Dashboard      Dashboard    `gorm:"foreignKey:DashboardID"`
	Istest         bool         `gorm:"default:false"`
	IsProd         bool         `gorm:"default:false"`
	OrganizationID int          `gorm:"not null" json:"OrganizationID,omitempty"`
	Organization   Organization `gorm:"foreignKey:OrganizationID"`

	ProjectID int     `gorm:"not null" json:"ProjectID,omitempty"`
	Project   Project `gorm:"foreignKey:ProjectID"`
}

type Worksheet struct {
	ID             int          `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	Name           string       `gorm:"not null"  json:"Name,omitempty"`
	OrganizationID int          `gorm:"not null"  json:"OrganizationID,omitempty"`
	Organization   Organization `gorm:"foreignKey:OrganizationID"`
	ProjectID      int          `gorm:"not null" json:"ProjectID,omitempty"`
	Project        Project      `gorm:"foreignKey:ProjectID"`
	FolderID       int          `gorm:"default:null" json:"FolderID,omitempty"`

	Folder Folder `gorm:"foreignKey:FolderID"`
	Status int    `gorm:"default:1" json:"Status,omitempty"`
	//login Columns
	CreatedByID      int       `gorm:"not null" json:"CreatedByID,omitempty"`
	CreatedDate      time.Time `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
	LastModifiedBy   int       `gorm:"not null" json:"LastModifiedBy,omitempty"`
	LastModifiedDate time.Time `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	DeactivateByID   int       `gorm:"default:null" json:"DeactivateByID,omitempty"`
	DeactivateDate   time.Time `gorm:"default:null" json:"DeactivateDate,omitempty"`
	Cell             []Cell    `gorm:"foreignKey:WorksheetID"`
}

type Cell struct {
	ID int `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	// TileID       int    `gorm:"default: null"`
	WorksheetID int       `gorm:"not null" json:"WorksheetID,omitempty"`
	Worksheet   Worksheet `gorm:"foreignKey:WorksheetID"`
	Query       string    `gorm:"not null" json:"Query,omitempty"`
	// ConnectionID int             `gorm:"not null" json:"ConnectionID,omitempty"`
	// Connection   Connection      `gorm:"foreignKey:ConnectionID"`
	Result json.RawMessage `gorm:"default:null" json:"Data,omitempty"`
	Status int             `gorm:"default:1" json:"Status,omitempty"`
	SetID  int             `gorm:"not null" json:"SetID,omitempty"`
	Set    Set             `gorm:"foreignKey:SetID"`

	DataBlocks []DataBlock `gorm:"foreignKey:CellID"`
}

type Set struct {
	ID       int    `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	Name     string `gorm:"not null" json:"Name,omitempty"`
	SchemaID int    `gorm:"not null" json:"SchemaID,omitempty"`
	// SchemaName   SchemaName `gorm:"foreignKey:SchemaID"`
	ConnectionID int        `gorm:"not null" json:"ConnectionID,omitempty"`
	Connection   Connection `gorm:"foreignKey:ConnectionID"`
	// Result           json.RawMessage `gorm:"default:null" json:"Data,omitempty"`
	Is_Found         int          `gorm:"default:1" json:"Is_Found,omitempty"`
	Status           int          `gorm:"default:1" json:"Status,omitempty"`
	Is_mapped        bool         `gorm:"default:1" json:"Is_mapped,omitempty"`
	OrganizationID   int          `gorm:"not null"  json:"OrganizationID,omitempty"`
	Organization     Organization `gorm:"foreignKey:OrganizationID"`
	CreatedByID      int          `gorm:"not null" json:"CreatedByID,omitempty"`
	CreatedDate      time.Time    `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
	LastModifiedBy   int          `gorm:"not null" json:"LastModifiedBy,omitempty"`
	LastModifiedDate time.Time    `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	DeactivateByID   int          `gorm:"default:null" json:"DeactivateByID,omitempty"`
	DeactivatedDate  time.Time    `gorm:"autoUpdateTime" json:"DeactivatedDate,omitempty"`

	Cell []Cell `gorm:"foreignKey:SetID"`
}

type Variables struct {
	ID      int    `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	Name    string `gorm:"not null" json:"Name,omitempty"`
	SetID   int    `gorm:"not null" json:"SetID,omitempty"`
	Set     Set    `gorm:"foreignKey:SetID"`
	TableID int    `gorm:"not null" json:"TableID,omitempty"`
	// TableName    TableName  `gorm:"foreignKey:TableID"`
	ConnectionID int        `gorm:"not null" json:"ConnectionID,omitempty"`
	Connection   Connection `gorm:"foreignKey:ConnectionID"`
	// Result           json.RawMessage `gorm:"default:null" json:"Data,omitempty"`
	Query     string `gorm:"not null" json:"Query,omitempty"`
	Is_Custom int    `gorm:"default:0" json:"Is_Custom,omitempty"`

	Is_Found         int          `gorm:"default:1" json:"Is_Found,omitempty"`
	Status           int          `gorm:"default:1" json:"Status,omitempty"`
	Is_mapped        bool         `gorm:"default:1" json:"Is_mapped,omitempty"`
	OrganizationID   int          `gorm:"not null"  json:"OrganizationID,omitempty"`
	Organization     Organization `gorm:"foreignKey:OrganizationID"`
	CreatedByID      int          `gorm:"not null" json:"CreatedByID,omitempty"`
	CreatedDate      time.Time    `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
	LastModifiedBy   int          `gorm:"not null" json:"LastModifiedBy,omitempty"`
	LastModifiedDate time.Time    `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	DeactivateByID   int          `gorm:"default:null" json:"DeactivateByID,omitempty"`
	DeactivateDate   time.Time    `gorm:"autoUpdateTime" json:"DeactivateDate,omitempty"`

	// Cell []Cell `gorm:"foreignKey:VariableID"`
}

type Filter struct {
	ID               int             `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	Name             string          `gorm:"not null" json:"Name,omitempty"`
	Query            string          `gorm:"not null" json:"Query,omitempty"`
	Status           int             `gorm:"default:1" json:"Status,omitempty"`
	Type             string          `gorm:"not null" json:"Type,omitempty"`
	SetID            int             `gorm:"not null" json:"SetID,omitempty"`
	Set              Set             `gorm:"foreignKey:SetID"`
	VarID            int             `gorm:"not null" json:"VarID,omitempty"`
	ColumnID         int             `gorm:"not null" json:"ColumnID,omitempty"`
	Configs          json.RawMessage `gorm:"default:null" json:"Configs,omitempty"`
	Variable         Variables       `gorm:"foreignKey:VarID"`
	D_Type           string          `gorm:"not null" json:"D_Type,omitempty"`
	OrganizationID   int             `gorm:"not null"  json:"OrganizationID,omitempty"`
	Organization     Organization    `gorm:"foreignKey:OrganizationID"`
	CreatedByID      int             `gorm:"not null" json:"CreatedByID,omitempty"`
	CreatedDate      time.Time       `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
	LastModifiedBy   int             `gorm:"not null" json:"LastModifiedBy,omitempty"`
	LastModifiedDate time.Time       `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
	DeactivateByID   int             `gorm:"default:null" json:"DeactivateByID,omitempty"`
	DeactivateDate   time.Time       `gorm:"autoUpdateTime" json:"DeactivateDate,omitempty"`

	// Cell []Cell `gorm:"foreignKey:VariableID"`
}

// type FilterDataBlockMappingOld struct {
// 	ID          int    `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
// 	FilterID    int    `gorm:"not null" json:"FilterID,omitempty"`
// 	DataBlockID int    `gorm:"not null" json:"DataBlockID,omitempty"`

// 	CreatedByID      int          `gorm:"not null" json:"CreatedByID,omitempty"`
// 	CreatedDate      time.Time    `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
// 	LastModifiedBy   int          `gorm:"not null" json:"LastModifiedBy,omitempty"`
// 	LastModifiedDate time.Time    `gorm:"autoUpdateTime" json:"LastModifiedDate,omitempty"`
// 	DeactivateByID   int          `gorm:"default:null" json:"DeactivateByID,omitempty"`
// 	DeactivateDate   time.Time    `gorm:"autoUpdateTime" json:"DeactivateDate,omitempty"`
// }

type FilterDataBlockMapping struct {
	ID          int `gorm:"primaryKey;autoIncrement" json:"ID,omitempty"`
	DashboardID int `gorm:"not null" json:"DashboardID,omitempty"`
	FilterID    int `gorm:"not null" json:"FilterID,omitempty"`
	DataBlockID int `gorm:"not null" json:"DataBlockID,omitempty"`

	CreatedByID int       `gorm:"not null" json:"CreatedByID,omitempty"`
	CreatedDate time.Time `gorm:"autoCreateTime" json:"CreatedDate,omitempty"`
}

func AutoMigrate(db *gorm.DB) error {

	log.Println("AutoMigrating models to Database")

	err := db.AutoMigrate(&Organization{}, &Team{}, &Project{}, &Folder{}, &CommonMenu{}, &Menu{}, &Role{}, &User{}, &UAC{}, &Connection{}, &ConnectionMaster{}, &FileUpload{}, &Dashboard{}, &CountryCode{}, &Tile{}, &ChartMaster{}, &DataBlock{}, &TemplateMaster{}, &TemplateDataBlockMaster{}, &QueryMaster{}, &EmbedAPI{}, &Worksheet{}, &Cell{}, &Set{}, &Variables{}, &Filter{}, &FilterDataBlockMapping{})

	return err
}

func DropTables(db *gorm.DB) error {

	DBmigrator := db.Migrator()

	log.Println("Dropping all database tables")

	err := DBmigrator.DropTable(&Organization{}, &Team{}, &Project{}, &Folder{}, &CommonMenu{}, &Menu{}, &Role{}, &User{}, &UAC{}, &Connection{}, &ConnectionMaster{}, &FileUpload{}, &Dashboard{}, &CountryCode{}, &Menu{}, &Role{}, &User{}, &UAC{}, &Connection{}, &ConnectionMaster{}, &Dashboard{}, &CountryCode{}, &Tile{}, &ChartMaster{}, &DataBlock{}, &TemplateMaster{}, &TemplateDataBlockMaster{}, &EmbedAPI{}, &Worksheet{}, &Cell{}, &Set{}, &Variables{}, &Filter{}, &FilterDataBlockMapping{})

	return err
}
