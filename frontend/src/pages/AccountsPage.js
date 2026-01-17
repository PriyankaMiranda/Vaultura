import React, { useState } from 'react';
import './Pages.css';
import { mockAccounts, mockDetailedTransactions } from '../utils/mockDataExtended';

function AccountsPage({ backendStatus }) {
  const [selectedAccount, setSelectedAccount] = useState(mockAccounts[0]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getAccountColor = (type) => {
    const colors = {
      checking: '#3b82f6',
      savings: '#10b981',
      credit_card: '#f59e0b',
      retirement: '#8b5cf6',
      investment: '#06b6d4'
    };
    return colors[type] || '#6b7280';
  };

  const getAccountIcon = (type) => {
    const icons = {
      checking: '💳',
      savings: '🏦',
      credit_card: '💰',
      retirement: '📈',
      investment: '🎯'
    };
    return icons[type] || '💼';
  };

  const accountTransactions = mockDetailedTransactions.filter(
    t => t.account === selectedAccount.name
  );

  const totalAssets = mockAccounts.reduce((sum, acc) => {
    if (acc.type !== 'credit_card' && acc.balance > 0) {
      return sum + acc.balance;
    }
    return sum;
  }, 0);

  const totalLiabilities = mockAccounts.reduce((sum, acc) => {
    if (acc.type === 'credit_card') {
      return sum + Math.abs(acc.balance);
    }
    return sum;
  }, 0);

  return (
    <main className="page accounts-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Accounts</h1>
            <p className="page-subtitle">Manage and view all your financial accounts</p>
          </div>
        </div>

        {/* Account Summary */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Total Assets</div>
            <div className="kpi-value">{formatCurrency(totalAssets)}</div>
            <div className="kpi-pct">{mockAccounts.filter(a => a.type !== 'credit_card').length} accounts</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Total Liabilities</div>
            <div className="kpi-value">{formatCurrency(totalLiabilities)}</div>
            <div className="kpi-pct">{mockAccounts.filter(a => a.type === 'credit_card').length} accounts</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Net Position</div>
            <div className="kpi-value">{formatCurrency(totalAssets - totalLiabilities)}</div>
            <div className="kpi-pct">Across {mockAccounts.length} accounts</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="accounts-grid">
          {/* Accounts List */}
          <div className="accounts-list-panel">
            <h2>Your Accounts</h2>
            <div className="accounts-list">
              {mockAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`account-item ${selectedAccount.id === account.id ? 'active' : ''}`}
                  onClick={() => setSelectedAccount(account)}
                >
                  <div className="account-icon">{getAccountIcon(account.type)}</div>
                  <div className="account-info">
                    <div className="account-name">{account.name}</div>
                    <div className="account-type">{account.type.replace('_', ' ').toUpperCase()}</div>
                  </div>
                  <div className="account-balance">
                    <div className={account.balance >= 0 ? 'positive' : 'negative'}>
                      {formatCurrency(Math.abs(account.balance))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary">+ Add Account</button>
          </div>

          {/* Account Details */}
          <div className="account-details-panel">
            <div className="account-header">
              <h2>{selectedAccount.name}</h2>
              <div className="account-status">Connected • Active</div>
            </div>

            <div className="account-details-grid">
              <div className="detail-card">
                <div className="detail-label">Account Type</div>
                <div className="detail-value">{selectedAccount.type.replace('_', ' ').toUpperCase()}</div>
              </div>
              <div className="detail-card">
                <div className="detail-label">Institution</div>
                <div className="detail-value">{selectedAccount.institution || 'N/A'}</div>
              </div>
              <div className="detail-card">
                <div className="detail-label">Current Balance</div>
                <div className={`detail-value ${selectedAccount.balance >= 0 ? 'positive' : 'negative'}`}>
                  {formatCurrency(Math.abs(selectedAccount.balance))}
                </div>
              </div>
              <div className="detail-card">
                <div className="detail-label">Last Updated</div>
                <div className="detail-value">Today</div>
              </div>
            </div>

            <div className="account-actions">
              <button className="btn-secondary">View Details</button>
              <button className="btn-secondary">Sync Now</button>
              <button className="btn-secondary">Disconnect</button>
            </div>

            {/* Recent Transactions */}
            <div className="transactions-section">
              <h3>Recent Transactions</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {accountTransactions.slice(0, 5).map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.date}</td>
                      <td>{tx.description}</td>
                      <td>
                        <span className="category-badge">{tx.category}</span>
                      </td>
                      <td className={tx.amount >= 0 ? 'positive' : 'negative'}>
                        {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="view-all-link">
                <a href="#/">View all transactions →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AccountsPage;
