package handlers

import (
	cartdto "waysbuck/dto/cart"
	dto "waysbuck/dto/result"
	"waysbuck/models"
	"waysbuck/repositories"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)
var path_file_cart = "http://localhost:5000/uploads/"

type handlerCart struct {
	CartRepository repositories.CartRepository
}

func HandlerCart(CartRepository repositories.CartRepository) *handlerCart {
	return &handlerCart{CartRepository}
}

func (h *handlerCart) GetCart(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	cart, err := h.CartRepository.GetCart(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusBadRequest, Data: cart}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerCart) CartByTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	idTransaction := int(userInfo["idtransaction"].(float64))

	// var cart models.Cart
	cart, err := h.CartRepository.CartByTransaction(idTransaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	for i, p := range cart {
		cart[i].Product.Image = path_file_cart + p.Product.Image
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: cart}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerCart) CreateCart(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	idTransaction := int(userInfo["idtransaction"].(float64))

	request := new(cartdto.CartRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	validate := validator.New()
	err := validate.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	requestForm := models.Cart{
		ProductID:     request.ProductID,
		TransactionID: idTransaction,
		SubAmount:      request.SubAmount,
		ToppingID:     request.ToppingID,
	}

	validatee := validator.New()
	errr := validatee.Struct(requestForm)
	if errr != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	topping, _ := h.CartRepository.FindToppingsById(request.ToppingID)

	cart := models.Cart{
		ProductID:     request.ProductID,
		TransactionID: idTransaction,
		SubAmount:      request.SubAmount,
		Topping:       topping,
	}
    

	data, err := h.CartRepository.CreateCart(cart)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}
func (h *handlerCart) DeleteCart(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	cart, err := h.CartRepository.GetCart(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	data, err := h.CartRepository.DeleteCart(cart)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}