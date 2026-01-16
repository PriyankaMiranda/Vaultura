# Vaultura - Personal Finance :smile:

Minimalist personal finance app that gives you one source of truth for net worth, cash flow, and investments.

## Tech Stack

- **Backend**: Go 1.22
- **Database**: PostgreSQL 16
- **Frontend**: React 18 with Recharts for visualizations
- **Infrastructure**: Docker & Docker Compose


## Project Structure

```
vaultura/
├── backend/                 # Go HTTP server
│   ├── cmd/server/          # Application entrypoint
│   ├── internal/
│   │   ├── models/          # Data models
│   │   ├── handlers/        # HTTP request handlers
│   │   ├── services/        # Business logic
│   │   └── db/              # Database utilities
│   ├── migrations/          # SQL migrations
│   ├── .env.example         # Environment variables template
│   ├── Dockerfile           # Container image
│   └── go.mod               # Go dependencies
├── frontend/                # React application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utilities (API, formatting, etc.)
│   │   ├── App.js           # Root component
│   │   └── index.js         # Entry point
│   ├── Dockerfile           # Container image
│   └── package.json         # Node dependencies
├── docker-compose.yml       # Local development stack
└── docs/                    # Documentation
```

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node 18+ (for local frontend development)
- Go 1.22 (for local backend development)

### Development with Docker Compose

```bash
docker-compose up
```

This will:
1. Start PostgreSQL on `localhost:5432`
2. Initialize the database schema
3. Run the backend on `localhost:8080`
4. Run the frontend on `localhost:3000`

Access the app at `http://localhost:3000`

### Local Development

**Backend:**
```bash
cd backend
go mod download
cp .env.example .env
go run cmd/server/main.go
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## API Documentation

### Authentication
JWT-based authentication. All endpoints except `/health` and `/auth/*` require Bearer token.

### Core Endpoints (MVP)

#### Accounts
- `GET /api/accounts` - List user accounts
- `POST /api/accounts` - Create manual account
- `GET /api/accounts/{id}` - Get account details
- `DELETE /api/accounts/{id}` - Delete account

#### Net Worth
- `GET /api/net-worth/current` - Current net worth snapshot
- `GET /api/net-worth/history?period=1m|3m|6m|ytd|all` - Net worth trend
- `GET /api/net-worth/breakdown` - Asset vs liability breakdown

#### Transactions
- `GET /api/accounts/{id}/transactions` - Transaction history
- `GET /api/accounts/{id}/transactions?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD` - Date range

#### Investments
- `GET /api/investments/portfolio` - Complete portfolio view
- `GET /api/investments/allocation` - Asset allocation breakdown
- `GET /api/investments/performance?benchmark=SPY` - Performance vs benchmark
- `GET /api/investments/holdings/{account_id}` - Account holdings

#### Insights
- `GET /api/insights` - All active insights
- `GET /api/insights/{id}` - Single insight details

#### Cash Flow
- `GET /api/cash-flow/monthly` - Monthly income/spending analysis
- `GET /api/cash-flow/averages?period=3m|6m` - Rolling averages
- `GET /api/cash-flow/burn-rate` - Monthly burn rate

## Database Schema

See `backend/migrations/001_init_schema.sql` for complete schema.

Key tables:
- `users` - Single user (extensible for multi-user)
- `accounts` - Bank/investment accounts
- `account_balances` - Daily balance snapshots
- `transactions` - Transactions from all accounts
- `holdings` - Investment positions
- `net_worth_snapshots` - Daily net worth data
- `dividends` - Dividend/distribution tracking
- `audit_logs` - Compliance and security logging

## Security

- ✓ No credential storage (tokens only, encrypted)
- ✓ Encryption at rest for sensitive data
- ✓ HTTPS in production
- ✓ JWT authentication
- ✓ Environment variable isolation
- ✓ Audit logging for all data access
- ✓ Manual account disconnect capability
- ✓ Full data deletion on request

## Data Integrations

### Currently Supported
- Manual data entry for non-connected accounts
- CSV imports (planned)

### Planned Integrations
- Plaid (bank & investment accounts)
- Fidelity API (retirement & brokerage)
- Custom connectors

## Features (MVP)

### ✓ Net Worth Engine
- Daily snapshots
- Asset vs liability breakdown
- Trend analysis (1M, 3M, 6M, YTD, All)
- Contribution vs growth separation

### ✓ Cash Flow Intelligence
- Monthly income/spending analysis
- Rolling 3- and 6-month averages
- Fixed vs discretionary detection
- Burn rate calculation
- Savings rate analysis

### ✓ Investment Analysis
- Asset allocation (stocks/bonds/cash)
- Geographic & sector exposure
- Account-level and portfolio-level views
- Cost basis vs market value
- Unrealized gains/losses
- Dividend tracking
- Returns: TWR, MWR, vs benchmark

### ✓ Insights Dashboard
- Rules-based, deterministic insights
- Explainable recommendations
- Traceable to source data

### ✓ UX
- Minimalist, dense design
- Data-first, charts second
- All data exportable as CSV
- Keyboard-friendly navigation
- Mobile-responsive

## Roadmap

**Phase 1 (MVP)**: Core net worth + accounts + basic insights
**Phase 2**: Investment analysis + Plaid integration
**Phase 3**: Advanced insights + performance attribution
**Phase 4**: Multi-currency support + reporting

## Development

### Running Tests
```bash
# Backend
cd backend
go test ./...

# Frontend
cd frontend
npm test
```

### Code Style
- Go: Standard library conventions
- React: ESLint + Prettier (when configured)
- SQL: Standard formatting in migrations

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vaultura
DB_USER=postgres
DB_PASSWORD=postgres

# Server
SERVER_PORT=8080
SERVER_ENV=development

# Security
ENCRYPTION_KEY=your-32-char-key
JWT_SECRET=your-32-char-secret
```

## Contributing

This is a personal project. If you fork it, maintain security practices:
- Never commit credentials
- Test before deploying
- Keep dependencies updated

## License

Personal use. See LICENSE file.

## Support

For issues, open a GitHub issue with:
- Description of problem
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, versions)
