import React, { useState } from 'react';
import { Clipboard, Send } from 'lucide-react';

export function QuickSave({ onSaveUrl }) {
  const [urlInput, setUrlInput] = useState('');

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (trimmed) {
      onSaveUrl(trimmed, trimmed);
      setUrlInput('');
    }
  };

  const handleClipboardClick = async () => {
    try {
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        throw new Error('Clipboard API not supported in this browser.');
      }
      const text = (await navigator.clipboard.readText() || '').trim();
      if (!text) {
        alert('Clipboard is empty!');
        return;
      }
      onSaveUrl(text, text);
    } catch (err) {
      alert(`Could not access clipboard: ${err.message}\nPlease paste the URL manually.`);
    }
  };

  return (
    <div>
      <div className="section-title">⚡ Quick Save</div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ flex: 1, padding: '10px' }}
          onClick={handleClipboardClick}
        >
          <Clipboard size={14} /> Save from Clipboard
        </button>
      </div>

      <form onSubmit={handleManualSubmit} className="input-group">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://example.com/article"
        />
        <button type="submit" className="btn btn-secondary">
          <Send size={14} /> Save
        </button>
      </form>
    </div>
  );
}
