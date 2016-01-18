'use strict';


var ref = new Firebase('https://event-creator.firebaseio.com/')




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


// sign in button in navigation menu
var signIn = document.getElementById( 'sign-in' );


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

var newAccountHeader = document.getElementsByClassName( 'header' )[1];
var newAccountFooter = document.getElementsByClassName( 'footer' )[1];

var nearbyList = document.getElementById( 'nearby-list' );
var closebyList = document.getElementById( 'closeby-list' );
var farawayList = document.getElementById( 'faraway-list' );

var nearbyButton = document.getElementsByClassName( 'nearby-button' )[0];
var closebyButton = document.getElementsByClassName( 'closeby-button' )[0];
var farawayButton = document.getElementsByClassName( 'faraway-button' )[0];

var viewportElements = [ nearbyList, closebyList, farawayList ];

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

// MAIN NAVIGATION ITEMS
var hamburgerIcon = document.getElementsByClassName('icon')[0];
var navOverlay = document.getElementById( 'nav-overlay' );
var fadedOverlay = document.getElementById( 'faded-overlay' );

var createAccount = document.getElementById( 'create-account' );


var cancelButtons = document.getElementsByClassName( 'cancel-button' );


var user = ref.getAuth();
if ( user ) {
	console.log( user );
	console.log( user.uid );
	signIn.children[0].lastChild.data = "My Account";
	signIn.setAttribute( 'onclick', 'showMyAccount()' );
} else {
	var creds = {};
	creds.email = 'richardivan.com@gmail.com';
	creds.password = '1Richard';

	// pop a login overlay;


	// this is after clicking login button with filled in form data
	ref.authWithPassword( creds, function( error, data ) {
		if ( error ) {
			console.log( error );
		} else {
			console.log( data );
		}
	});
}

var closeAccountAndEventOverlay = function() {
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

fadedOverlay.addEventListener( 'click', function() {
	navOverlay.classList.remove( 'opened' );
	fadedOverlay.classList.remove( 'opened' );
})

hamburgerIcon.addEventListener( 'click', function() {
	// console.log( 'add' );
	navOverlay.classList.add( 'opened' );
	fadedOverlay.classList.add( 'opened' );
});

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
	faButton.classList.add( 'expand-animation' );

	createAccount.querySelector( 'h2' ).innerText = "Create Event";


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

var passField = document.getElementById( 'pass' );
var rePassField = document.getElementById( 'retype-pass' );

var newAccountForm = document.getElementById( 'new-account-form' );


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






var swapButtons = function( on ) {
	var accFooter = document.getElementsByClassName( 'footer' )[1];
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

var resetFields = document.getElementById( 'reset-fields' );
resetFields.addEventListener( 'click', function() {
	// resetFields.classList.remove( 'end' );
	resetFields.children[0].classList.add( 'rotate' );
	setTimeout( function() {
		resetFields.children[0].classList.remove( 'rotate' );
	}, 500 );
	for ( var i = 0; i < 6; i++ ) {
		var element = newAccountForm.children[i];
		element.value = '';
	}
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


var showError = function( error ) {

	var errorContainer = document.getElementById( 'error-container' );
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
	}

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

	} else inputValid = true;

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

	var len = newAccountForm.length;
	var email = newAccountForm.email.value;
	var passWord = newAccountForm.pass.value;

	var credentials = {};
	credentials.email = email;
	credentials.password = passWord;

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
					obj.name = newAccountForm.name.value;
					obj.birthday = newAccountForm.birthday.value;
					obj.employer = newAccountForm.employer.value;
					obj.job = newAccountForm.jobtitle.value;
					console.log( obj );
					ref.child( uid ).set( obj );

					// if the previous state was that the user wanted to
					// create an event but didn't have an account, then
					// the state shoudl return to event creation page.
					closeAccountAndEventOverlay();
					showError( 13 );
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

	checkIfFormReadyForSubmit( true );
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
					checkIfFormReadyForSubmit( true );
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

	createAccount.querySelector( 'h2' ).innerText = "New Account";

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



var showMyAccount = function() {
	console.log( 'open my account YO?' );
}

var showSignIn = function() {
	
}

// this script is taken and used from
// https://gist.github.com/ricardozea/abb9f98a19f6d04a0269


// var selectAll = fucn
