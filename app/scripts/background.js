'use strict';

chrome.runtime.onInstalled.addListener(function(details) {
    console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({
    text: 'WS'
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, request, function(response) {
                console.log(response);
            });
        });
    }
);
console.log('\'Allo \'Allo! Event Page for Browser Action');
