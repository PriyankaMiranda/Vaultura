import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';

// Import pages
import DashboardPage from './pages/DashboardPage';
import AccountsPage from './pages/AccountsPage';
import InvestmentsPage from './pages/InvestmentsPage';
import InsightsPage from './pages/InsightsPage';
import SettingsPage from './pages/SettingsPage';
import NewsPage from './pages/NewsPage';

function App() {
  const [backendStatus, setBackendStatus] = useState('unknown');

  useEffect(() => {
    // Check backend health (non-blocking)
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    fetch(`${API_URL}/health`, { mode: 'cors' })
      .then(() => setBackendStatus('connected'))
      .catch(() => setBackendStatus('disconnected'));
  }, []);

  return (
    <Router>
      <div className="app">
        <Navigation backendStatus={backendStatus} />
        <Routes>
          <Route path="/" element={<DashboardPage backendStatus={backendStatus} />} />
          <Route path="/accounts" element={<AccountsPage backendStatus={backendStatus} />} />
          <Route path="/investments" element={<InvestmentsPage backendStatus={backendStatus} />} />
          <Route path="/insights" element={<InsightsPage backendStatus={backendStatus} />} />
          <Route path="/settings" element={<SettingsPage backendStatus={backendStatus} />} />
          <Route path="/news" element={<NewsPage backendStatus={backendStatus} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
