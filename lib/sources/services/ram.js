/**
 * @fileoverview Provide zz.environments.services.RAM class.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.environments.services.RAM' );
goog.require( 'zz.services.BaseService' );

/**
 * Application RAM class constructor.
 * @extends {zz.events.BaseEvent}
 * @constructor
 */
zz.environments.services.RAM = function( ){

    goog.base( this );

    /**
     * Internal storage object.
     * @type {Object}
     * @private
     */
    this.storage_ = { };
};
goog.inherits( zz.environments.services.RAM, zz.services.BaseService );
goog.addSingletonGetter( zz.environments.services.RAM );

/**
 * Setting up new hash in memory by incoming data.
 * @param {string} uid
 * @param {zz.controllers.FEBase} controller
 * @param {Element} element
 * @param {Array} events
 * @returns {boolean}
 */
zz.environments.services.RAM.prototype.set = function( uid, controller, element, events ){

    // TODO (buntarb): Assertions here.
    if( this.storage_[ uid ] ){

        if( goog.DEBUG ){

            // TODO (buntarb): Some goog.DEBUG console from here.
        }
        return false;

    }else{

        this.storage_[ uid ] = {

            controller: controller,
            element: element,
            events: events
        };
        return true;
    }
};

/**
 * Return hash from memory if any, false otherwise.
 * @param {string} uid
 * @returns {Object|boolean}
 */
zz.environments.services.RAM.prototype.get = function( uid ){

    if( this.storage_[ uid ] ){

        return this.storage_[ uid ];

    }else{

        if( goog.DEBUG ){

            // TODO (buntarb): Some goog.DEBUG console from here.
        }
        return false;
    }
};

/**
 * Delete memory hash by uid.
 * @param {string} uid
 * @returns {boolean}
 */
zz.environments.services.RAM.prototype.delete = function( uid ){

    if( this.storage_[ uid ] ){

        this.storage_.controller = undefined;
        this.storage_.element = undefined;
        this.storage_.events = undefined;
        this.storage_ = undefined;
        delete this.storage_;
        return true;

    }else{

        if( goog.DEBUG ){

            // TODO (buntarb): Some goog.DEBUG console from here.
        }
        return false;
    }
};