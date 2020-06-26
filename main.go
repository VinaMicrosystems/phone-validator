package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/cheekybits/genny/generic"
	"github.com/nyaruka/phonenumbers"
)

type body generic.Type

type errorResponse struct {
	Message string `json:"message"`
	Error   string `json:"error"`
}

type successResponse struct {
	NationalNumber         uint64 `json:"national_number"`
	CountryCode            int32  `json:"country_code"`
	IsPossible             bool   `json:"is_possible"`
	IsValid                bool   `json:"is_valid"`
	InternationalFormatted string `json:"international_formatted"`
	NationalFormatted      string `json:"national_formatted"`
	Version                string `json:"version"`
}

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("PORT NOT SET")
	}

	http.HandleFunc("/api", indexHandler)

	log.Fatal(http.ListenAndServe(":"+port, nil))

}

func corsHandler(h http.Handler) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			//handle preflight in here
		} else {
			h.ServeHTTP(w, r)
		}
	}
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func indexHandler(w http.ResponseWriter, req *http.Request) {

	setupResponse(&w, req)
	if (*req).Method == "OPTIONS" {
		return
	}
	// phone param
	phone := req.URL.Query().Get("phone")
	// country param
	country := req.URL.Query().Get("country")

	if phone == "" {
		http.Error(w, "Missing phone number", 400)
		return
	}

	metadata, err := phonenumbers.Parse(phone, country)

	if err != nil {
		http.Error(w, "Error parsing phone", 500)
		return
	}
	response := successResponse{
		NationalNumber: *metadata.NationalNumber,
		CountryCode:    *metadata.CountryCode,
		IsPossible:     phonenumbers.IsPossibleNumber(metadata),
		IsValid:        phonenumbers.IsValidNumber(metadata),

		InternationalFormatted: phonenumbers.Format(metadata, phonenumbers.INTERNATIONAL),
		NationalFormatted:      phonenumbers.Format(metadata, phonenumbers.NATIONAL),
		Version:                "debug",
	}
	js, err := json.Marshal(response)

	if err != nil {
		http.Error(w, "Internal server Error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(200)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)

}
