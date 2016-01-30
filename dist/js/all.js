'use strict';

var ref = new Firebase('https://event-creator.firebaseio.com/');

//
//
// SETUP CODE
//
//

console.log('hello world');

console.log(document.styleSheet);

var faButton = document.getElementById('fa');
// console.log( el );
var main = document.getElementById('main');
var overlay = document.getElementById('overlay');
var body = document.getElementsByTagName('body')[0];
var style = window.getComputedStyle(body, null).getPropertyValue('font-size');
var bodyHeight = body.clientHeight;
var fontSize = parseFloat(style);

var Spinner = function () {
	var spinner = document.getElementById('spinner');

	this.show = function () {
		spinner.classList.add('show');
	};
	this.hide = function () {
		spinner.classList.remove('show');
	};
};

var spinner = new Spinner();

//
// USER DATA
//

var User = function () {
	var location;

	var setUserLocation = function (loc) {

		// would we do this to have some extra layer of security, like saving and returning
		// the data only if the user is authorised via oAuth or such?

		location = loc;
		console.log(location);
		return location;
	};

	this.saveUserLocation = function (loc) {
		return setUserLocation(loc);
	};
	this.handleLocationError = function (error) {
		console.log(error);
		return false;
	};
	this.getUserLoation = function () {
		console.log("GETTING USER LOCATION");
		if (location) {
			console.log("HERE IS THE USER LOCATION");
			console.log(location);
			return location;
		} else return false;
	};
	this.determineUserLoation = function () {
		console.log(this);
		if (navigator.geolocation) {
			console.log(this);
			navigator.geolocation.getCurrentPosition(this.saveUserLocation, this.handleLocationError);
		} else {
			alert("Geolocation is not supported by this browser");
		}
	};
};

var u = new User();

// normally I would probably have the location stored in c cache since the user probably doesn't move that much
// within like 5 or 10 minutes so...
if (!u.getUserLoation()) {
	u.determineUserLoation();
}

var errorContainer = document.getElementById('error-container');
// sign in button in navigation menu
var signInNavOverlay = document.getElementById('sign-in');

var newAccountContainer = document.getElementsByClassName('new-account-container')[0];
var newEventContainer = document.getElementsByClassName('new-event-container')[0];

var eventOverlay = document.getElementById('event-overlay');
var eventOverlayCloseButton = document.querySelector('.close-button');

// eventOverlayCloseButton.addEventListener( 'click', function() {

// 	var original = document.getElementsByClassName( 'event-item' )[0];
// 	console.log( original );
// 	// original.style.backgroundImage = element.style.backgroundImage;
// 	// original.style.transition = 'all .3s ease-in-out';
// 	// original.style.top = element.offsetTop + 'px';
// 	// original.style.display = 'flex';
// 	// original.style['z-index'] = '100';

// 	eventOverlay.classList.add( 'move-away' );
// 	original.classList.add( 'move-away' );
// 	setTimeout( function() {
// 		eventOverlay.classList.remove( 'expand1' );
// 		eventOverlay.classList.remove( 'move-away' );
// 	}, 1000 );

// })

//
// NAV ITEMS
//

var hamburgerIcon = document.getElementsByClassName('icon')[0];
var navOverlay = document.getElementById('nav-overlay');
var fadedOverlay = document.getElementById('faded-overlay');

var createAccount = document.getElementById('create-account');

var cancelButtons = document.getElementsByClassName('cancel-button');

var newAccountHeader = document.getElementsByClassName('header')[0];
var newAccountFooter = document.getElementsByClassName('footer')[0];

var nearbyList = document.getElementById('nearby-list');
var closebyList = document.getElementById('closeby-list');
var farawayList = document.getElementById('faraway-list');

var nearbyButton = document.getElementsByClassName('nearby-button')[0];
var closebyButton = document.getElementsByClassName('closeby-button')[0];
var farawayButton = document.getElementsByClassName('faraway-button')[0];

var viewportElements = [nearbyList, closebyList, farawayList];

var originalElement = document.getElementsByClassName('event-item')[0];

//
//
// OVERLAY
//
//

var signInForm = document.getElementById('sign-in-form');
var signInOverLay = document.getElementById('sign-in-overlay');
var h2 = signInOverLay.querySelector('h2');

var passField = document.getElementById('pass');
var rePassField = document.getElementById('retype-pass');

var newAccountForm = document.getElementById('new-account-form');
var newEventForm = document.getElementById('new-event-form');

console.log(nearbyButton);

nearbyButton.addEventListener('click', function () {
	console.log('click');
	viewportElements.forEach(function (item) {
		item.classList.remove('lefty');
		item.classList.remove('left');
	});
});

closebyButton.addEventListener('click', function () {
	console.log('click');
	viewportElements.forEach(function (item) {
		item.classList.add('left');
		item.classList.remove('lefty');
	});
});

farawayButton.addEventListener('click', function () {
	console.log('click');
	viewportElements.forEach(function (item) {
		item.classList.add('lefty');
	});
});

//
//
// NAV MENU
//
//

var closeNav = function () {
	navOverlay.classList.remove('opened');
	fadedOverlay.classList.remove('opened');
};

fadedOverlay.addEventListener('click', function () {
	closeNav();
});

hamburgerIcon.addEventListener('click', function () {
	// console.log( 'add' );
	navOverlay.classList.add('opened');
	fadedOverlay.classList.add('opened');
});

//
//
// MAIN NAVIGATION ITEMS
//
//

var FireAuthData = ref.getAuth();
if (FireAuthData) {
	console.log(FireAuthData);
	console.log(FireAuthData.uid);
	signInNavOverlay.children[0].lastChild.data = "My Account";
	signInNavOverlay.setAttribute('onclick', 'showMyAccount()');

	// reauthenticate
	ref.authWithCustomToken(FireAuthData.token, function (error, data) {
		if (!error) {
			console.log('horay');
		}
	});

	var interval = 60000 * 60 * 23;
	setInterval(function () {
		ref.authWithCustomToken(FireAuthData.token, function (error, data) {
			if (!error) {
				console.log('horay');
			}
		});
	}, interval);
}

var closeAccountAndEventOverlay = function () {

	createAccount.querySelector('.submit-button').setAttribute('onclick', 'submitNewAccount()');
	createAccount.querySelector('.next-button').setAttribute('onclick', 'focusNextElement()');

	createAccount.classList.add('aside');
	main.classList.add('visible');

	setTimeout(function () {
		// remove all the classes
		createAccount.classList.remove('aside');

		overlay.classList.remove('visible');
		newAccountContainer.classList.remove('visible', 'visibly');
		newEventContainer.classList.remove('visible', 'visibly');

		// newAccountContainer.classList.remove( 'visible' );
		newAccountHeader.classList.remove('visible');
		newAccountFooter.classList.remove('visible');

		overlay.classList.remove('from-left', 'visible', 'from-left-to-middle');
	}, 300);
	// console.log( 'hello' );
};

var len = cancelButtons.length;
for (var i = 0; i < len; i++) {
	// console.log( i );
	// console.log( cancelButtons[i] );
	cancelButtons[i].addEventListener('click', function () {

		closeAccountAndEventOverlay();
	});
}

//
//
// MAIN VIEW
//
//

var AnimationElement = function () {
	var element;
	this.set = function (el) {
		element = el;
	};
	this.get = function () {
		return element;
	};
	this.pixelsToMove = 0;
};

var AE = new AnimationElement();

var eventViewClose = document.getElementById('event-view-close');
eventViewClose.addEventListener('click', function (e) {

	var o = document.getElementById('effect');

	console.log(originalElement);

	// var c = document.getElementById( 'event-view-close' );

	if (!o.classList.contains('visible')) {
		// we shoudl be adding classes here that will close the element quickly

		originalElement.children[2].style.transition = 'all .1s ease-in-out';
		originalElement.children[2].style.opacity = '0';
		originalElement.classList.add('hide');

		// var header = originalElement.children[1].classList.add( 'hide' );
		// var content = originalElement.children[2].classList.add( 'hide' );

		// originalElement.style.backgroundImage = element.style.backgroundImage;
		// originalElement.style.transition = 'all .3s ease-in-out';
		// originalElement.style.top = element.offsetTop + 'px';
		// originalElement.style.display = 'flex';
		// originalElement.style['z-index'] = '100';

		// eventOverlay.classList.add( 'move-away' );

		var hideEventOverLayContent = function () {
			originalElement.classList.remove('hide', 'seen');
			originalElement.children[1].classList.remove('visible');
			originalElement.children[2].classList.remove('visibly', 'visible');

			// originalElement.classList.remove( 'visibly' );
			eventViewClose.classList.remove('visible');

			originalElement.style.transition = '';
			originalElement.style.transform = '';
			originalElement.style.display = '';
			originalElement.style['z-index'] = '';

			originalElement.children[2].style.transition = '';
			originalElement.children[2].style.opacity = '';
		};

		// originalElement.classList.add( 'move-away' );
		// eventViewClose.classList.remove( 'visible' );
		setTimeout(function () {
			// eventOverlay.classList.remove( 'expand1' );
			// eventOverlay.classList.remove( 'move-away' );
			// eventViewClose.classList.remove( 'visible' );

			originalElement.style.transition = 'all .3s ease-in-out';
			originalElement.style.transform = 'translateY(' + AE.pixelsToMove + 'px)';
			var animeEl = AE.get();
			animeEl.style.transform = 'translateY(' + 0 + 'px)';

			setTimeout(function () {
				hideEventOverLayContent();
			}, 300);
		}, 900);
	} else {

		eventViewClose.classList.remove('visible');
		o.classList.remove('visible');
		originalElement.classList.add('move-away');

		setTimeout(function () {

			console.log(originalElement.classList);

			originalElement.classList.remove('move-away', 'visibly', 'visible');
			originalElement.children[1].classList.remove('visible');
			originalElement.children[2].classList.remove('visibly', 'visible');

			console.log(originalElement.classList);
		}, 600);
	}
});

var showEventOverLayContent = function () {
	originalElement.children[1].classList.add('visible');
	originalElement.children[2].classList.add('visible');
	setTimeout(function () {
		originalElement.children[2].classList.add('visibly');
	}, 1500);
	eventViewClose.classList.add('visible');
};

var animateItem = function (element) {

	AE.set(element);

	var id = element.getAttribute('data-id');

	console.log(location);
	location.hash = "id=" + id;
	console.log(location.hash);
	var hash = location.hash;

	var hashValues = hash.substr(1).split('=');
	var idLocation = hashValues.indexOf('id') + 1;
	var idFromUrl = hashValues[idLocation];

	console.log(idFromUrl);

	var viewportOffset = element.getBoundingClientRect();
	var topRelativeToViewport = viewportOffset.top;

	AE.pixelsToMove = topRelativeToViewport;

	fillElementWithData(originalElement, id, true);

	// set the position of the originalElement so it overlays the clicked element!
	// originalElement.children[0].style.backgroundImage = element.children[0].style.backgroundImage;

	// originalElement.style.top = topRelativeToViewport + 'px';

	// originalElement.style.transform = 'translateY(' + topRelativeToViewport + 'px ) !important';
	originalElement.style.transform = 'translateY(' + topRelativeToViewport + 'px )';

	originalElement.classList.add('seen');
	originalElement.style.display = 'flex';
	originalElement.style['z-index'] = '100';

	// originalElement.style.leftMargin = el.leftMargin;
	// originalElement.style.display = 'block';

	// first transition doesn't work so we are faking a movement and herefrom the future transitions are being animated
	element.style.transition = 'transform .3s ease-in-out';
	element.style.transform = 'translateY(' + 0 + 'px )';

	showEventOverLayContent();

	// element.style.top = 0 + 'px';

	// var bgImage = element.style.backgroundImage;

	// var top = element.offsetTop;

	// var left = viewportOffset.left;
	// var left = element.offsetLeft;

	// element.style.position = 'relative';

	// var sum = -top + left;
	// element.style.top = -topRelativeToViewport + 'px';
	// originalElement.style.top = 0 + 'px';

	var pixelsToMove = -topRelativeToViewport;

	setTimeout(function () {
		originalElement.style.transform = 'translateY(' + 0 + 'px)';
		originalElement.style.transition = 'all .3s ease-in-out';
	}, 0);

	element.style.transform = 'translateY(' + pixelsToMove + 'px)';

	console.dir(element);

	// var text = element.querySelector( '.event-info' );
	// var map = element.querySelector( '.map-image' );
	// var border = element.querySelector( '.bottom-border' );

	// map.classList.add( 'invisible' );
	// text.classList.add( 'invisible' );
	// border.classList.add( 'invisible' );

	// console.log( sum );

	// setTimeout( function() {

	// 	// var el = {};
	// 	// var img = {};
	// 	// var elImg = {};

	// 	// el.height = element.offsetHeight;
	// 	// // width
	// 	// el.width = element.offsetWidth;
	// 	// ///top position
	// 	// el.topMargin = element.offsetTop;
	// 	// // left position
	// 	// el.leftMargin = element.offsetLeft;

	// 	// console.log( el );

	// 	// console.log( original );

	// 	// var eventOverlay = document.getElementById( 'event-overlay' );

	// 	// console.log( eventOverlay.querySelector( 'img' ) );

	// 	// console.dir( eventOverlay );
	// 	// eventOverlay.children[0].style.backgroundImage = bgImage;

	// 	// eventOverlay.classList.add( 'expand1' );

	// 	// ?????
	// 	// element.classList.add( 'expand' );
	// 	// ?????

	// 	// console.log( parseInt( element.style.top ) );

	// 	// var sum = parseInt( element.style.top ) - element.offsetLeft;

	// 	// console.log( sum );

	// 	setTimeout( function() {

	// 		// DO NOT TRANSITION BACK YET
	// 		//element.style.transform = 'translateY(' + 0 + 'px )';

	// 		// element.style['z-index'] = 1000;

	// 		// This bunch of code puts the element back it it's previous position plus it does reset the css in with JS

	// 		// setTimeout( function() {
	// 		// 	element.style.transform = '';
	// 		// 	element.style.transition = '';
	// 		// 	element.style.position = '';
	// 		// 	element.style.top = '';
	// 		// 	// map.classList.remove( 'invisible' );
	// 		// 	// text.classList.remove( 'invisible' );
	// 		// 	// border.classList.remove( 'invisible' );

	// 		// 	element.classList.remove( 'expand' );

	// 		// }, 2000 )

	// 	}, 100 )

	// }, 600)
};

