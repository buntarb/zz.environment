/**
 * @fileoverview Provide zz.environment.events.Routed.
 * @license Apache-2.0
 * @copyright Artem Lytvynov <buntarb@gmail.com>
 */

goog.provide( 'zz.environment.events.Routed' );
goog.require( 'zz.environment.enums.EventType' );
goog.require( 'zz.events.BaseEvent' );

/**
 * Routed event class.
 * @param {String} prev
 * @param {String} curr
 * @extends {zz.events.BaseEvent}
 * @constructor
 */
zz.environment.events.Routed = function( prev, curr ){

	zz.events.BaseEvent.call( this, zz.environment.enums.EventType.ROUTED );

	/**
	 * Previous fragment.
	 * @type {String}
	 * @private
	 */
	this.prev_ = prev;

	/**
	 * Current fragment.
	 * @type {String}
	 * @private
	 */
	this.curr_ = curr;
};
goog.inherits( zz.environment.events.Routed, zz.events.BaseEvent );

/**
 * Return previous fragment.
 * @returns {String}
 */
zz.environment.events.Routed.prototype.getPrevFragment = function( ){

	return this.prev_;
};

/**
 * Return current fragment.
 * @returns {String}
 */
zz.environment.events.Routed.prototype.getCurrFragment = function( ){

	return this.curr_;
};