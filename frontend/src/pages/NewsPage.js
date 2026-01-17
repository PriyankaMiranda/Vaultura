import React, { useState } from 'react';
import './Pages.css';
import { mockNews } from '../utils/mockDataExtended';

function NewsPage({ backendStatus }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All News', icon: '📰' },
    { id: 'economy', label: 'Economy', icon: '💼' },
    { id: 'stocks', label: 'Stocks', icon: '📈' },
    { id: 'crypto', label: 'Crypto', icon: '₿' },
    { id: 'rates', label: 'Interest Rates', icon: '💰' }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? mockNews 
    : mockNews.filter(article => article.category === selectedCategory);

  const getRelevanceBadgeColor = (relevance) => {
    if (relevance >= 8) return '#10b981';
    if (relevance >= 5) return '#f59e0b';
    return '#9ca3af';
  };

  return (
    <main className="page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Financial News</h1>
            <p className="page-subtitle">Stay updated with relevant market news and insights</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="news-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon} {category.label}
            </button>
          ))}
        </div>

        {/* News Articles Grid */}
        <div className="news-grid">
          {filteredNews.map((article) => (
            <div key={article.id} className="news-card">
              <div className="news-header">
                <div>
                  <h3>{article.title}</h3>
                  <p className="news-meta">
                    <span className="news-source">{article.source}</span>
                    <span className="news-date">{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>

              <p className="news-summary">{article.summary}</p>

              <div className="news-footer">
                <div className="relevance-indicator">
                  <span className="label">Portfolio Relevance</span>
                  <div className="relevance-bar">
                    <div 
                      className="relevance-fill"
                      style={{
                        width: `${article.relevanceToPortfolio * 10}%`,
                        backgroundColor: getRelevanceBadgeColor(article.relevanceToPortfolio)
                      }}
                    />
                  </div>
                  <span className="relevance-score">{article.relevanceToPortfolio}/10</span>
                </div>
                <button className="btn-link">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default NewsPage;
