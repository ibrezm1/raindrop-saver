import React, { useEffect, useState, useCallback } from 'react';
import { extractAndStoreUrlToken, getStoredToken, saveToken, clearStoredToken } from './services/storage';
import { fetchBookmarks, saveBookmark } from './services/raindropApi';
import { SavingView } from './components/SavingView';
import { SearchSection } from './components/SearchSection';
import { BookmarkList } from './components/BookmarkList';
import { QuickSave } from './components/QuickSave';
import { BookmarkletSetup } from './components/BookmarkletSetup';
import { TokenSettings } from './components/TokenSettings';
import { RefreshCw } from 'lucide-react';

export function App() {
  const [urlParams, setUrlParams] = useState(() => new URLSearchParams(window.location.search));
  const [token, setToken] = useState(() => getStoredToken());

  // Dashboard search & bookmark list state
  const [bookmarks, setBookmarks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract ?token= on first mount
  useEffect(() => {
    extractAndStoreUrlToken();
    setToken(getStoredToken());
  }, []);

  const targetUrl = urlParams.get('url');
  const targetTitle = urlParams.get('title');
  const isClipboardMode = urlParams.get('clipboard') === '1';
  const isSavingMode = Boolean(targetUrl || isClipboardMode);

  // Load bookmarks
  const loadBookmarks = useCallback(
    async (query = '', pageNum = 0, append = false) => {
      const activeToken = getStoredToken();
      if (!activeToken) {
        setBookmarks([]);
        setTotalCount(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchBookmarks({
          query,
          page: pageNum,
          perPage: 10,
          token: activeToken,
        });

        const items = data.items || [];
        setTotalCount(data.count || 0);
        setBookmarks((prev) => (append ? [...prev, ...items] : items));
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to load bookmarks');
        if (err.message.includes('Unauthorized')) {
          setToken('');
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Load newly added links on start
  useEffect(() => {
    if (!isSavingMode && token) {
      loadBookmarks('', 0, false);
    }
  }, [isSavingMode, token, loadBookmarks]);

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
    setPage(0);
    loadBookmarks(newQuery, 0, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadBookmarks(searchQuery, nextPage, true);
  };

  const handleRefresh = () => {
    setPage(0);
    loadBookmarks(searchQuery, 0, false);
  };

  const handleSaveToken = (newToken) => {
    saveToken(newToken);
    setToken(newToken);
    loadBookmarks(searchQuery, 0, false);
  };

  const handleClearToken = () => {
    clearStoredToken();
    setToken('');
    setBookmarks([]);
    setTotalCount(0);
  };

  const handleQuickSaveUrl = async (url, title) => {
    const activeToken = getStoredToken();
    if (!activeToken) {
      alert('Please set your Raindrop API token below first.');
      return;
    }

    try {
      await saveBookmark({ url, title, token: activeToken });
      alert('✓ Saved to Raindrop!');
      handleRefresh();
    } catch (err) {
      alert(`Save failed: ${err.message}`);
    }
  };

  // If invoked via bookmarklet, show the saving view
  if (isSavingMode) {
    return (
      <SavingView
        initialUrl={targetUrl}
        initialTitle={targetTitle}
        isClipboardMode={isClipboardMode}
      />
    );
  }

  return (
    <div className="card">
      {/* App Header */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
          Raindrop Saver &amp; Search
        </h1>
        <p className="sub" style={{ margin: 0 }}>
          Save bookmarks, browse recent links, or search Raindrop
        </p>
      </div>

      {/* 🔍 Search & Browse */}
      <div className="section-title">
        <span>🔍 Search &amp; Recent Links</span>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ padding: '4px 8px', fontSize: 11 }}
          onClick={handleRefresh}
        >
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      <SearchSection activeQuery={searchQuery} onSearch={handleSearch} />

      <BookmarkList
        items={bookmarks}
        totalCount={totalCount}
        loading={loading}
        error={error}
        query={searchQuery}
        onLoadMore={handleLoadMore}
        hasMore={bookmarks.length < totalCount}
      />

      {/* ⚡ Quick Save */}
      <QuickSave onSaveUrl={handleQuickSaveUrl} />

      {/* 🔖 Bookmarklets */}
      <BookmarkletSetup token={token} />

      {/* 🔑 API Token Settings */}
      <TokenSettings
        token={token}
        onSaveToken={handleSaveToken}
        onClearToken={handleClearToken}
      />
    </div>
  );
}
