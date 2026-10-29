import React, { useState } from 'react';
import { Key } from 'lucide-react';

export function TokenPromptModal({ onSubmit }) {
  const [val, setVal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (val.trim()) {
      onSubmit(val.trim());
    }
  };

  return (
    <div style={{ textAlign: 'left', marginTop: 16 }}>
      <p style={{ fontSize: 14, marginBottom: 10, color: 'var(--text-primary)' }}>
        🔑 <strong>Raindrop API Token Required</strong>
        <br />
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Enter your token once. It will be captured and saved in this browser's LocalStorage.
        </span>
      </p>

      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="password"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Paste Raindrop API Token"
          autoFocus
          autoComplete="off"
        />
        <button type="submit" className="btn btn-green">
          Save &amp; Continue
        </button>
      </form>

      <p className="tip">
        Get your token from{' '}
        <a
          href="https://app.raindrop.io/settings/integrations"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent-blue-text)', textDecoration: 'none' }}
        >
          Raindrop &gt; Settings &gt; Integrations
        </a>
      </p>
    </div>
  );
}
