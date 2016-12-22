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
goog.setTestOnly( 'zz.environment.services.EnvironmentTest' );

goog.require( 'goog.testing.jsunit' );
goog.require( 'goog.events.EventTarget' );
goog.require( 'zz.environment.services.Environment' );

var env = new zz.environment.services.Environment( );

function testConstructor( ){

    assertTrue(

        'Instance must be non-null and have the expected class',
        env instanceof zz.environment.services.Environment
    );

    assertTrue(

        'Instance must be non-null and have the expected class',
        env instanceof goog.events.EventTarget
    );
}