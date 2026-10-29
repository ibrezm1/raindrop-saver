# Raindrop Saver Bookmarklet

A fast, lightweight static web page hosted on GitHub Pages designed to bypass browser Content Security Policy (CSP) and CORS restrictions when saving links to [Raindrop.io](https://raindrop.io) via a bookmarklet.

## How It Works

1. **The Bookmarklet:** When clicked on any website, it grabs the current page's URL and title, then opens your GitHub Pages app in a new tab:
   `https://ibrezm1.github.io/raindrop-saver/?url=...&title=...`
2. **The GitHub Pages App (`index.html`):**
   - Extracts the URL and title parameters.
   - Sends a `POST` request to the Raindrop API (`https://api.raindrop.io/rest/v1/raindrop`) using your Bearer token.
   - Avoids third-party CSP blocks since the request originates from your own GitHub Pages domain.
   - Displays a success state and automatically closes the tab after saving.

---

## Bookmarklet Setup

Create a new browser bookmark with the following URL (or visit your deployed GitHub Pages site directly and drag the button to your bookmarks bar):

```javascript
javascript:(function(){const u=encodeURIComponent(location.href);const t=encodeURIComponent(document.title);window.open('https://ibrezm1.github.io/raindrop-saver/?url='+u+'&title='+t,'_blank');})();
```

### Steps to add in your browser:
1. Open your browser's Bookmarks Manager (or press `Cmd+D` / `Ctrl+D` to bookmark any page).
2. Edit the newly created bookmark.
3. Set the Name to: `Save to Raindrop` (or any name you prefer).
4. Set the URL to the `javascript:...` snippet above.
5. Save it to your Bookmarks Bar.

---

## Enabling GitHub Pages

To make the saver active at `https://ibrezm1.github.io/raindrop-saver/`:

1. Go to your repository on GitHub: [ibrezm1/raindrop-saver](https://github.com/ibrezm1/raindrop-saver).
2. Click **Settings** &gt; **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **`main`** / Folder: **`/ (root)`**
4. Click **Save**.
5. After 1-2 minutes, GitHub Pages will deploy your site at `https://ibrezm1.github.io/raindrop-saver/`.

---

## Security Note

- Keep this repository private if you do not want your personal Raindrop API token exposed publicly.
- If you keep the repository public, you can also pass `&token=YOUR_TOKEN` in the bookmarklet query parameters or use browser `localStorage` rather than relying on a hardcoded token in the source code.
