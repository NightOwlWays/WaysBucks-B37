package routes

import (
	"waysbuck/handlers"
	"waysbuck/pkg/middleware"
	"waysbuck/pkg/mysql"
	"waysbuck/repositories"

	"github.com/gorilla/mux"
)

func TransactionRoutes(r *mux.Router) {
	profileRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(profileRepository)

	r.HandleFunc("/transaction/{id}", h.GetTransaction).Methods("GET")
	r.HandleFunc("/transaction", middleware.Auth(h.UpdateTransaction)).Methods("PATCH")
	r.HandleFunc("/transactions", middleware.Auth(h.FindTransactions)).Methods("GET")
	r.HandleFunc("/notification", h.Notification).Methods("POST")
	r.HandleFunc("/user-transaction", middleware.Auth(h.GetUserTransaction)).Methods("GET")
}
