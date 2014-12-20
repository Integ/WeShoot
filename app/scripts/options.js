'use strict';

console.log('\'Allo \'Allo! Option');

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "敲门");
  port.onMessage.addListener(function(msg) {
    if (msg.joke == "敲门")
      port.postMessage({question: "是谁？"});
    else if (msg.answer == "女士")
      port.postMessage({question: "哪位女士？"});
    else if (msg.answer == "Bovary 女士")
      port.postMessage({question: "我没听清楚。"});
  });
});

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