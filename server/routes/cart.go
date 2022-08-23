package routes

import (
	"waysbuck/handlers"
	"waysbuck/pkg/middleware"
	"waysbuck/pkg/mysql"
	"waysbuck/repositories"

	"github.com/gorilla/mux"
)

func CartRoutes(r *mux.Router) {
	cartRepository := repositories.RepositoryCart(mysql.DB)
	h := handlers.HandlerCart(cartRepository)

	r.HandleFunc("/cart/{id}", h.GetCart).Methods("GET")
	r.HandleFunc("/carts-id", middleware.Auth(h.CartByTransaction)).Methods("GET")
	r.HandleFunc("/cart", middleware.Auth(h.CreateCart)).Methods("POST")
	r.HandleFunc("/cart/{id}", middleware.Auth(h.DeleteCart)).Methods("DELETE")
}