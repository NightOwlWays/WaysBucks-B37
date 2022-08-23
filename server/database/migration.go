package database

import (
	"fmt"
	"waysbuck/models"
	"waysbuck/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Profile{},
		&models.Product{},
		&models.Topping{},
		&models.Transaction{},
		&models.Cart{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}