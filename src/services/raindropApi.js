import { clearStoredToken, FALLBACK_URL } from './storage';

const API_BASE = 'https://api.raindrop.io/rest/v1';

export async function saveBookmark({ url, title, token }) {
  if (!url) throw new Error('No URL provided');
  if (!token) throw new Error('Raindrop API Token is required');

  let normalizedUrl = url.trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    if (normalizedUrl.includes('.') && !normalizedUrl.includes(' ')) {
      normalizedUrl = 'https://' + normalizedUrl;
    } else {
      throw new Error('Invalid URL format');
    }
  }

  const response = await fetch(`${API_BASE}/raindrop`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      link: normalizedUrl,
      title: title || normalizedUrl,
      pleaseParse: {},
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearStoredToken();
      throw new Error('Unauthorized: API token is invalid or expired.');
    }
    const data = await response.json().catch(() => ({}));
    throw new Error(data.errorMessage || `API error (${response.status})`);
  }

  return await response.json();
}

export async function fetchBookmarks({ query = '', page = 0, perPage = 10, token }) {
  if (!token) {
    throw new Error('Please set your Raindrop API token in settings first.');
  }

  // Always exclude the 'xxx' tag from queries
  const trimmed = (query || '').trim();
  let fullSearch = trimmed;
  if (!fullSearch.includes('-#xxx')) {
    fullSearch = fullSearch ? `${fullSearch} -#xxx` : '-#xxx';
  }

  let url = `${API_BASE}/raindrops/0?perpage=${perPage}&page=${page}&sort=-created`;
  if (fullSearch) {
    url += `&search=${encodeURIComponent(fullSearch)}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearStoredToken();
      throw new Error('Unauthorized: Invalid or expired API token.');
    }
    throw new Error(`Raindrop API request failed (${response.status})`);
  }

  return await response.json();
}

export function formatRelativeTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffSeconds = Math.floor((now - date) / 1000);

  if (diffSeconds < 60) return 'just now';
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
