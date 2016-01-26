'use strict';


var ref = new Firebase('https://event-creator.firebaseio.com/')

// 
// 
// SETUP CODE
// 
// 

console.log( 'hello world' );

console.log( document.styleSheet );

var faButton = document.getElementById( 'fa' );
// console.log( el );
var main = document.getElementById( 'main' );
var overlay = document.getElementById( 'overlay' );
var body = document.getElementsByTagName('body')[0];
var style = window.getComputedStyle(body, null).getPropertyValue('font-size');
var bodyHeight = body.clientHeight;
var fontSize = parseFloat(style);









var errorContainer = document.getElementById( 'error-container' );
// sign in button in navigation menu
var signInNavOverlay = document.getElementById( 'sign-in' );


var newAccountContainer = document.getElementsByClassName( 'new-account-container' )[0];
var newEventContainer = document.getElementsByClassName( 'new-event-container' )[0];

var eventOverlay = document.getElementById( 'event-overlay' );
var eventOverlayCloseButton = document.querySelector( '.close-button' );
eventOverlayCloseButton.addEventListener( 'click', function() {

	eventOverlay.classList.add( 'move-away' );
	setTimeout( function() {
		eventOverlay.classList.remove( 'expand1' );
		eventOverlay.classList.remove( 'move-away' );
	}, 1000 );

})


// 
// NAV ITEMS
// 


var hamburgerIcon = document.getElementsByClassName('icon')[0];
var navOverlay = document.getElementById( 'nav-overlay' );
var fadedOverlay = document.getElementById( 'faded-overlay' );

var createAccount = document.getElementById( 'create-account' );


var cancelButtons = document.getElementsByClassName( 'cancel-button' );



var newAccountHeader = document.getElementsByClassName( 'header' )[0];
var newAccountFooter = document.getElementsByClassName( 'footer' )[0];

var nearbyList = document.getElementById( 'nearby-list' );
var closebyList = document.getElementById( 'closeby-list' );
var farawayList = document.getElementById( 'faraway-list' );

var nearbyButton = document.getElementsByClassName( 'nearby-button' )[0];
var closebyButton = document.getElementsByClassName( 'closeby-button' )[0];
var farawayButton = document.getElementsByClassName( 'faraway-button' )[0];

var viewportElements = [ nearbyList, closebyList, farawayList ];



// 
// 
// OVERLAY
// 
// 

var signInForm = document.getElementById( 'sign-in-form' );
var signInOverLay = document.getElementById( 'sign-in-overlay' );
var h2 = signInOverLay.querySelector( 'h2' );


var passField = document.getElementById( 'pass' );
var rePassField = document.getElementById( 'retype-pass' );

var newAccountForm = document.getElementById( 'new-account-form' );
var newEventForm = document.getElementById( 'new-event-form' );


console.log( nearbyButton );

nearbyButton.addEventListener( 'click', function() {
	console.log( 'click' );
	viewportElements.forEach( function( item ) {
		item.classList.remove( 'lefty' );
		item.classList.remove( 'left' );
	});
});

closebyButton.addEventListener( 'click', function() {
	console.log( 'click' );
	viewportElements.forEach( function( item ) {
		item.classList.add( 'left' );
		item.classList.remove( 'lefty' );
	});
});

farawayButton.addEventListener( 'click', function() {
	console.log( 'click' );
	viewportElements.forEach( function( item ) {
		item.classList.add( 'lefty' );
	});
});


// 
// 
// NAV MENU
// 
// 




var closeNav = function() {
	navOverlay.classList.remove( 'opened' );
	fadedOverlay.classList.remove( 'opened' );
}

fadedOverlay.addEventListener( 'click', function() {
	closeNav();
})

hamburgerIcon.addEventListener( 'click', function() {
	// console.log( 'add' );
	navOverlay.classList.add( 'opened' );
	fadedOverlay.classList.add( 'opened' );
});




// 
// 
// MAIN NAVIGATION ITEMS
// 
// 




var FireAuthData = ref.getAuth();
if ( FireAuthData ) {
	console.log( FireAuthData );
	console.log( FireAuthData.uid );
	signInNavOverlay.children[0].lastChild.data = "My Account";
	signInNavOverlay.setAttribute( 'onclick', 'showMyAccount()' );

	// reauthenticate 
	ref.authWithCustomToken( FireAuthData.token, function( error, data) {
		if ( !error ) {
			console.log( 'horay' );
		}
	} );

	var interval = 60000 * 60 * 23;
	setInterval( function() {
		ref.authWithCustomToken( FireAuthData.token, function( error, data) {
			if ( !error ) {
				console.log( 'horay' );
			}
		});
	}, interval );
}

var closeAccountAndEventOverlay = function() {

	createAccount.querySelector( '.submit-button' ).setAttribute( 'onclick', 'submitNewAccount()' );
	createAccount.querySelector( '.next-button' ).setAttribute( 'onclick', 'focusNextElement()' );

	createAccount.classList.add( 'aside' );
	main.classList.add( 'visible' );


	setTimeout( function(){
		// remove all the classes
		createAccount.classList.remove( 'aside' );

		overlay.classList.remove( 'visible' );
		newAccountContainer.classList.remove( 'visible', 'visibly' );
		newEventContainer.classList.remove( 'visible', 'visibly' );

		// newAccountContainer.classList.remove( 'visible' );
		newAccountHeader.classList.remove( 'visible' );
		newAccountFooter.classList.remove( 'visible' );

		overlay.classList.remove( 'from-left' ,'visible', 'from-left-to-middle' );
	}, 300 );
	// console.log( 'hello' );
}

var len = cancelButtons.length;
for ( var i = 0; i < len; i++ ) {
	// console.log( i );
	// console.log( cancelButtons[i] );
	cancelButtons[i].addEventListener( 'click', function() {

		closeAccountAndEventOverlay();

	})
}




// 
// 
// MAIN VIEW
// 
// 




