/**
 * @fileoverview Provide zz.environment.enums.EventType.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.environment.enums.EventType' );
goog.require( 'goog.events' );

/**
 * Constants for application events.
 * @enum {string}
 */
zz.environment.enums.EventType = {

	RESIZE: goog.events.getUniqueId( 'resize' ),
	ONLINE: goog.events.getUniqueId( 'online' ),
	OFFLINE: goog.events.getUniqueId( 'offline' )
};