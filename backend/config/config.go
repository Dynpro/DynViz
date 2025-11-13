package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type PostgresDBConfig struct {
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
}

func GetPostgresDBConfig() PostgresDBConfig {

	cwd, _ := os.Getwd()
	err := godotenv.Load(cwd + "/config/config.env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	return PostgresDBConfig{
		DBHost:     os.Getenv("DB_HOST"),
		DBPort:     os.Getenv("DB_PORT"),
		DBUser:     os.Getenv("DB_USER"),
		DBPassword: os.Getenv("DB_PASSWORD"),
		DBName:     os.Getenv("DB_NAME"),
	}
}

func (c PostgresDBConfig) PostgresDBConnectionString() string {
	return fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
		c.DBHost, c.DBPort, c.DBUser, c.DBName, c.DBPassword)
}
