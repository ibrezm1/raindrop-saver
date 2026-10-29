import React, { useState } from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { formatRelativeTime } from '../services/raindropApi';

export function BookmarkCard({ item }) {
  const [imgError, setImgError] = useState(false);

  const timeStr = formatRelativeTime(item.created);
  const domainStr = item.domain || '';

  return (
    <div style={styles.card}>
      {item.cover && !imgError ? (
        <img
          src={item.cover}
          alt=""
          style={styles.thumb}
          onError={() => setImgError(true)}
        />
      ) : (
        <div style={styles.fallbackThumb}>🔗</div>
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
  card: {
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-default)',
    borderRadius: '8px',
    padding: '12px 14px',
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start',
    transition: 'border-color 0.15s, background-color 0.15s',
  },
  thumb: {
    width: '54px',
    height: '54px',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-tertiary)',
    objectFit: 'cover',
    flexShrink: 0,
  },
  fallbackThumb: {
    width: '54px',
    height: '54px',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-tertiary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: 'var(--text-muted)',
    flexShrink: 0,
  },
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
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
  },
};
