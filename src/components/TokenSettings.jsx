import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Save, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export function TokenSettings({ token, onSaveToken, onClearToken }) {
  const [inputValue, setInputValue] = useState(token || '');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    setInputValue(token || '');
  }, [token]);

  const handleSave = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      onSaveToken(trimmed);
      setStatusMessage('✓ Saved in LocalStorage');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleClear = () => {
    if (confirm('Clear saved token from LocalStorage?')) {
      setInputValue('');
      onClearToken();
      setStatusMessage('Token cleared');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div>
      <div className="section-title">🔑 Raindrop API Token</div>

      <form onSubmit={handleSave} className="input-group token-form-mobile">
        <div style={{ display: 'flex', gap: '8px', flex: 1, width: '100%' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter Raindrop API Token"
            autoComplete="off"
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? 'Hide token' : 'Show token'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="btn-row">
          <button type="submit" className="btn btn-secondary">
            <Save size={14} /> Save Token
          </button>
          {token ? (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
              title="Clear token"
            >
              <Trash2 size={14} /> Clear
            </button>
          ) : null}
        </div>
      </form>

      <div style={styles.statusRow}>
        {token ? (
          <span style={styles.saved}>
            <CheckCircle2 size={13} /> Token stored in your browser LocalStorage
          </span>
        ) : (
          <span style={styles.missing}>
            <AlertCircle size={13} /> No token saved yet. Enter token above and click Save.
          </span>
        )}
        {statusMessage ? <span style={{ marginLeft: 8, color: '#388bfd' }}>{statusMessage}</span> : null}
      </div>

      <p className="tip" style={{ marginTop: 18, textAlign: 'center' }}>
        <a
          href="https://app.raindrop.io"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent-blue-text)', textDecoration: 'none' }}
        >
          &rarr; Open Raindrop.io Web App
        </a>
      </p>
    </div>
  );
}

const styles = {
  statusRow: {
    fontSize: '12px',
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexWrap: 'wrap',
  },
  saved: {
    color: '#3fb950',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  missing: {
    color: '#f0883e',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
};
