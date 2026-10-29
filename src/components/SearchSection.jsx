import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const FILTER_CHIPS = [
  { label: '🆕 Newly Added', query: '' },
  { label: '🐱 GitHub Links', query: 'link:github -#archive' },
  { label: '📰 Articles', query: 'type:article' },
  { label: 'Active (Not Archived)', query: '-#archive' },
];

export function SearchSection({ activeQuery, onSearch }) {
  const [inputValue, setInputValue] = useState(activeQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  const handleChipClick = (query) => {
    setInputValue(query);
    onSearch(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Search (e.g. "link:github -#archive", "react", tags...)'
        />
        <button type="submit" className="btn btn-primary" title="Search">
          <Search size={14} />
          <span className="search-btn-label">Search</span>
        </button>
        {inputValue ? (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
            title="Clear search"
          >
            <X size={14} />
          </button>
        ) : null}
      </form>

      <div style={styles.chipsContainer}>
        {FILTER_CHIPS.map((chip) => {
          const isActive = activeQuery === chip.query;
          return (
            <button
              key={chip.label}
              type="button"
              style={{
                ...styles.chip,
                ...(isActive ? styles.chipActive : {}),
              }}
              onClick={() => handleChipClick(chip.query)}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  chipsContainer: {
    display: 'flex',
    gap: '6px',
    overflowX: 'auto',
    paddingBottom: '6px',
    marginBottom: '14px',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
  },
  chip: {
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-default)',
    color: 'var(--text-muted)',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    minHeight: '30px',
  },
  chipActive: {
    background: 'rgba(31, 111, 235, 0.2)',
    borderColor: 'var(--accent-blue-text)',
    color: 'var(--accent-blue-text)',
    fontWeight: '600',
  },
};
