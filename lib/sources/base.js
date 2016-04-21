/**
 * @fileoverview Provide zz.environment base object.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.environment' );

/**
 * Base namespace for zz.environment module.
 * @const
 */
zz.environment = zz.environment || { };

/**
 * Bootstrap module method.
 */
zz.environment.bootstrap = function( ){

	//
};
window[ 'bootstrap' ] = zz.environment.bootstrap;