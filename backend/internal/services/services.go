package services

import (
	"database/sql"
	"fmt"
)

// NetWorthService handles net worth calculations
type NetWorthService struct {
	db *sql.DB
}

// NewNetWorthService creates a new net worth service
func NewNetWorthService(db *sql.DB) *NetWorthService {
	return &NetWorthService{db: db}
}

// CalculateDailyNetWorth calculates net worth for a specific date
func (s *NetWorthService) CalculateDailyNetWorth(userID int, date string) (float64, float64, float64, error) {
	// Calculate total assets
	var totalAssets float64
	err := s.db.QueryRow(
		`SELECT COALESCE(SUM(balance), 0) FROM account_balances 
		 WHERE account_id IN (SELECT id FROM accounts WHERE user_id = $1 AND is_active = true) 
		 AND date = $2`,
		userID, date,
	).Scan(&totalAssets)
	if err != nil {
		return 0, 0, 0, fmt.Errorf("error calculating assets: %v", err)
	}

	// Calculate total liabilities (credit cards, loans)
	var totalLiabilities float64
	err = s.db.QueryRow(
		`SELECT COALESCE(SUM(ABS(balance)), 0) FROM account_balances 
		 WHERE account_id IN (SELECT id FROM accounts WHERE user_id = $1 AND account_type IN ('credit_card') AND is_active = true) 
		 AND date = $2`,
		userID, date,
	).Scan(&totalLiabilities)
	if err != nil {
		return 0, 0, 0, fmt.Errorf("error calculating liabilities: %v", err)
	}

	netWorth := totalAssets - totalLiabilities
	return totalAssets, totalLiabilities, netWorth, nil
}

// CashFlowService handles cash flow analysis
type CashFlowService struct {
	db *sql.DB
}

// NewCashFlowService creates a new cash flow service
func NewCashFlowService(db *sql.DB) *CashFlowService {
	return &CashFlowService{db: db}
}

// GetMonthlyCashFlow calculates monthly income and spending
func (s *CashFlowService) GetMonthlyCashFlow(userID int, year int, month int) (float64, float64, error) {
	// Calculate income (positive transactions)
	var income float64
	err := s.db.QueryRow(
		`SELECT COALESCE(SUM(amount), 0) FROM transactions 
		 WHERE account_id IN (SELECT id FROM accounts WHERE user_id = $1 AND is_active = true) 
		 AND amount > 0 
		 AND EXTRACT(YEAR FROM date) = $2 
		 AND EXTRACT(MONTH FROM date) = $3`,
		userID, year, month,
	).Scan(&income)
	if err != nil {
		return 0, 0, fmt.Errorf("error calculating income: %v", err)
	}

	// Calculate spending (negative transactions)
	var spending float64
	err = s.db.QueryRow(
		`SELECT COALESCE(ABS(SUM(amount)), 0) FROM transactions 
		 WHERE account_id IN (SELECT id FROM accounts WHERE user_id = $1 AND is_active = true) 
		 AND amount < 0 
		 AND EXTRACT(YEAR FROM date) = $2 
		 AND EXTRACT(MONTH FROM date) = $3`,
		userID, year, month,
	).Scan(&spending)
	if err != nil {
		return 0, 0, fmt.Errorf("error calculating spending: %v", err)
	}

	return income, spending, nil
}

// InvestmentService handles investment analysis
type InvestmentService struct {
	db *sql.DB
}

// NewInvestmentService creates a new investment service
func NewInvestmentService(db *sql.DB) *InvestmentService {
	return &InvestmentService{db: db}
}

// GetPortfolioValue calculates total portfolio value
func (s *InvestmentService) GetPortfolioValue(userID int) (float64, error) {
	var totalValue float64
	err := s.db.QueryRow(
		`SELECT COALESCE(SUM(market_value), 0) FROM holdings 
		 WHERE account_id IN (SELECT id FROM accounts WHERE user_id = $1 AND is_active = true)`,
		userID,
	).Scan(&totalValue)
	if err != nil {
		return 0, fmt.Errorf("error calculating portfolio value: %v", err)
	}
	return totalValue, nil
}

// GetAssetAllocation returns asset allocation breakdown
func (s *InvestmentService) GetAssetAllocation(userID int) (map[string]float64, error) {
	rows, err := s.db.Query(
		`SELECT asset_class, COALESCE(SUM(market_value), 0) as value 
		 FROM holdings 
		 WHERE account_id IN (SELECT id FROM accounts WHERE user_id = $1 AND is_active = true) 
		 GROUP BY asset_class`,
		userID,
	)
	if err != nil {
		return nil, fmt.Errorf("error getting asset allocation: %v", err)
	}
	defer rows.Close()

	allocation := make(map[string]float64)
	for rows.Next() {
		var assetClass string
		var value float64
		err := rows.Scan(&assetClass, &value)
		if err != nil {
			return nil, err
		}
		allocation[assetClass] = value
	}

	return allocation, rows.Err()
}

// InsightService generates insights from data
type InsightService struct {
	db *sql.DB
}

// NewInsightService creates a new insight service
func NewInsightService(db *sql.DB) *InsightService {
	return &InsightService{db: db}
}

// GenerateInsights generates actionable insights for a user
func (s *InsightService) GenerateInsights(userID int) ([]map[string]interface{}, error) {
	// Placeholder for deterministic insight generation
	// Will implement rules engine here
	insights := []map[string]interface{}{}
	return insights, nil
}
