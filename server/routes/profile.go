package routes

import (
	"waysbuck/handlers"
	"waysbuck/pkg/mysql"
	"waysbuck/repositories"

	"github.com/gorilla/mux"
)

func ProfileRoutes(r *mux.Router) {
	profileRepository := repositories.RepositoryProfile(mysql.DB)
	h := handlers.HandlerProfile(profileRepository)

	r.HandleFunc("/profile/{id}", h.GetProfile).Methods("GET")
}
