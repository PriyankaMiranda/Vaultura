import React from 'react';
import './Pages.css';
import { mockInvestmentInsights, mockInsights } from '../utils/mockDataExtended';
import { mockInsights as mockDashboardInsights } from '../utils/mockData';

function InsightsPage({ backendStatus }) {
  const allInsights = [...mockInvestmentInsights, ...mockDashboardInsights];

  const getSeverityColor = (severity) => {
    const colors = {
      info: '#3b82f6',
      warning: '#f59e0b',
      critical: '#ef4444'
    };
    return colors[severity] || '#6b7280';
  };

  return (
    <main className="page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Insights</h1>
            <p className="page-subtitle">AI-powered analysis and recommendations</p>
          </div>
        </div>

        <div className="insights-grid" style={{ maxWidth: '100%' }}>
          {allInsights.map((insight) => (
            <div key={insight.id} className={`insight-card ${insight.severity}`} style={{ gridColumn: 'span 1' }}>
              <div className="insight-header">
                <h3>{insight.title}</h3>
                <span className={`severity-badge ${insight.severity}`}>{insight.severity.toUpperCase()}</span>
              </div>
              <p>{insight.message}</p>
              <button className="btn-insight">Learn more →</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default InsightsPage;
