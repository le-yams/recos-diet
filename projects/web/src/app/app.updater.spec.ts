/*
 * Copyright (c) 2026. Yann D'Isanto
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

import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpRequest, provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {environment} from '../environments/environment';
import {AppService} from './app.service';
import {AppUpdater} from './app.updater';

describe('AppUpdater', () => {
  const runningVersion = '2.3.1';
  let httpTesting: HttpTestingController;
  let confirmSpy: jasmine.Spy;
  let updater: AppUpdater;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    httpTesting = TestBed.inject(HttpTestingController);
    // declining the refresh keeps the test page from reloading
    confirmSpy = spyOn(window, 'confirm').and.returnValue(false);
    updater = new AppUpdater({version: runningVersion} as AppService, TestBed.inject(HttpClient));
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    httpTesting.verify();
  });

  const isVersionRequest = (request: HttpRequest<unknown>) => request.url.startsWith(location.origin + '/version.json');
  const expectVersionRequest = () => httpTesting.expectOne(isVersionRequest);

  it('should keep checking for updates after a failed check', () => {
    updater.start();
    expectVersionRequest().error(new ProgressEvent('error'));

    jasmine.clock().tick(environment.appUpdateCheckDelay);

    const nextChecks = httpTesting.match(isVersionRequest);
    expect(nextChecks.length).toBe(1);
    nextChecks.forEach(check => check.flush({version: runningVersion}));
  });

  it('should not ask to refresh when the online version is the running one', () => {
    updater.start();
    expectVersionRequest().flush({version: runningVersion});

    expect(confirmSpy).not.toHaveBeenCalled();
  });

  it('should ask to refresh when a new version is online', () => {
    updater.start();
    expectVersionRequest().flush({version: '2.4.0'});

    expect(confirmSpy).toHaveBeenCalledTimes(1);
  });
});
