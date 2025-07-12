const toggleBtn = document.getElementById("toggle");

chrome.storage.sync.get("enabled", (data) => {
  const isEnabled = data.enabled ?? true;
  toggleBtn.textContent = isEnabled ? "Disable" : "Enable";
});

toggleBtn.onclick = () => {
  chrome.storage.sync.get("enabled", (data) => {
    const newValue = !(data.enabled ?? true);
    chrome.storage.sync.set({ enabled: newValue }, () => {
      toggleBtn.textContent = newValue ? "Disable" : "Enable";
    });
  });
};