package handlers

import (
	"encoding/json"
	"net/http"
)

// Response wraps all API responses
type Response struct {
	Data interface{} `json:"data,omitempty"`
	Error interface{} `json:"error,omitempty"`
	Meta  Meta        `json:"meta"`
}

// Meta contains response metadata
type Meta struct {
	Timestamp string `json:"timestamp"`
	Version   string `json:"version"`
}

// ErrorResponse is the structure of error responses
type ErrorResponse struct {
	Code    string      `json:"code"`
	Message string      `json:"message"`
	Details interface{} `json:"details,omitempty"`
}

// WriteJSON writes a JSON response
func WriteJSON(w http.ResponseWriter, status int, data interface{}, err interface{}, meta Meta) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	response := Response{
		Data:  data,
		Error: err,
		Meta:  meta,
	}

	json.NewEncoder(w).Encode(response)
}

// WriteError writes an error response
func WriteError(w http.ResponseWriter, status int, code, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	errorResp := ErrorResponse{
		Code:    code,
		Message: message,
	}

	response := Response{
		Error: errorResp,
		Meta: Meta{
			Timestamp: "2024-01-16T00:00:00Z",
			Version:   "1.0",
		},
	}

	json.NewEncoder(w).Encode(response)
}

// HealthHandler returns server health status
func HealthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		WriteError(w, http.StatusMethodNotAllowed, "METHOD_NOT_ALLOWED", "Method not allowed")
		return
	}

	WriteJSON(w, http.StatusOK, map[string]string{"status": "healthy"}, nil, Meta{
		Timestamp: "2024-01-16T00:00:00Z",
		Version:   "1.0",
	})
}
