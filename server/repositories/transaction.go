package repositories

import (
	"waysbuck/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	GetTransaction(ID int) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	FindTransactions() ([]models.Transaction, error)
	GetOneTransaction(ID string) (models.Transaction, error)
	UpdateNewTransaction(status string, ID string) (error)
	GetEmailTransaction(ID string) (models.Transaction, error)
	GetUserTransaction(ID int) ([]models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("Carts").Preload("Carts.Product").Preload("Carts.Topping").Find(&transactions).Error
	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Carts").Preload("Carts.Product").Preload("Carts.Topping").Find(&transaction, ID).Error
	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error

	return transaction, err
}

func (r *repository) GetEmailTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Carts").Preload("Carts.Product").Preload("Carts.Topping").Preload("User").First(&transaction, "id = ?", ID).Error

	return transaction, err
}

func (r *repository) GetUserTransaction(UserID int) ([]models.Transaction, error) {
	var user []models.Transaction
	err := r.db.Debug().Preload("User").Preload("Carts").Preload("Carts.Product").Preload("Carts.Topping").Find(&user, "user_id  = ?", UserID).Error

	return user, err
}

func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Carts").Preload("Carts.Product").Preload("Carts.Topping").Preload("User").First(&transaction, "id = ?", ID).Error

	return transaction, err
}

func (r *repository) UpdateNewTransaction(status string, ID string) (error) {
var transaction models.Transaction
r.db.Preload("Cart").First(&transaction, ID)

if status != transaction.Status && status == "success" {
	// var cart models.Cart
	// r.db.First(&Cart, transaction.ID)
	// // product.Qty = product.Qty - 1
	// r.db.Save(&Cart)
}

transaction.Status = status

err := r.db.Save(&transaction).Error

return err
}




