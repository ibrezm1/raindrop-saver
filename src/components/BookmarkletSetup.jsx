import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronRight, Bookmark } from 'lucide-react';

export function BookmarkletSetup({ token }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const baseUrl = window.location.origin + window.location.pathname;

  // If token is provided, pass it in bookmarklet for first-time capture
  const tokenParam = token ? `&token=${token}` : '';

  const pageBookmarklet = `javascript:(function(){const u=encodeURIComponent(location.href);const t=encodeURIComponent(document.title);const token='${token || ''}';window.open('${baseUrl}?url='+u+'&title='+t+'&token='+token,'_blank');})();`;

  const clipBookmarklet = `javascript:(async function(){try{const c=(await navigator.clipboard.readText()||'').trim();const token='${token || ''}';if(/^https?:\\/\\//i.test(c)){window.open('${baseUrl}?url='+encodeURIComponent(c)+'&title='+encodeURIComponent(c)+'&token='+token,'_blank');}else{window.open('${baseUrl}?clipboard=1&token='+token,'_blank');}}catch(e){window.open('${baseUrl}?clipboard=1&token=${token || ''}','_blank');}})();`;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div>
      <div
        className="section-title"
        style={{ cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <span>🔖 Browser Bookmarklets</span>
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
      </div>

      {!isCollapsed ? (
        <div>
          <p className="tip" style={{ marginBottom: 12 }}>
            Drag the green buttons directly onto your browser's bookmarks bar:
          </p>

          <div style={styles.item}>
            <div style={styles.header}>
              <strong>1. Save Current Page</strong>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '6px 10px', fontSize: 11 }}
                  onClick={() => copyToClipboard(pageBookmarklet, 'page')}
                >
                  {copiedKey === 'page' ? <Check size={12} color="#3fb950" /> : <Copy size={12} />}
                  {copiedKey === 'page' ? 'Copied' : 'Copy'}
                </button>
                <a href={pageBookmarklet} className="btn btn-green" style={{ cursor: 'move' }}>
                  Save to Raindrop
                </a>
              </div>
            </div>
            <div className="code-box">{pageBookmarklet}</div>
          </div>

          <div style={styles.item}>
            <div style={styles.header}>
              <strong>2. Save from Clipboard</strong>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '6px 10px', fontSize: 11 }}
                  onClick={() => copyToClipboard(clipBookmarklet, 'clip')}
                >
                  {copiedKey === 'clip' ? <Check size={12} color="#3fb950" /> : <Copy size={12} />}
                  {copiedKey === 'clip' ? 'Copied' : 'Copy'}
                </button>
                <a href={clipBookmarklet} className="btn btn-green" style={{ cursor: 'move' }}>
                  Save Clipboard Link
                </a>
              </div>
            </div>
            <p className="tip">Saves whatever URL is currently in your clipboard.</p>
            <div className="code-box">{clipBookmarklet}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const styles = {
  item: {
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-muted)',
    borderRadius: '8px',
    padding: '14px',
    marginBottom: '12px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    flexWrap: 'wrap',
    gap: '8px',
  },
};
