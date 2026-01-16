import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';

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
    <div className="app">
      <Navigation backendStatus={backendStatus} />
      <Dashboard backendStatus={backendStatus} />
    </div>
  );
}

export default App;