var extractEventItem = function (elements) {
	var elements = elements;
	var len = elements.length;

	for (var i = 0; i < len; i++) {
		var element = elements[i];
		var classList = element.classList;
		if (classList.contains('event-item')) {
			element.style.transition = 'all .3s ease-in-out';
			element.style.top = 0 + 'px';
			// element.classList.add( 'step1', 'step2', 'step3' );
			console.dir(element);
			var top = element.offsetTop;
			var left = element.offsetLeft;

			element.style.position = 'relative';

			var sum = -top + left;
			element.style.top = sum + 'px';

			console.dir(element);

			var text = element.querySelector('.event-info');
			var map = element.querySelector('.map-image');
			var border = element.querySelector('.bottom-border');

			map.classList.add('invisible');
			text.classList.add('invisible');
			border.classList.add('invisible');

			console.log(sum);

			//next step is to expand width,
			// this can be doen with class

			// then we need to increase the height by 'left'
			// and decrease top by 'left'

			// var map = element.querySelector( '.map-image' );
			// map.classList.add( 'center' );

			// capture the width of the window
			//capture the width of the element
			// substract these values
			// divide the remainder by two ... that is the margin top and left
			// for the event-overlay

			// capture height

			setTimeout(function () {

				var el = {};
				var img = {};
				var elImg = {};

				el.height = element.offsetHeight;
				// width
				el.width = element.offsetWidth;
				///top position
				el.topMargin = element.offsetTop;
				// left position
				el.leftMargin = element.offsetLeft;

				// image.height = map.offsetHeight;
				// // width
				// image.width = map.offsetWidth;
				// ///top position
				// image.topMargin = map.offsetTop;
				// // left position
				// image.leftMargin = map.offsetLeft;

				// element.classList.add( 'invisible' );

				var eventOverlay = document.getElementById('event-overlay');
				eventOverlay.classList.add('expand1');
				// eventOverlay.classList.add(  );
				element.classList.add('expand');

				console.log(parseInt(element.style.top));

				// var sum = sum - left;
				// console.log( sum );

				var sum = parseInt(element.style.top) - element.offsetLeft;

				console.log(sum);

				setTimeout(function () {
					element.style.top = sum + 'px';
					// eventOverlay.classList.add( 'expand2' );
					// element.classList.add( 'expand' );
					setTimeout(function () {
						element.style.position = '';
						element.style.top = '';
						map.classList.remove('invisible');
						text.classList.remove('invisible');
						border.classList.remove('invisible');
						element.classList.remove('expand');
					}, 2000);
				}, 100);

				// eventOverlay.style.transition = 'all 10s ease-in-out';

				// eventOverlay.style.position = 'fixed';

				// eventOverlay.style.transition = 'all 10s ease-in-out';

				// eventOverlay.style.top = el.topMargin + 'px';
				// eventOverlay.style.left = el.leftMargin + 'px';
				// eventOverlay.style.top = 0;
				// eventOverlay.style.left = 0;
				// eventOverlay.style.width = el.width + 'px';
				// eventOverlay.style.height = el.height + 'px';
				// eventOverlay.style.width = '100%';
				// eventOverlay.style.height = '100%';
				// eventOverlay.style.margin = 0;
				// eventOverlay.style['z-index'] = 100;
				// eventOverlay.style['border-radius'] = 0;

				// var elImage = element.querySelector( 'img' );
				// // elImg.height = elImage.offsetHeight;
				// // elImg.width = elImage.offsetWidth;
				// elImg.topMargin = elImage.offsetTop + left;
				// elImg.leftMargin = elImage.offsetLeft + left + 1;

				// var image = eventOverlay.querySelector( 'img' );

				// image.style.transition = 'all .3s ease-in-out';

				// image.classList.add( 'visible' );
				// image.style.position = 'fixed';
				// image.style['margin-top'] = 0;
				// image.style.top = eventOverlay.style.top;
				// image.style.left = eventOverlay.style.left;
				// image.style.width = eventOverlay.style.width;
				// image.style.height = eventOverlay.style.height;
				// image.style['z-index'] = eventOverlay.style['z-index'];

				// set properties that will be transitioned

				// img.height = image.offsetHeight;
				// img.width = image.offsetWidth;
				// img.topMargin = image.offsetTop + left;
				// img.leftMargin = image.offsetLeft + left + 1;

				// image.style.position = 'fixed';
				// // image.style.height = elImg.height + 'px';
				// // image.style.width = elImg.width + 'px';
				// image.style.top = elImg.topMargin + 'px';
				// image.style.left = elImg.leftMargin + 'px';
				// image.style['margin-top'] = '0em';
				// image.style['z-index'] = 100;

				// // this might need to be moved up top

				// // image.style.position = 'fixed';
				// image.style.top = img.topMargin + 'px';
				// image.style.left = img.leftMargin + 'px';
				// image.style.width = img.width + 'px';
				// image.style.height = img.height + 'px';
				// image.style['z-index'] = 100;

				// image.classList.add( 'visible' );
			}, 600);

			// increase the z-index of map circle

			// element.style.left = left + 'px';
			break;
		}
	}
};

var eventItems = document.getElementsByClassName('event-item');

var HammerNearby = new Hammer(nearbyList);
var HammerCloseby = new Hammer(closebyList);
var HammerFaraway = new Hammer(farawayList);
var HammerOverylay = new Hammer(navOverlay);

HammerOverylay.on('swipeleft', function (ev) {
	navOverlay.classList.remove('opened');
	fadedOverlay.classList.remove('opened');
});

HammerNearby.on('swipeleft', function (ev) {
	viewportElements.forEach(function (item) {
		item.classList.add('left');
	});
});

HammerNearby.on('swiperight', function (ev) {
	viewportElements.forEach(function (item) {
		item.classList.remove('left');
	});
});

HammerCloseby.on('swipeleft', function (ev) {
	viewportElements.forEach(function (item) {
		item.classList.add('lefty');
	});
});

HammerCloseby.on('swiperight', function (ev) {
	viewportElements.forEach(function (item) {
		item.classList.remove('lefty');
		item.classList.remove('left');
	});
});

HammerFaraway.on('swiperight', function (ev) {
	viewportElements.forEach(function (item) {
		item.classList.remove('lefty');
	});
});

var h = bodyHeight - fontSize * 8;
newAccountContainer.style.height = h;
newAccountContainer.style.minHeight = h;

var showNewEvent = function () {
	swapButtons(false);

	faButton.classList.add('expand-animation');

	createAccount.querySelector('h2').innerText = "Create Event";
	createAccount.querySelector('.next-button').setAttribute('onclick', 'focusNextElementInNewEvent()');
	createAccount.querySelector('.submit-button').setAttribute('onclick', 'submitNewEvent()');

	overlay.classList.add('visible');
	// newAccountContainer.classList.add( 'visible' );
	// newEventContainer.classList.add( 'visible' );
	newEventContainer.classList.add('visibly');

	newAccountHeader.classList.add('visible');
	newAccountFooter.classList.add('visible');

	console.log(newAccountHeader);
	console.log(newAccountFooter);

	setTimeout(function () {

		newEventContainer.classList.add('visible');

		setTimeout(function () {
			faButton.classList.remove('expand-animation');
			faButton.classList.remove('expanded');
			main.classList.remove('visible');
		}, 300);
	}, 200);
};

faButton.addEventListener('click', function (e) {

	// IF the user is not signed in, show sign in/sign up page
	// else opoen the new event pag

	console.log(FireAuthData);

	if (!FireAuthData) {

		showSignIn();
	} else {

		showNewEvent();
	}
});

// var el = document.getElementById('foo');

// document.getElementById( 'fa' ).on( 'click', function( e ) {
// 	alert('msg');
// });

var searchForm = document.getElementById('search-form');
var saerchInput = document.getElementById('search-input');

var onSearch = function () {
	// searchForm.blur();
	saerchInput.blur();
	// console.log( 'saerchForm' );
};

// select input value on click within the new Account Form
// this needs to be refactored and should be accepting any form

var forms = document.getElementsByTagName('form');

var attachClickAndSelectFunctionToForm = function (forms) {
	// console.log( forms );
	for (var i = 0; i < forms.length; i++) {
		// console.log( forms[i] );
		var len = forms[i].length;
		for (var i = 0; i < len; i++) {
			var input = forms[i];
			console.log(input);
			if (input !== undefined) {
				input.addEventListener('click', function (e) {
					e.target.select();
				});
			}
		}
	}
};

attachClickAndSelectFunctionToForm(forms);

var showError = function (error) {

	var p = errorContainer.querySelector('p');

	var flashError = function (text) {
		// set inner text
		p.innerText = text;
		errorContainer.classList.add('visible');
		setTimeout(function () {
			errorContainer.classList.remove('visible');
		}, 3000);
	};

	switch (error) {
		case 1:
			console.log('pass too short');
			flashError('Password too short');
			break;
		case 2:
			console.log('there is no number in pass');
			flashError("Password doesn't contain number");
			break;
		case 3:
			console.log('there is no lowercase letter in pass');
			flashError("Password doesn't contain lowercase letter");
			break;
		case 4:
			console.log('there is no UpperCase Letter in pass');
			flashError("Password doesn't contain uppercase letter");
			break;
		case 5:
			console.log('passwords do not match');
			flashError("Passwords do not match");
			break;
		case 6:
			console.log('invalid birthday');
			flashError('Invalid Birthday');
			break;
		case 7:
			console.log('day is wrong');
			flashError('Incorrect Day format');
			break;
		case 8:
			console.log('month is wrong');
			flashError('Incorrect Month format');
			break;
		case 9:
			console.log('year is wrong');
			flashError('Incorrect Year format');
			break;
		case 10:
			console.log('Invalid Characters in Name');
			flashError('Name containes invalid characters');
			break;
		case 11:
			console.log('Invalid Email');
			flashError('Invalid Email Address');
			break;
		case 12:
			console.log('Email Already in Use');
			flashError('Email Already in Use');
			break;
		case 13:
			console.log('Account Successfully Created');
			flashError('Account Successfully Created');
			break;
		case 14:
			console.log('Sign In Successful');
			flashError('Sign In Successful');
			break;
		case 15:
			console.log('Incorrect email or password');
			flashError('Incorrect email or password');
			break;
		case 16:
			console.log('Logged out');
			flashError('Logged out');
			break;
		case 17:
			console.log('The specified user does not exist');
			flashError('The specified user does not exist');
			break;
		case 18:
			console.log('Incorrect hour format');
			flashError('Incorrect hour format');
			break;
		case 19:
			console.log('Incorrect minute format');
			flashError('Incorrect minute format');
			break;
		case 20:
			console.log('Incorrect minute format');
			flashError('Invalid event start date format');
			break;
		case 21:
			console.log('Incorrect minute format');
			flashError('Invalid event end date format');
			break;
		case 22:
			console.log('No support for device location');
			flashError('No support for device location');
			break;
		case 23:
			console.log('Invalid Date Format');
			flashError('Invalid Date Format');
			break;
		case 24:
			console.log('Event Successfully Created');
			flashError('Event Successfully Created');
			break;
		case 25:
			console.log('Event End Date Is Before Start Date');
			flashError('Event End Date Is Before Start Date');
			break;
		case 26:
			console.log('Event End Time Is Before Start Time');
			flashError('Event End Time Is Before Start Time');
			break;
		case 27:
			console.log('Event Cannot Start Before Today');
			flashError('Event Cannot Start Before Today');
			break;
		case 28:
			console.log('You are already attending this event');
			flashError('You are already attending this event');
			break;
	}
};

