import React from 'react';
import './Navigation.css';

function Navigation() {
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
    </nav>
  );
}

export default Navigation;
