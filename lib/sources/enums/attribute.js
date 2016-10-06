/**
 * @fileoverview Provide zz.environment.enums.ViewElementAttribute.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.environment.enums.ViewElementAttribute' );
goog.provide( 'zz.environment.enums.ViewElementAttributeCode' );

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

zz.environment.enums.ViewElementAttributeCode = {

	UID: '0',
	SET: '1',
	ROW: 'a',
	MODEL: 'b',
	INPUT: 'c',
	FOCUS: 'd',
	ACTION: 'e',
	SCROLL: 'f',
	CLASS: '8'
};