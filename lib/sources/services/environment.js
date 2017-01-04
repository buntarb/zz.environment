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

goog.provide( 'zz.environment.services.Environment' );

goog.require( 'goog.events' );
goog.require( 'goog.labs.userAgent.browser' );
goog.require( 'goog.labs.userAgent.device' );
goog.require( 'goog.labs.userAgent.engine' );
goog.require( 'goog.labs.userAgent.platform' );
goog.require( 'goog.dom.ViewportSizeMonitor' );

goog.require( 'zz.environment.events.Resize' );
goog.require( 'goog.events.EventTarget' );

/**
 * Environment class.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
zz.environment.services.Environment = function( ){

	goog.base( this );

	if( this.isNode( ) ){

		// Add node global to goog.global.
		goog.global = global;

	}else{

		/**
		 * Viewport size monitor
		 * @type {!goog.dom.ViewportSizeMonitor}
		 * @private
		 */
		this.viewportSizeMonitor_ = goog.dom.ViewportSizeMonitor.getInstanceForWindow( );

		// Listen for resize event.
		goog.events.listen(

			this.viewportSizeMonitor_,
			goog.events.EventType.RESIZE,
			this.viewport.viewportSizeListener_,
			false,
			this
		);
	}

	/**
	 * Root application controller.
	 * @type {zz.controllers.FEBase|boolean}
	 * @private
	 */
	this.rootController_ = false;

    /**
     * Cash of services.
     * @type {Array.<string>}
     * @private
     */
    this.servicesRegistry_ = [ ];

    /**
     * Cash of factories.
     * @type {Array.<string>}
     * @private
     */
    this.factoriesRegistry_ = [ ];
};
goog.inherits( zz.environment.services.Environment, goog.events.EventTarget );
goog.addSingletonGetter( zz.environment.services.Environment );

/**
 * @override
 */
zz.environment.services.Environment.prototype.disposeInternal = function( ){

	goog.events.unlisten( this.viewportSizeMonitor_ );
	this.viewportSizeMonitor_.dispose( );
	this.viewportSizeMonitor_ = null;
	goog.base( this, 'disposeInternal' );
};

/**
 * Setting up root application controller.
 * @param {zz.controllers.FEBase} rootController
 */
zz.environment.services.Environment.prototype.setRootController = function( rootController ){

	// TODO (buntarb): Add assertions here.
	this.rootController_ = this.rootController_ || rootController;
};

/**
 * Return root application controller.
 * @returns {zz.controllers.FEBase}
 */
zz.environment.services.Environment.prototype.getRootController = function( ){

	return this.rootController_;
};

/**
 * Determine is current application running in Node.
 * TODO (buntarb): More safe conditions here.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.isNode = function( ){

	// return typeof global !== 'undefined' && (
    //
	// 	~global.process.title.indexOf( 'node' ) ||
	// 	~global.process.title.indexOf( 'runnerw.exe' ) ) && // WebStorm for Windows
    //
	// 	typeof window === 'undefined' && !goog.global[ 'cordova' ];

	return typeof module !== 'undefined' && module.exports &&

		global && global.process && global.process.pid &&
		!goog.global[ 'cordova' ];
};

/**
 * Determine is current application running in Cordova/PhoneGAP mode.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.isCordova = function( ){

	return typeof window !== 'undefined' && !!goog.global[ 'cordova' ];
};

/**
 * Determine is current application running in browser mode.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.isBrowser = function( ){

	return typeof window !== 'undefined' && !goog.global[ 'cordova' ];
};

/**
 * The set of methods that returns info about current device.
 * @type {Object}
 */
zz.environment.services.Environment.prototype.device = { };

/**
 * Determine is current device touchable or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.device.isTouchable = function( ){

	return ( 'on' + goog.events.EventType.TOUCHSTART ) in goog.global;
};

/**
 * Determine is current device desktop or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.device.isDesktop = function( ){

	return goog.labs.userAgent.device.isDesktop( );
};

/**
 * Determine is current device tablet or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.device.isTablet = function( ){

	return goog.labs.userAgent.device.isTablet( );
};

/**
 * Determine is current device mobile or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.device.isMobile = function( ){

	return goog.labs.userAgent.device.isMobile( );
};

/**
 * Determine is current device iPad or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.device.isIpad = function( ){

	return goog.labs.userAgent.platform.isIpad( );
};

/**
 * Determine is current device iPhone or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.device.isIphone = function( ){

	return goog.labs.userAgent.platform.isIphone( );
};

/**
 * Determine is current device iPod or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.device.isIpod = function( ){

	return goog.labs.userAgent.platform.isIpod( );
};

/**
 * The set of methods that returns info about current OS.
 * @type {Object}
 */
zz.environment.services.Environment.prototype.os = { };