var extractEventItem = function( elements ) {
	var elements = elements;
	var len = elements.length;

	for ( var i = 0; i < len; i++ ) {
		var element = elements[i];
		var classList = element.classList;
		if ( classList.contains('event-item') ) {
			element.style.transition = 'all .3s ease-in-out';
			element.style.top = 0 + 'px';
			// element.classList.add( 'step1', 'step2', 'step3' );
			console.dir( element );
			var top = element.offsetTop;
			var left = element.offsetLeft;

			element.style.position = 'relative';

			var sum = -top + left;
			element.style.top = sum + 'px';

			console.dir( element );

			var text = element.querySelector( '.event-info' );
			var map = element.querySelector( '.map-image' );
			var border = element.querySelector( '.bottom-border' );

			map.classList.add( 'invisible' );
			text.classList.add( 'invisible' );
			border.classList.add( 'invisible' );


			console.log( sum );


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
			

			setTimeout( function() {


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



				var eventOverlay = document.getElementById( 'event-overlay' );
				eventOverlay.classList.add( 'expand1' );
				// eventOverlay.classList.add(  );
				element.classList.add( 'expand' );

				console.log( parseInt( element.style.top ) );

				// var sum = sum - left;
				// console.log( sum );

				var sum = parseInt( element.style.top ) - element.offsetLeft;

				console.log( sum );

				setTimeout( function() {
					element.style.top = sum + 'px';
					// eventOverlay.classList.add( 'expand2' );
					// element.classList.add( 'expand' );
					setTimeout( function() {
						element.style.position = '';
						element.style.top = '';
						map.classList.remove( 'invisible' );
						text.classList.remove( 'invisible' );
						border.classList.remove( 'invisible' );
						element.classList.remove( 'expand' );
					}, 2000 )
				}, 100 )

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

			}, 600)

			// increase the z-index of map circle

			// element.style.left = left + 'px';
			break;
		}
	}


}

var eventItems = document.getElementsByClassName( 'event-item' );
var len = eventItems.length;
for ( var i = 0; i < len; i++ ) {
	// console.log( i );
	// console.log( cancelButtons[i] );

	eventItems[i].addEventListener( 'click', function( e ) {

		// console.log( zenscroll );
		// zenscroll.intoView( main );
		nav.scrollIntoView();
		extractEventItem( e.path );
		// createAccount.classList.add( 'aside' );

	})
}



// cancelButtons.forEach( function() {
// 	console.log( 'hello' );
// })

// cancelButtons.forEach( function( button ) {
// 	button.addEventListener( 'click', function() {
// 		console.log( 'hello button' );
// 	})
// })








// now you have a proper float for the font size (yes, it can be a float, not just an integer)
// el.style.fontSize = (fontSize + 1) + 'px';
// console.log( fontSize );

// alert( fabContainer  );
// console.log( fabContainer );
// alert( bodyHeight - ( fontSize * 8 ) );



var HammerNearby = new Hammer( nearbyList );
var HammerCloseby = new Hammer( closebyList );
var HammerFaraway = new Hammer( farawayList );
var HammerOverylay = new Hammer( navOverlay );

HammerOverylay.on('swipeleft', function(ev) {
	navOverlay.classList.remove( 'opened' );
	fadedOverlay.classList.remove( 'opened' );
});

HammerNearby.on('swipeleft', function(ev) {
	viewportElements.forEach( function( item ) {
		item.classList.add( 'left' );
	})
});

HammerNearby.on('swiperight', function(ev) {
	viewportElements.forEach( function( item ) {
		item.classList.remove( 'left' );
	});
});

HammerCloseby.on('swipeleft', function(ev) {
	viewportElements.forEach( function( item ) {
		item.classList.add( 'lefty' );
	})
});

HammerCloseby.on('swiperight', function(ev) {
	viewportElements.forEach( function( item ) {
		item.classList.remove( 'lefty' );
		item.classList.remove( 'left' );
	});
});

HammerFaraway.on('swiperight', function(ev) {
	viewportElements.forEach( function( item ) {
		item.classList.remove( 'lefty' );
	});
});



var h = bodyHeight - ( fontSize * 8 );
newAccountContainer.style.height = h;
newAccountContainer.style.minHeight = h;

faButton.addEventListener( 'click', function( e ) {

	// IF the user is not signed in, show sign in/sign up page
	// else opoen the new event pag

	console.log( FireAuthData );

	if ( !FireAuthData ) {


		showSignIn();


	} else {

		swapButtons( false );

		faButton.classList.add( 'expand-animation' );

		createAccount.querySelector( 'h2' ).innerText = "Create Event";
		createAccount.querySelector( '.next-button' ).setAttribute( 'onclick', 'focusNextElementInNewEvent()');
		createAccount.querySelector( '.submit-button' ).setAttribute( 'onclick', 'submitNewEvent()');


		overlay.classList.add( 'visible' );
		// newAccountContainer.classList.add( 'visible' );
		// newEventContainer.classList.add( 'visible' );
		newEventContainer.classList.add( 'visibly' );

		newAccountHeader.classList.add( 'visible' );
		newAccountFooter.classList.add( 'visible' );

		console.log( newAccountHeader );
		console.log( newAccountFooter );

		setTimeout( function() {

			newEventContainer.classList.add( 'visible' );

			setTimeout( function() {
				faButton.classList.remove( 'expand-animation' );
				faButton.classList.remove( 'expanded' );
				main.classList.remove( 'visible' );
			}, 300);

		}, 200 );
	}

	
});

// var el = document.getElementById('foo');


// document.getElementById( 'fa' ).on( 'click', function( e ) {
// 	alert('msg');
// });

var searchForm = document.getElementById( 'search-form' );
var saerchInput = document.getElementById( 'search-input' );

var onSearch = function() {
	// searchForm.blur();
	saerchInput.blur();
	// console.log( 'saerchForm' );
}







// select input value on click within the new Account Form
// this needs to be refactored and should be accepting any form

var forms = document.getElementsByTagName( 'form' );

