chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "redirectToBlockPage") {
    if (sender.tab && sender.tab.id) {
      chrome.tabs.update(sender.tab.id, {
        url: chrome.runtime.getURL("block.html")
      });
    }
  }
});