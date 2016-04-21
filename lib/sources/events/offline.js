/**
 * @fileoverview Provide zz.environments.events.Offline.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */ 

goog.provide( 'zz.environments.events.Offline' );
goog.require( 'zz.environment.enums.EventType' );
goog.require( 'zz.events.BaseEvent' );

/**
 * Offline event class.
 * @extends {zz.events.BaseEvent}
 * @constructor
 */
zz.environments.events.Offline = function( ){

	goog.base( this, zz.environment.enums.EventType.OFFLINE );
};
goog.inherits( zz.environments.events.Offline, zz.events.BaseEvent );