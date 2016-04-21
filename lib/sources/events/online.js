/**
 * @fileoverview Provide zz.environments.events.Online.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.environment.events.Online' );
goog.require( 'zz.environment.enums.EventType' );
goog.require( 'zz.events.BaseEvent' );

/**
 * Online event class.
 * @extends {zz.events.BaseEvent}
 * @constructor
 */
zz.environment.events.Online = function( ){

	goog.base( this, zz.environment.enums.EventType.ONLINE );
};
goog.inherits( zz.app.Online, zz.events.BaseEvent );