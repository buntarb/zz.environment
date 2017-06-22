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
 * @fileoverview Provide zz.environment.services.MVCRegistry class.
 * @license Apache-2.0
 * @copyright Artem Lytvynov <buntarb@gmail.com>
 */

goog.provide( 'zz.environment.services.MVCRegistry' );

/**
 * MVC registry class constructor.
 * @constructor
 */
zz.environment.services.MVCRegistry = function( ){

    /**
     * Internal storage object.
     * @type {Object}
     * @private
     */
    this.storage_ = { };
};
goog.addSingletonGetter( zz.environment.services.MVCRegistry );

/**
 * Add/update MVC Node to storage. If node with specified {@code uid} not in the
 * storage new one will be created. If it already in storage, only elements will
 * be add to existing elements array. Model and controller will be ignored.
 * @param {string} uid
 * @param {zz.models.Dataset|zz.models.Datarow} model
 * @param {zz.controllers.FEBase} controller
 * @param {Array} elements
 */
zz.environment.services.MVCRegistry.prototype.set =
    function( uid, model, controller, elements ){

    if( !this.storage_[ uid ] ){

        this.storage_[ uid ] = {

            model: model,
            controller: controller,
            elements: elements
        };
    }else{

        this.storage_[ uid ].elements =
            this.storage_[ uid ].elements.concat( elements );
    }
};

/**
 * Return MVC Node, false otherwise.
 * @param {string} uid
 * @returns {Object|boolean}
 */
zz.environment.services.MVCRegistry.prototype.get = function( uid ){

    return this.storage_[ uid ] || false;
};

/**
 * Delete MVC Node by uid. Returns true if node was founded and deleted,
 * false otherwise.
 * @param {string} uid
 * @returns {boolean}
 */
zz.environment.services.MVCRegistry.prototype.delete = function( uid ){

    if( this.storage_[ uid ] ){

        delete this.storage_[ uid ];
        return true;
    }
    return false;
};