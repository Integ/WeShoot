'use strict';

console.log('\'Allo \'Allo! Option');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        sendResponse({status: "OK"});
    }
);

var danmus = [1,2,3];
var HEIGHT = window.innerHeight;
var danmuTop,danmuRight,danmuWidth,$danmuItem;
$.each(danmus, function(danmu) {
	console.log(danmu);
	$danmuItem = $('<span>'+danmu+'</span>').addClass('weshoot-item').addClass('default');
	$danmuItem.css({
		top: ~~(Math.random() * HEIGHT),
		right: -$danmuItem.width()
	})
	$danmuItem.appendTo('body');
})
