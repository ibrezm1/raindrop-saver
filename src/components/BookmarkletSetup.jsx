import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronRight, Smartphone } from 'lucide-react';

export function BookmarkletSetup() {
  const [copiedKey, setCopiedKey] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const baseUrl = window.location.origin + window.location.pathname;

  const pageBookmarklet = `javascript:(function(){const u=encodeURIComponent(location.href);const t=encodeURIComponent(document.title);window.open('${baseUrl}?url='+u+'&title='+t,'_blank');})();`;

  const clipBookmarklet = `javascript:(async function(){try{const c=(await navigator.clipboard.readText()||'').trim();if(/^https?:\\/\\//i.test(c)){window.open('${baseUrl}?url='+encodeURIComponent(c)+'&title='+encodeURIComponent(c),'_blank');}else{window.open('${baseUrl}?clipboard=1','_blank');}}catch(e){window.open('${baseUrl}?clipboard=1','_blank');}})();`;

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
            <strong>Desktop:</strong> Drag the green button to your bookmarks bar.<br />
            <strong>Mobile:</strong> Tap <strong>Copy</strong>, bookmark any page in Safari/Chrome, and paste this as the URL.
          </p>

          <div style={styles.item}>
            <div className="bookmarklet-header-mobile" style={styles.header}>
              <strong>1. Save Current Page</strong>
              <div className="actions-row">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => copyToClipboard(pageBookmarklet, 'page')}
                >
                  {copiedKey === 'page' ? <Check size={14} color="#3fb950" /> : <Copy size={14} />}
                  {copiedKey === 'page' ? 'Copied!' : 'Copy Code'}
                </button>
                <a href={pageBookmarklet} className="btn btn-green" style={{ cursor: 'move' }}>
                  Save to Raindrop
                </a>
              </div>
            </div>
            <div className="code-box">{pageBookmarklet}</div>
          </div>

          <div style={styles.item}>
            <div className="bookmarklet-header-mobile" style={styles.header}>
              <strong>2. Save from Clipboard</strong>
              <div className="actions-row">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => copyToClipboard(clipBookmarklet, 'clip')}
                >
                  {copiedKey === 'clip' ? <Check size={14} color="#3fb950" /> : <Copy size={14} />}
                  {copiedKey === 'clip' ? 'Copied!' : 'Copy Code'}
                </button>
                <a href={clipBookmarklet} className="btn btn-green" style={{ cursor: 'move' }}>
                  Save Clipboard Link
                </a>
              </div>
            </div>
            <p className="tip">Saves whatever link is currently in your clipboard.</p>
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
    padding: '12px 14px',
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
