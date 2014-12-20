'use strict';

console.log('\'Allo \'Allo! Content script');

var Msgs = [];
setInterval(function() {
    var id = $('.chatItem:last').attr('un');
    var avatar = $('.chatItemContent:last .avatar').attr('src');
    var name = $('.chatItemContent:last .avatar').attr('title');
    var text = $('.chatItemContent:last').text();
    if(text !== Msgs[Msgs.length-1]) {
        console.log(text);
        Msgs.push(text);
    }
}, 1e3);

var port = chrome.runtime.connect({name: "WeShoot"});
port.postMessage({joke: "敲门"});
port.onMessage.addListener(function(msg) {
      if (msg.question == "是谁？")
        port.postMessage({answer: "女士"});
  else if (msg.question == "哪位女士？")
        port.postMessage({answer: "Bovary 女士"});
});
