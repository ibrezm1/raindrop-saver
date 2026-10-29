import React, { useState } from 'react';
import { formatRelativeTime } from '../services/raindropApi';

export function BookmarkCard({ item }) {
  const [imgError, setImgError] = useState(false);

  const timeStr = formatRelativeTime(item.created);
  const domainStr = item.domain || '';

  return (
    <div className="bookmark-card">
      {item.cover && !imgError ? (
        <img
          src={item.cover}
          alt=""
          className="bookmark-thumb"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div className="bookmark-fallback-thumb">🔗</div>
      )}

      <div style={styles.content}>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.title}
        >
          {item.title || item.link}
        </a>

        {item.excerpt ? (
          <div style={styles.excerpt}>{item.excerpt}</div>
        ) : null}

        <div style={styles.meta}>
          {domainStr ? <span style={styles.domain}>{domainStr}</span> : null}
          <span>{timeStr}</span>

          {item.tags && item.tags.length > 0
            ? item.tags.map((t) => (
                <span key={t} style={styles.tag}>
                  #{t}
                </span>
              ))
            : null}

          <a
            href={`https://app.raindrop.io/my/0/item/${item._id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.raindropLink}
            title="Open in Raindrop App"
          >
            Raindrop ↗
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  content: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--accent-blue-text)',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '4px',
    lineHeight: 1.35,
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  },
  excerpt: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    lineHeight: 1.4,
    marginBottom: '6px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    color: '#7d8590',
    flexWrap: 'wrap',
  },
  domain: {
    background: 'var(--bg-tertiary)',
    padding: '2px 6px',
    borderRadius: '4px',
    color: 'var(--text-secondary)',
  },
  tag: {
    background: 'rgba(31, 111, 235, 0.15)',
    color: 'var(--accent-blue-text)',
    border: '1px solid rgba(31, 111, 235, 0.3)',
    padding: '1px 6px',
    borderRadius: '10px',
    fontSize: '10px',
  },
  raindropLink: {
    marginLeft: 'auto',
    color: 'var(--text-muted)',
    textDecoration: 'none',
    fontSize: '11px',
    whiteSpace: 'nowrap',
  },
};
