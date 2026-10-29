import React, { useEffect, useState } from 'react';
import { saveBookmark } from '../services/raindropApi';
import { getStoredToken, saveToken, FALLBACK_URL } from '../services/storage';
import { TokenPromptModal } from './TokenPromptModal';

export function SavingView({ initialUrl, initialTitle, isClipboardMode }) {
  const [status, setStatus] = useState('saving'); // 'saving' | 'success' | 'error' | 'need_token' | 'clipboard_gesture'
  const [subText, setSubText] = useState(initialUrl || 'Connecting to Raindrop.io');
  const [errorMsg, setErrorMsg] = useState(null);
  const [pendingUrl, setPendingUrl] = useState(initialUrl);
  const [pendingTitle, setPendingTitle] = useState(initialTitle);

  const performSave = async (url, title, token) => {
    if (!token) {
      setPendingUrl(url);
      setPendingTitle(title);
      setStatus('need_token');
      return;
    }

    setStatus('saving');
    setSubText(url);

    try {
      await saveBookmark({ url, title, token });
      setStatus('success');
      setSubText('Closing tab automatically...');

      setTimeout(() => {
        window.close();
        setTimeout(() => {
          window.location.href = FALLBACK_URL;
        }, 500);
      }, 1200);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message || 'Error communicating with Raindrop');
      setTimeout(() => {
        window.location.href = FALLBACK_URL;
      }, 3000);
    }
  };

  const handleManualClipboard = async () => {
    try {
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        throw new Error('Clipboard API not supported');
      }
      const clip = (await navigator.clipboard.readText() || '').trim();
      if (!clip) {
        alert('Clipboard is empty!');
        return;
      }
      const token = getStoredToken();
      performSave(clip, clip, token);
    } catch (err) {
      setStatus('error');
      setErrorMsg(`Clipboard read failed: ${err.message}`);
    }
  };

  useEffect(() => {
    const token = getStoredToken();

    if (isClipboardMode) {
      setSubText('Checking clipboard...');
      navigator.clipboard
        ?.readText()
        .then((clip) => {
          const trimmed = (clip || '').trim();
          if (/^https?:\/\//i.test(trimmed)) {
            performSave(trimmed, trimmed, token);
          } else {
            setStatus('clipboard_gesture');
            setSubText(trimmed ? `Clipboard: "${trimmed}" (not a web link)` : 'Clipboard is empty');
          }
        })
        .catch(() => {
          setStatus('clipboard_gesture');
          setSubText('Permission needed to access clipboard in this tab');
        });
    } else if (initialUrl) {
      performSave(initialUrl, initialTitle, token);
    }
  }, [initialUrl, initialTitle, isClipboardMode]);

  const handleTokenSubmitted = (newToken) => {
    saveToken(newToken);
    performSave(pendingUrl, pendingTitle, newToken);
  };

  const cardClass = `card ${status === 'success' ? 'success' : ''} ${status === 'error' ? 'error' : ''}`;

  return (
    <div className={cardClass} style={{ textAlign: 'center' }}>
      {status === 'saving' ? <div className="spinner" /> : null}

      <h2 style={{ fontSize: 20, margin: '0 0 8px 0', color: status === 'success' ? '#2ea043' : status === 'error' ? '#f85149' : '#f0f6fc' }}>
        {status === 'saving' && 'Saving bookmark...'}
        {status === 'success' && '✓ Saved to Raindrop!'}
        {status === 'error' && 'Save failed'}
        {status === 'need_token' && 'Setup Required'}
        {status === 'clipboard_gesture' && 'Save Clipboard Link'}
      </h2>

      <p className="sub">{errorMsg || subText}</p>

      {status === 'need_token' ? (
        <TokenPromptModal onSubmit={handleTokenSubmitted} />
      ) : null}

      {status === 'clipboard_gesture' ? (
        <div style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn btn-green"
            style={{ width: '100%', padding: 12 }}
            onClick={handleManualClipboard}
          >
            📋 Click to Read &amp; Save Clipboard Link
          </button>
        </div>
      ) : null}
    </div>
  );
}
