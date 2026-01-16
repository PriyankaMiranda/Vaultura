import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { mockNetWorth, mockAssetAllocation, mockInsights } from '../utils/mockData';

function Dashboard({ backendStatus }) {
  const [data] = useState(mockNetWorth);
  const [allocation] = useState(mockAssetAllocation);
  const [insights] = useState(mockInsights);

  useEffect(() => {
    if (backendStatus === 'connected') {
      // TODO: Fetch real data from API
      // For now, use mock data
    }
  }, [backendStatus]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <main className="dashboard">
      <div className="container">
        <h1>Dashboard</h1>
        
        {backendStatus === 'disconnected' && (
          <div className="status-banner">
            Backend not available - showing demo data
          </div>
        )}
        
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Net Worth</div>
            <div className="kpi-value">{formatCurrency(data.net_worth)}</div>
            <div className={`kpi-change ${data.change_1d >= 0 ? 'positive' : 'negative'}`}>
              {data.change_1d >= 0 ? '+' : ''}{formatCurrency(data.change_1d)} today
            </div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-label">Total Assets</div>
            <div className="kpi-value">{formatCurrency(data.assets)}</div>
            <div className="kpi-pct">{((data.assets / data.net_worth) * 100).toFixed(1)}% of net worth</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-label">Total Liabilities</div>
            <div className="kpi-value">{formatCurrency(data.liabilities)}</div>
            <div className="kpi-pct">{((data.liabilities / data.assets) * 100).toFixed(1)}% of assets</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-label">30-Day Change</div>
            <div className="kpi-value">{formatCurrency(data.change_30d)}</div>
            <div className={`kpi-change ${data.change_30d_pct >= 0 ? 'positive' : 'negative'}`}>
              {data.change_30d_pct >= 0 ? '+' : ''}{data.change_30d_pct.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="panel">
            <h2>Asset Allocation</h2>
            <div className="allocation-chart">
              {Object.entries(allocation).map(([asset, data]) => (
                <div key={asset} className="allocation-item">
                  <div className="allocation-label">{asset}</div>
                  <div className="allocation-bar">
                    <div 
                      className="allocation-fill"
                      style={{width: `${data.pct}%`}}
                    ></div>
                  </div>
                  <div className="allocation-value">{data.pct.toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="panel">
            <h2>Insights</h2>
            <div className="insights-list">
              {insights.map((insight) => (
                <div key={insight.id} className="insight-item">
                  <div className="insight-title">{insight.title}</div>
                  <div className="insight-message">{insight.message}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <h2>Recent Transactions</h2>
            <div className="placeholder">Transactions coming soon</div>
          </div>

          <div className="panel">
            <h2>Net Worth Trend</h2>
            <div className="placeholder">Chart coming soon</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
