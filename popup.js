const toggleBtn = document.getElementById("toggle");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const removedCount = document.getElementById("removedCount");
const redirectCount = document.getElementById("redirectCount");
const lastActivity = document.getElementById("lastActivity");
const activityLog = document.getElementById("activityLog");

function updateUI(isEnabled, stats = {}) {
  if (isEnabled) {
    statusDot.className = "status-dot active";
    statusText.textContent = "Active - Blocking YouTube Shorts";
    toggleBtn.textContent = "Disable Protection";
    toggleBtn.className = "toggle-button enabled";
  } else {
    statusDot.className = "status-dot inactive";
    statusText.textContent = "Inactive - Shorts not blocked";
    toggleBtn.textContent = "Enable Protection";
    toggleBtn.className = "toggle-button disabled";
  }
  
  removedCount.textContent = stats.removedElements || 0;
  redirectCount.textContent = stats.blockedRedirects || 0;
  lastActivity.textContent = stats.lastActivity || "Never";
  
  if (stats.recentActivity) {
    activityLog.innerHTML = stats.recentActivity
      .slice(-5)
      .map(activity => `<div class="activity-item">${activity}</div>`)
      .join('');
  }
}

function formatTime(timestamp) {
  if (!timestamp) return "Never";
  const now = new Date();
  const time = new Date(timestamp);
  const diff = now - time;
  
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return time.toLocaleDateString();
}

chrome.storage.sync.get(["enabled", "stats"], (data) => {
  const isEnabled = data.enabled ?? true;
  const stats = data.stats || {};
  
  if (stats.lastActivity) {
    stats.lastActivity = formatTime(stats.lastActivity);
  }
  
  updateUI(isEnabled, stats);
});

toggleBtn.onclick = () => {
  chrome.storage.sync.get(["enabled", "stats"], (data) => {
    const newValue = !(data.enabled ?? true);
    const stats = data.stats || {};
    
    stats.lastActivity = Date.now();
    if (!stats.recentActivity) stats.recentActivity = [];
    
    const action = newValue ? "enabled" : "disabled";
    stats.recentActivity.push(`${formatTime(Date.now())}: Extension ${action}`);
    
    chrome.storage.sync.set({ 
      enabled: newValue,
      stats: stats
    }, () => {
      updateUI(newValue, {
        ...stats,
        lastActivity: formatTime(stats.lastActivity)
      });
    });
  });
};

chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled || changes.stats) {
    chrome.storage.sync.get(["enabled", "stats"], (data) => {
      const isEnabled = data.enabled ?? true;
      const stats = data.stats || {};
      
      if (stats.lastActivity) {
        stats.lastActivity = formatTime(stats.lastActivity);
      }
      
      updateUI(isEnabled, stats);
    });
  }
});