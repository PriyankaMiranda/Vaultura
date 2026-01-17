import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ backendStatus }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="nav-left">
        <Link to="/" className="nav-brand">Vaultura</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Dashboard</Link>
        <Link to="/accounts" className={`nav-link ${isActive('/accounts') ? 'active' : ''}`}>Accounts</Link>
        <Link to="/investments" className={`nav-link ${isActive('/investments') ? 'active' : ''}`}>Investments</Link>
        <Link to="/insights" className={`nav-link ${isActive('/insights') ? 'active' : ''}`}>Insights</Link>
        <Link to="/news" className={`nav-link ${isActive('/news') ? 'active' : ''}`}>News</Link>
        <Link to="/settings" className={`nav-link ${isActive('/settings') ? 'active' : ''}`}>Settings</Link>
      </div>
      <div className="nav-status">
        {backendStatus === 'connected' && (
          <span className="status-indicator status-connected" title="Backend connected">●</span>
        )}
        {backendStatus === 'disconnected' && (
          <span className="status-indicator status-disconnected" title="Backend disconnected">●</span>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
