

var EventManager = function() {

	var elements = {};

	this.registerElement = function( id ) {

		if ( !elements[id] ) {
			var e = document.getElementById( id );
			elements[id] = {};
			elements[id].element = e;
			elements[id].clickListeners = [];
			return e;
		}

	}

	this.aClick = function( id, callback ) {

		var el;

		if ( elements[id] ) {

			el = elements[id];

		} else {
			el = registerElement( id );
		}

		el.clickListeners.map( function( cb ) {
			el.element.removeEventListener( 'click', cb );
		})

		el.element.addEventListener( 'click', callback );
		el.clickListeners.push( callback );

	}

	this.rClick = function( id, callback ) {

		var el;

		if ( elements[id] ) {

			el = elements[id];

		} else {
			el = registerElement( id );
		}

		el.element.removeEventListener( 'click', callback );

	}

}