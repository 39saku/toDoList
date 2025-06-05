package models

import "gorm.io/gorm"

type Todo struct {
	*gorm.Model
	Content string
	done    bool
}

type DBConfig struct {
	User     string
	Password string
	Host     string
	Port     int
	Table    string
}