/**
 * Determine is current OS Android or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.os.isAndroid = function( ){

	return goog.labs.userAgent.platform.isAndroid( );
};

/**
 * Determine is current OS Chrome or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.os.isChrome = function( ){

	return goog.labs.userAgent.platform.isChromeOS( );
};

/**
 * Determine is current OS iOS or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.os.isIOS = function( ){

	return goog.labs.userAgent.platform.isIos( );
};

/**
 * Determine is current OS Linux or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.os.isLinux = function( ){

	return goog.labs.userAgent.platform.isLinux( );
};

/**
 * Determine is current OS Macintosh or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.os.isMacintosh = function( ){

	return goog.labs.userAgent.platform.isMacintosh( );
};

/**
 * Determine is current OS Windows or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.os.isWindows = function( ){

	return goog.labs.userAgent.platform.isWindows( );
};

/**
 * The set of methods that returns info about current browser engine.
 * @type {Object}
 */
zz.environment.services.Environment.prototype.browserEngine = { };

/**
 * Determine is current engine Gecko or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browserEngine.isGecko = function( ){

	return goog.labs.userAgent.engine.isGecko( );
};

/**
 * Determine is current engine Presto or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browserEngine.isPresto = function( ){

	return goog.labs.userAgent.engine.isPresto( );
};

/**
 * Determine is current engine Trident or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browserEngine.isTrident = function( ){

	return goog.labs.userAgent.engine.isTrident( );
};

/**
 * Determine is current engine WebKit or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browserEngine.isWebKit = function( ){

	return goog.labs.userAgent.engine.isWebKit( );
};

/**
 * The set of methods that returns info about current browser.
 * @type {Object}
 */
zz.environment.services.Environment.prototype.browser = { };

/**
 * Determine is current browser Android or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browser.isAndroid = function( ){

	return goog.labs.userAgent.browser.isAndroidBrowser( );
};

/**
 * Determine is current browser Chrome or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browser.isChrome = function( ){

	return goog.labs.userAgent.browser.isChrome( );
};

/**
 * Determine is current browser Coast or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browser.isCoast = function( ){

	return goog.labs.userAgent.browser.isCoast( );
};

/**
 * Determine is current browser Firefox or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browser.isFirefox = function( ){

	return goog.labs.userAgent.browser.isFirefox( );
};

/**
 * Determine is current browser IE or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browser.isIE = function( ){

	return goog.labs.userAgent.browser.isIE( );
};

/**
 * Determine is current browser Edge or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browser.isEdge = function( ){

	return goog.labs.userAgent.browser.isEdge( );
};

/**
 * Determine is current browser IosWebview or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browser.isIosWebview = function( ){

	return goog.labs.userAgent.browser.isIosWebview( );
};

/**
 * Determine is current browser Opera or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browser.isOpera = function( ){

	return goog.labs.userAgent.browser.isOpera( );
};

/**
 * Determine is current browser Safari or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browser.isSafari = function( ){

	return goog.labs.userAgent.browser.isSafari( );
};

/**
 * Determine is current browser Silk or not.
 * @returns {boolean}
 */
zz.environment.services.Environment.prototype.browser.isSilk = function( ){

	return goog.labs.userAgent.browser.isSilk( );
};

/**
 * Return browser version or empty string if version cannot be determined.
 * @returns {string}
 */
zz.environment.services.Environment.prototype.browser.getVersion = function( ){

	return goog.labs.userAgent.browser.getVersion( );
};

/**
 * The set of methods that returns data about viewport.
 * @type {Object}
 */
zz.environment.services.Environment.prototype.viewport = { };

/**
 * Listener for viewport size monitor.
 * @private
 * @this {zz.environment.services.Environment}
 */
zz.environment.services.Environment.prototype.viewport.viewportSizeListener_ = function( ){

	this.dispatchEvent( new zz.environment.events.Resize( ) );
};

/**
 * Returns viewport size.
 * @returns {goog.math.Size}
 */
zz.environment.services.Environment.prototype.viewport.getSize = function( ){

	return goog.dom.ViewportSizeMonitor.getInstanceForWindow( ).getSize( );
};

/**
 * Register service.
 * @param {string} serviceName
 * @throw Error if service with the same name is already registered
 */
zz.environment.services.Environment.prototype.registerService = function( serviceName ){

    if( goog.array.contains( this.servicesRegistry_, serviceName ) ){

        throw Error( 'Service with the same name is already registered' );
    }

    this.servicesRegistry_[ this.servicesRegistry_.length ] = serviceName;
};

/**
 * Register factory.
 * @param {string} factoryName
 * @throw Error if factory with the same name is already registered
 */
zz.environment.services.Environment.prototype.registerFactory = function( factoryName ){

    if( goog.array.contains( this.factoriesRegistry_, factoryName ) ){

        throw Error( 'Factory with the same name is already registered' );
    }

    this.factoriesRegistry_[ this.factoriesRegistry_.length ] = factoryName;
};