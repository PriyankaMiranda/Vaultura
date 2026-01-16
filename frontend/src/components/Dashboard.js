import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [netWorth, setNetWorth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch net worth data from API
    // For now, show placeholder
    setLoading(false);
  }, []);

  return (
    <main className="dashboard">
      <div className="container">
        <h1>Dashboard</h1>
        
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Net Worth</div>
            <div className="kpi-value">$0.00</div>
            <div className="kpi-change positive">+$0.00 today</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-label">Total Assets</div>
            <div className="kpi-value">$0.00</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-label">Total Liabilities</div>
            <div className="kpi-value">$0.00</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-label">Monthly Cash Flow</div>
            <div className="kpi-value">$0.00</div>
          </div>
        </div>

        <div className="content-grid">
          <div className="panel">
            <h2>Net Worth Trend</h2>
            <div className="placeholder">Chart coming soon</div>
          </div>
          
          <div className="panel">
            <h2>Asset Allocation</h2>
            <div className="placeholder">Chart coming soon</div>
          </div>
          
          <div className="panel">
            <h2>Recent Transactions</h2>
            <div className="placeholder">Data coming soon</div>
          </div>
          
          <div className="panel">
            <h2>Insights</h2>
            <div className="placeholder">Rules-based insights coming soon</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
