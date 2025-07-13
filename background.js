chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "redirectToBlockPage") {
    if (sender.tab && sender.tab.id) {
      const blockUrl = chrome.runtime.getURL("block.html");
      
      // Use location.replace to avoid adding to history
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        func: (url) => {
          window.location.replace(url);
        },
        args: [blockUrl]
      }).catch(() => {
        // Fallback to regular tab update if scripting fails
        chrome.tabs.update(sender.tab.id, { url: blockUrl });
      });
      
      chrome.storage.sync.get("stats", (data) => {
        const stats = data.stats || {};
        stats.blockedRedirects = (stats.blockedRedirects || 0) + 1;
        stats.lastActivity = Date.now();
        
        if (!stats.recentActivity) stats.recentActivity = [];
        const timeStr = new Date().toLocaleTimeString();
        stats.recentActivity.push(`${timeStr}: Blocked shorts redirect`);
        
        if (stats.recentActivity.length > 10) {
          stats.recentActivity = stats.recentActivity.slice(-10);
        }
        
        chrome.storage.sync.set({ stats });
      });
    }
  }
});