var swapButtons = function (on) {
	var accFooter = document.getElementsByClassName('footer')[0];
	console.dir(accFooter);
	if (on) {
		for (var i = 0; i < 2; i++) {
			accFooter.children[1].children[i].classList.add('visible');
		}
	} else {
		for (var i = 0; i < 2; i++) {
			accFooter.children[1].children[i].classList.remove('visible');
		}
	}
};

var resetFieldsButton = document.getElementById('reset-fields');

var resetFields = function () {
	resetFieldsButton.children[0].classList.add('rotate');
	setTimeout(function () {
		resetFieldsButton.children[0].classList.remove('rotate');
	}, 500);

	var h2 = overlay.querySelector('h2');

	if (h2.innerText === "NEW ACCOUNT") {
		var len = newAccountForm.length;
		for (var i = 0; i < len; i++) {
			var element = newAccountForm.children[i];
			element.value = '';
		}
		newAccountObject = {};
	} else {
		var len = newEventForm.length;
		for (var k = 0; k < len; k++) {
			var element = newEventForm.children[k];
			element.value = '';
		}
		newEventObject = {};
	}
};

resetFieldsButton.addEventListener('click', function () {
	// resetFieldsButton.classList.remove( 'end' );

	resetFields();

	// resetFields.classList.add( 'end' );
});

var setFocus = function (el) {
	console.log(el);
};

var focusNextElement = function (element) {

	checkIfFormReadyForSubmit(true);

	for (var i = 0; i < 6; i++) {
		var element = newAccountForm[i];
		if (element.value === '') {
			if (i === 0) {
				newAccountForm[i + 1].scrollIntoView(false);
			} else {
				newAccountForm[i - 1].scrollIntoView(true);
			}
			// element.scrollIntoView(true);
			element.focus();
			return;
		}
	}
};

var checkIfFormReadyForSubmit = function (status) {

	if (status) {
		for (var i = 0; i < 5; i++) {
			var element = newAccountForm[i];
			if (element.value === '') {
				swapButtons(false);
				return;
			}
		}
		swapButtons(true);
	} else {
		swapButtons(false);
	}
};

//
// ACCOUNT AND EVENT UTILITY
//

var saveInputDataToObject = function (id, obj) {

	// obj === true if it is the event object
	if (obj) {
		if (newEventForm[id].value !== '') {
			newEventObject[id] = newEventForm[id].value;
		}
	} else {
		if (newAccountForm[id].value !== '') {
			newAccountObject[id] = newAccountForm[id].value;
		}
	}

	console.log(newEventObject);
};

//
//
//
//
// NEW ACCOUNT
//
//
//
//

var newAccountObject = {};

var processEmployer = function () {

	saveInputDataToObject('employer', false);
};

var processJobTitle = function () {

	saveInputDataToObject('jobtitle', false);
};

var validatePass = function (pass) {

	if (pass.length === 0) {
		return false;
	}
	if (pass.length < 6) {
		showError(1);
		passField.select();
		return false;
	}
	var re = /[0-9]/;
	if (!re.test(pass)) {
		console.log('there is no number');
		showError(2);
		passField.select();
		return false;
	}
	re = /[a-z]/;
	if (!re.test(pass)) {
		console.log('there is no lowercase letter');
		showError(3);
		passField.select();
		return false;
	}
	re = /[A-Z]/;
	if (!re.test(pass)) {
		console.log('there is no UpperCase Letter');
		showError(4);
		passField.select();
		return false;
	} else return true;
};

var checkPass = function () {

	// var passWord = passField.value;
	// var retypePass = rePassField.value;

	console.log(newAccountForm['retype-pass']);

	var inputValid = false;

	// if it's only first field that we filled in, check only this field
	if (newAccountForm['retype-pass'].value === '') {

		// if( newAccountForm['pass'])

		inputValid = validatePass(newAccountForm['pass'].value);
	} else if (newAccountForm.pass.value !== newAccountForm['retype-pass'].value) {
		console.log('passwords do not match');
		newAccountForm['retype-pass'].select();
		showError(5);
	} else {

		saveInputDataToObject('pass', false);
		inputValid = true;
	}

	if (inputValid) {
		checkIfFormReadyForSubmit(true);
	} else {
		// switch next/confirm buttons
		checkIfFormReadyForSubmit(false);
	}

	// console.log( passField.value );
	// console.log( rePassField.value );
};

var submitNewAccount = function () {

	spinner.show();

	console.log(newAccountForm);
	console.dir(newAccountForm);

	console.log(newAccountObject);

	Object.keys(newAccountObject).map(function (key) {
		newAccountObject[key].trim();
	});

	// var len = newAccountForm.length;

	var credentials = {};
	credentials.email = newAccountObject['email'];
	credentials.password = newAccountObject['pass'];

	ref.createUser(credentials, function (error, user) {
		if (error) {
			console.log(error);
			showError(12);
		} else {
			console.log(user);
			ref.authWithPassword(credentials, function (error, user) {
				if (error) {
					console.log(error);
				} else {
					console.log(user);

					var uid = user.auth.uid;
					var obj = {};
					delete newAccountObject['email'];
					delete newAccountObject['pass'];
					// obj.name = newAccountForm.name.value;
					// obj.birthday = newAccountForm.birthday.value;
					// obj.employer = newAccountForm.employer.value;
					// obj.job = newAccountForm.jobtitle.value;
					// console.log( obj );
					ref.child('users').child(uid).child('info').set(newAccountObject, function (error, data) {

						if (error) {
							console.log('error');
						} else {

							closeAccountAndEventOverlay();

							changeSignInButtonToMyAccount();

							resetFields();
							newAccountObject = {};

							spinner.hide();

							showError(13);
						}
					});

					// if the previous state was that the user wanted to
					// create an event but didn't have an account, then
					// the state shoudl return to event creation page.

					// figure out the State of the applicatino and if the user
					// was creating a new event before
					// the app should switch back to that state..

					// showSignIn();

					// close the overlay and all
				}
			});
		}
	});
};

var nameCheck = function () {
	var name = newAccountForm.name.value;
	var re = /^[a-zA-Z\s]+$/;
	if (name.length !== 0 && re.test(name)) {
		saveInputDataToObject('name', false);
		return true;
	} else if (name.length === 0) {
		return false;
	} else {
		newAccountForm.name.select();
		console.log('Invalid Characters');
		showError(10);
	}
};

var checkDOB = function () {

	// if ( inputValid ) {
	// 	checkIfFormReadyForSubmit( true );
	// } else {
	// 	// switch next/confirm buttons
	// 	checkIfFormReadyForSubmit( false );
	// }

	var bday = newAccountForm.birthday.value;
	var len = bday.length;

	if (len === 0) {
		checkIfFormReadyForSubmit(false);
		return;
	}

	console.log(bday);
	console.log(len);

	var checkIfAllDigits = function (numbers) {
		var re = /^\d+$/;
		console.log(re.test(numbers));
		if (re.test(numbers)) {
			return true;
		} else return false;
	};

	var checkValidityOfNumbers = function (numbers) {
		var bday = numbers;
		var day = bday.substring(0, 2);
		console.log(day);
		if (day > 0 && day <= 31) {
			var month = bday.substring(2, 4);
			console.log(month);
			if (month > 0 && month <= 12) {
				var year = bday.substring(4, 8);
				console.log(year);

				var today = new Date();
				var minYear = today.getFullYear() - 100;
				var maxYear = today.getFullYear() - 13;

				if (year >= minYear && year <= maxYear) {
					console.log('OK');
					console.log(bday);
					return;
				} else {
					// error showing year is wrong
					console.log('year is wrong');
					newAccountForm.birthday.select();
					showError(9);
					return;
				}
			} else {
				//error showing wrong month
				console.log('month is wrong');
				newAccountForm.birthday.select();
				showError(8);
				return;
			}
		} else {
			// error showing wrong day
			console.log('day is wrong');
			newAccountForm.birthday.select();
			showError(7);
			return;
		}

		checkIfFormReadyForSubmit(true);
	};

	if (len === 8) {
		// check if all things are digits
		if (checkIfAllDigits(bday)) {
			// check if frist two is between 1 and 31
			checkValidityOfNumbers(bday);

			// check if second two is between 1 and 12

			// check if last four is nuber between 1900 and 2015 or new date minus 13 yerars
			// if not then the person is too young
		} else {
				showError(6);
				newAccountForm.birthday.select();
			}
		// double check if the error code is correctly wired
	} else if (len === 10) {
			// remove the '/' sign
			var transformToNumbers = function (string) {
				var numbers = string.split('/').join('');
				bday = numbers;
				// console.log( string );
				return numbers;
			};

			if (checkIfAllDigits(transformToNumbers(bday))) {
				// check if frist two is between 1 and 31
				checkValidityOfNumbers(bday);

				// check if second two is between 1 and 12

				// check if last four is nuber between 1900 and 2015 or new date minus 13 yerars
				// if not then the person is too young
			} else {
					showError(6);
					// above error is invalid characters
					newAccountForm.birthday.select();
				}
		} else {
			// form is invalid
			// select
			console.log('its all wrong');
			newAccountForm.birthday.select();
			// check if error code is correct
			// error 'incorrect date'
			showError(6);
			checkIfFormReadyForSubmit(false);
			return;
		}

	// THE BIRTHDAY IS CORRECT, IF IT WASN'T THE FUNCTION WOULD NOT GET THIS FAR
	checkIfFormReadyForSubmit(true);
	saveInputDataToObject('birthday', false);
	//console.log( newAccountForm.birthday );
};

var emailCheck = function () {

	var email = newAccountForm.email.value;
	var len = email.length;

	if (len === 0) {

		checkIfFormReadyForSubmit(false);
		return;
	} else {

		if (len <= 6) {

			showError(11);
			newAccountForm.email.select();
			// showError invalid email
		} else {

				var twoParts = email.split('@');

				if (twoParts.length === 2) {

					var secondPart = twoParts[1].split('.');
					var len = secondPart.length;

					if (len === 2 || len === 3) {

						// EMAIL IS CORRECT!

						checkIfFormReadyForSubmit(true);
						saveInputDataToObject('email', false);
					} else {

						showError(11);
						newAccountForm.email.select();
						// invalid email
					}
				} else {

						showError(11);
						newAccountForm.email.select();
						// invalid email
					}
			}
	}
};

// open signUp after clicking a sign in button
// this will be changed, because the user will first try to sign in,
// if this sign in fails, then the New account overlay will be opened with the
// password and email prefilled

var showNewAccount = function () {

	console.log('sign in');

	console.log(h2);
	var h2 = overlay.querySelector('h2');

	h2.innerText = "New Account";

	// this should be bundeled as a function...

	// this should be checked before running if it actually is opened or not..?

	navOverlay.classList.remove('opened');
	fadedOverlay.classList.remove('opened');

	// overlay left
	overlay.classList.add('from-left', 'visible');
	setTimeout(function () {
		overlay.classList.add('from-left-to-middle');
		newAccountContainer.classList.add('visibly');
		newAccountHeader.classList.add('visible');
		newAccountFooter.classList.add('visible');

		setTimeout(function () {
			newAccountContainer.classList.add('visible');
		}, 200);

		setTimeout(function () {
			main.classList.remove('visible');
		}, 300);
	}, 100);
};

