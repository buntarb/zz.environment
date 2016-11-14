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

	UID: 'data-uid',
	SET: 'data-set',
	ROW: 'data-row',
	SCROLL: 'data-scroll',
	HOVER: 'data-hover',
	FOCUS: 'data-focus',
	BLUR: 'data-blur',
	INPUT: 'data-input',
	ACTION: 'data-action',
	CLASS: 'data-class',
	MODEL: 'data-model',
	VIEW: 'data-view',
	CONTROLLER: 'data-controller'
};

zz.environment.enums.ViewElementAttributeCode = {

	UID: '0',
	SET: '1',
	ROW: 'a',
	MODEL: 'b',
	INPUT: 'c',
	FOCUS: 'd',
	BLUR: '4',
	ACTION: 'e',
	SCROLL: 'f',
	HOVER: '5',
	CLASS: '8',
	VIEW: '2',
	CONTROLLER: '3'
};