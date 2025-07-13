# YouTube Shorts Remover

A powerful browser extension that removes YouTube Shorts and blocks access to short-form content, helping you stay focused while browsing YouTube.

## ✨ Features

### 🛡️ Content Blocking
- **Smart Element Removal**: Automatically removes YouTube Shorts elements from the homepage, subscriptions, search results, and recommendations
- **Direct Access Protection**: Blocks direct navigation to Shorts URLs (`youtube.com/shorts/`)
- **Real-time Monitoring**: Continuously scans for new Shorts content as you browse

### 📊 Enhanced Options Page
- **Modern UI**: Beautiful, professional interface with real-time status indicators
- **Activity Dashboard**: Live statistics showing blocked redirects, removed elements, and last activity
- **Visual Status**: Color-coded status dots (green = active, red = inactive)
- **Activity Log**: Recent activity feed showing the last 5 extension actions

### 🚫 Custom Block Page
- **Branded Interface**: Professional block page clearly identifying the extension
- **Informative Design**: Explains why content was blocked and the benefits
- **Real-time Statistics**: Shows live stats from your browsing session
- **User-friendly Navigation**: Easy return to YouTube main content

### 🔄 Browser Navigation
- **Back Button Support**: Proper browser history handling - back button works as expected
- **Clean History**: Blocked URLs don't clutter your browser history
- **Seamless Experience**: No broken navigation or error pages

## 🎨 Interface Preview

### Extension Popup
- **Header**: Blue branded header with extension name
- **Status Card**: Shows current protection status with visual indicators
- **Statistics**: Real-time counters for blocked content
- **Activity Feed**: Scrollable log of recent extension actions

### Block Page
- **Extension Badge**: Clear "🛡️ YouTube Shorts Remover Extension" identifier
- **Modern Design**: Glass-morphism card with gradient background
- **Statistics Display**: Shows redirects blocked, elements removed, and activity timing
- **Professional Messaging**: Clear explanation of why content was blocked

## 🚀 Installation

### For Users
1. Download the extension files
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension folder
5. The extension icon will appear in your toolbar

### For Developers
```bash
git clone https://github.com/anagramik/youtube-shorts-remover.git
cd youtube-shorts-remover
```
Then follow the user installation steps above.

## 🔧 How It Works

### Multi-layer Protection System

1. **Content Script (`content.js`)**
   - Runs on all YouTube pages (`*://www.youtube.com/*`)
   - Uses CSS selectors to identify and remove Shorts elements
   - Monitors navigation changes and page mutations
   - Tracks statistics for removed elements

2. **Background Script (`background.js`)**
   - Handles redirection requests from content script
   - Uses `chrome.scripting.executeScript()` with `location.replace()` for clean navigation
   - Manages statistics storage and activity logging
   - Ensures proper browser history handling

3. **Declarative Net Request (`rules.json`)**
   - Network-level blocking for direct Shorts URL access
   - Redirects `youtube.com/shorts/` to custom block page
   - Provides fallback protection for various access methods

4. **Enhanced UI Components**
   - **Popup (`popup.html/js`)**: Real-time dashboard with statistics and controls
   - **Block Page (`block.html/js`)**: Professional blocking interface with live stats
   - **Statistics System**: Persistent storage and real-time updates

### Technical Implementation

#### Smart Element Detection
```javascript
const selectors = [
  'ytd-rich-shelf-renderer[is-shorts]',
  'ytd-reel-shelf-renderer',
  'ytd-rich-item-renderer:has(a[href*="shorts"])',
  'ytd-grid-video-renderer:has(a[href*="/shorts/"])',
  'ytd-video-renderer:has(a[href*="/shorts/"])',
  'a[href^="/shorts/"]',
  'ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]'
];
```

#### Navigation Protection
- Intercepts `history.pushState` calls to Shorts URLs
- Monitors `popstate` events for navigation changes
- Uses MutationObserver for dynamic content detection

#### Statistics Tracking
- **Elements Removed**: Count of DOM elements hidden/removed
- **Redirects Blocked**: Number of direct URL access attempts blocked
- **Activity Log**: Timestamped record of recent actions
- **Real-time Updates**: Live synchronization across popup and block page

## 📁 File Structure

```
youtube-shorts-remover/
├── manifest.json          # Extension configuration
├── content.js             # Main content script
├── background.js           # Service worker
├── popup.html             # Extension popup interface
├── popup.js               # Popup functionality
├── block.html             # Custom block page
├── block.js               # Block page functionality
├── rules.json             # Network request rules
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # This file
```

## 🎯 Version History

### Version 1.3 (Latest)
- ✅ Enhanced popup interface with real-time statistics
- ✅ Professional custom block page with extension branding
- ✅ Fixed browser back button functionality
- ✅ Activity logging and statistics tracking
- ✅ Improved navigation handling with `location.replace()`
- ✅ Added `scripting` permission for better redirect control

### Previous Versions
- Version 1.2: Basic blocking functionality
- Version 1.0: Initial release

## 🛠️ Permissions Used

- `storage`: For saving user preferences and statistics
- `declarativeNetRequest`: For network-level URL blocking
- `tabs`: For managing tab redirections
- `scripting`: For clean navigation handling
- `host_permissions`: Access to `*://www.youtube.com/*`

## 🔧 Configuration

The extension works out of the box with no configuration required. You can:
- Toggle protection on/off via the popup
- View real-time statistics
- Monitor recent activity
- Access the custom block page when Shorts are accessed

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Report bugs or suggest features via issues
- Submit pull requests for improvements
- Help with testing and documentation

## 📄 License

This project is open source. Please check the license file for details.

## 🆘 Support

If you encounter any issues:
1. Check that the extension is enabled in `chrome://extensions`
2. Verify you're on a YouTube page (`www.youtube.com`)
3. Try disabling and re-enabling the extension
4. Check the browser console for any error messages

## 🚀 Future Enhancements

Potential future features:
- Whitelist/blacklist specific channels
- Time-based blocking schedules
- Export statistics data
- Support for other video platforms
- Custom blocking messages