var attachClickAndSelectFunctionToForm = function( forms ) {
	// console.log( forms );
	for( var i = 0; i < forms.length; i++ ) {
		// console.log( forms[i] );
		var len = forms[i].length;
		for ( var i = 0; i < len; i++ ) {
			var input = forms[i];
			console.log( input );
			if ( input !== undefined ) {
				input.addEventListener( 'click', function(e) {
					e.target.select();
				})
			}
			
		}
	}
}

attachClickAndSelectFunctionToForm( forms );



var showError = function( error ) {

	
	var p = errorContainer.querySelector('p');

	var flashError = function( text ) {
		// set inner text
		p.innerText = text;
		errorContainer.classList.add( 'visible' );
		setTimeout( function() {
			errorContainer.classList.remove( 'visible' );
		}, 3000 );
	}

	switch ( error ) {
		case 1:
			console.log( 'pass too short' );
			flashError( 'Password too short' );
			break;
		case 2:
			console.log( 'there is no number in pass' );
			flashError( "Password doesn't contain number" );
			break;
		case 3:
			console.log( 'there is no lowercase letter in pass' );
			flashError( "Password doesn't contain lowercase letter" );
			break;
		case 4:
			console.log( 'there is no UpperCase Letter in pass' );
			flashError( "Password doesn't contain uppercase letter" );
			break;
		case 5:
			console.log( 'passwords do not match' );
			flashError( "Passwords do not match" );
			break;
		case 6:
			console.log( 'invalid birthday' );
			flashError( 'Invalid Birthday' );
			break;
		case 7:
			console.log( 'day is wrong' );
			flashError( 'Incorrect Day format' );
			break;
		case 8:
			console.log( 'month is wrong' );
			flashError( 'Incorrect Month format' );
			break;
		case 9:
			console.log( 'year is wrong' );
			flashError( 'Incorrect Year format' );
			break;
		case 10:
			console.log( 'Invalid Characters in Name' );
			flashError( 'Name containes invalid characters' );
			break;
		case 11:
			console.log( 'Invalid Email' );
			flashError( 'Invalid Email Address' );
			break;
		case 12:
			console.log( 'Email Already in Use' );
			flashError( 'Email Already in Use' );
			break;
		case 13:
			console.log( 'Account Successfully Created' );
			flashError( 'Account Successfully Created' );
			break;
		case 14:
			console.log( 'Sign In Successful' );
			flashError( 'Sign In Successful' );
			break;
		case 15:
			console.log( 'Incorrect email or password' );
			flashError( 'Incorrect email or password' );
			break;
		case 16:
			console.log( 'Logged out' );
			flashError( 'Logged out' );
			break;
		case 17:
			console.log( 'The specified user does not exist' );
			flashError( 'The specified user does not exist' );
			break;
		case 18:
			console.log( 'Incorrect hour format' );
			flashError( 'Incorrect hour format' );
			break;
		case 19:
			console.log( 'Incorrect minute format' );
			flashError( 'Incorrect minute format' );
			break;
		case 20:
			console.log( 'Incorrect minute format' );
			flashError( 'Invalid event start date format' );
			break;
		case 21:
			console.log( 'Incorrect minute format' );
			flashError( 'Invalid event end date format' );
			break;
		case 22:
			console.log( 'No support for device location' );
			flashError( 'No support for device location' );
			break;
		case 23:
			console.log( 'Invalid Date Format' );
			flashError( 'Invalid Date Format' );
			break;
		case 24:
			console.log( 'Event Successfully Created' );
			flashError( 'Event Successfully Created' );
			break;
		case 25:
			console.log( 'Event End Date Is Before Start Date' );
			flashError( 'Event End Date Is Before Start Date' );
			break;
		case 26:
			console.log( 'Event End Time Is Before Start Time' );
			flashError( 'Event End Time Is Before Start Time' );
			break;
		case 27:
			console.log( 'Event Cannot Start Before Today' );
			flashError( 'Event Cannot Start Before Today' );
			break;
	}

}




var swapButtons = function( on ) {
	var accFooter = document.getElementsByClassName( 'footer' )[0];
	console.dir( accFooter );
	if ( on ) {
		for (var i = 0; i < 2; i++ ) {
			accFooter.children[1].children[i].classList.add( 'visible' );
		}
	} else {
		for (var i = 0; i < 2; i++ ) {
			accFooter.children[1].children[i].classList.remove( 'visible' );
		}
	}

}



var resetFieldsButton = document.getElementById( 'reset-fields' );

var resetFields = function() {
	resetFieldsButton.children[0].classList.add( 'rotate' );
	setTimeout( function() {
		resetFieldsButton.children[0].classList.remove( 'rotate' );
	}, 500 );

	var h2 = overlay.querySelector( 'h2' );

	if ( h2.innerText === "NEW ACCOUNT" ) {
		var len = newAccountForm.length;
		for ( var i = 0; i < len; i++ ) {
			var element = newAccountForm.children[i];
			element.value = '';
		}
		newAccountObject = {};
	} else {
		console.log( newEventForm );
		var len = newEventForm.length;
		for ( var k = 0; k < len; k++ ) {
			var element = newEventForm.children[k];
			console.log( element.value );
			console.dir( element );
			element.value = '';
		}
		newEventObject = {};
	}
}


resetFieldsButton.addEventListener( 'click', function() {
	// resetFieldsButton.classList.remove( 'end' );
	
	resetFields();

	// resetFields.classList.add( 'end' );
})




var setFocus = function( el ) {
	console.log( el );
}

var focusNextElement = function( element ) {

	checkIfFormReadyForSubmit( true );

	for ( var i = 0; i < 6; i++ ) {
		var element = newAccountForm[i];
		if ( element.value === '' ) {
			if ( i === 0 ) {
				newAccountForm[i + 1].scrollIntoView(false);
			} else {
				newAccountForm[i - 1].scrollIntoView(true);
			}
			// element.scrollIntoView(true);
			element.focus();
			return;
		}
	}
}

