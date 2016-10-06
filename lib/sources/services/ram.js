// Copyright 2016 Artem Lytvynov <buntarb@gmail.com>. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @license Apache-2.0
 * @copyright Artem Lytvynov <buntarb@gmail.com>
 */

goog.provide( 'zz.environment.services.RAM' );
goog.require( 'zz.services.BaseService' );

/**
 * Application RAM class constructor.
 * @extends {zz.events.BaseEvent}
 * @constructor
 */
zz.environment.services.RAM = function( ){

    goog.base( this );

    /**
     * Internal storage object.
     * @type {Object}
     * @private
     */
    this.storage_ = { };
};
goog.inherits( zz.environment.services.RAM, zz.services.BaseService );
goog.addSingletonGetter( zz.environment.services.RAM );

/**
 * Setting up new hash in memory by incoming data.
 * @param {string} uid
 * @param {zz.models.Dataset} model
 * @param {zz.controllers.FEBase} controller
 * @param {Element} view
 * @param {Array} events
 * @returns {boolean}
 */
zz.environment.services.RAM.prototype.set = function( uid, model, controller, view, events ){

    // TODO (buntarb): Assertions here.
    if( this.storage_[ uid ] ){

        if( goog.DEBUG ){

            // TODO (buntarb): Some goog.DEBUG console from here.
        }
        return false;

    }else{

        this.storage_[ uid ] = {

            model: model,
            controller: controller,
            view: view,
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
zz.environment.services.RAM.prototype.get = function( uid ){

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
zz.environment.services.RAM.prototype.delete = function( uid ){

    if( this.storage_[ uid ] ){

        this.storage_[ uid ].controller = undefined;
        this.storage_[ uid ].element = undefined;
        this.storage_[ uid ].events = undefined;
        this.storage_[ uid ] = undefined;
        delete this.storage_[ uid ];
        return true;

    }else{

        if( goog.DEBUG ){

            // TODO (buntarb): Some goog.DEBUG console from here.
        }
        return false;
    }
};