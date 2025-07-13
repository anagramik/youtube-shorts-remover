// Handle the return button click
document.getElementById('returnBtn').addEventListener('click', () => {
  window.location.href = "https://www.youtube.com";
});

// Load and display statistics
function loadStats() {
  try {
    chrome.storage.sync.get(["stats"], (data) => {
      const stats = data.stats || {};
      
      document.getElementById('blockedCount').textContent = stats.blockedRedirects || 0;
      document.getElementById('removedCount').textContent = stats.removedElements || 0;
      
      if (stats.lastActivity) {
        const lastTime = new Date(stats.lastActivity);
        const now = new Date();
        const diff = now - lastTime;
        
        let timeText = "Never";
        if (diff < 60000) timeText = "Just now";
        else if (diff < 3600000) timeText = `${Math.floor(diff / 60000)}m ago`;
        else if (diff < 86400000) timeText = `${Math.floor(diff / 3600000)}h ago`;
        else timeText = lastTime.toLocaleDateString();
        
        document.getElementById('lastActivity').textContent = timeText;
      } else {
        document.getElementById('lastActivity').textContent = "Never";
      }
    });
  } catch (error) {
    // Fallback if chrome.storage is not available
    document.getElementById('blockedCount').textContent = "N/A";
    document.getElementById('removedCount').textContent = "N/A";
    document.getElementById('lastActivity').textContent = "N/A";
  }
}

// Set current timestamp
document.getElementById('timestamp').textContent = new Date().toLocaleString();

// Load stats when page loads
loadStats();
