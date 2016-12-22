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

goog.require( 'goog.events.EventTarget' );
goog.require( 'goog.dom.ViewportSizeMonitor' );


var env;
var feBaseMock;

function setUp( ){

    env = new zz.environment.services.Environment( );
    feBaseMock = function( ){ };
}


function testConstructor( ){

    assertTrue(

        'Instance must be non-null and have the expected type',
        env instanceof zz.environment.services.Environment
    );
}

function testInheritance( ){

    assertTrue(

        'Instance must be non-null and have the expected type',
        env instanceof goog.events.EventTarget
    );
}

function testViewportSizeMonitor( ){

    assertTrue(

        'Instance must be non-null and have the expected type',
        env.viewportSizeMonitor_ instanceof goog.dom.ViewportSizeMonitor
    );
}

function testRootController( ){

    assertFalse(

        'Must be false for new instance',
        env.rootController_
    );
}

function testSetRootController( ){

    env.setRootController( feBaseMock );

    assertTrue(

        'Property must be a function since setter has been called',
        goog.isFunction( env.rootController_ )
    );

    assertEquals(

        'Property must be equals to passed parameter',
        env.rootController_,
        feBaseMock
    );
}

function testGetRootController( ){

    env.setRootController( feBaseMock );

    assertTrue(

        'Property must be a function since setter has been called',
        goog.isFunction( env.getRootController( ) )
    );

    assertEquals(

        'Property must be equals to passed parameter',
        env.getRootController( ),
        feBaseMock
    );
}

function testIsNode( ){

    assertFalse(

        'Must be false for current version',
        env.isNode( )
    );
}

function testIsCordova( ){

    assertFalse(

        'Must be false for current version',
        env.isCordova( )
    );
}

function testIsBrowser( ){

    assertTrue(

        'Must be true for current version',
        env.isBrowser( )
    );
}

function testDevice( ){

    assertTrue(

        'Property must have a type of Object',
        goog.isObject( env.device )
    );
}