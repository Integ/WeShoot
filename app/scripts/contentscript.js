'use strict';
if (location.host === 'w.qq.com') {
    var platform = 'qq';
} else if (location.host === 'wx.qq.com') {
    var platform = 'wx';
} else {
    platform = 'other';
}

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

function makeData() {
    if (platform === 'qq') {
        if ($('.chat_content:last img').length) {
            var text = $('.chat_content:last').html();
        } else {
            var text = $('.chat_content:last').text();
        }
        var img = '';
        var newMsg = {
            id: text,
            user: {
                name: $('.chat_content_group:last .chat_nick').text(),
                avatar: $('.chat_content_group:last .chat_content_avatar').attr('src')
            },
            time: $('.chatItem:last .time').text().trim(),
            msg: {
                text: text,
                image: img
            }
        };
    } else if (platform === 'wx') {
        if ($('.chatItemContent:last pre img').length) { //微信发带表情的内容
            $('.chatItemContent:last pre img').each(function() {
                var src = $(this).attr('src');
                $(this).attr('src', 'https://wx.qq.com' + src);
            });
            var text = $('.chatItemContent:last pre').html();
        } else {
            var text = $('.chatItemContent:last pre').text();
        }
        if ($('.chatItemContent:last .img_wrap img').length) { //微信发照片
            var img = 'https://wx.qq.com' + $('.chatItemContent:last .img_wrap img').attr('src');
        } else if ($('.chatItemContent:last .customEmoji').length) {
            var img = 'https://wx.qq.com' + $('.chatItemContent:last .customEmoji').attr('src');
        } else {
            var img = '';
        }
        var newMsg = {
            id: $('.chatItem:last').attr('un'),
            user: {
                name: $('.chatItemContent:last .avatar').attr('title'),
                avatar: 'https://wx.qq.com' + $('.chatItemContent:last .avatar').attr('src')
            },
            time: $('.chatItem:last .time').text().trim(),
            msg: {
                text: text,
                image: img
            }
        };
    }
    return newMsg;
}

function notifyMe(data) {
    if (!Notification) {
        alert('Please us a modern version of Chrome, Firefox, Opera or Firefox.');
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    var notification = new Notification(data.msg.text, {
        icon: data.user.avatar,
        body: data.msg.test,
    });

    setTimeout(function() {
        notification.close();
    }, 1e4);
}

function shoot(danmu) {
    $danmuItem = $('<div>' + danmu + '</div>').addClass('weshoot-item').addClass('default');

    $danmuItem.hide().appendTo('body');
    $danmuItem.css({
        'font-size': ~~(Math.random() * 10) + 18,
    })
    $danmuItem.css({
        top: Math.max(0,~~(Math.random() * HEIGHT) - $danmuItem.height()),
        left: WIDTH + $danmuItem.width(),
        color: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16),
        width: $danmuItem.width(),
    }).show();
    $danmuItem.animate({
        left: -$danmuItem.width()
    }, ~~(Math.random() * 15) + 15000, 'linear', function() {
        if (-$(this).css('left').slice(0, -2) - 100 <= $danmuItem.width()) {
            $(this).remove();
        }
    });
}

if (platform === 'wx') {
    $('#chatMainPanel').bind("DOMNodeInserted DOMNodeRemoved", function() {
        var newMsg = makeData();
        if (newMsg.id && newMsg.id !== msg.id) {
            console.log(newMsg);
            chrome.runtime.sendMessage(newMsg, function(response) {
                console.log(response);
            });
            //notifyMe(newMsg);
            msg = newMsg;
        }
    });
} else if (platform === 'qq') {
    $('body').bind("DOMNodeInserted DOMNodeRemoved", function() {
        var newMsg = makeData();
        if (newMsg.id && newMsg.id !== msg.id) {
            console.log(newMsg);
            chrome.runtime.sendMessage(newMsg, function(response) {
                console.log(response);
            });
            //notifyMe(newMsg);
            msg = newMsg;
        }
    });
} else if (platform === 'other') {
    console.log('WeShoot ready!');
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(request);
            if (request.msg.text) {
                shoot(request.msg.text);
            } else {
                shoot('<img src="' + request.msg.image + '" />');
            }
            sendResponse({
                status: "OK"
            });
        }
    );

    var danmus = ['呜呜呜呜', '呵呵', '你和', 'sef', '都等了多久多久多久', '坑爹坑爹的', '对对对', '到底'];
    var HEIGHT = window.innerHeight;
    var WIDTH = window.innerWidth;
    var danmuTop, danmuRight, danmuWidth, $danmuItem;
    // setInterval(function(key, danmu) {
    //   shoot(danmus[~~(Math.random()*danmus.length)])
    // },50)
}
