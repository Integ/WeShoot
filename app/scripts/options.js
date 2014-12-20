'use strict';

console.log('\'Allo \'Allo! Option');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        sendResponse({status: "OK"});
    }
);

var danmus = ['呜呜呜呜','呵呵','你和','sef','都等了多久多久多久','坑爹坑爹的','对对对','到底'];
var HEIGHT = window.innerHeight;
var WIDTH = window.innerWidth;
var danmuTop,danmuRight,danmuWidth,$danmuItem;
setInterval(function(key, danmu) {
  shoot(danmus[~~(Math.random()*danmus.length)])
},2000)
function shoot(danmu) {
  // $.each(danmus, function(key, danmu) {
  // console.log(danmu);
    $danmuItem = $('<div>'+danmu+'</div>').addClass('weshoot-item').addClass('default');
    
    $danmuItem.hide().appendTo('body');
    // console.log($danmuItem.width());
    $danmuItem.css({
      top: ~~(Math.random() * HEIGHT),
      left: WIDTH+$danmuItem.width(),
      width: $danmuItem.width()
      // 'transition-duration': ~~(Math.random() * 5) + 10
    }).show();
    // $danmuItem.css('right',WIDTH);
    $danmuItem.animate({
      left: -$danmuItem.width()
    },~~(Math.random() * 15) + 15000, 'linear', function() {
      /* stuff to do after animation is complete */
      console.log($(this).css('left').slice(0,-2))
      if($(this).css('left').slice(0,-2) <= '-'+$danmuItem.width()) {
        $(this).remove();
      }
    });
  // })
}

