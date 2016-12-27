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

goog.provide( 'zz.environment.services.MVCRegistryTest' );

goog.require( 'goog.testing.jsunit' );
goog.setTestOnly( 'zz.environment.services.MVCRegistryTest' );

goog.require( 'zz.environment.services.MVCRegistry' );

goog.require( 'goog.events.EventTarget' );


var zz_environment_services_MVCRegistryTest_testSubj = new zz.environment.services.MVCRegistry( );
var zz_environment_services_MVCRegistryTest_model = 'model';
var zz_environment_services_MVCRegistryTest_controller = 'controller';
var zz_environment_services_MVCRegistryTest_elements = [ 'element1', 'element2' ];
var zz_environment_services_MVCRegistryTest_storageElement = {

    model: zz_environment_services_MVCRegistryTest_model,
    controller: zz_environment_services_MVCRegistryTest_controller,
    elements: zz_environment_services_MVCRegistryTest_elements
};

var zz_environment_services_MVCRegistryTest_members = [

    'storage_'
];

var zz_environment_services_MVCRegistryTest_methods = [

    'set',
    'get',
    'delete'
];

var zz_environment_services_MVCRegistryTest_staticMembers = [

    'controllers_',
    'views_'
];

var zz_environment_services_MVCRegistryTest_staticMethods = [

    'setView',
    'setController',
    'getView',
    'getController'
];

function test_zz_environment_services_MVCRegistryTest_availableMembers( ){

    var checkIfIsFun = true;

    zz.environment.TestRunner.checkMembers(
        zz_environment_services_MVCRegistryTest_members,
        zz_environment_services_MVCRegistryTest_testSubj
    );
    zz.environment.TestRunner.checkMembers(
        zz_environment_services_MVCRegistryTest_methods,
        zz_environment_services_MVCRegistryTest_testSubj,
        checkIfIsFun,
        'Methods:'
    );
    zz.environment.TestRunner.checkMembers(
        zz_environment_services_MVCRegistryTest_staticMembers,
        zz.environment.services.MVCRegistry,
        false,
        'Static:'
    );
    zz.environment.TestRunner.checkMembers(
        zz_environment_services_MVCRegistryTest_staticMethods,
        zz.environment.services.MVCRegistry,
        checkIfIsFun,
        'Static methods:'
    );
}

function test_zz_environment_services_MVCRegistryTest_constructor( ){

    assertTrue(

        'Instance must be non-null and have the expected type',
        zz_environment_services_MVCRegistryTest_testSubj instanceof zz.environment.services.MVCRegistry
    );
}

function test_zz_environment_services_MVCRegistryTest_storage( ){

    assertTrue(

        'Property must to have a type of Object',
        goog.isObject( zz_environment_services_MVCRegistryTest_testSubj.storage_ )
    );
}

function test_zz_environment_services_MVCRegistryTest_controllers( ){

    assertTrue(

        'Property must to have a type of Object',
        goog.isObject( zz.environment.services.MVCRegistry.controllers_ )
    );
}

function test_zz_environment_services_MVCRegistryTest_views( ){

    assertTrue(

        'Property must to have a type of Object',
        goog.isObject( zz.environment.services.MVCRegistry.views_ )
    );
}

function test_zz_environment_services_MVCRegistryTest_set( ){

    var uid = 'uid1';
    zz_environment_services_MVCRegistryTest_testSubj.set(
        uid,
        zz_environment_services_MVCRegistryTest_model,
        zz_environment_services_MVCRegistryTest_controller,
        zz_environment_services_MVCRegistryTest_elements
    );

    assertObjectEquals(

        'Instance must have an element in the storage_ property that is equals the object with properties from passed parameters',
        zz_environment_services_MVCRegistryTest_storageElement,
        zz_environment_services_MVCRegistryTest_testSubj.storage_[ uid ]
    )

    var elements2 = [ 'element3' ];
    zz_environment_services_MVCRegistryTest_testSubj.set(
        uid,
        undefined,
        undefined,
        elements2
    );

    assertObjectNotEquals(

        'The element in the storage_ property must had to change after recall with the same uid',
        zz_environment_services_MVCRegistryTest_storageElement,
        zz_environment_services_MVCRegistryTest_testSubj.storage_[ uid ]
    )

    zz_environment_services_MVCRegistryTest_storageElement.elements =
        zz_environment_services_MVCRegistryTest_storageElement.elements.concat( elements2 );

    assertObjectEquals(

        'The element in the storage_ property must had to change properly after recall with the same uid',
        zz_environment_services_MVCRegistryTest_storageElement,
        zz_environment_services_MVCRegistryTest_testSubj.storage_[ uid ]
    )
}

