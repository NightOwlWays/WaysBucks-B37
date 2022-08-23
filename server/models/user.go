package models

import "time"

type User struct {
	ID           int                   		`json:"id"`
	FullName     string                		`json:"fullName" gorm:"type: varchar(255)"`
	Email        string                		`json:"email" gorm:"type: varchar(255)"`
	Password     string                		`json:"-" gorm:"type: varchar(255)"`
	PostCode	 string						`json:"postcode" gorm:"type: varchar(255)"`
	Address      string						`json:"address" gorm:"type: varchar(255)"`
	CreatedAt    time.Time             		`json:"-"`
	UpdatedAt    time.Time             		`json:"-"`
}

type UsersProfileResponse struct {
	ID   	 	 int     `json:"id"`
	FullName 	 string  `json:"fullName"`
	Email    	 string  `json:"email"`
	PostCode	 string	 `json:"postcode"`
	Address      string	 `json:"address"`
}

func (UsersProfileResponse) TableName() string {
	return "users"
}