var signInToSignUpTransition = function () {
	hideSignIn();
	setTimeout(function () {
		showNewAccount();
	}, 300);
};

var showMyAccount = function () {
	console.log('open my account YO?');
};

//
//
// NEW EVENT VIEW
//
//

//
//
// SIGN IN OVERLAY AND VIEW
//
//

var hideSignIn = function () {
	fadedOverlay.setAttribute('onclick', '');
	fadedOverlay.classList.remove('opened');
	signInOverLay.classList.remove('visible');
	console.dir('sign in hide');
};

var showSignIn = function () {
	closeNav();
	fadedOverlay.setAttribute('onclick', 'hideSignIn()');
	setTimeout(function () {
		fadedOverlay.classList.add('opened');
	}, 300);
	signInOverLay.classList.add('visible');
	signInForm.email.focus();
	console.dir('sign in show');
};

var signInWithToken = function (data) {
	console.log(ref.getAuth());
	var token = data.token;
	console.log(data);
	console.log(token);
	ref.authWithCustomToken(token, function (error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			showError(14);
			console.log("Authenticated successfully with payload:", authData);
		}
	});
};

var changeSignInButtonToMyAccount = function () {
	signInNavOverlay.children[0].lastChild.data = "My Account";
	signInNavOverlay.setAttribute('onclick', 'showMyAccount()');
};

var signIn = function () {

	// set the sign in button disabled
	h2.setAttribute('onclick', '');
	h2.classList.remove('button');

	var credentials = {};
	credentials.email = signInForm.email.value;
	credentials.password = signInForm.password.value;

	spinner.show();

	ref.authWithPassword(credentials, function (error, authData) {
		if (error) {
			console.log(error);
			console.dir(error);
			switch (error.code) {
				case "INVALID_USER":
					showError(17);
					break;
				case "INVALID_PASSWORD":
					showError(15);
					break;
			}
			resetLoginFields();
			spinner.hide();
			// showError( 15 );
		} else {
				FireAuthData = authData;
				console.log(authData);

				spinner.hide();
				hideSignIn();

				// reset Sign in
				resetLoginFields();

				//
				changeSignInButtonToMyAccount();
				showError(14);
				var interval = 60000 * 60 * 23;
				setInterval(function () {
					signInWithToken(authData);
				}, interval);
			}
	});
};

var loginLen = function () {
	if (signInForm.email.value !== '') {
		if (signInForm.password.value.length >= 6) {
			h2.classList.add('button');
			h2.setAttribute('onclick', 'signIn()');
		} else {
			h2.classList.remove('button');
			h2.setAttribute('onclick', '');
		}
	}
};

var selectSignInButton = function () {
	h2.focus();
};

var signOut = function () {
	closeNav();
	ref.unauth();

	FireAuthData = null;

	signInNavOverlay.children[0].lastChild.data = "Sign In";
	signInNavOverlay.setAttribute('onclick', 'showSignIn()');
	setTimeout(function () {
		showError(16);
	}, 300);
};

var dismissError = function () {
	errorContainer.classList.remove('visible');
};

var resetLoginFields = function () {
	var len = signInForm.length;
	for (var i = 0; i < len; i++) {
		var input = signInForm[i];
		input.value = '';
	}
};

// this script is taken and used from
// https://gist.github.com/ricardozea/abb9f98a19f6d04a0269

// var selectAll = fucn

//
//
//
//
// 										NEW EVENT PAGE
//
//
//

var newEventObject = {};

var processEventName = function () {

	var id = 'event-name';
	saveInputDataToObject(id, true);
};

var processEventType = function () {

	var id = 'host';
	saveInputDataToObject(id, true);
};

var processEventHost = function () {

	var id = 'event-type';
	saveInputDataToObject(id, true);
};

//
// EVENT DATE CHECK
//

var selectDateElement = function (start) {

	if (start) {
		newEventForm['event-start-date'].select();
	} else newEventForm['event-end-date'].select();
};

var compareDates = function (primaryDate, secondaryDate, s) {

	var d1 = primaryDate;
	var d2 = secondaryDate;

	var start = s;

	// var dd = parseInt( sD.substr( 0, 2 ) );
	// var mm = parseInt( sD.substr( 2, 2 ) );
	// var yy = parseInt( sD.substr( 4, 2 ) );

	var DateObject = function (date) {
		var obj = {
			date: date,
			day: parseInt(date.substr(0, 2)),
			month: parseInt(date.substr(2, 2)),
			year: parseInt(date.substr(4, 2))
		};
		return obj;
	};

	var p1 = new DateObject(d1);
	var p2 = new DateObject(d2);

	console.log(p1);
	console.log(p2);

	// var check = function( primD, secD ) {

	// 	var primValue = primD;
	// 	var secValue = secD;

	// 	if ( primValue <= secValue || primValue === secValue ) {

	// 		console.log ( primValue );
	// 		console.log( secValue );

	// 		console.log( 'DATES OK' );
	// 		return true;

	// 	} else {

	// 		console.log( 'day is before current day' );
	// 		console.log( 'date preceeds today or event start date' );

	// 		console.log( 'show error 26');
	// 		showError( 27 );
	// 		return false;

	// 	}

	// }

	var isTimeGreater = function () {

		var t1 = parseInt(newEventObject['event-start-time']);
		var t2 = parseInt(newEventObject['event-end-time']);

		console.log(t1 !== NaN || t2 !== NaN);

		console.log(t1);
		console.log(t2);

		if (t1 !== NaN || t2 !== NaN) {

			console.log(t1);
			console.log(t2);

			return t1 >= t2 ? false : true;
		}

		// if ( parseInt(newEventObject['event-start-time'] ) >= parseInt( newEventObject['event-end-time'] ) ) {
		// 	// the event end time is before the start time
		// 	console.log( 'show error 26');
		// 	showError( 26 );
		// 	return false;
		// } else {

		// 	// return error stating the time cant be lower

		// }
	};

	// var checkDay = function() {

	// 	if ( p1.day <= p2.day ) {

	// 		if ( p1.day === p2.day ) {

	// 			console.log( 'day is the same' );

	// 		}

	// 	} else {

	// 		console.log( 'day is before current day' );

	// 		console.log( 'show error 26');
	// 		showError( 27 );
	// 		return false;

	// 	}

	// }

	// var checkMonth = function() {

	// 	if ( p1.month <= p2.month ) {

	// 		if ( p1.month === p2.month ) {

	// 			console.log( 'month is the same' );

	// 		}

	// 	} else {

	// 		console.log( 'month is before current month' );

	// 		// return month cant be this
	// 		console.log( 'show error 26');
	// 		showError( 27 );
	// 		return false;

	// 	}

	// }

	// var checkYear = function() {
	// 	if ( p1.year <= p2.year ) {

	// 		if ( p1.year === p2.year ) {

	// 			console.log( 'year is the same' );
	// 			return true;

	// 		}

	// 	} else {

	// 		console.log( 'year is before current year' );

	// 		console.log( 'show error 26');
	// 		showError( 27 );
	// 		return false;

	// 	}
	// }

	var selectIncorrectField = function (time) {

		if (start) {

			if (time) {

				newEventForm['event-start-time'].select();
			} else {

				newEventForm['event-start-date'].select();
			}
		} else {

			if (time) {

				newEventForm['event-end-time'].select();
			} else {

				newEventForm['event-end-date'].select();
			}
		}
	};

	var isGreaterOrEqual = function (v1, v2) {

		return v1 <= v2 ? true : false;
	};

	var isSame = function (v1, v2) {

		return v1 === v2 ? true : false;
	};

	if (isGreaterOrEqual(p1.year, p2.year)) {

		console.log('isGreaterOrEqual no. 1');

		if (isSame(p1.year, p2.year)) {

			console.log('isSame no. 1');

			if (isGreaterOrEqual(p1.month, p2.month)) {

				console.log('isGreaterOrEqual no. 2');

				if (isSame(p1.month, p2.month)) {

					console.log('isSame no. 2');

					if (isGreaterOrEqual(p1.day, p2.day)) {

						console.log('isGreaterOrEqual no. 3');

						if (isSame(p1.day, p2.day)) {

							console.log('isSame no. 2');

							console.log(isTimeGreater());

							if (!isTimeGreater()) {

								showError(26);
								selectIncorrectField(true);
							} else return true;
						} else return true;
					} else {

						showError(27);
						selectIncorrectField(false);
					}
				} else return true;
			} else {

				showError(27);
				selectIncorrectField(false);
			}
		} else return true;
	} else {

		showError(27);
		selectIncorrectField(false);
	}
};

var validateDateAgainstToday = function (dObj) {

	var dateObj = dObj;

	console.log(dateObj);

	// var sD = newEventForm['event-start-date'].value;
	// var eD = newEventForm['event-end-date'].value;

	// if ( sd !== '' || eD !== '' ) {

	// }

	if (dateObj.start) {

		var today = new Date();

		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!
		var yyyy = '' + today.getFullYear();
		var yy = parseInt(yyyy.substr(2, 4));

		if (dd < 10) {
			dd = '0' + dd;
		};

		if (mm < 10) {
			mm = '0' + mm;
		};

		today = dd + '' + mm + '' + yy;

		// today = {};
		// today.day = dd;
		// today.month = mm;
		// today.year = yy;

		// console.log( dd );
		// console.log( mm );
		// console.log( yy );

		if (compareDates(today, dateObj.date, true)) {

			newEventObject['event-start-date'] = dateObj.date;
			console.log(newEventObject);
		};

		// var today = parseInt( today );
		// var eventStartDate = parseInt( newEventObject['event-start-date'] );

		// var eventStartDay = dateObj.day;
		// var eventStartMonth = dateObj.month;
		// var eventStartYear = dateObj.year;
	} else {

			var sD = newEventObject['event-start-date'];

			console.log(sD);

			// var dd = parseInt( sD.substr( 0, 2 ) );
			// var mm = parseInt( sD.substr( 2, 2 ) );
			// var yy = parseInt( sD.substr( 4, 2 ) );

			// console.log( dd );
			// console.log( mm );
			// console.log( yy );

			// var sD = {};
			// sD.day = dd;
			// sD.month = mm;
			// sD.year = yy;

			if (compareDates(sD, dateObj.date, false)) {

				newEventObject['event-end-date'] = dateObj.date;
				console.log(newEventObject);
			};
		}
};

var verifyDate = function (d) {

	// rememeber we hace the start value in the object, so we can
	// be selecting the fields upon error correctly

	var dateObj = d;
	var start = dateObj.start;

	console.log(dateObj);

	if (dateObj.day < 0 || dateObj.day > 31) {

		showError(7);
		selectDateElement(start);
		return;
	}

	if (dateObj.month < 0 || dateObj.month > 12) {

		showError(8);
		selectDateElement(start);
		return;
	}

	if (dateObj.year < 16) {

		showError(9);
		selectDateElement(start);
		return;
	}

	if (validateDateAgainstToday(dateObj)) {
		// if the date is wrong, then the fucntion would not get this far
		if (start) {
			newEventObject['event-start-date'] = dateObj.date;
		} else newEventObject['event-end-date'] = dateObj.date;
	}

	console.log(newEventObject);
	console.log(newAccountObject);
};

var getDayMonthYear = function (d) {

	var dateObj = d;

	dateObj.day = parseInt(dateObj.date.substring(0, 2));
	dateObj.month = parseInt(dateObj.date.substring(2, 4));
	dateObj.year = parseInt(dateObj.date.substring(4, 6));

	console.log(dateObj);

	return dateObj;
};

var checkEventDateFormat = function (start) {

	var date, len;

	var dateObj = {};

	if (start) {

		date = newEventForm['event-start-date'].value;
		len = date.length;
		dateObj.start = true;
	} else {

		date = newEventForm['event-end-date'].value;
		len = date.length;
		dateObj.start = false;
	}

	console.log(date);

	if (date !== '') {

		if (len === 6) {

			dateObj.date = date;

			verifyDate(getDayMonthYear(dateObj));
		} else if (len === 8) {

			var d = date.split('/');
			var date = d.join('');

			if (date.length === 6) {

				dateObj.date = date;

				verifyDate(getDayMonthYear(dateObj));
			} else showError(23);
		} else {

			if (start) {
				// show error stating that the startdate format is wrong
				showError(20);
				return;
			} else {
				showError(21);
				return;
			}
		}
	}
};

