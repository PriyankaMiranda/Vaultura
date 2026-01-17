import React, { useState } from 'react';
import './Pages.css';
import { mockUserSettings, mockConnectedAccounts } from '../utils/mockDataExtended';

function SettingsPage({ backendStatus }) {
  const [settings, setSettings] = useState(mockUserSettings);
  const [connectedAccounts, setConnectedAccounts] = useState(mockConnectedAccounts);
  const [openSection, setOpenSection] = useState('profile');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSettingChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  const handleDisconnectAccount = (accountId) => {
    setConnectedAccounts(connectedAccounts.filter(acc => acc.id !== accountId));
  };

  return (
    <main className="page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Settings</h1>
            <p className="page-subtitle">Manage your profile, preferences, and connected accounts</p>
          </div>
        </div>

        <div className="settings-grid">
          {/* Profile Section */}
          <div className="settings-section">
            <div 
              className="settings-section-header"
              onClick={() => toggleSection('profile')}
            >
              <h2>👤 Profile Settings</h2>
              <span>{openSection === 'profile' ? '▼' : '▶'}</span>
            </div>
            {openSection === 'profile' && (
              <div className="settings-content">
                <div className="setting-item">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={settings.fullName}
                    onChange={(e) => handleSettingChange('fullName', e.target.value)}
                  />
                </div>
                <div className="setting-item">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                  />
                </div>
                <div className="setting-item">
                  <label>Currency</label>
                  <select 
                    value={settings.currency}
                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>CAD</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Timezone</label>
                  <select 
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  >
                    <option>America/New_York</option>
                    <option>America/Chicago</option>
                    <option>America/Denver</option>
                    <option>America/Los_Angeles</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Preferences Section */}
          <div className="settings-section">
            <div 
              className="settings-section-header"
              onClick={() => toggleSection('preferences')}
            >
              <h2>⚙️ Preferences</h2>
              <span>{openSection === 'preferences' ? '▼' : '▶'}</span>
            </div>
            {openSection === 'preferences' && (
              <div className="settings-content">
                <div className="setting-item checkbox">
                  <input 
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                  <label>Email Notifications</label>
                </div>
                <div className="setting-item checkbox">
                  <input 
                    type="checkbox"
                    checked={settings.weeklyDigest}
                    onChange={(e) => handleSettingChange('weeklyDigest', e.target.checked)}
                  />
                  <label>Weekly Summary Digest</label>
                </div>
                <div className="setting-item checkbox">
                  <input 
                    type="checkbox"
                    checked={settings.priceAlerts}
                    onChange={(e) => handleSettingChange('priceAlerts', e.target.checked)}
                  />
                  <label>Price Drop Alerts</label>
                </div>
                <div className="setting-item">
                  <label>Theme</label>
                  <select 
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                  >
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Connected Accounts Section */}
          <div className="settings-section">
            <div 
              className="settings-section-header"
              onClick={() => toggleSection('accounts')}
            >
              <h2>🔗 Connected Accounts</h2>
              <span>{openSection === 'accounts' ? '▼' : '▶'}</span>
            </div>
            {openSection === 'accounts' && (
              <div className="settings-content">
                {connectedAccounts.length === 0 ? (
                  <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>No connected accounts</p>
                ) : (
                  connectedAccounts.map(account => (
                    <div key={account.id} className="connected-account">
                      <div>
                        <h4>{account.institution}</h4>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                          Connected on {new Date(account.connectedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="account-actions">
                        <span className="connection-status">✓ Connected</span>
                        <button 
                          className="btn-secondary"
                          onClick={() => handleDisconnectAccount(account.id)}
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  ))
                )}
                <button className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                  + Connect Bank Account
                </button>
              </div>
            )}
          </div>

          {/* Data & Privacy Section */}
          <div className="settings-section">
            <div 
              className="settings-section-header"
              onClick={() => toggleSection('privacy')}
            >
              <h2>🔒 Data & Privacy</h2>
              <span>{openSection === 'privacy' ? '▼' : '▶'}</span>
            </div>
            {openSection === 'privacy' && (
              <div className="settings-content">
                <div className="setting-item">
                  <label>Export My Data</label>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Download all your financial data as CSV files
                  </p>
                  <button className="btn-secondary">Download CSV</button>
                </div>
                <div className="setting-item">
                  <label>Change Password</label>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Update your password to keep your account secure
                  </p>
                  <button className="btn-secondary">Change Password</button>
                </div>
                <div className="setting-item">
                  <label>Delete Account</label>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Permanently delete your account and all associated data (irreversible)
                  </p>
                  <button className="btn-danger">Delete Account</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default SettingsPage;
