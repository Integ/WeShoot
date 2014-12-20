'use strict';

console.log('\'Allo \'Allo! Option');

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "WeShoot");
  port.onMessage.addListener(function(msg) {
    console.log(msg)
  });
});

var danmus = [1111,22222222,33333333];
var HEIGHT = window.innerHeight;
var danmuTop,danmuRight,danmuWidth,$danmuItem;
$.each(danmus, function(key, danmu) {
	// console.log(danmu);
	$danmuItem = $('<span>'+danmu+'</span>').addClass('weshoot-item').addClass('default');
  console.log($danmuItem.width())
	$danmuItem.css({
		top: ~~(Math.random() * HEIGHT),
		right: -$danmuItem.width()
	})
	$danmuItem.appendTo('body');
})