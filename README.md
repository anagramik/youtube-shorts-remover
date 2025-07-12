# YouTube Shorts Remover

A browser extension that removes YouTube Shorts, redirecting them to a block page.

## Features

- Removes YouTube Shorts from the homepage, subscriptions, and search results.
- Blocks direct access to YouTube Shorts videos.
- Redirects Shorts links to a simple block page.

## Installation

### From the Chrome Web Store

(Link to be added here)

### For Developers

1. Clone this repository:
   ```bash
   git clone https://github.com/anagramik/youtube-shorts-remover.git
   ```
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the cloned repository folder.

## How it works

This extension uses a combination of content scripts and declarative network request rules to block and hide YouTube Shorts.

- **Content Script (`content.js`):** This script runs on all YouTube pages and removes Shorts elements from the DOM. It also detects when you navigate to a Shorts video and sends a message to the background script to redirect you.
- **Background Script (`background.js`):** This script listens for messages from the content script and handles the redirection to the block page.
- **Declarative Net Request (`rules.json`):** This provides rules to block requests to Shorts URLs, preventing them from loading in the first place.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
