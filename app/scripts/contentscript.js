'use strict';
if(location.host === 'w.qq.com' ) {
    var platform = 'qq';
} else if(location.host === 'wx.qq.com') {
    var platform = 'wx';
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

setInterval(function() {
    if(platform === 'qq') {
        if($('.chat_content:last img').length) { //微信发带表情的内容
            var text = $('.chat_content:last').html();
        } else {
            var text = $('.chat_content:last').text();
        }
        var img = '';
        var newMsg = {
            id: $('.chat_content_group:last').attr('_sender_uin'),
            user: {
                name: $('.chat_content_group:last .chat_nick').text(),
                avatar: $('.chat_content_group:last .chat_content_avatar').attr('src')
            },
            time: $('.chatItem:last .time').text().trim(),
            msg: {
                text:  text,
                image: img
            }
        };
    } else if (platform === 'wx') {
        if($('.chatItemContent:last pre img').length) { //微信发带表情的内容
            $('.chatItemContent:last pre img').each(function() {
                var src = $(this).attr('src');
                $(this).attr('src', 'https://wx.qq.com' + src);
            });
            var text = $('.chatItemContent:last pre').html();
        } else {
            var text = $('.chatItemContent:last pre').text();
        }
        if($('.chatItemContent:last .img_wrap img').length) {   //微信发照片
            var img = 'https://wx.qq.com' + $('.chatItemContent:last .img_wrap img').attr('src');
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
                text:  text,
                image: img
            }
        };
    }
    if(newMsg.id !== msg.id) {
        console.log(newMsg);
        chrome.runtime.sendMessage(newMsg, function(response) {
              console.log(response);
        });
        msg = newMsg;
    }
}, 1e3);