var checkIfFormReadyForSubmit = function( status ) {

	if ( status ) {
		for ( var i = 0; i < 5; i++ ) {
			var element = newAccountForm[i];
			if ( element.value === '' ) {
				swapButtons( false );
				return;
			}
		}
		swapButtons( true );
	} else {
		swapButtons( false );
	}

};




// 
// ACCOUNT AND EVENT UTILITY
// 


var saveInputDataToObject = function( id, obj ) {

	// obj === true if it is the event object
	if ( obj ) {
		if ( newEventForm[id].value !== '' ) {
			newEventObject[id] = newEventForm[id].value;
		}
	} else {
		if ( newAccountForm[id].value !== '' ) {
			newAccountObject[id] = newAccountForm[id].value;
		}
	}

	console.log( newEventObject );

}



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


var processEmployer = function() {

	saveInputDataToObject( 'employer', false );

}

var processJobTitle = function() {

	saveInputDataToObject( 'jobtitle', false );

}

var validatePass = function( pass ) {

	if ( pass.length === 0 ) {
		return false;
	}
	if ( pass.length < 6 ) {
		showError( 1 );
		passField.select();
		return false;
	}
	var re = /[0-9]/;
	if ( !re.test( pass ) ) {
		console.log( 'there is no number' );
		showError( 2 );
		passField.select();
		return false;
	}
	re = /[a-z]/;
	if ( !re.test( pass ) ) {
		console.log( 'there is no lowercase letter' );
		showError( 3 );
		passField.select();
		return false;
	}
	re = /[A-Z]/;
	if ( !re.test( pass ) ) {
		console.log( 'there is no UpperCase Letter' );
		showError( 4 );
		passField.select();
		return false;
	} else return true;

}

var checkPass = function() {

	// var passWord = passField.value;
	// var retypePass = rePassField.value;

	console.log( newAccountForm['retype-pass'] );

	var inputValid = false;

	// if it's only first field that we filled in, check only this field
	if ( newAccountForm['retype-pass'].value === '' ) {

		// if( newAccountForm['pass'])

		inputValid = validatePass( newAccountForm['pass'].value );

	} else if ( newAccountForm.pass.value !== newAccountForm['retype-pass'].value ) {
		console.log( 'passwords do not match' );
		newAccountForm['retype-pass'].select();
		showError( 5 );

	} else {

		saveInputDataToObject( 'pass', false );
		inputValid = true;

	}

	if ( inputValid ) {
		checkIfFormReadyForSubmit( true );
	} else {
		// switch next/confirm buttons
		checkIfFormReadyForSubmit( false );
	}

	// console.log( passField.value );
	// console.log( rePassField.value );
}

var submitNewAccount = function() {

	console.log( newAccountForm );
	console.dir( newAccountForm );

	console.log( newAccountObject );

	// var len = newAccountForm.length;

	var credentials = {};
	credentials.email = newAccountObject['email'];
	credentials.password = newAccountObject['pass'];

	ref.createUser( credentials, function( error, user ) {
		if ( error ) {
			console.log( error );
			showError( 12 );
		} else {
			console.log( user );
			ref.authWithPassword( credentials, function( error, user ) {
				if( error ) {
					console.log( error );
				} else {
					console.log( user );

					var uid = user.auth.uid;
					var obj = {};
					delete newAccountObject['email'];
					delete newAccountObject['pass'];
					// obj.name = newAccountForm.name.value;
					// obj.birthday = newAccountForm.birthday.value;
					// obj.employer = newAccountForm.employer.value;
					// obj.job = newAccountForm.jobtitle.value;
					// console.log( obj );
					ref.child( 'users' ).child( uid ).child( 'info' ).set( newAccountObject, function( error, data ) {

						if ( error ) {
							console.log( 'error' );
						} else {

							closeAccountAndEventOverlay();

							changeSignInButtonToMyAccount();

							resetFields();
							newAccountObject = {};

							showError( 13 );

						}

					} );

					// if the previous state was that the user wanted to
					// create an event but didn't have an account, then
					// the state shoudl return to event creation page.

					// figure out the State of the applicatino and if the user
					// was creating a new event before
					// the app should switch back to that state..


					// showSignIn();

					// close the overlay and all
				}
			})
		}
	})

}

var nameCheck = function() {
	var name = newAccountForm.name.value;
	var re = /^[a-zA-Z\s]+$/;
	if ( name.length !== 0 && re.test( name ) ) {
		saveInputDataToObject( 'name', false );
		return true;
	} else if ( name.length === 0 ) {
		return false;
	} else {
		newAccountForm.name.select();
		console.log( 'Invalid Characters' );
		showError( 10 );
	}
}

