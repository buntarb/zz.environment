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


var zz_environment_events_RoutedTest_curr = 'http://youtube.com';
var zz_environment_events_RoutedTest_prev = 'http://google.com';
var zz_environment_events_RoutedTest_event = new zz.environment.events.Routed(
    zz_environment_events_RoutedTest_prev,
    zz_environment_events_RoutedTest_curr
);

var zz_environment_events_RoutedTest_members = [

    'prev_',
    'curr_'
];

var zz_environment_events_RoutedTest_methods = [

    'getPrevFragment',
    'getCurrFragment'
];

function test_zz_environment_events_RoutedTest_availableMembers( ){

    var checkIfIsFun = true;

    zz.environment.TestRunner.checkMembers(
        zz_environment_events_RoutedTest_members,
        zz_environment_events_RoutedTest_event
    );
    zz.environment.TestRunner.checkMembers(
        zz_environment_events_RoutedTest_methods,
        zz_environment_events_RoutedTest_event,
        checkIfIsFun,
        'Methods:'
    );
}

function test_zz_environment_events_RoutedTest_constructor( ){

    assertTrue(

        'Instance must be non-null and have the expected class',
        zz_environment_events_RoutedTest_event instanceof zz.environment.events.Routed
    );
}

function test_zz_environment_events_RoutedTest_inheritance( ){

   assertTrue(

        'Instance must be non-null and have the expected class',
        zz_environment_events_RoutedTest_event instanceof zz.events.BaseEvent
    );
}

function test_zz_environment_events_RoutedTest_type( ){

    assertEquals(

        'Expected type should be equal for type from enums',
        zz_environment_events_RoutedTest_event.type,
        zz.environment.enums.EventType.ROUTED
    );
}

function test_zz_environment_events_RoutedTest_currUrl( ){

    assertEquals(

        'Current URL should be equal for url from corresponding getter',
        zz_environment_events_RoutedTest_curr,
        zz_environment_events_RoutedTest_event.getCurrFragment( )
    );
}

function test_zz_environment_events_RoutedTest_prevUrl( ){

    assertEquals(

        'Previous URL should be equal for url from corresponding getter',
        zz_environment_events_RoutedTest_prev,
        zz_environment_events_RoutedTest_event.getPrevFragment( )
    );
}