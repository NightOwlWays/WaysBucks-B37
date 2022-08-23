package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	UserRoutes(r)
	ProfileRoutes(r)
	ProductRoutes(r)
	ToppingRoutes(r)
	AuthRoutes(r)
	TransactionRoutes(r)
	CartRoutes(r)
}