var checkDOB = function() {

	// if ( inputValid ) {
	// 	checkIfFormReadyForSubmit( true );
	// } else {
	// 	// switch next/confirm buttons
	// 	checkIfFormReadyForSubmit( false );
	// }

	var bday = newAccountForm.birthday.value;
	var len = bday.length;

	if ( len === 0 ) {
		checkIfFormReadyForSubmit( false );
		return;
	}

	console.log( bday );
	console.log( len );

	var checkIfAllDigits = function( numbers ) {
		var re = /^\d+$/;
		console.log( re.test( numbers ) );
		if ( re.test( numbers ) ) {
			return true;
		} else return false;
	}

	var checkValidityOfNumbers = function( numbers ) {
		var bday = numbers;
		var day = bday.substring(0, 2);
		console.log( day )
		if ( day > 0 && day <= 31 ) {
			var month = bday.substring(2, 4);
			console.log( month )
			if ( month > 0 && month <= 12 ) {
				var year = bday.substring( 4, 8 );
				console.log( year )

				var today = new Date();
				var minYear = today.getFullYear() - 100;
				var maxYear = today.getFullYear() - 13;

				if ( year >= minYear && year <= maxYear ) {
					console.log( 'OK' );
					console.log( bday );
					return;
				} else {
					// error showing year is wrong
					console.log( 'year is wrong' );
					newAccountForm.birthday.select();
					showError( 9 );
					return;
				}

			} else {
				//error showing wrong month
				console.log( 'month is wrong' );
				newAccountForm.birthday.select();
				showError( 8 );
				return;
			}
		} else {
			// error showing wrong day
			console.log( 'day is wrong' );
			newAccountForm.birthday.select();
			showError( 7 );
			return;
		}

		checkIfFormReadyForSubmit( true );

	}

	if ( len === 8 ) {
		// check if all things are digits
		if ( checkIfAllDigits( bday ) ) {
			// check if frist two is between 1 and 31
			checkValidityOfNumbers( bday );

			// check if second two is between 1 and 12

			// check if last four is nuber between 1900 and 2015 or new date minus 13 yerars
			// if not then the person is too young

		} else {
			showError( 6 );
			newAccountForm.birthday.select();
		}
		// double check if the error code is correctly wired

	} else if ( len === 10 ) {
		// remove the '/' sign
		var transformToNumbers = function( string ) {
			var numbers = string.split( '/' ).join( '' );
			bday = numbers;
			// console.log( string );
			return numbers;
		}

		if ( checkIfAllDigits( transformToNumbers( bday ) ) ) {
			// check if frist two is between 1 and 31
			checkValidityOfNumbers( bday );

			// check if second two is between 1 and 12

			// check if last four is nuber between 1900 and 2015 or new date minus 13 yerars
			// if not then the person is too young

		} else {
			showError( 6 );
			// above error is invalid characters
			newAccountForm.birthday.select();
		}

	} else {
		// form is invalid
		// select 
		console.log( 'its all wrong' );
		newAccountForm.birthday.select();
		// check if error code is correct
		// error 'incorrect date'
		showError( 6 );
		checkIfFormReadyForSubmit( false );
		return;
	}

	// THE BIRTHDAY IS CORRECT, IF IT WASN'T THE FUNCTION WOULD NOT GET THIS FAR
	checkIfFormReadyForSubmit( true );
	saveInputDataToObject( 'birthday', false );
	//console.log( newAccountForm.birthday );
}

var emailCheck = function() {
	
	var email = newAccountForm.email.value;
	var len = email.length;

	if ( len === 0 ) {
		
		checkIfFormReadyForSubmit( false );
		return

	} else {

		if ( len <= 6 ) {
			
			showError( 11 );
			newAccountForm.email.select();
			// showError invalid email

		} else {
			
			var twoParts = email.split( '@' );

			if ( twoParts.length === 2 ) {

				var secondPart = twoParts[1].split( '.' );
				var len = secondPart.length

				if ( len === 2 || len === 3 ) {

					// EMAIL IS CORRECT!

					checkIfFormReadyForSubmit( true );
					saveInputDataToObject( 'email', false );

				} else {

					showError( 11 );
					newAccountForm.email.select();
					// invalid email

				}
			} else {

				showError( 11 );
				newAccountForm.email.select();
				// invalid email

			}
		}
	}
}


// open signUp after clicking a sign in button
// this will be changed, because the user will first try to sign in,
// if this sign in fails, then the New account overlay will be opened with the
// password and email prefilled

var showNewAccount = function() {

	console.log( 'sign in' );

	console.log( h2 );
	var h2 = overlay.querySelector( 'h2' );

	h2.innerText = "New Account";

	// this should be bundeled as a function...
	navOverlay.classList.remove( 'opened' );
	fadedOverlay.classList.remove( 'opened' );

	// overlay left
	overlay.classList.add( 'from-left' ,'visible' );
	setTimeout( function() {
		overlay.classList.add( 'from-left-to-middle' );
		newAccountContainer.classList.add( 'visibly' );
		newAccountHeader.classList.add( 'visible' );
		newAccountFooter.classList.add( 'visible' );

		setTimeout( function() {
			newAccountContainer.classList.add( 'visible' );
		}, 200 );

		setTimeout( function() {
			main.classList.remove( 'visible' );
		}, 300);
	}, 100 );

}

var signInToSignUpTransition = function() {
	hideSignIn();
	setTimeout( function() {
		showNewAccount();
	}, 300 );
}

var showMyAccount = function() {
	console.log( 'open my account YO?' );
}












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








var hideSignIn = function() {
	fadedOverlay.setAttribute( 'onclick', '' );
	fadedOverlay.classList.remove( 'opened' );
	signInOverLay.classList.remove( 'visible' );
	console.dir( 'sign in hide');
}

var showSignIn = function() {
	closeNav();
	fadedOverlay.setAttribute( 'onclick', 'hideSignIn()')
	setTimeout( function() {
		fadedOverlay.classList.add( 'opened' );
	}, 300 );
	signInOverLay.classList.add( 'visible' );
	signInForm.email.focus();
	console.dir( 'sign in show');
}

var signInWithToken = function( data ) {
	console.log( ref.getAuth() );
	var token = data.token;
	console.log( data );
	console.log( token );
	ref.authWithCustomToken( token, function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			showError( 14 );
			console.log("Authenticated successfully with payload:", authData);
		}
	});
}

var changeSignInButtonToMyAccount = function() {
	signInNavOverlay.children[0].lastChild.data = "My Account";
	signInNavOverlay.setAttribute( 'onclick', 'showMyAccount()' );
}

var signIn = function() {

	// set the sign in button disabled
	h2.setAttribute( 'onclick', '' );
	h2.classList.remove( 'button' );


	var credentials = {};
	credentials.email = signInForm.email.value;
	credentials.password = signInForm.password.value;
	ref.authWithPassword( credentials, function(error, authData) {
		if(error) {
			console.log( error );
			console.dir( error );
			switch( error.code ) {
				case "INVALID_USER":
					showError( 17 );
					break;
				case "INVALID_PASSWORD":
					showError( 15 );
					break;
			}
			resetLoginFields();
			// showError( 15 );
		} else {
			FireAuthData = authData;
			console.log( authData );
			hideSignIn();

			// reset Sign in
			resetLoginFields();

			//
			changeSignInButtonToMyAccount();
			showError( 14 );
			var interval = 60000 * 60 * 23;
			setInterval( function() {
				signInWithToken( authData );
			}, interval );
		}
	});
}


