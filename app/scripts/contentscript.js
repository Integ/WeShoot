'use strict';

console.log('\'Allo \'Allo! Content script');

var msg = {
    id: '',
    user: {
        name: '',
        avatar: ''
    },
    time: '',
    msg: {
        text: '',
        image: ''
    }
};
setInterval(function() {
    var id = $('.chatItem:last').attr('un');
    var avatar = $('.chatItemContent:last .avatar').attr('src');
    var name = $('.chatItemContent:last .avatar').attr('title');
    var text = $('.chatItemContent:last pre').text();
    var img = $('.chatItemContent:last .img_wrap img').attr('src');
    var time = $('.chatItem:last .time').text().trim();
    var newMsg = {
        id: id,
        user: {
            name: name,
            avatar: avatar
        },
        time: time,
        msg: {
            text: text,
            image: img
        }
    };
    if(id !== msg.id) {
        console.log(newMsg);
        msg = newMsg;
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
