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

goog.provide( 'zz.environment.TestRunner' );
goog.setTestOnly( 'zz.environment.TestRunner' );

goog.require( 'zz.tests' );

goog.require( 'zz.environment.events.OfflineTest' );
goog.require( 'zz.environment.events.OnlineTest' );
goog.require( 'zz.environment.events.ResizeTest' );
goog.require( 'zz.environment.events.RoutedTest' );
goog.require( 'zz.environment.services.EnvironmentTest' );
goog.require( 'zz.environment.services.MVCRegistryTest' );


function setUp( ){ }