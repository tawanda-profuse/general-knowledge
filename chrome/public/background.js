// eslint-disable-next-line no-undef
chrome.action.onClicked.addListener(() => {
    // eslint-disable-next-line no-undef
  chrome.tabs.create({ url: "index.html" });
});
