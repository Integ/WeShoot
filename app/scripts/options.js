'use strict';

console.log('\'Allo \'Allo! Option');

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

var danmus = ['呜呜呜呜', '呵呵', '约吗', '不约，叔叔我们不约', '100块钱都不给我', '坑爹坑爹的', '对对对', '到底'];
var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
var danmuTop, danmuRight, danmuWidth, $danmuItem;
/*
setInterval(function(key, danmu) {
    shoot(danmus[~~(Math.random() * danmus.length)])
}, 100)
*/
function shoot(danmu) {
    // $.each(danmus, function(key, danmu) {
    // console.log(danmu);
    $danmuItem = $('<div>' + danmu + '</div>').addClass('weshoot-item').addClass('default');

    $danmuItem.hide().appendTo('body');
    // console.log(Math.floor(Math.random()*0xFFFFFF).toString(16));
    $danmuItem.css({
        'font-size': ~~(Math.random() * 10) + 18,
    })
    $danmuItem.css({
        top: ~~(Math.random() * HEIGHT) - $danmuItem.height(),
        left: WIDTH + $danmuItem.width(),
        color: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16),
        width: $danmuItem.width(),
    }).show();
    // $danmuItem.css('right',WIDTH);
    $danmuItem.animate({
        left: -$danmuItem.width()
    }, ~~(Math.random() * 15) + 15000, 'linear', function() {
        /* stuff to do after animation is complete */
        // console.log($(this).css('left').slice(0,-2))
        if (-$(this).css('left').slice(0, -2) - 100 <= $danmuItem.width()) {
            $(this).remove();
        }
    });
    // })
}
