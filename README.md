# Raindrop Saver Bookmarklet

A fast, lightweight static web app hosted on GitHub Pages designed to bypass browser Content Security Policy (CSP) and CORS restrictions when saving links to [Raindrop.io](https://raindrop.io) via browser bookmarklets.

## Features

- **Save Current Page**: Saves the URL and title of the active tab.
- **Save from Clipboard**: 1-click save for whatever web link is currently copied to your clipboard (from Slack, Discord, PDF, etc.).
- **LocalStorage Token Management**: Store and update your Raindrop API token directly in your browser's `localStorage` so you never have to hardcode or re-enter it.
- **Auto-Close**: Confirms the save with a clean status message and automatically closes the temporary tab.

---

## Bookmarklets

### 1. Save Current Page Bookmarklet

```javascript
javascript:(function(){const u=encodeURIComponent(location.href);const t=encodeURIComponent(document.title);window.open('https://ibrezm1.github.io/raindrop-saver/?url='+u+'&title='+t,'_blank');})();
```

### 2. Save Clipboard Link Bookmarklet

```javascript
javascript:(async function(){try{const c=(await navigator.clipboard.readText()||'').trim();if(/^https?:\/\//i.test(c)){window.open('https://ibrezm1.github.io/raindrop-saver/?url='+encodeURIComponent(c)+'&title='+encodeURIComponent(c),'_blank');}else{window.open('https://ibrezm1.github.io/raindrop-saver/?clipboard=1','_blank');}}catch(e){window.open('https://ibrezm1.github.io/raindrop-saver/?clipboard=1','_blank');}})();
```

---

## How to Set Up Your API Token in LocalStorage

You have 3 easy ways to set your token:

- **Automatic capture on first save**: If no token has been saved yet, using either bookmarklet will display a clean prompt on the card asking for your token once, which is then captured and saved to `localStorage` before completing the save.
- **Via URL parameter**: Passing `?token=YOUR_TOKEN` (e.g. `https://ibrezm1.github.io/raindrop-saver/?token=YOUR_TOKEN`) will automatically capture and store it in `localStorage`.
- **Via Dashboard**: Visit [https://ibrezm1.github.io/raindrop-saver/](https://ibrezm1.github.io/raindrop-saver/), paste your token in the **Raindrop API Token** section, and click **Save**.

---

## Enabling GitHub Pages

1. Go to your repository settings: [github.com/ibrezm1/raindrop-saver/settings/pages](https://github.com/ibrezm1/raindrop-saver/settings/pages).
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select Branch: **`main`** and Folder: **`/ (root)`**, then click **Save**.
4. After 1–2 minutes, GitHub Pages will deploy the updated app.
