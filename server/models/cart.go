package models

import "time"

type Cart struct {
	ID            int                   `json:"id" gorm:"primary_key:auto_increment"`
	SubAmount 	  int                   `json:"subamount" form:"subamount" gorm:"type: int"`
	Qty        	  int                   `json:"qty" form:"qty"`
	TransactionID int 					`json:"transaction_id" form:"transaction_id"`
	Transaction   TransactionResponse 	`json:"transaction"`
	ProductID     int                   `json:"product_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Product   	  ProductResponse       `json:"product" `
	Topping    	  []Topping             `json:"topping" gorm:"many2many:cart_topping;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	ToppingID     []int                 `json:"topping_id" form:"topping_id" gorm:"-"`
	CreatedAt     time.Time             `json:"-"`
	UpdatedAt     time.Time             `json:"-"`
	// UserID     int                   `json:"user_id" form:"user_id"`
	// User       UsersProfileResponse  `json:"user"`
}

type CartResponse struct {
	ID            int                   `json:"id"` 
	SubAmount     int                   `json:"subamount"`
	Qty        	  int                   `json:"qty"`
	TransactionID int 					`"-"`
	Transaction   TransactionResponse   `json:"transaction"  gorm:"foreignKey:TransactionID"`
	ProductID     int                   `json:"product_id"`
	Product       ProductResponse       `json:"product"`
	Topping    	  []Topping             `json:"topping" gorm:"many2many:cart_topping"`
	ToppingID     []int                 `json:"topping_id" form:"topping_id" gorm:"-"`
}

func (CartResponse) TableName() string {
	return "carts"
}