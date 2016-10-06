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
    this.uidInternalSeparator_ = ':';

    /**
     * Separator for UID.
     * @type {string}
     * @private
     */
    this.uidExternalSeparator_ = ';';

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
    if( !goog.isDefAndNotNull( val ) ){

        return false;
    }
    if( val === "" ){

        if( attribute === zz.environment.enums.ViewElementAttribute.ACTION ||
            attribute === zz.environment.enums.ViewElementAttribute.FOCUS ||
            attribute === zz.environment.enums.ViewElementAttribute.SCROLL ){

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
    if( attribute === zz.environment.enums.ViewElementAttribute.ACTION ){

        return zz.environment.enums.ViewElementAttributeCode.ACTION;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.SCROLL ){

        return zz.environment.enums.ViewElementAttributeCode.SCROLL;
    }
    if( attribute === zz.environment.enums.ViewElementAttribute.CLASS ){

        return zz.environment.enums.ViewElementAttributeCode.CLASS;
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
        attr === zz.environment.enums.ViewElementAttribute.SCROLL ){

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

                arr.push( this.generateUid_( model.getUid( ), attribute, attr ) );
                if( attribute !== zz.environment.enums.ViewElementAttribute.CLASS && !goog.DEBUG ){

                    element.removeAttribute( attribute );
                }
            }
        }, this );
        if( arr.length ){

            uid = arr.join( this.uidExternalSeparator_ );
            element.setAttribute(

                zz.environment.enums.ViewElementAttribute.UID,
                uid );

            goog.array.forEach( uid.split( this.uidExternalSeparator_ ), function( id ){

                if( !this.storage_[ id ] ){

                    this.storage_[ id ] = {

                        model: model,
                        controller: controller,
                        elements: [ element ]
                    };
                }else{

                    this.storage_[ id ].elements.push( element );
                }
            }, this );
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