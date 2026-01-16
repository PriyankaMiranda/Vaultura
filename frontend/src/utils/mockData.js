// Mock data for development/demo purposes
export const mockNetWorth = {
  date: new Date().toISOString().split('T')[0],
  net_worth: 287500.00,
  assets: 325000.00,
  liabilities: 37500.00,
  change_1d: 2150.00,
  change_1d_pct: 0.75,
  change_30d: 8500.00,
  change_30d_pct: 3.05,
  change_ytd: 12750.00,
  change_ytd_pct: 4.64
};

export const mockNetWorthHistory = [
  { date: '2024-01-01', value: 265000 },
  { date: '2024-01-05', value: 268500 },
  { date: '2024-01-10', value: 271200 },
  { date: '2024-01-15', value: 274800 },
  { date: '2024-01-16', value: 287500 }
];

export const mockAssetAllocation = {
  stocks: { value: 185000, pct: 64.2 },
  bonds: { value: 75000, pct: 26.0 },
  cash: { value: 27500, pct: 9.5 },
  crypto: { value: 0, pct: 0 }
};

export const mockAccounts = [
  {
    id: 1,
    name: 'Chase Checking',
    type: 'checking',
    balance: 12500,
    institution: 'chase'
  },
  {
    id: 2,
    name: 'Chase Savings',
    type: 'savings',
    balance: 45000,
    institution: 'chase'
  },
  {
    id: 3,
    name: 'Fidelity 401k',
    type: 'retirement',
    balance: 185000,
    institution: 'fidelity'
  },
  {
    id: 4,
    name: 'Chase Sapphire Credit Card',
    type: 'credit_card',
    balance: -2500,
    institution: 'chase'
  },
  {
    id: 5,
    name: 'Fidelity Brokerage',
    type: 'investment',
    balance: 80000,
    institution: 'fidelity'
  }
];

export const mockTransactions = [
  {
    id: 1,
    description: 'AMAZON PRIME',
    amount: -15.00,
    date: '2024-01-16',
    category: 'subscriptions'
  },
  {
    id: 2,
    description: 'WHOLE FOODS',
    amount: -85.50,
    date: '2024-01-15',
    category: 'groceries'
  },
  {
    id: 3,
    description: 'STRIPE SALARY',
    amount: 8500.00,
    date: '2024-01-15',
    category: 'income'
  },
  {
    id: 4,
    description: 'ELECTRIC UTILITY',
    amount: -120.00,
    date: '2024-01-14',
    category: 'utilities'
  },
  {
    id: 5,
    description: 'STARBUCKS',
    amount: -6.45,
    date: '2024-01-14',
    category: 'coffee'
  }
];

export const mockInsights = [
  {
    id: 'insight_001',
    title: 'Strong savings rate',
    message: 'You saved 65% of your income this month. Keep it up!',
    severity: 'info',
    category: 'savings'
  },
  {
    id: 'insight_002',
    title: 'Portfolio well-diversified',
    message: 'Your asset allocation is well-balanced. 64% stocks, 26% bonds.',
    severity: 'info',
    category: 'allocation'
  },
  {
    id: 'insight_003',
    title: 'Net worth milestone',
    message: 'You hit $287.5K net worth! You\'re 5% of the way to $3M.',
    severity: 'info',
    category: 'milestone'
  }
];

export const mockHoldings = [
  {
    symbol: 'VTSAX',
    name: 'Vanguard Total Stock Market',
    quantity: 100.5,
    price: 250.00,
    value: 25125.00,
    cost_basis: 22000.00,
    unrealized_gains: 3125.00,
    gains_pct: 14.2,
    asset_class: 'stocks'
  },
  {
    symbol: 'BND',
    name: 'Vanguard Total Bond Market',
    quantity: 75.2,
    price: 80.00,
    value: 6016.00,
    cost_basis: 5800.00,
    unrealized_gains: 216.00,
    gains_pct: 3.7,
    asset_class: 'bonds'
  }
];

// Utility function to get mock data based on endpoint
export const getMockData = (endpoint) => {
  const endpoints = {
    '/api/v1/net-worth/current': mockNetWorth,
    '/api/v1/net-worth/history': mockNetWorthHistory,
    '/api/v1/investments/allocation': mockAssetAllocation,
    '/api/v1/accounts': mockAccounts,
    '/api/v1/insights': mockInsights,
  };

  return endpoints[endpoint] || null;
};
