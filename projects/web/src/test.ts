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
