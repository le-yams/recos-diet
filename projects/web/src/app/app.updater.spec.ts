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
import {AppUpdater, dismissalCheckDelay} from './app.updater';

describe('AppUpdater', () => {
  const runningVersion = '2.3.1';
  let httpTesting: HttpTestingController;
  let confirmSpy: jasmine.Spy;
  let updater: AppUpdater;
  // the real visibility of the Karma tab depends on the window that hosts it (Chrome reports an occluded window hidden)
  let tabVisibility: DocumentVisibilityState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    httpTesting = TestBed.inject(HttpTestingController);
    // declining the refresh keeps the test page from reloading
    confirmSpy = spyOn(window, 'confirm').and.returnValue(false);
    tabVisibility = 'visible';
    spyOnProperty(document, 'visibilityState').and.callFake(() => tabVisibility);
    updater = new AppUpdater({version: runningVersion} as AppService, TestBed.inject(HttpClient));
    jasmine.clock().install();
  });

  afterEach(() => {
    updater.stop();
    jasmine.clock().uninstall();
    httpTesting.verify();
  });

  const changeTabVisibility = (visibility: DocumentVisibilityState) => {
    tabVisibility = visibility;
    document.dispatchEvent(new Event('visibilitychange'));
  };

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

  it('should not check for updates while the tab is hidden', () => {
    tabVisibility = 'hidden';
    updater.start();
    jasmine.clock().tick(environment.appUpdateCheckDelay);

    expect(httpTesting.match(isVersionRequest).length).toBe(0);
  });

  it('should check for updates when the tab comes back to the foreground', () => {
    updater.start();
    expectVersionRequest().flush({version: runningVersion});

    changeTabVisibility('hidden');
    changeTabVisibility('visible');
    expectVersionRequest().flush({version: '2.4.0'});

    expect(confirmSpy).toHaveBeenCalledTimes(1);
  });

  it('should ask to refresh once back to the foreground when the tab was hidden during the check', () => {
    updater.start();
    const check = expectVersionRequest();
    tabVisibility = 'hidden';
    check.flush({version: '2.4.0'});
    expect(confirmSpy).not.toHaveBeenCalled();

    changeTabVisibility('visible');
    expectVersionRequest().flush({version: '2.4.0'});

    expect(confirmSpy).toHaveBeenCalledTimes(1);
  });

  it('should ask again when the tab comes back after its dialog was closed by switching tabs', () => {
    // the page only learns it is hidden after confirm() has returned
    confirmSpy.and.callFake(() => {
      window.setTimeout(() => changeTabVisibility('hidden'));
      return false;
    });
    updater.start();
    expectVersionRequest().flush({version: '2.4.0'});
    jasmine.clock().tick(dismissalCheckDelay);

    changeTabVisibility('visible');
    expectVersionRequest().flush({version: '2.4.0'});

    expect(confirmSpy).toHaveBeenCalledTimes(2);
  });

  it('should not ask again for a while after a refusal', () => {
    updater.start();
    expectVersionRequest().flush({version: '2.4.0'});
    jasmine.clock().tick(dismissalCheckDelay);

    changeTabVisibility('hidden');
    changeTabVisibility('visible');
    jasmine.clock().tick(environment.appUpdateCheckDelay);

    expect(httpTesting.match(isVersionRequest).length).toBe(0);
    expect(confirmSpy).toHaveBeenCalledTimes(1);
  });
});
