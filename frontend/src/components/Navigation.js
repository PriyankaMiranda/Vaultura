import React from 'react';
import './Navigation.css';

function Navigation({ backendStatus }) {
  return (
    <nav className="navigation">
      <div className="nav-brand">Vaultura</div>
      <div className="nav-links">
        <a href="/">Dashboard</a>
        <a href="/accounts">Accounts</a>
        <a href="/investments">Investments</a>
        <a href="/insights">Insights</a>
        <a href="/settings">Settings</a>
      </div>
      <div className="nav-status">
        {backendStatus === 'connected' && (
          <span className="status-indicator status-connected" title="Backend connected">●</span>
        )}
        {backendStatus === 'disconnected' && (
          <span className="status-indicator status-disconnected" title="Backend disconnected (showing demo data)">●</span>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
