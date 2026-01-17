// Monthly cash flow data
export const mockCashFlow = [
  { month: 'Nov', income: 8300, spending: 4100 },
  { month: 'Dec', income: 8500, spending: 5200 },
  { month: 'Jan', income: 8500, spending: 4050 }
];

// Bank accounts
export const mockAccounts = [
  {
    id: 'acc_1',
    name: 'Chase Checking',
    type: 'checking',
    institution: 'Chase Bank',
    balance: 12750.32,
    currency: 'USD',
    lastUpdated: '2024-01-15',
    icon: '🏦'
  },
  {
    id: 'acc_2',
    name: 'Chase Savings',
    type: 'savings',
    institution: 'Chase Bank',
    balance: 45200.50,
    currency: 'USD',
    lastUpdated: '2024-01-15',
    icon: '💰'
  },
  {
    id: 'acc_3',
    name: 'Fidelity Brokerage',
    type: 'investment',
    institution: 'Fidelity Investments',
    balance: 185420.75,
    currency: 'USD',
    lastUpdated: '2024-01-15',
    icon: '📈'
  },
  {
    id: 'acc_4',
    name: 'Chase Credit Card',
    type: 'credit_card',
    institution: 'Chase Bank',
    balance: -3450.28,
    creditLimit: 25000,
    currency: 'USD',
    lastUpdated: '2024-01-15',
    icon: '💳'
  }
];

// Spending by category
export const mockSpendingByCategory = [
  { category: 'Housing', amount: 1800, pct: 44.5 },
  { category: 'Food', amount: 650, pct: 16.0 },
  { category: 'Transport', amount: 350, pct: 8.6 },
  { category: 'Utilities', amount: 280, pct: 6.9 },
  { category: 'Entertainment', amount: 420, pct: 10.4 },
  { category: 'Shopping', amount: 300, pct: 7.4 },
  { category: 'Other', amount: 250, pct: 6.2 }
];

// Portfolio performance
export const mockPortfolioPerformance = [
  { date: 'Jan 1', portfolio: 100, benchmark: 100 },
  { date: 'Jan 3', portfolio: 101.2, benchmark: 100.8 },
  { date: 'Jan 5', portfolio: 102.1, benchmark: 101.5 },
  { date: 'Jan 8', portfolio: 101.8, benchmark: 101.2 },
  { date: 'Jan 10', portfolio: 103.2, benchmark: 102.0 },
  { date: 'Jan 12', portfolio: 104.5, benchmark: 103.1 },
  { date: 'Jan 15', portfolio: 105.2, benchmark: 103.8 },
  { date: 'Jan 16', portfolio: 106.8, benchmark: 104.2 }
];

// Holdings with more data
export const mockAllHoldings = [
  {
    account: 'Fidelity Brokerage',
    holdings: [
      {
        symbol: 'VTSAX',
        name: 'Vanguard Total Stock Market',
        quantity: 100.5,
        price: 250.00,
        value: 25125.00,
        cost_basis: 22000.00,
        unrealized_gains: 3125.00,
        gains_pct: 14.2,
        asset_class: 'stocks',
        sector: 'Mixed'
      },
      {
        symbol: 'VTI',
        name: 'Vanguard Total Stock Market ETF',
        quantity: 45.2,
        price: 245.00,
        value: 11074.00,
        cost_basis: 10500.00,
        unrealized_gains: 574.00,
        gains_pct: 5.5,
        asset_class: 'stocks',
        sector: 'Mixed'
      }
    ]
  },
  {
    account: 'Fidelity 401k',
    holdings: [
      {
        symbol: 'FXAIX',
        name: 'Fidelity US Large Cap Index',
        quantity: 250,
        price: 300.00,
        value: 75000.00,
        cost_basis: 70000.00,
        unrealized_gains: 5000.00,
        gains_pct: 7.1,
        asset_class: 'stocks',
        sector: 'Large Cap'
      },
      {
        symbol: 'FXNAX',
        name: 'Fidelity US Bond Index',
        quantity: 300,
        price: 50.00,
        value: 15000.00,
        cost_basis: 14800.00,
        unrealized_gains: 200.00,
        gains_pct: 1.35,
        asset_class: 'bonds',
        sector: 'Bonds'
      }
    ]
  }
];

