/*
 * Copyright (c) 2022. Yann D'Isanto
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import {getTestBed} from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting
} from '@angular/platform-browser/testing';
import {devDependencies} from '../../../package.json';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(), {
    teardown: {destroyAfterEach: false}
}
);

// Karma runs the jasmine-core that karma-jasmine bundles (4.6) unless the kjhtml reporter loads the one of
// package.json: a run without kjhtml must fail rather than pass under another jasmine. After initTestEnvironment:
// thrown before it, the error was buried under the failures of the specs that need TestBed
const declaredJasmine = devDependencies['jasmine-core'];
if (jasmine.version.split('.')[0] !== /\d+/.exec(declaredJasmine)?.[0]) {
  throw new Error(`jasmine ${jasmine.version} runs instead of jasmine-core ${declaredJasmine}: add the kjhtml reporter`);
}