var processEventStartDate = function () {

	checkEventDateFormat(true);
};

var processEventEndDate = function () {

	checkEventDateFormat();
};

//
// CHECK EVENT TIME
//

var saveTimeToObject = function (start, time) {
	if (start) {
		newEventObject['event-start-time'] = time;
	} else newEventObject['event-end-time'] = time;

	console.log(newEventObject);
};

var focusTimeInput = function (start) {

	if (start) {
		// focus start input
		newEventForm['event-start-time'].select();
	} else {
		// focus end input
		newEventForm['event-end-time'].select();
	}
};

var isTimeGreater = function (one, two) {

	console.log('one');
	console.log('two');
	console.log(one);
	console.log(two);

	var t1 = parseInt(newEventObject['event-start-time']);
	var t2 = parseInt(newEventObject['event-end-time']);

	if (one !== undefined && two !== undefined) {

		t1 = parseInt(one);
		t2 = parseInt(two);
	}

	console.log(t1 !== NaN || t2 !== NaN);

	console.log(t1);
	console.log(t2);

	if (t1 !== NaN || t2 !== NaN) {

		console.log(t1);
		console.log(t2);

		return t1 >= t2 ? false : true;
	}

	// if ( parseInt(newEventObject['event-start-time'] ) >= parseInt( newEventObject['event-end-time'] ) ) {
	// 	// the event end time is before the start time
	// 	console.log( 'show error 26');
	// 	showError( 26 );
	// 	return false;
	// } else {

	// 	// return error stating the time cant be lower

	// }
};

var getHoursAndMinutes = function (t) {

	var hour, minutes;

	var timeObj = t;

	var start = timeObj.start;

	hour = parseInt(timeObj.time.substring(0, 2), 10);
	minutes = parseInt(timeObj.time.substring(2, 4), 10);

	console.log(timeObj);
	console.log(hour);
	console.log(minutes);

	console.log(hour < 0 && hour > 24);
	console.log(minutes < 0 && minutes > 60);

	if (hour < 0 || hour > 24) {

		showError(18);
		focusTimeInput(start);
		return;
	}

	if (minutes < 0 || minutes > 59) {

		showError(19);
		focusTimeInput(start);
		return;
	}

	saveTimeToObject(start, timeObj.time);
};

var checkTimeValue = function (start) {

	var time, len;

	var timeObj = {};

	if (start) {

		time = newEventForm['event-start-time'].value;
		len = time.length;
		timeObj.start = true;
	} else {

		time = newEventForm['event-end-time'].value;
		len = time.length;
		timeObj.start = false;
	}

	if (time !== '') {

		if (len === 4) {

			timeObj.time = time;
			getHoursAndMinutes(timeObj);
		} else if (len === 5) {

			timeObj.time = time.split(':').join('');

			var len = timeObj.time.length;

			if (len === 4) {
				getHoursAndMinutes(timeObj);
			}
		} else {

			showError(23);
			if (start) {
				newEventForm['event-start-time'].select();
			} else newEventForm['event-end-time'].select();
			return;
		}
	}
};

var processEventStartTime = function () {

	checkTimeValue(true);
};

var processEventEndTime = function () {

	checkTimeValue();
};

//
// EVENT PLACE
//

//
// GOOGLE PLACES API FUNCTION
//

var savePlaceData = function (p, n) {

	var place = p,
	    name = n;

	console.dir(p);

	newEventObject['event-location-data'] = {};
	newEventObject['event-location-data'].name = name;

	newEventObject['event-location-data'].address = place['formatted_address'];

	newEventObject['event-location-data'].lat = place.geometry.location.lat();
	newEventObject['event-location-data'].lng = place.geometry.location.lng();

	console.log(newEventObject);
};

var initAutocomplete = function () {

	var input = newEventForm['google-event-location'];
	var autocomplete = new google.maps.places.Autocomplete(input);

	autocomplete.addListener('place_changed', function () {
		var place = autocomplete.getPlace();
		// input.data = place;
		// console.dir( input );
		// console.log( place );
		// console.log( place.types.length );
		if (place.types.length > 1) {
			input.value = place.name;
		} else {

			console.log(place['address_components'][1]['long_name']);
			console.log(place['address_components'][0]['long_name']);

			input.value = place['address_components'][1]['long_name'] + ' ' + place['address_components'][0]['long_name'];
		}

		var name = input.value;
		savePlaceData(place, name);
	});
};

var privacy = true;
var togglePrivacy = function () {

	var button = newEventContainer.querySelector('#privacy-button');
	var buttonSwitch = button.children[0];
	buttonSwitch.classList.toggle('off');
	console.log(privacy);
	if (!privacy) {
		privacy = !privacy;
	} else privacy = !privacy;
	console.log(privacy);
	console.dir(button);
};

var eventObject = {};
var saveEventToDb = function (obj) {

	console.log(obj);

	spinner.show();

	// the private event has a property that is called access..
	// and there is user id's being pushed to that endpoint .. this
	// then has a rule within the security tab in firebase that
	// checks if the user id is there...

	// upon save, update the events' ID
	// with what firebase gave it

	// update logged in users' created events,
	// so these can be displayed in my events

	if (!newEventObject.privacy) {
		// save to public events
		console.log('save to public events');
		var pushedData = ref.child('events/public').push(newEventObject, function (error, data) {
			if (error) {
				console.dir(error);
			} else {

				var id = pushedData.key();

				ref.child('events/public').child(id).update({ 'id': id }, function (error, data) {

					if (error) {
						// show error

						console.dir(error);
					} else {

						spinner.hide();
						console.log(data);
					}
				});

				console.log(id);
				console.dir(id);

				showError(24);
				newEventObject = new Object();

				// update the saved item with ID..

				// update the user.events with the event id
			}
		});
	} else {
			// save to private events
			console.log('save to private events');
		}
};

var allTimesAreValid = function () {

	var d1 = newEventObject['event-start-date'];
	var d2 = newEventObject['event-end-date'];

	console.log(compareDates(d1, d2));

	return compareDates(d1, d2);
};

var isBeingSubmitted = false;
var submitNewEvent = function () {

	if (!isBeingSubmitted) {

		isBeingSubmitted = true;
		if (allTimesAreValid()) {

			closeAccountAndEventOverlay();

			newEventObject['privacy'] = privacy;
			newEventObject['guest-count'] = 1;
			newEventObject['guests'] = [];
			newEventObject['guests'].push(ref.getAuth().uid);

			Object.keys(newEventObject).map(function (key) {

				if (typeof newEventObject[key] === 'string') {
					newEventObject[key] = newEventObject[key].trim();
				}
			});

			saveEventToDb(newEventObject);
			resetFields();
			isBeingSubmitted = false;
		} else isBeingSubmitted = false;
	}

	// ref.createUser( credentials, function( error, user ) {
	// 	if ( error ) {
	// 		console.log( error );
	// 		showError( 12 );
	// 	} else {
	// 		console.log( user );
	// 		ref.authWithPassword( credentials, function( error, user ) {
	// 			if( error ) {
	// 				console.log( error );
	// 			} else {
	// 				console.log( user );

	// 				var uid = user.auth.uid;
	// 				var obj = {};
	// 				obj.name = newAccountForm.name.value;
	// 				obj.birthday = newAccountForm.birthday.value;
	// 				obj.employer = newAccountForm.employer.value;
	// 				obj.job = newAccountForm.jobtitle.value;
	// 				console.log( obj );
	// 				ref.child( uid ).child( 'info' ).set( obj );

	// 				// if the previous state was that the user wanted to
	// 				// create an event but didn't have an account, then
	// 				// the state shoudl return to event creation page.
	// 				closeAccountAndEventOverlay();

	// 				resetFields();

	// 				showError( 13 );

	// 				changeSignInButtonToMyAccount();

	// 				// figure out the State of the applicatino and if the user
	// 				// was creating a new event before
	// 				// the app should switch back to that state..

	// 				// showSignIn();

	// 				// close the overlay and all
	// 			}
	// 		})
	// 	}
	// })
};

var focusNextElementInNewEvent = function (element) {

	console.log('FOCUS NEXT ELEMENT');

	// checkIfFormReadyForSubmit( true );
	var elements = [newEventForm['event-name'], newEventForm['event-start-date'], newEventForm['event-start-time'], newEventForm['event-end-date'], newEventForm['event-end-time'], newEventForm['google-event-location']];
	var len = elements.length;

	console.log(elements);

	for (var i = 0; i < len; i++) {
		if (elements[i].value === '') {
			elements[i].scrollIntoView(true);
			// element.scrollIntoView(true);
			elements[i].focus();
			return;
		}
	}

	checkIfNewEventFormReadyForSubmit();

	// if ( elements[0].value === '' ) {
	// 	elements[0].focus();
	// } else if ( elements[1].value === '' ) {
	// 	elements[1].scrollIntoView(true);
	// 	elements[1].focus();
	// } else {

	// }
};

var checkIfNewEventFormReadyForSubmit = function (status) {

	console.log('CHECK IF NEW EVENT READY FOR SUBMIT');

	var elements = [newEventForm['event-name'], newEventForm['event-start-date'], newEventForm['event-start-time'], newEventForm['event-end-date'], newEventForm['event-end-time'], newEventForm['google-event-location']];
	var len = elements.length;

	for (var i = 0; i < len; i++) {
		var element = elements[i];
		if (element.value === '') {
			swapButtons(false);
			return;
		}
	}
	swapButtons(true);
};

var buildEvents = function (evts) {

	var events = evts;

	// console.log( events );

	var keys = Object.keys(events);
	var len = keys.length;
	// console.log( keys );

	for (var a = 0; a < len; a++) {
		var key = keys[a];
		// console.log( key );
		var evt = events[key];
		// console.log( evt );
		// console.log(  );

		setUpEventItem(evt);
	}

	getSingleEventDimensions();
	spinner.hide();
};

// his shall be a class or object with an api that is get, height and get width fo the element
// mapBacgroundImageSize

var fillElementWithData = function (element, id, original) {

	var info = events[id];

	var lat = info['event-location-data'].lat;
	var lng = info['event-location-data'].lng;

	console.log(lat - 49.819657);
	console.log(lng - 18.0973114);

	var centerLat = lat - .0002;
	var centerLng = lng - .0009;

	// element.style.display = 'flex';
	var dimensions = getSingleEventDimensions();
	var height = dimensions.height;
	var width = dimensions.width;

	console.log(height);
	console.log(width);

	var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + centerLat + ',' + centerLng + '&zoom=17&markers=color:red%7C' + lat + ',' + lng + '&size=' + width + 'x' + height + '&maptype=roadmap&key=AIzaSyBPSBuZde1QlCpGe7IhH674CWPSFSDTknk';
	element.children[0].style.backgroundImage = "url(" + url + ")";

	// var mapImg = element.querySelector( 'img' );
	// var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lng + '&zoom=19&markers=color:red%7C' + lat + ',' + lng + '4&size=400x400&maptype=roadmap&key=AIzaSyBPSBuZde1QlCpGe7IhH674CWPSFSDTknk'
	// mapImg.setAttribute( 'src', url );

	var h2 = element.querySelector('h2');
	h2.innerHTML = info['event-name'] + '<span></span>';

	var ul = element.querySelector('ul');

	var startTime = info['event-start-time'];
	startTime = startTime.substring(0, 2) + ':' + startTime.substring(2, 4);

	var endTime = info['event-end-time'];
	endTime = endTime.substring(0, 2) + ':' + endTime.substring(2, 4);

	var startDate = info['event-start-date'];
	startDate = startDate.substring(0, 2) + '.' + startDate.substring(2, 4) + '.' + startDate.substring(4, 6);

	var endDate = info['event-start-date'];
	endDate = startDate.substring(0, 2) + '.' + endDate.substring(2, 4) + '.' + endDate.substring(4, 6);
	ul.children[0].innerText = 'Start: ' + startTime + ' / ' + startDate;
	ul.children[1].innerText = 'End: ' + endTime + ' / ' + endDate;
	ul.children[2].innerText = 'Place: ' + info['event-location-data'].name;

	console.log('SETTING ID ON ELEMENT');
	console.log(info['id']);

	console.log(element);

	element.setAttribute('data-id', info['id']);

	if (original) {

		var headerH2 = element.querySelector('.head');
		headerH2.innerHTML = '<h2>' + info['event-name'] + '</h2>';
		console.log(headerH2);
		console.dir(headerH2);

		var content = element.querySelector('.wrapper');

		var addressField = content.children[0].children[1];
		addressField.innerHTML = '<span>' + info['event-location-data'].address + '</span>';

		var guestCountField = content.children[0].children[3];
		guestCountField.innerHTML = '<span>' + info['guest-count'] + '</span>';
		console.log(content);
		console.dir(content);
	}
};