function test_zz_environment_services_MVCRegistryTest_get( ){

    var uid = 'uid2';
    zz_environment_services_MVCRegistryTest_testSubj.set(
        uid,
        zz_environment_services_MVCRegistryTest_model,
        zz_environment_services_MVCRegistryTest_controller,
        zz_environment_services_MVCRegistryTest_elements
    );

    assertObjectEquals(

        'Must have to return existed element',
        zz_environment_services_MVCRegistryTest_storageElement,
        zz_environment_services_MVCRegistryTest_testSubj.get( uid )
    )

    assertFalse(

        'Expected false for not existed uid',
        zz_environment_services_MVCRegistryTest_testSubj.get( 'notExistedUID' )
    );
}

function test_zz_environment_services_MVCRegistryTest_delete( ){

    var uid = 'uid3';
    zz_environment_services_MVCRegistryTest_testSubj.set(
        uid,
        zz_environment_services_MVCRegistryTest_model,
        zz_environment_services_MVCRegistryTest_controller,
        zz_environment_services_MVCRegistryTest_elements
    );
    var element = zz_environment_services_MVCRegistryTest_testSubj.get( uid );
    var result = zz_environment_services_MVCRegistryTest_testSubj.delete( uid );

    assertNotContains(

        'Must have to does not contain deleted element',
        element,
        zz_environment_services_MVCRegistryTest_testSubj.storage_
    );

    assertTrue(

        'Expected true for return value',
        result
    );

    result = zz_environment_services_MVCRegistryTest_testSubj.delete( 'notExistedUID' );

    assertFalse(

        'Expected false for return value if uid is not exists',
        result
    );
}

function test_zz_environment_services_MVCRegistryTest_setView( ){

    var name = undefined;
    var ctor = undefined;
    var expectedError = 'Error: Invalid view name: ' + name;
    var funWrapper = function( ){

        zz.environment.services.MVCRegistry.setView( name, ctor );
    };

    var exception = assertThrows(

        'Expected exception',
        funWrapper
    );

    assertEquals(

        'Expected properly exception',
        expectedError,
        exception.toString( )
    );

    name = 'viewName';
    expectedError = 'Error: Invalid view constructor function: ' + ctor;

    exception = assertThrows(

        'Expected exception',
        funWrapper
    );

    assertEquals(

        'Expected properly exception',
        expectedError,
        exception.toString( )
    );

    ctor = { };
    expectedError = 'Error: Invalid view constructor function: ' + ctor.toString( );

    exception = assertThrows(

        'Expected exception',
        funWrapper
    );

    assertEquals(

        'Expected properly exception',
        expectedError,
        exception.toString( )
    );

    ctor = function( ){ this.p = 1; };

    assertNotThrows(

        'Expected no exceptions',
        funWrapper
    );

    assertObjectEquals(

        'Must have to register view',
        ctor,
        zz.environment.services.MVCRegistry.views_[ name ]
    );
}

function test_zz_environment_services_MVCRegistryTest_setController( ){

    var name = undefined;
    var ctor = undefined;
    var expectedError = 'Error: Invalid controller name: ' + name;
    var funWrapper = function( ){

        zz.environment.services.MVCRegistry.setController( name, ctor );
    };

    var exception = assertThrows(

        'Expected exception',
        funWrapper
    );

    assertEquals(

        'Expected properly exception',
        expectedError,
        exception.toString( )
    );

    name = 'controllerName';
    expectedError = 'Error: Invalid controller constructor function: ' + ctor;

    exception = assertThrows(

        'Expected exception',
        funWrapper
    );

    assertEquals(

        'Expected properly exception',
        expectedError,
        exception.toString( )
    );

    ctor = { };
    expectedError = 'Error: Invalid controller constructor function: ' + ctor.toString( );

    exception = assertThrows(

        'Expected exception',
        funWrapper
    );

    assertEquals(

        'Expected properly exception',
        expectedError,
        exception.toString( )
    );

    ctor = function( ){ this.p = 1; };

    assertNotThrows(

        'Expected no exceptions',
        funWrapper
    );

    assertObjectEquals(

        'Must have to register controller',
        ctor,
        zz.environment.services.MVCRegistry.controllers_[ name ]
    );
}

function test_zz_environment_services_MVCRegistryTest_getView( ){

    var name = 'noName';
    var ctor = function( ){ this.p = 1; };
    ctor[ 'getInstance' ] = function( ){

        return this;
    };

    assertNull(

        'Expected null',
        zz.environment.services.MVCRegistry.getView( name )
    );

    name = 'viewName2';
    zz.environment.services.MVCRegistry.setView( name, ctor );

    assertObjectEquals(

        'Expect object that was passed by setView',
        ctor,
        zz.environment.services.MVCRegistry.getView( name )
    );
}

function test_zz_environment_services_MVCRegistryTest_getController( ){

    var name = 'noName';
    var model = 'model';
    var view = 'view';
    var ctor = function( model, view ){

        return {

            model: model,
            view: view
        };
    };

    assertNull(

        'Expected null',
        zz.environment.services.MVCRegistry.getController( name )
    );

    name = 'controllerName2';
    zz.environment.services.MVCRegistry.setController( name, ctor );

    assertObjectEquals(

        'Expect object that was passed by setController',
        ctor( model, view ),
        zz.environment.services.MVCRegistry.getController( name, model, view )
    );
}