var loginLen = function() {
	if ( signInForm.email.value !== '' ) {
		if ( signInForm.password.value.length >= 6 ) {
			h2.classList.add( 'button' );
			h2.setAttribute( 'onclick', 'signIn()' );
		} else {
			h2.classList.remove( 'button' );
			h2.setAttribute( 'onclick', '' );
		}
	}

}

var selectSignInButton = function() {
	h2.focus();
}

var signOut = function() {
	closeNav();
	ref.unauth();

	FireAuthData = null;

	signInNavOverlay.children[0].lastChild.data = "Sign In";
	signInNavOverlay.setAttribute( 'onclick', 'showSignIn()' );
	setTimeout( function() {
		showError( 16 );
	}, 300 );
}

var dismissError = function() {
	errorContainer.classList.remove( 'visible' );
}

var resetLoginFields = function() {
	var len = signInForm.length;
	for ( var i = 0; i < len; i++ ) {
		var input = signInForm[i];
		input.value = '';
	}
}



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


var processEventName = function() {

	var id = 'event-name';
	saveInputDataToObject( id, true );
}


var processEventType = function() {

	var id = 'host';
	saveInputDataToObject( id, true );
}

var processEventHost = function() {

	var id = 'event-type';
	saveInputDataToObject( id, true );
}




// 
// EVENT DATE CHECK
// 

var selectDateElement = function( start ) {

	if ( start ) {
		newEventForm['event-start-date'].select();
	} else newEventForm['event-end-date'].select();

}

var compareDates = function( primaryDate, secondaryDate, s  ) {

	var d1 = primaryDate;
	var d2 = secondaryDate;

	var start = s;

	// var dd = parseInt( sD.substr( 0, 2 ) );
	// var mm = parseInt( sD.substr( 2, 2 ) );
	// var yy = parseInt( sD.substr( 4, 2 ) );

	var DateObject = function( date ) {
		var obj = {
			date: date,
			day: parseInt( date.substr( 0, 2 ) ),
			month: parseInt( date.substr( 2, 2 ) ),
			year: parseInt( date.substr( 4, 2 ) )
		};
		return obj;
	}

	var p1 = new DateObject( d1 );
	var p2 = new DateObject( d2 );


	console.log( p1 );
	console.log( p2 );

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


	var isTimeGreater = function() {

		var t1 = parseInt( newEventObject['event-start-time'] );
		var t2 = parseInt( newEventObject['event-end-time'] );

		console.log( t1 !== NaN || t2 !== NaN );

		console.log( t1 );
		console.log( t2 );

		if ( t1 !== NaN || t2 !== NaN ) {
			
			console.log( t1 );
			console.log( t2 );

			return ( t1 >= t2 ) ? false : true;

		}
		

		// if ( parseInt(newEventObject['event-start-time'] ) >= parseInt( newEventObject['event-end-time'] ) ) {
		// 	// the event end time is before the start time
		// 	console.log( 'show error 26');
		// 	showError( 26 );
		// 	return false;
		// } else {

		// 	// return error stating the time cant be lower

		// }

	}


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

	var selectIncorrectField = function( time ) {

		if ( start ) {

			if ( time ) {

				newEventForm['event-start-time'].select();

			} else {

				newEventForm['event-start-date'].select();

			}

		} else {

			if ( time ) {

				newEventForm['event-end-time'].select();

			} else {

				newEventForm['event-end-date'].select();

			}

		}

	}

	var isGreaterOrEqual = function( v1, v2 ) {

		return ( v1 <= v2 ) ? true : false;

	}


	var isSame = function( v1, v2 ) {

		return ( v1 === v2 ) ? true : false;


	}

	if ( isGreaterOrEqual( p1.year, p2.year ) ) {

		console.log( 'isGreaterOrEqual no. 1' );

		if ( isSame( p1.year, p2.year ) ) {

			console.log( 'isSame no. 1' );

			if ( isGreaterOrEqual( p1.month, p2.month ) ) {

				console.log( 'isGreaterOrEqual no. 2' );

				if ( isSame( p1.month, p2.month ) ) {

					console.log( 'isSame no. 2' );

					if ( isGreaterOrEqual( p1.day, p2.day ) ) {

						console.log( 'isGreaterOrEqual no. 3' );

						if ( isSame( p1.day, p2.day ) ) {

							console.log( 'isSame no. 2' );

							console.log( isTimeGreater() );

							if ( !isTimeGreater() ) {

								showError( 26 );
								selectIncorrectField( true );

							} else return true;

						} else return true;

					} else {

						showError( 27 );
						selectIncorrectField( false );

					}

				} else return true;

			} else {

				showError( 27 );
				selectIncorrectField( false );

			}

		} else return true;

	} else {

		showError( 27 );
		selectIncorrectField( false );

	}

}


var validateDateAgainstToday = function( dObj ) {

	var dateObj = dObj;

	console.log( dateObj );

	// var sD = newEventForm['event-start-date'].value;
	// var eD = newEventForm['event-end-date'].value;

	// if ( sd !== '' || eD !== '' ) {



	// }

	if( dateObj.start ) {

		var today = new Date();

		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = '' + today.getFullYear()
		var yy = parseInt( yyyy.substr( 2, 4 ) );

		if(dd<10) {
			dd='0'+dd;
		};

		if(mm<10) {
			mm='0'+mm;
		};

		today = dd+''+mm+''+ yy;

		// today = {};
		// today.day = dd;
		// today.month = mm;
		// today.year = yy;

		// console.log( dd );
		// console.log( mm );
		// console.log( yy );


		if ( compareDates( today, dateObj.date, true ) ) {

			newEventObject['event-start-date'] = dateObj.date;
			console.log( newEventObject );

		};

		// var today = parseInt( today );
		// var eventStartDate = parseInt( newEventObject['event-start-date'] );


		// var eventStartDay = dateObj.day;
		// var eventStartMonth = dateObj.month;
		// var eventStartYear = dateObj.year;

	} else {

		var sD = newEventObject['event-start-date'];

		console.log( sD );

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

		if ( compareDates( sD, dateObj.date, false ) ) {

			newEventObject['event-end-date'] = dateObj.date;
			console.log( newEventObject );

		};

	}

	

}


