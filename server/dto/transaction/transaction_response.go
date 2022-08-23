package transactiondto

import "waysbuck/models"

type TransactionResponse struct {
	ID      int                         `json:"id" gorm:"primary_key:auto_increment"`
	UserID  int                         `json:"user_id"`
	User    models.UsersProfileResponse `json:"user"`
	Cart    []models.CartResponse       `json:"order"`
}

type UpdateTransaction struct {
	UserID int    `json:"user_id" form:"user_id"`
	Status string `json:"status"`
	Amount int    `json:"amount"`
	Qty			   int						 `json:"qty"`
}