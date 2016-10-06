/**
 * @fileoverview Provide zz.environment.services.MVCTree class.
 * @license Apache-2.0
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.environment.services.MVCTree' );

goog.require( 'goog.object' );
goog.require( 'goog.array' );

goog.require( 'zz.services.BaseService' );
goog.require( 'zz.environment.enums.ViewElementAttribute' );

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
    this.uidInternalSeparator_ = ':';

    /**
     * Separator for UID.
     * @type {string}
     * @private
     */
    this.uidExternalSeparator_ = ',';

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
goog.inherits( zz.environment.services.MVCTree, zz.services.BaseService );
goog.addSingletonGetter( zz.environment.services.MVCTree );

/**
 * Return element arrtibute if setted, false otherwise.
 * @param {Element} element
 * @param {string} attribute
 * @returns {string|boolean}
 * @private
 */
zz.environment.services.MVCTree.prototype.getViewElementAttribute_ = function( element, attribute ){

    var val = element.getAttribute( attribute );
    return val === "" ? false : !goog.isDefAndNotNull( val ) ? false : val;
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
    } );
    return keys;
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

        return uid + this.uidInternalSeparator_ + attr + this.uidInternalSeparator_ + opt_val;
    }
    if( attr === zz.environment.enums.ViewElementAttribute.ACTION ||
        attr === zz.environment.enums.ViewElementAttribute.FOCUS ||
        attr === zz.environment.enums.ViewElementAttribute.SCROLL ){

        return uid + this.uidInternalSeparator_ + attr + this.uidInternalSeparator_ + this.eventCounter_++ ;
    }
    if( attr === zz.environment.enums.ViewElementAttribute.CLASS ){

        var arr = [ ];
        goog.array.forEach( this.getDataClassKeys_( opt_val ), function( key ){

            result.push( uid + this.uidInternalSeparator_ + attr + this.uidInternalSeparator_ + key );
        } );
        return arr.join( this.uidExternalSeparator_ );
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
        var attr;
        goog.object.forEach( zz.environment.enums.ViewElementAttribute, function( attribute ){

            if( attr = this.getViewElementAttribute_( element, attribute ) ){

                arr.push( this.generateUid_( model.getUid( ), attribute, attr ) );
                if( attribute !== zz.environment.enums.ViewElementAttribute.CLASS ){

                    element.removeAttribute( attribute );
                }
            }
        }, this );
        if( arr.length ){

            element.setAttribute( arr.join( this.uidExternalSeparator_ ) );
        }
    }
};

/**
 * Return hash from memory if any, false otherwise.
 * @param {string} uid
 * @returns {Object|boolean}
 */
zz.environment.services.MVCTree.prototype.get = function( uid ){

    //
};

/**
 * Delete memory hash by uid.
 * @param {string} uid
 * @returns {boolean}
 */
zz.environment.services.MVCTree.prototype.delete = function( uid ){

    //
};