var verifyDate = function( d ) {

	// rememeber we hace the start value in the object, so we can
	// be selecting the fields upon error correctly

	var dateObj = d;
	var start = dateObj.start;

	console.log( dateObj );

	if ( dateObj.day < 0 || dateObj.day > 31 ) {

		showError( 7 );
		selectDateElement( start );
		return;

	}

	if ( dateObj.month < 0 || dateObj.month > 12 ) {

		showError( 8 );
		selectDateElement( start );
		return;

	}

	if ( dateObj.year < 16 ) {

		showError( 9 );
		selectDateElement( start );
		return;

	}


	if ( validateDateAgainstToday( dateObj ) ) {
		// if the date is wrong, then the fucntion would not get this far
		if ( start ) {
			newEventObject['event-start-date'] = dateObj.date;
		} else newEventObject['event-end-date'] = dateObj.date;
	}

	console.log( newEventObject );
	console.log( newAccountObject );
}

var getDayMonthYear = function( d ) {

	var dateObj = d;

	dateObj.day = parseInt( dateObj.date.substring( 0, 2 ) );
	dateObj.month = parseInt( dateObj.date.substring( 2, 4 ) );
	dateObj.year = parseInt( dateObj.date.substring( 4, 6 ) );

	console.log( dateObj );

	return dateObj;
}


var checkEventDateFormat = function( start ) {

	var date,
		len;

	var dateObj = {};

	if ( start ) {

		date = newEventForm['event-start-date'].value;
		len = date.length;
		dateObj.start = true;

	} else {

		date = newEventForm['event-end-date'].value;
		len = date.length;
		dateObj.start = false;

	}

	console.log( date );

	if ( date !== '' ) {


		if ( len === 6 ) {

			dateObj.date = date;



			verifyDate( getDayMonthYear( dateObj ) );


		} else if ( len === 8 ) {

			var d = date.split('/');
			var date = d.join('');

			if( date.length === 6 ) {

				dateObj.date = date;



				verifyDate( getDayMonthYear( dateObj ) );




			} else showError( 23 );

		} else {

			if ( start ) {
				// show error stating that the startdate format is wrong
				showError( 20 );
				return;
			} else {
				showError( 21 );
				return;
			}

		}

	}


}

var processEventStartDate = function() {

	checkEventDateFormat( true );

}

var processEventEndDate = function() {

	checkEventDateFormat();

}



// 
// CHECK EVENT TIME
// 


var saveTimeToObject = function( start, time ) {
	if ( start ) {
		newEventObject['event-start-time'] = time;
	} else newEventObject['event-end-time'] = time;


	console.log( newEventObject );
}

var focusTimeInput = function( start ) {

	if ( start ) {
		// focus start input
		newEventForm['event-start-time'].select();

	} else {
		// focus end input
		newEventForm['event-end-time'].select();
	}

}


var isTimeGreater = function( one, two ) {

	console.log( 'one' );
	console.log( 'two' )
	console.log( one );
	console.log( two )

	var t1 = parseInt( newEventObject['event-start-time'] );
	var t2 = parseInt( newEventObject['event-end-time'] );

	if ( one !== undefined && two !== undefined ) {

		t1 = parseInt( one );
		t2 = parseInt( two );

	}

	console.log( t1 !== NaN || t2 !== NaN );

	console.log( t1 );
	console.log( t2 );

	if ( t1 !== NaN || t2 !== NaN ) {

		console.log( t1 );
		console.log( t2 );

		return ( t1 >= t2 ) ? false : true;

	}


	// if ( parseInt(newEventObject['event-start-time'] ) >= parseInt( newEventObject['event-end-time'] ) ) {
	// 	// the event end time is before the start time
	// 	console.log( 'show error 26');
	// 	showError( 26 );
	// 	return false;
	// } else {

	// 	// return error stating the time cant be lower

	// }

}

var getHoursAndMinutes = function( t ) {

	var hour,
		minutes;

	var timeObj = t;

	var start = timeObj.start;

	hour = parseInt( timeObj.time.substring( 0, 2 ), 10 );
	minutes = parseInt( timeObj.time.substring( 2, 4 ), 10 );

	console.log( timeObj );
	console.log( hour );
	console.log( minutes );

	console.log( ( hour < 0 && hour > 24 ) );
	console.log( ( minutes < 0 && minutes > 60 ) );

	if ( hour < 0 || hour > 24 ) {

		showError( 18 );
		focusTimeInput( start );
		return;

	}

	if ( minutes < 0 || minutes > 59 ) {

		showError( 19 );
		focusTimeInput( start );
		return;

	}

	saveTimeToObject( start, timeObj.time );

}

var checkTimeValue = function( start ) {

	var time,
		len;

	var timeObj = {};

	if ( start ) {

		time = newEventForm['event-start-time'].value;
		len = time.length;
		timeObj.start = true;

	} else {

		time = newEventForm['event-end-time'].value;
		len = time.length;
		timeObj.start = false;

	}

	if ( time !== '' ) {

		if ( len === 4 ) {

			timeObj.time = time
			getHoursAndMinutes( timeObj );

		} else if ( len === 5 ) {

			timeObj.time = time.split( ':' ).join('');


			var len = timeObj.time.length;

			if ( len === 4 ) {
				getHoursAndMinutes( timeObj );
			}

		} else {

			showError( 23 );
			if( start ) {
				newEventForm['event-start-time'].select();
			} else newEventForm['event-end-time'].select();
			return;

		}

	}

}

var processEventStartTime = function() {

	checkTimeValue( true );

}

var processEventEndTime = function() {

	checkTimeValue();

}


// 
// EVENT PLACE
// 



//
// GOOGLE PLACES API FUNCTION
//

