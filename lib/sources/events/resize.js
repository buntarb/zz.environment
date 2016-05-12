/**
 * @fileoverview Provide zz.environments.events.Resize.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.environment.events.Resize' );

goog.require( 'zz.environment.enums.EventType' );
goog.require( 'zz.events.BaseEvent' );

/**********************************************************************************************************************
 * Definition section                                                                                                 *
 **********************************************************************************************************************/

/**
 * Resize event class.
 * @param {goog.math.Size} size
 * @extends {zz.events.BaseEvent}
 * @constructor
 */
zz.environment.events.Resize = function( size ){

	goog.base( this, zz.environment.enums.EventType.RESIZE );
};
goog.inherits( zz.environment.events.Resize, zz.events.BaseEvent );