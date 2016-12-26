/**
 * @fileoverview Provide zz.environment.services.MVCTree class.
 * @license Apache-2.0
 * @copyright Artem Lytvynov <buntarb@gmail.com>
 */

goog.provide( 'zz.environment.services.MVCTree' );

goog.require( 'goog.object' );
goog.require( 'goog.array' );
goog.require( 'goog.events.EventType' );

//goog.require( 'zz.services.BaseService' );
goog.require( 'goog.events.EventTarget' );
goog.require( 'zz.environment.enums.ViewElementAttribute' );
goog.require( 'zz.environment.enums.ViewElementAttributeCode' );

/**
 * Application MVC Tree class constructor.
 * @extends {zz.events.BaseEvent}
 * @constructor
 */
zz.environment.services.MVCTree = function( ){

    goog.base( this );

    /**
     * Separator for UID.
     * @type {string}
     * @private
     */
    this.uidInternalSeparator_ = '\u007F';//':';

    /**
     * Separator for UID.
     * @type {string}
     * @private
     */
    this.uidExternalSeparator_ = '\u0080';//';';

    /**
     * Counter for action elements.
     * @type {number}
     * @private
     */
    this.eventCounter_ = 0;

    /**
     * Internal storage object.
     * @type {Object}
     * @private
     */
    this.storage_ = { };
};
//goog.inherits( zz.environment.services.MVCTree, zz.services.BaseService );
goog.inherits( zz.environment.services.MVCTree, goog.events.EventTarget );
goog.addSingletonGetter( zz.environment.services.MVCTree );

/**
 * Return internal UID separator
 * @return {string}
 */
zz.environment.services.MVCTree.prototype.getInternalSeparator = function( ){

    return this.uidInternalSeparator_;
};

/**
 * Return external UID separator
 * @return {string}
 */
zz.environment.services.MVCTree.prototype.getExternalSeparator = function( ){

    return this.uidExternalSeparator_;
};

/**
 * Return datafield name by uid.
 * @param {string} uid
 * @return {string}
 */
zz.environment.services.MVCTree.prototype.getFieldByUid = function( uid ){

    var set = uid.split( this.getInternalSeparator( ) );
    if( ~set.indexOf( zz.environment.enums.ViewElementAttributeCode.INPUT ) ){

        return set[ set.indexOf( zz.environment.enums.ViewElementAttributeCode.INPUT ) + 1 ];
    }
};

/**
 * Return element arrtibute if setted, false otherwise.
 * @param {Element} element
 * @param {string} attribute
 * @returns {string|boolean}
 * @private
 */
zz.environment.services.MVCTree.prototype.getViewElementAttribute_ = function( element, attribute ){

    var val = element.getAttribute( attribute );
    if( !goog.isDefAndNotNull( val ) ){

        return false;
    }
    if( val === "" ){

        if( attribute === zz.environment.enums.ViewElementAttribute.ACTION ||
            attribute === zz.environment.enums.ViewElementAttribute.FOCUS ||
            attribute === zz.environment.enums.ViewElementAttribute.BLUR ||
            attribute === zz.environment.enums.ViewElementAttribute.SCROLL ||
            attribute === zz.environment.enums.ViewElementAttribute.HOVER ){

            return attribute;

        }else {

            return false;
        }
    }
    return val;
};

/**
 * Returns data-class keys.
 * @param {string} dataClass
 * @private
 */
zz.environment.services.MVCTree.prototype.getDataClassKeys_ = function( dataClass ){

    var keys = [ ];
    goog.array.forEach( dataClass.split( ',' ), function( pair ){

        if( pair.split( ':' )[ 0 ].length ){

            keys.push( pair.split( ':' )[ 0 ] );
        }
    }, this );
    return keys;
}

/**
 * @param {string} attribute
 * @return {string}
 * @private
 */
