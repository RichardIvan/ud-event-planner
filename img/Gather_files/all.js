'use strict';

console.log('hello world');

console.log(document.styleSheet);

var el = document.getElementById('fa');
console.log(el);
var main = document.getElementById('main');
var overlay = document.getElementById('overlay');
var body = document.getElementsByTagName('body')[0];
var style = window.getComputedStyle(body, null).getPropertyValue('font-size');
var bodyHeight = body.clientHeight;
var fontSize = parseFloat(style);
var fabContainer = document.getElementsByClassName('fab-container')[0];
// now you have a proper float for the font size (yes, it can be a float, not just an integer)
// el.style.fontSize = (fontSize + 1) + 'px';
// console.log( fontSize );

// alert( fabContainer  );
// console.log( fabContainer );
// alert( bodyHeight - ( fontSize * 8 ) );

var h = bodyHeight - fontSize * 8;
fabContainer.style.height = h;
fabContainer.style.minHeight = h;

el.addEventListener('click', function (e) {
	el.classList.toggle('expand-animation');
	setTimeout(function () {
		el.classList.toggle('expanded');
		overlay.classList.add('visible');
	}, 0);
});

console.log();
// var el = document.getElementById('foo');

// document.getElementById( 'fa' ).on( 'click', function( e ) {
// 	alert('msg');
// });