console.log(events);
var eventItem = document.getElementsByClassName('event-item')[0];

var setUpEventItem = function (info) {

	console.log('building event');

	var id = info['id'];

	console.log(info);
	console.dir(info);
	var lat = info['event-location-data'].lat;
	var lng = info['event-location-data'].lng;

	console.log(lat - 49.819657);
	console.log(lng - 18.0973114);

	var centerLat = lat - .0002;
	var centerLng = lng - .0009;

	var l = u.getUserLoation();
	var userLat = l.coords.latitude;
	var userLng = l.coords.longitude;

	console.log("DIFFERENCE BETWEEN USER AND THE EVENT LOCATION IS");
	console.log(lat - userLat);
	console.log(lng - userLng);

	var latDiff = lat - userLat;
	var lngDiff = lng - userLng;

	var clone = eventItem.cloneNode(true);

	fillElementWithData(clone, id);

	console.log(clone);

	clone.addEventListener('click', function () {
		animateItem(clone);
	});

	if (latDiff < 0.1 && latDiff > -0.1 && lngDiff < 0.1 && lngDiff > -0.1) {

		console.log("EVENT IS NEARBY");
		nearbyList.appendChild(clone);
	} else if (latDiff < 0.3 && latDiff > -0.3 && lngDiff < 0.3 && lngDiff > -0.3) {

		console.log("EVENT IS CLOSEBY");
		closebyList.appendChild(clone);
	} else {

		console.log("EVENT IS FARAWAY");
		farawayList.appendChild(clone);
	}
};

var hashID;

var locationHashContainsId = function () {
	var hash = location.hash;

	console.log(hash);

	var hashValues = hash.substr(1).split('=');

	console.log(hashValues);

	var idLocation = hashValues.indexOf('id') + 1;

	console.log(idLocation);

	if (idLocation !== 0) {

		var idFromUrl = hashValues[idLocation];
		hashID = idFromUrl;

		return true;
	} else return false;
};

var expandSingleEventOverlay = function (id) {

	setTimeout(function () {
		showEventOverLayContent();
	}, 600);

	originalElement.classList.add('visibly', 'visible');
};

var loadSingleEvent = function () {

	var o = document.getElementById('effect');
	o.classList.add('visible');
	/// create here a css class that is going to be hiding the element
	// remember to remove the visible and hide classes at the end of the effect
	// o.classList.add( 'hide' );

	// have this little longer, basically till the animation of the original element doesnt finish
	setTimeout(function () {
		fillElementWithData(originalElement, hashID, true);
		expandSingleEventOverlay();
	}, 300);
};

var getLocationBeforeBuildingElements = function () {

	var interval;

	var singleViewLoaded = false;
	// if we don't have user location

	interval = setInterval(function () {

		console.log('RUNNING INTERVAL');

		if (events !== undefined && locationHashContainsId() && !singleViewLoaded) {

			loadSingleEvent();
			singleViewLoaded = true;
		}

		if (u.getUserLoation() && events !== undefined) {

			clearInterval(interval);
			buildEvents(events);
		}
	}, 500);
};

var events;
var eArray;
var eNames = [];
var prepareForSearch = function () {

	eArray = Object.keys(events);

	eArray.map(function (item) {
		// console.log( item );
		eNames.push(events[item]['event-name']);
	});

	console.log(eArray);
	console.log(eNames);
};

var displayedResults = [];
var searchResults = document.getElementById('search-results');
var searchNotification = document.getElementById('search-notification');
var appendSearchResults = function (i) {

	if (i.length !== 0) {
		console.log(i);

		searchNotification.classList.add('visible');

		i.map(function (index) {

			var id = eArray[index];

			if (displayedResults.indexOf(id) === -1) {

				var clone = originalElement.cloneNode(true);
				fillElementWithData(clone, id);
				clone.addEventListener('click', function () {
					animateItem(clone);
				});
				clone.classList.add('');
				searchResults.appendChild(clone);
				displayedResults.push(id);

				console.log("ADDED");
			}
		});

		// searchResults.appendChild( fillElementWithData( element, id, original ) )
	} else {

			if (displayedResults.length !== 0) {
				clearSearchResults(true);
			}
		}
};

var clearSearchResults = function (whatever) {

	searchResults.innerHTML = '';
	displayedResults = [];
	searchNotification.classList.remove('visible');

	if (!whatever) {
		saerchInput.value = '';
	}
};

var searchInput = document.getElementById('search-input');
var search = function () {

	var query = searchInput.value.toLowerCase();

	var indexes = [];

	eNames.map(function (item, index) {

		if (query === item.toLowerCase()) {

			indexes.push(index);
		}
	});

	appendSearchResults(indexes);
};

var loadEvents = function () {

	spinner.show();
	getLocationBeforeBuildingElements();

	ref.child('events/public').once('value', function (snap) {
		if (snap.val() !== null) {
			events = snap.val();

			prepareForSearch();

			console.log(eArray);

			console.log(events);
		} else {
			events = {};
		}
	});
};
loadEvents();

var resizeTimeout;

var resetImagesOnElements = function () {

	var elements = eventItems;

	console.log(elements);

	// elements.forEach( function( el ) {
	// 	console.log( el );
	// });
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(function () {

		var dimensions = getSingleEventDimensions();
		var height = dimensions.height;
		var width = dimensions.height;

		Array.prototype.forEach.call(elements, function (el) {

			var id = el.getAttribute('data-id');

			if (id !== null) {

				fillElementWithData(el, id);

				// 	var eventInfo = events[id];

				// 	var lat = eventInfo['event-location-data'].lat;
				// 	var lng = eventInfo['event-location-data'].lng;

				// 	var centerLat = lat - .0002;
				// 	var centerLng = lng - .0009;

				// 	// var clone = eventItem.cloneNode( true );

				// 	// clone.data = info;

				// 	var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + centerLat + ',' + centerLng + '&zoom=17&markers=color:red%7C' + lat + ',' + lng + '&size=' + width + 'x' + height + '&maptype=roadmap&key=AIzaSyBPSBuZde1QlCpGe7IhH674CWPSFSDTknk'
				// 	// var url =

				// 	console.log( url );

				// 	el.style.backgroundImage = "url(" + url + ")";
			}
		});
	}, 500);

	// var e = elements.map( function( element ) {

	// 	var lat = element.data['event-location-data'].lat;
	// 	var lng = element.data['event-location-data'].lng;

	// 	var centerLat = lat - .0002;
	// 	var centerLng = lng - .0009;

	// 	// var clone = eventItem.cloneNode( true );

	// 	// clone.data = info;

	// 	var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + centerLat + ',' + centerLng + '&zoom=17&markers=color:red%7C' + lat + ',' + lng + '&size=' + w + 'x' + h + '&maptype=roadmap&key=AIzaSyBPSBuZde1QlCpGe7IhH674CWPSFSDTknk'
	// 	// var url =
	// 	element.backgroundImage = "url(" + url + ")";

	// });
};

var getSingleEventDimensions = function () {

	console.log("GETTING OFFSET HEIGHT");

	originalElement.style.display = 'flex';
	originalElement.style.paddingBottom = '0px';

	// var fontSize = parseInt( window.getComputedStyle(originalElement, null).getPropertyValue('font-size') );
	// console.log( style );

	// console.log( originalElement.children[0] );

	// we're getting rid of the font size since that is what the padding is!
	var height = originalElement.children[0].offsetHeight;
	var width = originalElement.children[0].offsetWidth;
	console.log(height);
	console.log(width);
	originalElement.style.display = '';
	originalElement.style.paddingBottom = '';

	return { height: height, width: width };

	// resetImagesOnElements( height, width );
};

//
//
// UTILITY
//
//
window.onresize = resetImagesOnElements;

var attendEvent = function () {

	if (ref.getAuth()) {

		console.dir(hashID);

		var guestCountEl = originalElement.querySelector('.guest-count').children[0];

		// if this ID is not in the list of guests on the element, update the guest count

		// if ( firebase guests, my id is not there ) {

		// }

		// set inner guest count

		// update local guest count;
		var id = originalElement.getAttribute('data-id');

		console.dir(id);
		console.dir(events[id].privacy);

		console.dir(ref.getAuth());

		if (events[id]['guests'].indexOf(ref.getAuth().uid) === -1) {

			var currentGuestCount = parseInt(guestCountEl.innerText);
			var updatedGuestCount = currentGuestCount + 1;
			guestCountEl.innerText = updatedGuestCount;
			events[id]['guest-count'] = updatedGuestCount;

			if (!events[id].privacy) {

				console.dir(events[id]['guests'].indexOf(ref.getAuth().uid));

				var arr = events[id]['guests'].push(ref.getAuth().uid);

				console.dir(arr);

				var obj = {};
				obj['guest-count'] = gAr.length;
				obj['guests'] = arr;
				ref.child('events/public').child(id).update(obj, function (error) {
					if (error) {
						console.log('error');
						console.log(error);
					} else {

						console.log('DONE!');
					}
				});
			} else {

				// use the unlisted event..

			}
		} else {

				// show error saying that the user is already attending!

				showError(28);
			}
	} else {

		showSignIn();
	}

	// if ( !events[id].privacy ) {
	// 	ref.child( 'events/public' ).child( id ).update( { 'guest-count': updatedGuestCount } );
	// }

	// update the view count
	console.dir(originalElement.querySelector('.guest-count').children[0].innerText);

	// update the firebase reference

	console.dir('say hello');
};