zz.environment.services.MVCTree.prototype.getAttributeCode_ = function( attribute ){

    if( attribute === zz.environment.enums.ViewElementAttribute.UID ){

        return zz.environment.enums.ViewElementAttributeCode.UID;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.SET ){

        return zz.environment.enums.ViewElementAttributeCode.SET;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.ROW ){

        return zz.environment.enums.ViewElementAttributeCode.ROW;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.MODEL ){

        return zz.environment.enums.ViewElementAttributeCode.MODEL;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.INPUT ){

        return zz.environment.enums.ViewElementAttributeCode.INPUT;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.FOCUS ){

        return zz.environment.enums.ViewElementAttributeCode.FOCUS;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.BLUR ){

        return zz.environment.enums.ViewElementAttributeCode.BLUR;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.ACTION ){

        return zz.environment.enums.ViewElementAttributeCode.ACTION;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.SCROLL ){

        return zz.environment.enums.ViewElementAttributeCode.SCROLL;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.CLASS ){

        return zz.environment.enums.ViewElementAttributeCode.CLASS;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.HOVER ){

        return zz.environment.enums.ViewElementAttributeCode.HOVER;
    }
}

/**
 * Generate UID.
 * @param {string} id
 * @param {string} attr
 * @param {string} opt_val
 * @returns {string}
 */
zz.environment.services.MVCTree.prototype.generateUid_ = function( uid, attr, opt_val ){

    if( attr === zz.environment.enums.ViewElementAttribute.SET ||
        attr === zz.environment.enums.ViewElementAttribute.ROW ){

        return uid;
    }
    if( attr === zz.environment.enums.ViewElementAttribute.MODEL ||
        attr === zz.environment.enums.ViewElementAttribute.INPUT ){

        return uid +

            this.uidInternalSeparator_ +
            this.getAttributeCode_( attr ) +
            this.uidInternalSeparator_ + opt_val;
    }
    if( attr === zz.environment.enums.ViewElementAttribute.ACTION ||
        attr === zz.environment.enums.ViewElementAttribute.FOCUS ||
        attr === zz.environment.enums.ViewElementAttribute.BLUR ||
        attr === zz.environment.enums.ViewElementAttribute.SCROLL ||
        attr === zz.environment.enums.ViewElementAttribute.HOVER ){

        return uid +

            this.uidInternalSeparator_ +
            this.getAttributeCode_( attr ) +
            this.uidInternalSeparator_ +
            this.eventCounter_++ ;
    }
    if( attr === zz.environment.enums.ViewElementAttribute.CLASS ){

        var arr = [ ];
        goog.array.forEach( this.getDataClassKeys_( opt_val ), function( key ){

            arr.push( uid +

                this.uidInternalSeparator_ +
                this.getAttributeCode_( attr ) +
                this.uidInternalSeparator_ +
                key );
        }, this );
        return arr.join( this.uidExternalSeparator_ );
    }
};

/**
 * Add/update storage item.
 * @param {string} uid
 * @param {zz.models.Dataset|zz.models.Datarow} model
 * @param {zz.controllers.FEBase} controller
 * @param {Array} elements
 * @private
 */
zz.environment.services.MVCTree.prototype.setNode_ = function( uid, model, controller, elements ){

    if( !this.storage_[ uid ] ){

        this.storage_[ uid ] = {

            model: model,
            controller: controller,
            elements: elements
        };
    }else{

        this.storage_[ uid ].elements = this.storage_[ uid ].elements.concat( elements );
    }
};

/**
 * Setting up new MVC Node to tree.
 * @param {zz.models.Dataset|zz.models.Datarow} model
 * @param {Element} element
 * @param {zz.controllers.FEBase} controller
 * @return {string} UID of node
 */
zz.environment.services.MVCTree.prototype.setNode = function( model, element, controller ){

    if( !this.getViewElementAttribute_( element,
            zz.environment.enums.ViewElementAttribute.UID ) ){

        var arr = [ ];
        var uid;
        var attr;
        goog.object.forEach( zz.environment.enums.ViewElementAttribute, function( attribute ){

            if( attr = this.getViewElementAttribute_( element, attribute ) ){

                if( attribute === zz.environment.enums.ViewElementAttribute.FOCUS ){

                    controller

                        .getHandler( )
                        .listen(

                            element, [

                                goog.events.EventType.FOCUS,
                                goog.events.EventType.BLUR ],

                            controller.handleClientEvent );
                }
                if( !goog.DEBUG && (
                    attribute !== zz.environment.enums.ViewElementAttribute.CLASS &&
                    attribute !== zz.environment.enums.ViewElementAttribute.CONTROLLER &&
                    attribute !== zz.environment.enums.ViewElementAttribute.VIEW ) ){

                    element.removeAttribute( attribute );
                }
                if( attribute !== zz.environment.enums.ViewElementAttribute.CONTROLLER &&
                    attribute !== zz.environment.enums.ViewElementAttribute.VIEW ){

                    arr.push( this.generateUid_( model.getUid( ), attribute, attr ) );
                }
            }
        }, this );
        if( arr.length ){

            uid = arr.join( this.uidExternalSeparator_ );
            element.setAttribute(

                zz.environment.enums.ViewElementAttribute.UID,
                uid );

            this.setNode_( uid, model, controller, [ element ] );
            if( uid.split( this.uidExternalSeparator_ ).length > 1 ){

                goog.array.forEach( uid.split( this.uidExternalSeparator_ ), function( id ){

                    this.setNode_( id, model, controller, [ element ] );

                }, this );
            }
        }
    }
};