var savePlaceData = function( p, n ) {

	var place = p,
		name = n;

	newEventObject['event-location-data'] = {};
	newEventObject['event-location-data'].name = name;
	
	newEventObject['event-location-data'].lat = place.geometry.location.lat();
	newEventObject['event-location-data'].lng = place.geometry.location.lng();

	console.log( newEventObject );

};


var initAutocomplete = function() {

	var input = newEventForm['google-event-location'];
	var autocomplete = new google.maps.places.Autocomplete(input);

	autocomplete.addListener( 'place_changed', function() {
		var place = autocomplete.getPlace();
		// input.data = place;
		// console.dir( input );
		// console.log( place );
		// console.log( place.types.length );
		if ( place.types.length > 1 ) {
			input.value = place.name;
		} else {

			console.log( place['address_components'][1]['long_name'] );
			console.log( place['address_components'][0]['long_name'] );

			input.value = place['address_components'][1]['long_name'] + ' ' + place['address_components'][0]['long_name'];
		}

		var name = input.value;
		savePlaceData( place, name );

	})

}

var privacy = true;
var togglePrivacy = function() {

	var button = newEventContainer.querySelector( '#privacy-button' );
	var buttonSwitch = button.children[0];
	buttonSwitch.classList.toggle( 'off' );
	console.log( privacy );
	if ( !privacy ) {
		privacy = !privacy;
	} else privacy = !privacy;
	console.log( privacy );
	console.dir( button );

}

var eventObject = {};
var saveEventToDb = function( obj ) {

	console.log( obj );

	// the private event has a property that is called access..
	// and there is user id's being pushed to that endpoint .. this
	// then has a rule within the security tab in firebase that
	// checks if the user id is there...

	// upon save, update the events' ID
	// with what firebase gave it


	// update logged in users' created events,
	// so these can be displayed in my events

	if ( !newEventObject.privacy ) {
		// save to public events
		console.log( 'save to public events' );
		var pushedData = ref.child( 'events/public' ).push( newEventObject, function( error, data ) {
			if( error ) {
				console.dir( error );
			} else {

				var id = pushedData.key();

				ref.child( 'events/public' ).child( id ).update( { 'id': id }, function( error, data) {

					if( error ) {
						console.dir( error );
					} else {
						console.log( data );
					}

				})

				console.log( id );
				console.dir( id );

				showError( 24 );
				newEventObject = new Object();

				// update the saved item with ID..

				// update the user.events with the event id
			}
		})
		
	} else {
		// save to private events
		console.log( 'save to private events' );
	}

}



var allTimesAreValid = function() {

	var d1 = newEventObject['event-start-date'];
	var d2 = newEventObject['event-end-date'];

	console.log( compareDates( d1, d2 ) );

	return compareDates( d1, d2 );

}


var isBeingSubmitted = false;
var submitNewEvent = function() {

	if ( !isBeingSubmitted ) {

		isBeingSubmitted = true;
		if ( allTimesAreValid() ) {

			closeAccountAndEventOverlay();

			newEventObject['privacy'] = privacy;

			saveEventToDb( newEventObject );
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

}

var focusNextElementInNewEvent = function( element ) {

	console.log( 'FOCUS NEXT ELEMENT' );

	// checkIfFormReadyForSubmit( true );
	var elements = [ newEventForm['event-name'], newEventForm['event-start-date'], newEventForm['event-start-time'], newEventForm['event-end-date'], newEventForm['event-end-time'], newEventForm['google-event-location'] ];
	var len = elements.length;

	console.log( elements );

	for ( var i = 0; i < len; i++ ) {
		if ( elements[i].value === '' ) {
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

}

var checkIfNewEventFormReadyForSubmit = function( status ) {

	console.log( 'CHECK IF NEW EVENT READY FOR SUBMIT' );

	var elements = [ newEventForm['event-name'], newEventForm['event-start-date'], newEventForm['event-start-time'], newEventForm['event-end-date'], newEventForm['event-end-time'], newEventForm['google-event-location'] ];
	var len = elements.length;

	for ( var i = 0; i < len; i++ ) {
		var element = elements[i];
		if ( element.value === '' ) {
			swapButtons( false );
			return;
		}
	}
	swapButtons( true );

};





var buildEvents = function( evts ) {



	var events = evts;

	// console.log( events );

	var keys = Object.keys( events );
	var len = keys.length;
	// console.log( keys );

	for ( var a = 0; a < len; a++ ) {
		var key = keys[a];
		// console.log( key );
		var evt = events[key];
		// console.log( evt );
		// console.log(  );
		nearbyList.appendChild( new Event( evt ) )
	}


}


console.log( events );
var eventItem = document.getElementsByClassName('event-item')[0];


var Event = function( info ) {

	console.log( 'building event' );

	console.log( info );
	var lat = info['location-data'].lat;
	var lng = info['location-data'].lng;

	var clone = eventItem.cloneNode( true );

	var mapImg = clone.querySelector( 'img' );
	var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lng + '&zoom=16&size=400x400&maptype=terrain&key=AIzaSyBPSBuZde1QlCpGe7IhH674CWPSFSDTknk'
	mapImg.setAttribute( 'src', url );
	var h2 = clone.querySelector( 'h2' );
	h2.innerText = info['event-name'];
	var ul = clone.querySelector( 'ul' );
	var startTime = info['event-start-time'];
	startTime = startTime.substring( 0, 2 ) + ':' + startTime.substring( 2, 4 );
	var endTime = info['event-end-time'];
	endTime = endTime.substring( 0, 2 ) + ':' + endTime.substring( 2, 4 );
	var startDate = info['event-start-date'];
	startDate = startDate.substring( 0, 2 ) + '.' + startDate.substring( 2, 4 ) + '.' + startDate.substring( 4, 6 );
	ul.children[0].innerText = startTime + ' - ' + endTime + ' / ' + startDate;
	ul.children[1].innerText = info['google-event-location'];
	return clone;

}


var events;
var loadEvents = function() {
	ref.child( 'events/public' ).once( 'value', function( snap ) {
		events = snap.val();
		console.log( events );
		buildEvents( events );
	})
}
loadEvents();
