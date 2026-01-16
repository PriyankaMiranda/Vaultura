package main

import (
	"database/sql"
	"fmt"
)

// User represents a user in the system
type User struct {
	ID        int
	Email     string
	Password  string
	CreatedAt string
	UpdatedAt string
}

// Account represents a financial account
type Account struct {
	ID            int
	UserID        int
	Name          string
	AccountType   string // checking, savings, credit_card, retirement, investment, manual
	Institution   string // chase, bank_of_america, fidelity, manual
	AccountNumber string
	PlaidID       string
	IsActive      bool
	IsEncrypted   bool
	CreatedAt     string
	UpdatedAt     string
}

// AccountBalance represents a balance snapshot
type AccountBalance struct {
	ID        int
	AccountID int
	Balance   float64
	Currency  string
	Date      string
	CreatedAt string
}

// Transaction represents a single transaction
type Transaction struct {
	ID          int
	AccountID   int
	ExternalID  string
	Description string
	Amount      float64
	Date        string
	Category    string
	IsPending   bool
	CreatedAt   string
	UpdatedAt   string
}

// Holding represents an investment holding
type Holding struct {
	ID           int
	AccountID    int
	Symbol       string
	Name         string
	Quantity     float64
	CostBasis    float64
	MarketValue  float64
	AssetClass   string
	Sector       string
	Country      string
	Date         string
	CreatedAt    string
	UpdatedAt    string
}

// NetWorthSnapshot represents a daily net worth calculation
type NetWorthSnapshot struct {
	ID              int
	UserID          int
	TotalAssets     float64
	TotalLiabilities float64
	NetWorth        float64
	Date            string
	CreatedAt       string
}

// CashPosition represents cash in an account
type CashPosition struct {
	ID        int
	AccountID int
	Amount    float64
	Date      string
	CreatedAt string
}

// Dividend represents a dividend or distribution
type Dividend struct {
	ID          int
	AccountID   int
	Symbol      string
	Amount      float64
	Date        string
	PaymentDate string
	CreatedAt   string
}

// AccountConnection represents a connected financial institution
type AccountConnection struct {
	ID           int
	UserID       int
	Institution  string
	AccessToken  string
	IsEncrypted  bool
	LastSynced   string
	CreatedAt    string
	UpdatedAt    string
}

// GetUserByEmail retrieves a user by email
func GetUserByEmail(db *sql.DB, email string) (*User, error) {
	var user User
	err := db.QueryRow("SELECT id, email, password_hash, created_at, updated_at FROM users WHERE email = $1", email).
		Scan(&user.ID, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user not found")
		}
		return nil, err
	}
	return &user, nil
}

// CreateUser creates a new user
func CreateUser(db *sql.DB, email, passwordHash string) (*User, error) {
	var id int
	err := db.QueryRow(
		"INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
		email, passwordHash,
	).Scan(&id)
	if err != nil {
		return nil, err
	}

	user := &User{
		ID:    id,
		Email: email,
	}
	return user, nil
}

// GetAccountsByUserID retrieves all accounts for a user
func GetAccountsByUserID(db *sql.DB, userID int) ([]Account, error) {
	rows, err := db.Query(
		"SELECT id, user_id, name, account_type, institution, account_number, plaid_account_id, is_active, is_encrypted, created_at, updated_at FROM accounts WHERE user_id = $1 AND is_active = true ORDER BY created_at DESC",
		userID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var accounts []Account
	for rows.Next() {
		var acc Account
		err := rows.Scan(&acc.ID, &acc.UserID, &acc.Name, &acc.AccountType, &acc.Institution, &acc.AccountNumber, &acc.PlaidID, &acc.IsActive, &acc.IsEncrypted, &acc.CreatedAt, &acc.UpdatedAt)
		if err != nil {
			return nil, err
		}
		accounts = append(accounts, acc)
	}

	return accounts, rows.Err()
}

// GetLatestNetWorthSnapshot retrieves the latest net worth snapshot
func GetLatestNetWorthSnapshot(db *sql.DB, userID int) (*NetWorthSnapshot, error) {
	var snapshot NetWorthSnapshot
	err := db.QueryRow(
		"SELECT id, user_id, total_assets, total_liabilities, net_worth, date, created_at FROM net_worth_snapshots WHERE user_id = $1 ORDER BY date DESC LIMIT 1",
		userID,
	).Scan(&snapshot.ID, &snapshot.UserID, &snapshot.TotalAssets, &snapshot.TotalLiabilities, &snapshot.NetWorth, &snapshot.Date, &snapshot.CreatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &snapshot, nil
}
