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

goog.provide( 'zz.environment.services.EnvironmentTest' );
goog.require( 'goog.testing.jsunit' );
goog.setTestOnly( 'zz.environment.services.EnvironmentTest' );

goog.require( 'zz.environment.services.Environment' );
goog.require( 'zz.tests' );

goog.require( 'goog.events.EventTarget' );
goog.require( 'goog.dom.ViewportSizeMonitor' );


var zz_environment_services_EnvironmentTest_env = new zz.environment.services.Environment( );
var zz_environment_services_EnvironmentTest_feBaseMock  = function( ){ };

var zz_environment_services_EnvironmentTest_members = [

    'viewportSizeMonitor_', // If it is not Node
    'rootController_',
    'servicesRegistry_',
    'factoriesRegistry_',
    'device',
    'os',
    'browserEngine',
    'browser',
    'viewport'
];

var zz_environment_services_EnvironmentTest_methods = [

    'disposeInternal',
    'setRootController',
    'getRootController',
    'isNode',
    'isCordova',
    'isBrowser',
    'registerService',
    'registerFactory'
];

var zz_environment_services_EnvironmentTest_deviceMethods = [

    'isTouchable',
    'isDesktop',
    'isTablet',
    'isMobile',
    'isIpad',
    'isIphone',
    'isIpod'
];

var zz_environment_services_EnvironmentTest_osMethods = [

    'isAndroid',
    'isChrome',
    'isIOS',
    'isLinux',
    'isMacintosh',
    'isWindows'
];

var zz_environment_services_EnvironmentTest_browserEngineMethods = [

    'isGecko',
    'isTrident',
    'isWebKit'
];

var zz_environment_services_EnvironmentTest_browserMethods = [

    'isAndroid',
    'isChrome',
    'isCoast',
    'isFirefox',
    'isIE',
    'isEdge',
    'isIosWebview',
    'isOpera',
    'isSafari',
    'isSilk',
    'getVersion'
];

var zz_environment_services_EnvironmentTest_viewportMethods = [

    'viewportSizeListener_',
    'getSize'
];

function test_zz_environment_services_EnvironmentTest_availableMembers( ){

    var checkIfIsFun = true;

    zz.tests.checkMembers(
        zz_environment_services_EnvironmentTest_members,
        zz_environment_services_EnvironmentTest_env
    );
    zz.tests.checkMembers(
        zz_environment_services_EnvironmentTest_methods,
        zz_environment_services_EnvironmentTest_env,
        checkIfIsFun,
        'Methods:'
    );
    zz.tests.checkMembers(
        zz_environment_services_EnvironmentTest_deviceMethods,
        zz_environment_services_EnvironmentTest_env.device,
        checkIfIsFun,
        'device methods:'
    );
    zz.tests.checkMembers(
        zz_environment_services_EnvironmentTest_osMethods,
        zz_environment_services_EnvironmentTest_env.os,
        checkIfIsFun,
        'os methods:'
    );
    zz.tests.checkMembers(
        zz_environment_services_EnvironmentTest_browserEngineMethods,
        zz_environment_services_EnvironmentTest_env.browserEngine,
        checkIfIsFun,
        'browserEngine methods:'
    );
    zz.tests.checkMembers(
        zz_environment_services_EnvironmentTest_browserMethods,
        zz_environment_services_EnvironmentTest_env.browser,
        checkIfIsFun,
        'browser methods:'
    );
    zz.tests.checkMembers(
        zz_environment_services_EnvironmentTest_viewportMethods,
        zz_environment_services_EnvironmentTest_env.viewport,
        checkIfIsFun,
        'viewport methods:'
    );
}

function test_zz_environment_services_EnvironmentTest_constructor( ){

    assertTrue(

        'Instance must be non-null and have the expected type',
        zz_environment_services_EnvironmentTest_env instanceof zz.environment.services.Environment
    );
}

function test_zz_environment_services_EnvironmentTest_inheritance( ){

    assertTrue(

        'Instance must be non-null and have the expected type',
        zz_environment_services_EnvironmentTest_env instanceof goog.events.EventTarget
    );
}

function test_zz_environment_services_EnvironmentTest_viewportSizeMonitor( ){

    assertTrue(

        'Instance must be non-null and have the expected type',
        zz_environment_services_EnvironmentTest_env.viewportSizeMonitor_ instanceof goog.dom.ViewportSizeMonitor
    );
}

function test_zz_environment_services_EnvironmentTest_rootController( ){

    zz_environment_services_EnvironmentTest_env = new zz.environment.services.Environment( );

    assertFalse(

        'Must be false for new instance',
        zz_environment_services_EnvironmentTest_env.rootController_
    );
}

function test_zz_environment_services_EnvironmentTest_setRootController( ){

    zz_environment_services_EnvironmentTest_env.setRootController( zz_environment_services_EnvironmentTest_feBaseMock );

    assertTrue(

        'Property must be a function since setter has been called',
        goog.isFunction( zz_environment_services_EnvironmentTest_env.rootController_ )
    );

    assertEquals(

        'Property must be equals to passed parameter',
        zz_environment_services_EnvironmentTest_env.rootController_,
        zz_environment_services_EnvironmentTest_feBaseMock
    );
}

function test_zz_environment_services_EnvironmentTest_getRootController( ){

    zz_environment_services_EnvironmentTest_env.setRootController( zz_environment_services_EnvironmentTest_feBaseMock );

    assertTrue(

        'Property must be a function since setter has been called',
        goog.isFuncticcdon( zz_environment_services_EnvironmentTest_env.getRootController( ) )
    );

    assertEquals(

        'Property must be equals to passed parameter',
        zz_environment_services_EnvironmentTest_env.getRootController( ),
        zz_environment_services_EnvironmentTest_feBaseMock
    );
}

function test_zz_environment_services_EnvironmentTest_isNode( ){

    assertFalse(

        'Must be false for current version',
        zz_environment_services_EnvironmentTest_env.isNode( )
    );
}

function test_zz_environment_services_EnvironmentTest_isCordova( ){

    assertFalse(

        'Must be false for current version',
        zz_environment_services_EnvironmentTest_env.isCordova( )
    );
}

function test_zz_environment_services_EnvironmentTest_isBrowser( ){

    assertTrue(

        'Must be true for current version',
        zz_environment_services_EnvironmentTest_env.isBrowser( )
    );
}

function test_zz_environment_services_EnvironmentTest_device( ){

    assertTrue(

        'Property must have a type of Object',
        goog.isObject( zz_environment_services_EnvironmentTest_env.device )
    );
}

function test_zz_environment_services_EnvironmentTest_os( ){

    assertTrue(

        'Property must have a type of Object',
        goog.isObject( zz_environment_services_EnvironmentTest_env.os )
    );
}

function test_zz_environment_services_EnvironmentTest_browserEngine( ){

    assertTrue(

        'Property must have a type of Object',
        goog.isObject( zz_environment_services_EnvironmentTest_env.browserEngine )
    );
}

function test_zz_environment_services_EnvironmentTest_browser( ){

    assertTrue(

        'Property must have a type of Object',
        goog.isObject( zz_environment_services_EnvironmentTest_env.browser )
    );
}

function test_zz_environment_services_EnvironmentTest_viewport( ){

    assertTrue(

        'Property must have a type of Object',
        goog.isObject( zz_environment_services_EnvironmentTest_env.viewport )
    );
}