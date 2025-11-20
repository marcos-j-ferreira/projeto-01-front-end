package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"
	"time"

	"log"
)

// Variáveis globais
var (
	mu      sync.Mutex
	counter int
	values  []int
)

func main() {
	// inicia o agregador
	go startAggregator()

	// cria o mux
	mux := http.NewServeMux()
	mux.HandleFunc("/inc", incrementHandler)
	mux.HandleFunc("/values", valuesHandler)

	// aplica o middleware de CORS
	//handlerWithCORS := enableCORS(mux)

	fmt.Println("Server on :8080")
	http.ListenAndServe(":8080", nil)
}

// Middleware para ativar CORS
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// libera tudo
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

		// lida com preflight OPTIONS
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}


var (
	reqSet int
	reqGet int
) 

// /inc → incrementa o contador atual
func incrementHandler(w http.ResponseWriter, r *http.Request) {

	reqSet++
	log.Printf("Requisição: %d, Method: SET", reqSet)

	mu.Lock()
	counter++
	mu.Unlock()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

// /values → retorna histórico de valores
func valuesHandler(w http.ResponseWriter, r *http.Request) {

	reqGet++
	log.Printf("Requisição: %d, Method: GET", reqGet)

	mu.Lock()
	defer mu.Unlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(values)
}

// A cada 5 segundos salva o contador e zera
func startAggregator() {
	ticker := time.NewTicker(5 * time.Second)

	for range ticker.C {
		mu.Lock()
		values = append(values, counter)
		counter = 0
		mu.Unlock()
	}
}