// Investment insights
export const mockInvestmentInsights = [
  {
    id: 'inv_001',
    title: 'High equity allocation',
    message: 'Your portfolio is 85% equities. Consider rebalancing to 70/30 or 80/20.',
    severity: 'warning',
    actionable: true
  },
  {
    id: 'inv_002',
    title: 'Outperforming S&P 500',
    message: 'Your portfolio returned 6.8% vs S&P 500 at 4.2%. Excellent performance!',
    severity: 'info',
    actionable: false
  },
  {
    id: 'inv_003',
    title: 'Dividend opportunity',
    message: 'You received $342 in dividends this month. Consider reinvesting.',
    severity: 'info',
    actionable: true
  },
  {
    id: 'inv_004',
    title: 'Tax loss harvesting',
    message: 'You have $1,200 in unrealized losses. Consider tax loss harvesting.',
    severity: 'warning',
    actionable: true
  }
];

// Financial news
export const mockNews = [
  {
    id: 1,
    title: 'Fed Maintains Interest Rates Steady',
    summary: 'The Federal Reserve kept rates at 5.25%-5.50%, signaling a pause in hiking.',
    source: 'Bloomberg',
    date: '2024-01-16',
    category: 'economy',
    relevance: 'Your bond portfolio may benefit from stable rates.',
    image: '📈'
  },
  {
    id: 2,
    title: 'Tech Stocks Rally on AI Optimism',
    summary: 'Major tech stocks surged 3.2% on strong AI growth expectations.',
    source: 'Reuters',
    date: '2024-01-15',
    category: 'stocks',
    relevance: 'Your tech holdings outperformed the broader market.',
    image: '💻'
  },
  {
    id: 3,
    title: 'S&P 500 Reaches New All-Time High',
    summary: 'The S&P 500 index closed at 4,789, setting a new record.',
    source: 'CNBC',
    date: '2024-01-15',
    category: 'market',
    relevance: 'Your diversified portfolio tracked this positive movement.',
    image: '📊'
  },
  {
    id: 4,
    title: 'Inflation Cools to 3.1% YoY',
    summary: 'Consumer prices rose 3.1% year-over-year, down from 3.4% last month.',
    source: 'Federal Reserve',
    date: '2024-01-14',
    category: 'economy',
    relevance: 'Lower inflation supports equity valuations.',
    image: '📉'
  },
  {
    id: 5,
    title: 'Corporate Earnings Beat Expectations',
    summary: '78% of S&P 500 companies beat earnings estimates in Q4.',
    source: 'FactSet',
    date: '2024-01-14',
    category: 'stocks',
    relevance: 'Strong earnings support continued market gains.',
    image: '💰'
  }
];

// More detailed transactions
export const mockDetailedTransactions = [
  { id: 1, date: '2024-01-16', description: 'AMAZON PRIME', amount: -15.00, category: 'subscriptions', account: 'Chase Checking' },
  { id: 2, date: '2024-01-16', description: 'WHOLE FOODS MARKET', amount: -85.50, category: 'groceries', account: 'Chase Sapphire' },
  { id: 3, date: '2024-01-15', description: 'STRIPE SALARY DEPOSIT', amount: 8500.00, category: 'income', account: 'Chase Checking' },
  { id: 4, date: '2024-01-15', description: 'ELECTRIC UTILITY CO', amount: -120.00, category: 'utilities', account: 'Chase Checking' },
  { id: 5, date: '2024-01-14', description: 'STARBUCKS COFFEE', amount: -6.45, category: 'food', account: 'Chase Sapphire' },
  { id: 6, date: '2024-01-14', description: 'TARGET STORE', amount: -45.30, category: 'shopping', account: 'Chase Sapphire' },
  { id: 7, date: '2024-01-14', description: 'LYFT RIDE', amount: -18.75, category: 'transport', account: 'Chase Sapphire' },
  { id: 8, date: '2024-01-13', description: 'NETFLIX SUBSCRIPTION', amount: -15.99, category: 'entertainment', account: 'Chase Checking' },
  { id: 9, date: '2024-01-13', description: 'WHOLE FOODS MARKET', amount: -62.80, category: 'groceries', account: 'Chase Sapphire' },
  { id: 10, date: '2024-01-12', description: 'RENT PAYMENT', amount: -1800.00, category: 'housing', account: 'Chase Checking' }
];

// Settings data
export const mockUserSettings = {
  email: 'user@example.com',
  name: 'Your Name',
  currency: 'USD',
  theme: 'light',
  notifications: {
    emailAlerts: true,
    dailyDigest: true,
    largeTransactions: true,
    milestones: true
  },
  preferences: {
    chartType: 'line',
    dataGranularity: 'daily',
    benchmarkIndex: 'SPY'
  }
};

// Connected accounts
export const mockConnectedAccounts = [
  { id: 1, institution: 'Chase', status: 'connected', lastSync: '2024-01-16', accounts: 2 },
  { id: 2, institution: 'Fidelity', status: 'connected', lastSync: '2024-01-16', accounts: 2 },
  { id: 3, institution: 'Bank of America', status: 'disconnected', lastSync: '2024-01-10', accounts: 0 }
];
