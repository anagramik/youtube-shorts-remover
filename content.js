function removeShorts() {
  chrome.storage.sync.get(["enabled", "stats"], (data) => {
    if (!data.enabled) return;

    const selectors = [
      'ytd-rich-shelf-renderer[is-shorts]',
      'ytd-reel-shelf-renderer',
      'ytd-rich-item-renderer:has(a[href*="shorts"])',
      'ytd-grid-video-renderer:has(a[href*="/shorts/"])',
      'ytd-video-renderer:has(a[href*="/shorts/"])',
      'a[href^="/shorts/"]',
      'ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]'
    ];

    let removedCount = 0;
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      removedCount += elements.length;
      elements.forEach(el => el.remove());
    });

    if (removedCount > 0) {
      const stats = data.stats || {};
      stats.removedElements = (stats.removedElements || 0) + removedCount;
      stats.lastActivity = Date.now();
      
      if (!stats.recentActivity) stats.recentActivity = [];
      const timeStr = new Date().toLocaleTimeString();
      stats.recentActivity.push(`${timeStr}: Removed ${removedCount} shorts elements`);
      
      if (stats.recentActivity.length > 10) {
        stats.recentActivity = stats.recentActivity.slice(-10);
      }
      
      chrome.storage.sync.set({ stats });
    }
  });
}

function checkForShorts() {
  chrome.storage.sync.get("enabled", (data) => {
    if (!data.enabled) return;

    if (location.pathname.startsWith("/shorts/")) {
      chrome.runtime.sendMessage({ type: "redirectToBlockPage" });
    }
  });
}

removeShorts();
checkForShorts();

const observer = new MutationObserver(() => {
  removeShorts();
  checkForShorts();
});
observer.observe(document.body, { childList: true, subtree: true });

const _pushState = history.pushState;
history.pushState = function () {
  _pushState.apply(history, arguments);
  removeShorts();
  checkForShorts();
};
window.addEventListener("popstate", () => {
  removeShorts();
  checkForShorts();
});