import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../pages/Pages.css';
import { mockNetWorth, mockNetWorthHistory } from '../utils/mockData';
import { mockCashFlow, mockSpendingByCategory } from '../utils/mockDataExtended';

function DashboardPage({ backendStatus }) {
  const [timeframe, setTimeframe] = useState('1m');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

  return (
    <main className="page dashboard-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Dashboard</h1>
            <p className="page-subtitle">Your financial overview at a glance</p>
          </div>
          {backendStatus === 'disconnected' && (
            <div className="status-banner">
              Using demo data
            </div>
          )}
        </div>

        {/* KPI Cards */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Net Worth</div>
            <div className="kpi-value">{formatCurrency(mockNetWorth.net_worth)}</div>
            <div className={`kpi-change ${mockNetWorth.change_1d >= 0 ? 'positive' : 'negative'}`}>
              {mockNetWorth.change_1d >= 0 ? '↑' : '↓'} {formatCurrency(Math.abs(mockNetWorth.change_1d))} today
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Total Assets</div>
            <div className="kpi-value">{formatCurrency(mockNetWorth.assets)}</div>
            <div className="kpi-pct">
              {((mockNetWorth.assets / (mockNetWorth.assets + mockNetWorth.liabilities)) * 100).toFixed(0)}% of total
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Total Liabilities</div>
            <div className="kpi-value">{formatCurrency(mockNetWorth.liabilities)}</div>
            <div className="kpi-pct">
              {((mockNetWorth.liabilities / (mockNetWorth.assets + mockNetWorth.liabilities)) * 100).toFixed(0)}% of total
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">30-Day Change</div>
            <div className="kpi-value">{formatCurrency(mockNetWorth.change_30d)}</div>
            <div className={`kpi-change ${mockNetWorth.change_30d_pct >= 0 ? 'positive' : 'negative'}`}>
              {mockNetWorth.change_30d_pct >= 0 ? '+' : ''}{mockNetWorth.change_30d_pct.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Net Worth Trend */}
          <div className="chart-panel">
            <div className="chart-header">
              <h2>Net Worth Trend</h2>
              <div className="chart-controls">
                <button className={timeframe === '1m' ? 'active' : ''} onClick={() => setTimeframe('1m')}>1M</button>
                <button className={timeframe === '3m' ? 'active' : ''} onClick={() => setTimeframe('3m')}>3M</button>
                <button className={timeframe === '6m' ? 'active' : ''} onClick={() => setTimeframe('6m')}>6M</button>
                <button className={timeframe === '1y' ? 'active' : ''} onClick={() => setTimeframe('1y')}>1Y</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockNetWorthHistory}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Cash Flow */}
          <div className="chart-panel">
            <h2>Monthly Cash Flow</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockCashFlow}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Area type="monotone" dataKey="income" stackId="1" stroke="#10b981" fill="#d1fae5" />
                <Area type="monotone" dataKey="spending" stackId="1" stroke="#ef4444" fill="#fee2e2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Spending by Category */}
          <div className="chart-panel">
            <h2>Spending by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockSpendingByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, pct }) => `${category} ${pct.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {mockSpendingByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="stats-panel">
            <h2>Quick Stats</h2>
            <div className="stat-item">
              <span className="stat-label">Savings Rate (30d)</span>
              <span className="stat-value positive">65%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Monthly Income</span>
              <span className="stat-value">{formatCurrency(8433)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Monthly Spend</span>
              <span className="stat-value">{formatCurrency(4450)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Net Monthly Savings</span>
              <span className="stat-value positive">{formatCurrency(3983)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Emergency Fund Months</span>
              <span className="stat-value">7.5</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
