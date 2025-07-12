document.getElementById('returnBtn').addEventListener('click', () => {
  chrome.tabs.update({ url: "https://www.youtube.com" });
});
