chrome.runtime.onInstalled.addListener(function() {
    let timer = setTimeout(() => alert("Yep, this worked."), 10000);
});

