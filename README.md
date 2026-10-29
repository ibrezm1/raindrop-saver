# Raindrop Saver & Search (React + Vite)

A modern, fast, and modular React application hosted on GitHub Pages designed to:
1. **Bypass browser CSP & CORS restrictions** when saving links to [Raindrop.io](https://raindrop.io) via bookmarklets.
2. **Search & Browse your bookmarks** with a live search bar, quick filter chips, and newly added links list.

---

## Architecture & Project Structure

The monolithic `index.html` has been refactored into a clean React 19 + Vite component architecture:

```
├── index.html                   # Lightweight HTML entry point (11 lines)
├── vite.config.js               # Vite bundler configuration
├── package.json                 # React 19, Vite, Lucide icons
├── .github/workflows/deploy.yml # Automated GitHub Actions deploy to GitHub Pages
└── src/
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Main orchestrator (detects saving vs dashboard mode)
    ├── index.css                # Dark mode theme styles
    ├── services/
    │   ├── raindropApi.js       # Save & search API integration
    │   └── storage.js           # LocalStorage token management & URL cleanup
    └── components/
        ├── SavingView.jsx       # Bookmarklet auto-save view (status spinner & tab closer)
        ├── TokenPromptModal.jsx # First-time token capture modal
        ├── SearchSection.jsx    # Search input, clear, and quick filter chips
        ├── BookmarkList.jsx     # Paginated list container with load-more
        ├── BookmarkCard.jsx     # Individual bookmark card (thumbnail, tags, relative date)
        ├── QuickSave.jsx        # Save from clipboard & manual URL submission
        ├── BookmarkletSetup.jsx # Draggable buttons & code viewer with copy
        └── TokenSettings.jsx    # Token manager with password show/hide
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server (with instant HMR)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Bookmarklets

### 1. Save Current Page Bookmarklet

```javascript
javascript:(function(){const u=encodeURIComponent(location.href);const t=encodeURIComponent(document.title);const token='*********';window.open('https://ibrezm1.github.io/raindrop-saver/?url='+u+'&title='+t+'&token='+token,'_blank');})();
```

### 2. Save Clipboard Link Bookmarklet

```javascript
javascript:(async function(){try{const c=(await navigator.clipboard.readText()||'').trim();const token='*********';if(/^https?:\/\//i.test(c)){window.open('https://ibrezm1.github.io/raindrop-saver/?url='+encodeURIComponent(c)+'&title='+encodeURIComponent(c)+'&token='+token,'_blank');}else{window.open('https://ibrezm1.github.io/raindrop-saver/?clipboard=1&token='+token,'_blank');}}catch(e){window.open('https://ibrezm1.github.io/raindrop-saver/?clipboard=1&token=**************','_blank');}})();
```

---

## How to Set Up Your API Token in LocalStorage

You have 3 easy ways to set your token:

- **Automatic capture on first save**: If no token has been saved yet, using either bookmarklet will display a prompt on the card asking for your token once, which is then captured and saved to `localStorage`.
- **Via URL parameter**: Passing `?token=YOUR_TOKEN` (e.g. `https://ibrezm1.github.io/raindrop-saver/?token=YOUR_TOKEN`) automatically captures and stores it in `localStorage`.
- **Via Dashboard**: Visit [https://ibrezm1.github.io/raindrop-saver/](https://ibrezm1.github.io/raindrop-saver/), paste your token in the **Raindrop API Token** section, and click **Save**.

---

## GitHub Pages Deployment

A GitHub Actions workflow is provided at `.github/workflows/deploy.yml`.

To deploy automatically:
1. Go to your repository settings: [github.com/ibrezm1/raindrop-saver/settings/pages](https://github.com/ibrezm1/raindrop-saver/settings/pages).
2. Under **Build and deployment** > **Source**, change it from *Deploy from a branch* to **GitHub Actions**.
3. Push your commits to `main`. GitHub Actions will automatically install, build, and deploy the application to `https://ibrezm1.github.io/raindrop-saver/`.
