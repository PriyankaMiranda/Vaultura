import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check backend health
    fetch('/health')
      .then(() => setLoading(false))
      .catch(err => {
        setError('Failed to connect to backend');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="container"><p style={{color: '#dc2626'}}>{error}</p></div>;
  }

  return (
    <div className="app">
      <Navigation />
      <Dashboard />
    </div>
  );
}

export default App;
