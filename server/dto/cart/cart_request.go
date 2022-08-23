package cartdto

type CartRequest struct {
	SubAmount	 	int	`json:"subamount" form:"subamount"`
	ProductID    	int    `json:"product_id" form:"product_id"`
	ToppingID   	[]int  `json:"topping_id" form:"topping_id" gorm:"type: int"`
	TransactionID   int    `json:"transaction_id" form:"transaction_id"`
}