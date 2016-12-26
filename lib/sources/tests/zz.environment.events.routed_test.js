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

goog.provide( 'zz.environment.events.RoutedTest' );
goog.setTestOnly( 'zz.environment.events.RoutedTest' );

goog.require( 'goog.testing.jsunit' );
goog.require( 'zz.events.BaseEvent' );
goog.require( 'zz.environment.events.Routed' );
goog.require( 'zz.environment.enums.EventType' );

var event;
var curr;
var prev;

function setUp( ){

    curr = 'http://youtube.com';
    prev = 'http://google.com';
    event = new zz.environment.events.Routed( prev, curr );
}

var members = [

    'prev_',
    'curr_',
    'getPrevFragment',
    'getCurrFragment'
];

function testAvailableMembers( ){

    zz.environment.TestRunner.checkMembers( members, event );
}

function testConstructor( ){

    assertTrue(

        'Instance must be non-null and have the expected class',
        event instanceof zz.environment.events.Routed
    );
}

function testInheritance( ){

   assertTrue(

        'Instance must be non-null and have the expected class',
        event instanceof zz.events.BaseEvent
    );
}

function testType( ){

    assertEquals(

        'Expected type should be equal for type from enums',
        event.type,
        zz.environment.enums.EventType.ROUTED
    );
}

function testCurrUrl( ){

    assertEquals(

        'Current URL should be equal for url from corresponding getter',
        curr,
        event.getCurrFragment( )
    );
}

function testPrevUrl( ){

    assertEquals(

        'Previous URL should be equal for url from corresponding getter',
        prev,
        event.getPrevFragment( )
    );
}