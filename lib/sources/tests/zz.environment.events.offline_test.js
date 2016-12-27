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

goog.provide( 'zz.environment.events.OfflineTest' );
goog.setTestOnly( 'zz.environment.events.OfflineTest' );

goog.require( 'goog.testing.jsunit' );
goog.require( 'zz.events.BaseEvent' );
goog.require( 'zz.environment.events.Offline' );
goog.require( 'zz.environment.enums.EventType' );

var zz_environment_events_OfflineTest_event = new zz.environment.events.Offline( );
var zz_environment_events_OfflineTest_members = [ ];

function test_zz_environment_events_OfflineTest_availableMembers( ){

    zz.tests.checkMembers(
        zz_environment_events_OfflineTest_members,
        zz_environment_events_OfflineTest_event
    );
}

function test_zz_environment_events_OfflineTest_constructor( ){

    assertTrue(

        'Instance must be non-null and have the expected class',
        zz_environment_events_OfflineTest_event instanceof zz.environment.events.Offline
    );
}

function test_zz_environment_events_OfflineTest_inheritance( ){

   assertTrue(

        'Instance must be non-null and have the expected class',
       zz_environment_events_OfflineTest_event instanceof zz.events.BaseEvent
    );
}

function test_zz_environment_events_OfflineTest_type( ){

    assertEquals(

        'Expected type should be equal for type from enums',
        zz_environment_events_OfflineTest_event.type,
        zz.environment.enums.EventType.OFFLINE
    );
}