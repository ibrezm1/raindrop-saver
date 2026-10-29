import React from 'react';
import { BookmarkCard } from './BookmarkCard';

export function BookmarkList({
  items,
  totalCount,
  loading,
  error,
  query,
  onLoadMore,
  hasMore,
}) {
  const loadedSoFar = items.length;

  let headerText = 'Top Newly Added Links';
  if (query) {
    headerText = `Found ${totalCount.toLocaleString()} result(s) for "${query}"`;
  } else if (totalCount > 0) {
    headerText = `Top Newly Added Links (${loadedSoFar} of ${totalCount.toLocaleString()})`;
  }

  return (
    <div>
      <div style={styles.headerRow}>
        <span>{loading && items.length === 0 ? 'Searching...' : headerText}</span>
      </div>

      {error ? (
        <div style={styles.errorMsg}>Error: {error}</div>
      ) : null}

      {loading && items.length === 0 ? (
        <div style={styles.statusBox}>
          <div className="spinner" style={{ width: 24, height: 24, marginBottom: 8 }} />
          Loading raindrops...
        </div>
      ) : null}

      {!loading && items.length === 0 && !error ? (
        <div style={styles.statusBox}>
          No bookmarks found matching this search.
        </div>
      ) : null}

      <div style={styles.list}>
        {items.map((item) => (
          <BookmarkCard key={item._id} item={item} />
        ))}
      </div>

      {hasMore && !loading ? (
        <div style={{ textAlign: 'center', marginTop: 14 }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: '100%', padding: '10px' }}
            onClick={onLoadMore}
          >
            Load More ({totalCount - loadedSoFar} remaining)
          </button>
        </div>
      ) : null}

      {loading && items.length > 0 ? (
        <div style={styles.statusBox}>Loading more bookmarks...</div>
      ) : null}
    </div>
  );
}

const styles = {
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  statusBox: {
    textAlign: 'center',
    padding: '24px 16px',
    fontSize: '13px',
    color: 'var(--text-muted)',
  },
  errorMsg: {
    background: 'rgba(248, 81, 73, 0.1)',
    border: '1px solid var(--accent-red)',
    color: 'var(--accent-red)',
    padding: '10px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    marginBottom: '12px',
  },
};
