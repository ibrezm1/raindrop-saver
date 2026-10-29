export const STORAGE_KEY = 'raindrop_token';
export const FALLBACK_URL = 'https://app.raindrop.io';

export function getStoredToken() {
  return localStorage.getItem(STORAGE_KEY) || '';
}

export function saveToken(token) {
  const trimmed = (token || '').trim();
  if (trimmed) {
    localStorage.setItem(STORAGE_KEY, trimmed);
  }
}

export function clearStoredToken() {
  localStorage.removeItem(STORAGE_KEY);
}

export function extractAndStoreUrlToken() {
  try {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token && token.trim()) {
      saveToken(token.trim());

      // Strip token parameter from URL & history for privacy
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('token');
      window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search);
    }
  } catch (err) {
    console.error('Failed to parse URL token:', err);
  }
}

export function getActiveToken() {
  const params = new URLSearchParams(window.location.search);
  return params.get('token')?.trim() || getStoredToken();
}
