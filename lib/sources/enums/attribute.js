/**
 * @fileoverview Provide zz.environment.enums.ViewElementAttribute.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.environment.enums.ViewElementAttribute' );

/**
 * Constants for supported views elements attributes.
 * @enum {string}
 */
zz.environment.enums.ViewElementAttribute = {

	UID: 'data-eid',
	SET: 'data-set',
	ROW: 'data-row',
	MODEL: 'data-model',
	INPUT: 'data-input',
	FOCUS: 'data-focus',
	ACTION: 'data-action',
	SCROLL: 'data-scroll',
	CLASS: 'data-class'
};