var emailGuests = function () {

	var id = originalElement.getAttribute('data-id');
	var name = events[id]['event-name'];
	var url = location.href;

	window.open("mailto:xyz@abc.com?subject=Checkout This Event!&body=Hey, don't be shy and joing us at this '" + name + "' event! ---> " + url);
};
/*! Hammer.JS - v2.0.6 - 2016-01-06
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the  license */
!(function (a, b, c, d) {
  "use strict";
  function e(a, b, c) {
    return setTimeout(j(a, c), b);
  }function f(a, b, c) {
    return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
  }function g(a, b, c) {
    var e;if (a) if (a.forEach) a.forEach(b, c);else if (a.length !== d) for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a);
  }function h(b, c, d) {
    var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";return function () {
      var c = new Error("get-stack-trace"),
          d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
          f = a.console && (a.console.warn || a.console.log);return f && f.call(a.console, e, d), b.apply(this, arguments);
    };
  }function i(a, b, c) {
    var d,
        e = b.prototype;d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && ha(d, c);
  }function j(a, b) {
    return function () {
      return a.apply(b, arguments);
    };
  }function k(a, b) {
    return typeof a == ka ? a.apply(b ? b[0] || d : d, b) : a;
  }function l(a, b) {
    return a === d ? b : a;
  }function m(a, b, c) {
    g(q(b), function (b) {
      a.addEventListener(b, c, !1);
    });
  }function n(a, b, c) {
    g(q(b), function (b) {
      a.removeEventListener(b, c, !1);
    });
  }function o(a, b) {
    for (; a;) {
      if (a == b) return !0;a = a.parentNode;
    }return !1;
  }function p(a, b) {
    return a.indexOf(b) > -1;
  }function q(a) {
    return a.trim().split(/\s+/g);
  }function r(a, b, c) {
    if (a.indexOf && !c) return a.indexOf(b);for (var d = 0; d < a.length;) {
      if (c && a[d][c] == b || !c && a[d] === b) return d;d++;
    }return -1;
  }function s(a) {
    return Array.prototype.slice.call(a, 0);
  }function t(a, b, c) {
    for (var d = [], e = [], f = 0; f < a.length;) {
      var g = b ? a[f][b] : a[f];r(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
    }return c && (d = b ? d.sort(function (a, c) {
      return a[b] > c[b];
    }) : d.sort()), d;
  }function u(a, b) {
    for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ia.length;) {
      if ((c = ia[g], e = c ? c + f : b, e in a)) return e;g++;
    }return d;
  }function v() {
    return qa++;
  }function w(b) {
    var c = b.ownerDocument || b;return c.defaultView || c.parentWindow || a;
  }function x(a, b) {
    var c = this;this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
      k(a.options.enable, [a]) && c.handler(b);
    }, this.init();
  }function y(a) {
    var b,
        c = a.options.inputClass;return new (b = c ? c : ta ? M : ua ? P : sa ? R : L)(a, z);
  }function z(a, b, c) {
    var d = c.pointers.length,
        e = c.changedPointers.length,
        f = b & Aa && d - e === 0,
        g = b & (Ca | Da) && d - e === 0;c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
  }function A(a, b) {
    var c = a.session,
        d = b.pointers,
        e = d.length;c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);var f = c.firstInput,
        g = c.firstMultiple,
        h = g ? g.center : f.center,
        i = b.center = E(d);b.timeStamp = na(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);var j = F(b.deltaTime, b.deltaX, b.deltaY);b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = ma(j.x) > ma(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);var k = a.element;o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k;
  }function B(a, b) {
    var c = b.center,
        d = a.offsetDelta || {},
        e = a.prevDelta || {},
        f = a.prevInput || {};(b.eventType === Aa || f.eventType === Ca) && (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
  }function C(a, b) {
    var c,
        e,
        f,
        g,
        h = a.lastInterval || b,
        i = b.timeStamp - h.timeStamp;if (b.eventType != Da && (i > za || h.velocity === d)) {
      var j = b.deltaX - h.deltaX,
          k = b.deltaY - h.deltaY,
          l = F(i, j, k);e = l.x, f = l.y, c = ma(l.x) > ma(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b;
    } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g;
  }function D(a) {
    for (var b = [], c = 0; c < a.pointers.length;) b[c] = { clientX: la(a.pointers[c].clientX), clientY: la(a.pointers[c].clientY) }, c++;return { timeStamp: na(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY };
  }function E(a) {
    var b = a.length;if (1 === b) return { x: la(a[0].clientX), y: la(a[0].clientY) };for (var c = 0, d = 0, e = 0; b > e;) c += a[e].clientX, d += a[e].clientY, e++;return { x: la(c / b), y: la(d / b) };
  }function F(a, b, c) {
    return { x: b / a || 0, y: c / a || 0 };
  }function G(a, b) {
    return a === b ? Ea : ma(a) >= ma(b) ? 0 > a ? Fa : Ga : 0 > b ? Ha : Ia;
  }function H(a, b, c) {
    c || (c = Ma);var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];return Math.sqrt(d * d + e * e);
  }function I(a, b, c) {
    c || (c = Ma);var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];return 180 * Math.atan2(e, d) / Math.PI;
  }function J(a, b) {
    return I(b[1], b[0], Na) + I(a[1], a[0], Na);
  }function K(a, b) {
    return H(b[0], b[1], Na) / H(a[0], a[1], Na);
  }function L() {
    this.evEl = Pa, this.evWin = Qa, this.allow = !0, this.pressed = !1, x.apply(this, arguments);
  }function M() {
    this.evEl = Ta, this.evWin = Ua, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
  }function N() {
    this.evTarget = Wa, this.evWin = Xa, this.started = !1, x.apply(this, arguments);
  }function O(a, b) {
    var c = s(a.touches),
        d = s(a.changedTouches);return b & (Ca | Da) && (c = t(c.concat(d), "identifier", !0)), [c, d];
  }function P() {
    this.evTarget = Za, this.targetIds = {}, x.apply(this, arguments);
  }function Q(a, b) {
    var c = s(a.touches),
        d = this.targetIds;if (b & (Aa | Ba) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];var e,
        f,
        g = s(a.changedTouches),
        h = [],
        i = this.target;if ((f = c.filter(function (a) {
      return o(a.target, i);
    }), b === Aa)) for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Ca | Da) && delete d[g[e].identifier], e++;return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0;
  }function R() {
    x.apply(this, arguments);var a = j(this.handler, this);this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a);
  }function S(a, b) {
    this.manager = a, this.set(b);
  }function T(a) {
    if (p(a, db)) return db;var b = p(a, eb),
        c = p(a, fb);return b && c ? db : b || c ? b ? eb : fb : p(a, cb) ? cb : bb;
  }function U(a) {
    this.options = ha({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = gb, this.simultaneous = {}, this.requireFail = [];
  }function V(a) {
    return a & lb ? "cancel" : a & jb ? "end" : a & ib ? "move" : a & hb ? "start" : "";
  }function W(a) {
    return a == Ia ? "down" : a == Ha ? "up" : a == Fa ? "left" : a == Ga ? "right" : "";
  }function X(a, b) {
    var c = b.manager;return c ? c.get(a) : a;
  }function Y() {
    U.apply(this, arguments);
  }function Z() {
    Y.apply(this, arguments), this.pX = null, this.pY = null;
  }function $() {
    Y.apply(this, arguments);
  }function _() {
    U.apply(this, arguments), this._timer = null, this._input = null;
  }function aa() {
    Y.apply(this, arguments);
  }function ba() {
    Y.apply(this, arguments);
  }function ca() {
    U.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
  }function da(a, b) {
    return b = b || {}, b.recognizers = l(b.recognizers, da.defaults.preset), new ea(a, b);
  }function ea(a, b) {
    this.options = ha({}, da.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = y(this), this.touchAction = new S(this, this.options.touchAction), fa(this, !0), g(this.options.recognizers, function (a) {
      var b = this.add(new a[0](a[1]));a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
    }, this);
  }function fa(a, b) {
    var c = a.element;c.style && g(a.options.cssProps, function (a, d) {
      c.style[u(c.style, d)] = b ? a : "";
    });
  }function ga(a, c) {
    var d = b.createEvent("Event");d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
  }var ha,
      ia = ["", "webkit", "Moz", "MS", "ms", "o"],
      ja = b.createElement("div"),
      ka = "function",
      la = Math.round,
      ma = Math.abs,
      na = Date.now;ha = "function" != typeof Object.assign ? function (a) {
    if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");for (var b = Object(a), c = 1; c < arguments.length; c++) {
      var e = arguments[c];if (e !== d && null !== e) for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f]);
    }return b;
  } : Object.assign;var oa = h(function (a, b, c) {
    for (var e = Object.keys(b), f = 0; f < e.length;) (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;return a;
  }, "extend", "Use `assign`."),
      pa = h(function (a, b) {
    return oa(a, b, !0);
  }, "merge", "Use `assign`."),
      qa = 1,
      ra = /mobile|tablet|ip(ad|hone|od)|android/i,
      sa = "ontouchstart" in a,
      ta = u(a, "PointerEvent") !== d,
      ua = sa && ra.test(navigator.userAgent),
      va = "touch",
      wa = "pen",
      xa = "mouse",
      ya = "kinect",
      za = 25,
      Aa = 1,
      Ba = 2,
      Ca = 4,
      Da = 8,
      Ea = 1,
      Fa = 2,
      Ga = 4,
      Ha = 8,
      Ia = 16,
      Ja = Fa | Ga,
      Ka = Ha | Ia,
      La = Ja | Ka,
      Ma = ["x", "y"],
      Na = ["clientX", "clientY"];x.prototype = { handler: function () {}, init: function () {
      this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler);
    }, destroy: function () {
      this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler);
    } };var Oa = { mousedown: Aa, mousemove: Ba, mouseup: Ca },
      Pa = "mousedown",
      Qa = "mousemove mouseup";i(L, x, { handler: function (a) {
      var b = Oa[a.type];b & Aa && 0 === a.button && (this.pressed = !0), b & Ba && 1 !== a.which && (b = Ca), this.pressed && this.allow && (b & Ca && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: xa, srcEvent: a }));
    } });var Ra = { pointerdown: Aa, pointermove: Ba, pointerup: Ca, pointercancel: Da, pointerout: Da },
      Sa = { 2: va, 3: wa, 4: xa, 5: ya },
      Ta = "pointerdown",
      Ua = "pointermove pointerup pointercancel";a.MSPointerEvent && !a.PointerEvent && (Ta = "MSPointerDown", Ua = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, { handler: function (a) {
      var b = this.store,
          c = !1,
          d = a.type.toLowerCase().replace("ms", ""),
          e = Ra[d],
          f = Sa[a.pointerType] || a.pointerType,
          g = f == va,
          h = r(b, a.pointerId, "pointerId");e & Aa && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ca | Da) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1));
    } });var Va = { touchstart: Aa, touchmove: Ba, touchend: Ca, touchcancel: Da },
      Wa = "touchstart",
      Xa = "touchstart touchmove touchend touchcancel";i(N, x, { handler: function (a) {
      var b = Va[a.type];if ((b === Aa && (this.started = !0), this.started)) {
        var c = O.call(this, a, b);b & (Ca | Da) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: va, srcEvent: a });
      }
    } });var Ya = { touchstart: Aa, touchmove: Ba, touchend: Ca, touchcancel: Da },
      Za = "touchstart touchmove touchend touchcancel";i(P, x, { handler: function (a) {
      var b = Ya[a.type],
          c = Q.call(this, a, b);c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: va, srcEvent: a });
    } }), i(R, x, { handler: function (a, b, c) {
      var d = c.pointerType == va,
          e = c.pointerType == xa;if (d) this.mouse.allow = !1;else if (e && !this.mouse.allow) return;b & (Ca | Da) && (this.mouse.allow = !0), this.callback(a, b, c);
    }, destroy: function () {
      this.touch.destroy(), this.mouse.destroy();
    } });var $a = u(ja.style, "touchAction"),
      _a = $a !== d,
      ab = "compute",
      bb = "auto",
      cb = "manipulation",
      db = "none",
      eb = "pan-x",
      fb = "pan-y";S.prototype = { set: function (a) {
      a == ab && (a = this.compute()), _a && this.manager.element.style && (this.manager.element.style[$a] = a), this.actions = a.toLowerCase().trim();
    }, update: function () {
      this.set(this.manager.options.touchAction);
    }, compute: function () {
      var a = [];return g(this.manager.recognizers, function (b) {
        k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
      }), T(a.join(" "));
    }, preventDefaults: function (a) {
      if (!_a) {
        var b = a.srcEvent,
            c = a.offsetDirection;if (this.manager.session.prevented) return void b.preventDefault();var d = this.actions,
            e = p(d, db),
            f = p(d, fb),
            g = p(d, eb);if (e) {
          var h = 1 === a.pointers.length,
              i = a.distance < 2,
              j = a.deltaTime < 250;if (h && i && j) return;
        }if (!g || !f) return e || f && c & Ja || g && c & Ka ? this.preventSrc(b) : void 0;
      }
    }, preventSrc: function (a) {
      this.manager.session.prevented = !0, a.preventDefault();
    } };var gb = 1,
      hb = 2,
      ib = 4,
      jb = 8,
      kb = jb,
      lb = 16,
      mb = 32;U.prototype = { defaults: {}, set: function (a) {
      return ha(this.options, a), this.manager && this.manager.touchAction.update(), this;
    }, recognizeWith: function (a) {
      if (f(a, "recognizeWith", this)) return this;var b = this.simultaneous;return a = X(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
    }, dropRecognizeWith: function (a) {
      return f(a, "dropRecognizeWith", this) ? this : (a = X(a, this), delete this.simultaneous[a.id], this);
    }, requireFailure: function (a) {
      if (f(a, "requireFailure", this)) return this;var b = this.requireFail;return a = X(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this;
    }, dropRequireFailure: function (a) {
      if (f(a, "dropRequireFailure", this)) return this;a = X(a, this);var b = r(this.requireFail, a);return b > -1 && this.requireFail.splice(b, 1), this;
    }, hasRequireFailures: function () {
      return this.requireFail.length > 0;
    }, canRecognizeWith: function (a) {
      return !!this.simultaneous[a.id];
    }, emit: function (a) {
      function b(b) {
        c.manager.emit(b, a);
      }var c = this,
          d = this.state;jb > d && b(c.options.event + V(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= jb && b(c.options.event + V(d));
    }, tryEmit: function (a) {
      return this.canEmit() ? this.emit(a) : void (this.state = mb);
    }, canEmit: function () {
      for (var a = 0; a < this.requireFail.length;) {
        if (!(this.requireFail[a].state & (mb | gb))) return !1;a++;
      }return !0;
    }, recognize: function (a) {
      var b = ha({}, a);return k(this.options.enable, [this, b]) ? (this.state & (kb | lb | mb) && (this.state = gb), this.state = this.process(b), void (this.state & (hb | ib | jb | lb) && this.tryEmit(b))) : (this.reset(), void (this.state = mb));
    }, process: function (a) {}, getTouchAction: function () {}, reset: function () {} }, i(Y, U, { defaults: { pointers: 1 }, attrTest: function (a) {
      var b = this.options.pointers;return 0 === b || a.pointers.length === b;
    }, process: function (a) {
      var b = this.state,
          c = a.eventType,
          d = b & (hb | ib),
          e = this.attrTest(a);return d && (c & Da || !e) ? b | lb : d || e ? c & Ca ? b | jb : b & hb ? b | ib : hb : mb;
    } }), i(Z, Y, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: La }, getTouchAction: function () {
      var a = this.options.direction,
          b = [];return a & Ja && b.push(fb), a & Ka && b.push(eb), b;
    }, directionTest: function (a) {
      var b = this.options,
          c = !0,
          d = a.distance,
          e = a.direction,
          f = a.deltaX,
          g = a.deltaY;return e & b.direction || (b.direction & Ja ? (e = 0 === f ? Ea : 0 > f ? Fa : Ga, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ea : 0 > g ? Ha : Ia, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
    }, attrTest: function (a) {
      return Y.prototype.attrTest.call(this, a) && (this.state & hb || !(this.state & hb) && this.directionTest(a));
    }, emit: function (a) {
      this.pX = a.deltaX, this.pY = a.deltaY;var b = W(a.direction);b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a);
    } }), i($, Y, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function () {
      return [db];
    }, attrTest: function (a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & hb);
    }, emit: function (a) {
      if (1 !== a.scale) {
        var b = a.scale < 1 ? "in" : "out";a.additionalEvent = this.options.event + b;
      }this._super.emit.call(this, a);
    } }), i(_, U, { defaults: { event: "press", pointers: 1, time: 251, threshold: 9 }, getTouchAction: function () {
      return [bb];
    }, process: function (a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime > b.time;if ((this._input = a, !d || !c || a.eventType & (Ca | Da) && !f)) this.reset();else if (a.eventType & Aa) this.reset(), this._timer = e(function () {
        this.state = kb, this.tryEmit();
      }, b.time, this);else if (a.eventType & Ca) return kb;return mb;
    }, reset: function () {
      clearTimeout(this._timer);
    }, emit: function (a) {
      this.state === kb && (a && a.eventType & Ca ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = na(), this.manager.emit(this.options.event, this._input)));
    } }), i(aa, Y, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function () {
      return [db];
    }, attrTest: function (a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & hb);
    } }), i(ba, Y, { defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Ja | Ka, pointers: 1 }, getTouchAction: function () {
      return Z.prototype.getTouchAction.call(this);
    }, attrTest: function (a) {
      var b,
          c = this.options.direction;return c & (Ja | Ka) ? b = a.overallVelocity : c & Ja ? b = a.overallVelocityX : c & Ka && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && ma(b) > this.options.velocity && a.eventType & Ca;
    }, emit: function (a) {
      var b = W(a.offsetDirection);b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
    } }), i(ca, U, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 }, getTouchAction: function () {
      return [cb];
    }, process: function (a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime < b.time;if ((this.reset(), a.eventType & Aa && 0 === this.count)) return this.failTimeout();if (d && f && c) {
        if (a.eventType != Ca) return this.failTimeout();var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
            h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;var i = this.count % b.taps;if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () {
          this.state = kb, this.tryEmit();
        }, b.interval, this), hb) : kb;
      }return mb;
    }, failTimeout: function () {
      return this._timer = e(function () {
        this.state = mb;
      }, this.options.interval, this), mb;
    }, reset: function () {
      clearTimeout(this._timer);
    }, emit: function () {
      this.state == kb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
    } }), da.VERSION = "2.0.6", da.defaults = { domEvents: !1, touchAction: ab, enable: !0, inputTarget: null, inputClass: null, preset: [[aa, { enable: !1 }], [$, { enable: !1 }, ["rotate"]], [ba, { direction: Ja }], [Z, { direction: Ja }, ["swipe"]], [ca], [ca, { event: "doubletap", taps: 2 }, ["tap"]], [_]], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };var nb = 1,
      ob = 2;ea.prototype = { set: function (a) {
      return ha(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
    }, stop: function (a) {
      this.session.stopped = a ? ob : nb;
    }, recognize: function (a) {
      var b = this.session;if (!b.stopped) {
        this.touchAction.preventDefaults(a);var c,
            d = this.recognizers,
            e = b.curRecognizer;(!e || e && e.state & kb) && (e = b.curRecognizer = null);for (var f = 0; f < d.length;) c = d[f], b.stopped === ob || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (hb | ib | jb) && (e = b.curRecognizer = c), f++;
      }
    }, get: function (a) {
      if (a instanceof U) return a;for (var b = this.recognizers, c = 0; c < b.length; c++) if (b[c].options.event == a) return b[c];return null;
    }, add: function (a) {
      if (f(a, "add", this)) return this;var b = this.get(a.options.event);return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
    }, remove: function (a) {
      if (f(a, "remove", this)) return this;if (a = this.get(a)) {
        var b = this.recognizers,
            c = r(b, a);-1 !== c && (b.splice(c, 1), this.touchAction.update());
      }return this;
    }, on: function (a, b) {
      var c = this.handlers;return g(q(a), function (a) {
        c[a] = c[a] || [], c[a].push(b);
      }), this;
    }, off: function (a, b) {
      var c = this.handlers;return g(q(a), function (a) {
        b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a];
      }), this;
    }, emit: function (a, b) {
      this.options.domEvents && ga(a, b);var c = this.handlers[a] && this.handlers[a].slice();if (c && c.length) {
        b.type = a, b.preventDefault = function () {
          b.srcEvent.preventDefault();
        };for (var d = 0; d < c.length;) c[d](b), d++;
      }
    }, destroy: function () {
      this.element && fa(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
    } }, ha(da, { INPUT_START: Aa, INPUT_MOVE: Ba, INPUT_END: Ca, INPUT_CANCEL: Da, STATE_POSSIBLE: gb, STATE_BEGAN: hb, STATE_CHANGED: ib, STATE_ENDED: jb, STATE_RECOGNIZED: kb, STATE_CANCELLED: lb, STATE_FAILED: mb, DIRECTION_NONE: Ea, DIRECTION_LEFT: Fa, DIRECTION_RIGHT: Ga, DIRECTION_UP: Ha, DIRECTION_DOWN: Ia, DIRECTION_HORIZONTAL: Ja, DIRECTION_VERTICAL: Ka, DIRECTION_ALL: La, Manager: ea, Input: x, TouchAction: S, TouchInput: P, MouseInput: L, PointerEventInput: M, TouchMouseInput: R, SingleTouchInput: N, Recognizer: U, AttrRecognizer: Y, Tap: ca, Pan: Z, Swipe: ba, Pinch: $, Rotate: aa, Press: _, on: m, off: n, each: g, merge: pa, extend: oa, assign: ha, inherit: i, bindFn: j, prefixed: u });var pb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};pb.Hammer = da, "function" == typeof define && define.amd ? define(function () {
    return da;
  }) : "undefined" != typeof module && module.exports ? module.exports = da : a[c] = da;
})(window, document, "Hammer");
//# sourceMappingURL=hammer.min.map
!(function () {
  void 0 !== document.documentElement.style["touch-action"], window.Hammer = window.Hammer || {};var a = window.MutationObserver || window.WebKitMutationObserver,
      b = /touch-action[:][\s]*none[^;'"]*/,
      c = /touch-action/,
      d = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1,
      e = (function () {
    try {
      var a = document.createElement("canvas");return !(!window.WebGLRenderingContext || !a.getContext("webgl") && !a.getContext("experimental-webgl"));
    } catch (b) {
      return !1;
    }
  })(),
      f = e && d;window.Hammer.time = { getTouchAction: function (a) {
      return this.checkStyleString(a.getAttribute("style"));
    }, checkStyleString: function (a) {
      return c.test(a) ? b.test(a) ? "none" : !0 : void 0;
    }, touchHandler: function (a) {
      if (this.hasTouchNone(a.target) && (!f || Date.now() - a.target.lastStart < 125)) {
        if ("touchend" === a.type) {
          var b = new MouseEvent("click", { view: window, bubbles: !0, cancelable: !0 });setTimeout(function () {
            a.target.dispatchEvent(b);
          }, 0);
        }a.preventDefault();
      }delete a.target.lastStart;
    }, styleWatcher: function (a) {
      a.forEach(this.styleUpdater, this);
    }, styleUpdater: function (a) {
      if (a.target.updateNext) return void (a.target.updateNext = !1);var b = this.getTouchAction(a.target);return b ? void ("none" !== b && (a.target.hadTouchNone = !1)) : void (!b && (a.oldValue && this.checkStyleString(a.oldValue) || a.target.hadTouchNone) && (a.target.hadTouchNone = !0, a.target.updateNext = !1, a.target.setAttribute("style", a.target.getAttribute("style") + " touch-action: none;")));
    }, install: function () {
      document.addEventListener("touchend", this.touchHandler.bind(this), !0), document.addEventListener("mouseup", this.touchHandler.bind(this), !0), f && document.addEventListener("touchstart", (function (a) {
        this.hasTouchNone(a.target) && (a.target.lastStart = Date.now());
      }).bind(this)), this.observer = new a(this.styleWatcher.bind(this)).observe(document, { subtree: !0, attributes: !0, attributeOldValue: !0, attributeFilter: ["style"] });
    } }, window.Hammer.time.install();
})();
!(function (t, e) {
  "use strict";
  t.Zenscroll = function n(o, i, r) {
    i = i || 999, r && 0 === r || (r = 9);var c,
        l = e.documentElement,
        a = function () {
      return o ? o.scrollTop : t.scrollY || l.scrollTop;
    },
        u = function () {
      return o ? Math.min(o.offsetHeight, t.innerHeight) : t.innerHeight || l.clientHeight;
    },
        f = function (t) {
      return o ? t.offsetTop - o.offsetTop : t.getBoundingClientRect().top + a() - l.offsetTop;
    },
        s = function M() {
      clearTimeout(c), c = 0;
    },
        h = function (e, n) {
      s();var r = a(),
          f = Math.max(e, 0) - r;n = n || Math.min(Math.abs(f), i);var h = new Date().getTime();!(function g() {
        c = setTimeout(function () {
          var e = Math.min((new Date().getTime() - h) / n, 1),
              i = Math.max(Math.floor(r + f * (.5 > e ? 2 * e * e : e * (4 - 2 * e) - 1)), 0);o ? o.scrollTop = i : t.scrollTo(0, i), 1 > e && u() + i < (o || l).scrollHeight ? g() : setTimeout(s, 99);
        }, 9);
      })();
    },
        g = function H(t, e) {
      h(f(t) - r, e);
    },
        m = function w(t, e) {
      var n = t.getBoundingClientRect().height + 2 * r,
          o = u(),
          i = f(t),
          c = i + n,
          l = a();r > i - l || n > o ? g(t, e) : r > l + o - c && h(c - o, e);
    },
        p = function x(t, e, n) {
      h(Math.max(f(t) - u() / 2 + (n || t.getBoundingClientRect().height / 2), 0), e);
    },
        v = function B(e) {
      try {
        history.replaceState({}, "", t.location.href.split("#")[0] + (e ? "#" + e : ""));
      } catch (n) {}
    },
        d = function D(e) {
      for (var n = e.target; n && "A" !== n.tagName;) n = n.parentNode;if (n) {
        var o = n.getAttribute("href") || "";if (0 === o.indexOf("#")) if ("#" === o) e.preventDefault(), t.zenscroll.toY(0), v("");else {
          var i = n.hash.substring(1),
              r = document.getElementById(i);r && (e.preventDefault(), t.zenscroll.to(r), v(i));
        }
      }
    };!o && "addEventListener" in t && !t.noZensmooth && t.addEventListener("click", d, !1);var T = function E(t, e) {
      t && (i = t), null !== e && (r = e);
    };return { setup: T, to: g, toY: h, intoView: m, center: p, stop: s, moving: function () {
        return !!c;
      } };
  }, t.zenscroll = new t.Zenscroll();
})(this, document);