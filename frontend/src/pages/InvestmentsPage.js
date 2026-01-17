import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Pages.css';
import { mockAllHoldings, mockPortfolioPerformance, mockInvestmentInsights } from '../utils/mockDataExtended';

function InvestmentsPage({ backendStatus }) {
  const [viewType, setViewType] = useState('overview');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Calculate totals
  const totalValue = mockAllHoldings.reduce((sum, account) => {
    return sum + account.holdings.reduce((acc, h) => acc + h.value, 0);
  }, 0);

  const totalCostBasis = mockAllHoldings.reduce((sum, account) => {
    return sum + account.holdings.reduce((acc, h) => acc + h.cost_basis, 0);
  }, 0);

  const totalGains = totalValue - totalCostBasis;

  // Asset allocation data
  const assetAllocationData = [
    { name: 'Stocks', value: totalValue * 0.75, fill: '#3b82f6' },
    { name: 'Bonds', value: totalValue * 0.20, fill: '#10b981' },
    { name: 'Cash', value: totalValue * 0.05, fill: '#f59e0b' }
  ];

  return (
    <main className="page investments-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Investments</h1>
            <p className="page-subtitle">Portfolio analysis and performance tracking</p>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Portfolio Value</div>
            <div className="kpi-value">{formatCurrency(totalValue)}</div>
            <div className="kpi-pct">Across {mockAllHoldings.length} accounts</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Total Cost Basis</div>
            <div className="kpi-value">{formatCurrency(totalCostBasis)}</div>
            <div className="kpi-pct">Initial investment</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Unrealized Gains</div>
            <div className={`kpi-value ${totalGains >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(totalGains)}
            </div>
            <div className={`kpi-change ${totalGains >= 0 ? 'positive' : 'negative'}`}>
              {totalGains >= 0 ? '+' : ''}{((totalGains / totalCostBasis) * 100).toFixed(2)}%
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">YTD Performance</div>
            <div className="kpi-value positive">+6.8%</div>
            <div className="kpi-pct">vs S&P 500 +4.2%</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* Performance Chart */}
          <div className="chart-panel" style={{ gridColumn: '1 / -1' }}>
            <h2>Portfolio vs Benchmark Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockPortfolioPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip formatter={(value) => `${value.toFixed(2)}`} />
                <Legend />
                <Line type="monotone" dataKey="portfolio" stroke="#3b82f6" dot={false} strokeWidth={2} name="Your Portfolio" />
                <Line type="monotone" dataKey="benchmark" stroke="#9ca3af" dot={false} strokeWidth={2} name="S&P 500 Benchmark" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Allocation */}
          <div className="chart-panel">
            <h2>Asset Allocation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetAllocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${(value / totalValue * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Holdings */}
          <div className="chart-panel">
            <h2>Top Holdings by Value</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockAllHoldings.flatMap(a => a.holdings).slice(0, 5).map(h => ({
                  symbol: h.symbol,
                  value: h.value
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="symbol" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Holdings by Account */}
        <div className="holdings-section">
          <h2>Holdings by Account</h2>
          {mockAllHoldings.map((account) => (
            <div key={account.account} className="account-holdings">
              <h3>{account.account}</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Value</th>
                    <th>Gain/Loss</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {account.holdings.map((holding, idx) => (
                    <tr key={idx}>
                      <td><strong>{holding.symbol}</strong></td>
                      <td>{holding.name}</td>
                      <td className="number">{holding.quantity.toFixed(2)}</td>
                      <td className="number">{formatCurrency(holding.price)}</td>
                      <td className="number"><strong>{formatCurrency(holding.value)}</strong></td>
                      <td className={`number ${holding.unrealized_gains >= 0 ? 'positive' : 'negative'}`}>
                        {holding.unrealized_gains >= 0 ? '+' : ''}{formatCurrency(holding.unrealized_gains)}
                      </td>
                      <td className={`number ${holding.gains_pct >= 0 ? 'positive' : 'negative'}`}>
                        {holding.gains_pct >= 0 ? '+' : ''}{holding.gains_pct.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Investment Insights */}
        <div className="insights-section">
          <h2>Investment Insights</h2>
          <div className="insights-grid">
            {mockInvestmentInsights.map((insight) => (
              <div key={insight.id} className={`insight-card ${insight.severity}`}>
                <div className="insight-header">
                  <h3>{insight.title}</h3>
                  <span className={`severity-badge ${insight.severity}`}>{insight.severity.toUpperCase()}</span>
                </div>
                <p>{insight.message}</p>
                {insight.actionable && (
                  <button className="btn-insight">View Details →</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default InvestmentsPage;