/**
 * Return MVC Node, false otherwise.
 * @param {string} uid
 * @returns {Object|boolean}
 */
zz.environment.services.MVCTree.prototype.getNode = function( uid ){

    return this.storage_[ uid ] || false;
};

/**
 * Delete MVC Node by uid.
 * @param {string} uid
 * @returns {boolean}
 */
zz.environment.services.MVCTree.prototype.deleteNode = function( uid ){

    if( this.storage_[ uid ] ){

        delete this.storage_[ uid ];
        return true;
    }
    return false;
};

/**
 * Static registry for controllers and views for templates.
 * @type {{}}
 */
zz.environment.services.MVCTree.registry = {};

/**
 * Static controllers registry.
 * @type {{}}
 * @private
 */
zz.environment.services.MVCTree.registry.controllers_ = {};

/**
 * Static views registry.
 * @type {{}}
 * @private
 */
zz.environment.services.MVCTree.registry.views_ = {};

/**
 * Register new View constructor with specified name.
 * @param {string} name
 * @param {Function} ctor
 * @throws {Error} If the name already registered or the name or
 * the constructor function is invalid.
 */
zz.environment.services.MVCTree.registry.setView = function( name, ctor ){

    if( !name ){

        throw Error( 'Invalid view name: ' + name );
    }
    if( !goog.isFunction( ctor ) ){

        throw Error( 'Invalid view constructor function: ' + ctor );
    }
    // TODO (buntarb): Find, why it throw in compile mode?
    // if( zz.environment.services.MVCTree.registry.views_[ name ] ){
    //
    //     throw Error( 'View name already registered: ' + name );
    // }
    zz.environment.services.MVCTree.registry.views_[ name ] = ctor;
};

/**
 * Register new Controller constructor with specified name.
 * @param {string} name
 * @param {Function} ctor
 * @throws {Error} If the name already registered or the name or
 * the constructor function is invalid.
 */
zz.environment.services.MVCTree.registry.setController = function( name, ctor ){

    if( !name ){

        throw Error( 'Invalid controller name: ' + name );
    }
    if( !goog.isFunction( ctor ) ){

        throw Error( 'Invalid controller constructor function: ' + ctor );
    }
    // TODO (buntarb): Find, why it throw in compile mode?
    // if( zz.environment.services.MVCTree.registry.views_[ name ] ){
    //
    //     throw Error( 'Controller name already registered: ' + name );
    // }
    zz.environment.services.MVCTree.registry.controllers_[ name ] = ctor;
};

/**
 * Returns the {@link zz.views.FEBase} instance for the given name, or null if no
 * decorator factory function was found.
 * @param {string} name
 * @return {zz.views.FEBase?}
 */
zz.environment.services.MVCTree.registry.getView = function( name ){

    return name in zz.environment.services.MVCTree.registry.views_ ?

        zz.environment.services.MVCTree.registry.views_[ name ].getInstance( ) :
        null;
};

/**
 * Returns the {@link zz.controllers.FEBase} instance for the given name, or
 * null if wasn't found.
 * @param {string} name
 * @return {zz.controllers.FEBase?}
 */
zz.environment.services.MVCTree.registry.getController = function( name, model, view ){

    // TODO (buntarb): Assertion here.
    return name in zz.environment.services.MVCTree.registry.controllers_ ?

        new zz.environment.services.MVCTree.registry.controllers_[ name ]( model, view ) :
        null;
};