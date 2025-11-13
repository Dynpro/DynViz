package connectors

import (
	"DynViz/internal/database"
	"DynViz/models"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/snowflakedb/gosnowflake"
	"gorm.io/gorm"
)

var (
	DBConnections = make(map[int]*sql.DB)
)

func InitDBConnections() {

	var connections []models.Connection

	db := database.DB

	if err := db.Find(&connections).Error; err != nil {
		log.Fatalf("failed to fetch connection parameters: %v \n%v", connections, err)
	}

	// Establish connections and store in the map
	for _, conn := range connections {
		var params map[string]interface{}
		if err := json.Unmarshal(conn.Params, &params); err != nil {
			log.Printf("failed to unmarshal connection params: %v \n%v", params, err)
			log.Print(err)
			continue
		}

		connection_masters, err := GetConnectionMaster(conn.ConnectionMasterID)
		if err != nil {
			log.Printf("failed to get connection master for the connection (%v): %v", conn, err)
			continue
		}

		dbConn, err := EstablishDBConnection(connection_masters.Name, params)
		if err != nil {
			log.Printf("failed to establish connection: %v", err)
			log.Printf("Error occured in the following connection: %v", conn)
			continue
		}

		DBConnections[conn.ID] = dbConn
	}

	log.Println("Database connections established and stored successfully")

}

func EstablishDBConnection(DBname string, params map[string]interface{}) (*sql.DB, error) {
	var dsn string

	switch DBname {
	case "PostgreSQL":
		host, ok := params["host"].(string)
		if !ok {
			return nil, fmt.Errorf("invalid type for host")
		}
		port, ok := params["port"].(float64)
		if !ok {
			return nil, fmt.Errorf("invalid type for port")
		}
		dbname, ok := params["database_name"].(string)
		if !ok {
			return nil, fmt.Errorf("invalid type for database_name")
		}
		user, ok := params["username"].(string)
		if !ok {
			return nil, fmt.Errorf("invalid type for username")
		}
		password, ok := params["password"].(string)
		if !ok {
			return nil, fmt.Errorf("invalid type for password")
		}
		dsn = fmt.Sprintf("host=%s port=%d dbname=%s user=%s password=%s sslmode=disable", host, int(port), dbname, user, password)
		return sql.Open("postgres", dsn)

	case "Snowflake":
		account, ok := params["account"].(string)
		if !ok {
			return nil, fmt.Errorf("invalid type for account")
		}
		user, ok := params["username"].(string)
		if !ok {
			return nil, fmt.Errorf("invalid type for username")
		}
		password, ok := params["password"].(string)
		if !ok {
			return nil, fmt.Errorf("invalid type for password")
		}
		warehouse, ok := params["warehouse"].(string)
		if !ok {
			return nil, fmt.Errorf("invalid type for warehouse")
		}
		dbname, ok := params["database"].(string)
		if !ok {
			return nil, fmt.Errorf("invalid type for database")
		}
		schema, ok := params["schema"].(string)
		if !ok {
			schema = ""
		}

		// Constructing the DSN using gosnowflake
		cfg, err := gosnowflake.DSN(&gosnowflake.Config{
			Account:   account,
			User:      user,
			Password:  password,
			Warehouse: warehouse,
			Database:  dbname,
			Schema:    schema,
		})

		if err != nil {
			log.Println("Error while DNS string: ", err)
			return nil, err
		}

		db, err := sql.Open("snowflake", cfg)
		if err != nil {
			log.Println("Error while open DB: ", err)
			return nil, err
		}
		// defer db.Close()

		return db, nil

	default:
		return nil, fmt.Errorf("unsupported database type: %s", DBname)
	}
}

func GetDBConnection(id int) *sql.DB {

	return DBConnections[id]

}

func SetDBConnection(conn models.Connection) error {

	var params map[string]interface{}
	if err := json.Unmarshal(conn.Params, &params); err != nil {
		log.Printf("failed to unmarshal connection params: %v", err)
		return err
	}

	dbConn, err := EstablishDBConnection(conn.ConnectionMaster.Name, params)
	if err != nil {
		log.Printf("failed to establish connection: %v", err)
		return err
	}

	DBConnections[conn.ID] = dbConn

	return nil

}

func RefreshConnection(ID int) models.Response {
	var response models.Response
	db, exists := DBConnections[ID]
	if !exists {
		log.Printf("No connection found for %d\n", ID)
		response.Code = http.StatusNotFound
		response.Message = fmt.Sprintf("No connection found for %d\n", ID)
		return response
	}

	fmt.Printf("Refreshing connection to %d...\n", ID)

	// Temporarily set MaxIdleConns to 0 to close idle connections
	db.SetMaxIdleConns(0)

	// Wait a bit to allow current idle connections to close
	time.Sleep(2 * time.Second)

	// Reset MaxIdleConns to allow new idle connections
	db.SetMaxIdleConns(500)

	fmt.Printf("Refreshed connection to %d\n", ID)

	response.Code = http.StatusOK
	response.Message = fmt.Sprintf("Refreshed connection to %d\n", ID)
	return response

}

func UnSetConnection(ID int) {
	delete(DBConnections, ID)
}

func GetConnectionMaster(ID int) (models.ConnectionMaster, error) {

	var connection models.ConnectionMaster

	db := database.DB

	// Fetch the connection by ID and ensure it is active
	if err := db.Where("id = ? AND status = ?", ID, 1).First(&connection).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			fmt.Println("Record not found:", err)
			return connection, err
		} else {
			fmt.Println("Error fetching connection:", err)
			return connection, err
		}
	}

	return connection, nil
}
