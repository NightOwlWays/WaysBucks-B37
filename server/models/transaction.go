package models

import "time"

type Transaction struct {
	ID             int                	     `json:"id" gorm:"primary_key:auto_increment"`
	UserID   	   int                 		 `json:"user_id"`
	User     	   UsersProfileResponse 	 `json:"user"`
	Carts          []Cart         			 `json:"carts"`
	Amount    	   int               	     `json:"amount"`
	Qty			   int						 `json:"qty"`
	Status         string           	     `json:"status" gorm:"type:varchar(25)"`
	CreatedAt      time.Time          	     `json:"-"`
	UpdatedAt      time.Time            	 `json:"-"`
}


type TransactionResponse struct {
	ID   	 int    `json:"id"`
	UserID  int    `json:"user_id"`
}

type TransactionUserResponse struct {
	ID   	 	   int    			`json:"id"`
	Amount    	   int              `json:"Amount"`
	Status         string           `json:"status"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}

func (TransactionUserResponse) TableName() string {
	return "transactions"
}