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

import {DOCUMENT} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {JsonAssetLoaderService} from '../../infra/json-asset-loader.service';
import {environment} from '../../environments/environment';
import {currentTheme, JsonTheme, ThemeService} from './theme.service';

const seasons = [
  {theme: 'halloween', from: '10-20', to: '11-01'},
  {theme: 'christmas', from: '12-01', to: '01-06'}
];

describe('ThemeService', () => {
  const themeJson = (theme: string): JsonTheme => ({theme, seasons});
  let load: jasmine.Spy;
  let service: ThemeService;
  // detached from the test runner page: its stylesheets are not fetched
  let page: Document;

  function givenAssetLoad(assetLoad: jasmine.Spy) {
    load = assetLoad;
    page = document.implementation.createHTMLDocument();
    TestBed.configureTestingModule({
      providers: [
        {provide: JsonAssetLoaderService, useValue: {load}},
        {provide: DOCUMENT, useValue: page}
      ]
    });
    service = TestBed.inject(ThemeService);
  }

  // theme.json as read by each check, in turn
  function givenThemeJson(...jsons: JsonTheme[]) {
    givenAssetLoad(jasmine.createSpy('load').and.returnValues(...jsons.map(json => Promise.resolve(json))));
  }

  function themeStylesheets() {
    return Array.from(page.head.querySelectorAll('link[rel="stylesheet"]'))
      .map(stylesheet => stylesheet.getAttribute('href'));
  }

  it('should load the stylesheet of the theme', async () => {
    givenThemeJson(themeJson('christmas'));

    await service.apply();

    expect(themeStylesheets()).toEqual([jasmine.stringMatching(/^theme-christmas\.css\?v=/)]);
  });

  it('should load no stylesheet without theme', async () => {
    givenThemeJson(themeJson('none'));

    await service.apply();

    expect(themeStylesheets()).toEqual([]);
  });

  it('should leave the page without theme when theme.json cannot be loaded', async () => {
    givenAssetLoad(jasmine.createSpy('load').and.rejectWith(new Error('404')));

    await expectAsync(service.apply()).toBeResolved();
    expect(themeStylesheets()).toEqual([]);
  });

  it('should keep the stylesheet of a theme that stays on display', async () => {
    givenThemeJson(themeJson('christmas'), themeJson('christmas'));
    await service.apply();
    const stylesheet = page.head.querySelector('link');

    await service.apply();

    expect(page.head.querySelector('link')).toBe(stylesheet);
    expect(themeStylesheets().length).toBe(1);
  });

  it('should swap the stylesheet when the theme changes', async () => {
    givenThemeJson(themeJson('christmas'), themeJson('halloween'));
    await service.apply();

    await service.apply();

    expect(themeStylesheets()).toEqual([jasmine.stringMatching(/^theme-halloween\.css\?v=/)]);
  });

  it('should remove the stylesheet when the season ends', async () => {
    givenThemeJson(themeJson('christmas'), themeJson('none'));
    await service.apply();

    await service.apply();

    expect(themeStylesheets()).toEqual([]);
  });

  it('should keep the theme on display when theme.json cannot be loaded anymore', async () => {
    givenAssetLoad(jasmine.createSpy('load').and.returnValues(
      Promise.resolve(themeJson('christmas')), Promise.reject(new Error('network down'))));
    await service.apply();

    await service.apply();

    expect(themeStylesheets()).toEqual([jasmine.stringMatching(/^theme-christmas\.css\?v=/)]);
  });

  describe('once started', () => {
    beforeEach(() => jasmine.clock().install());

    afterEach(() => jasmine.clock().uninstall());

    function givenPageVisibility(visibility: DocumentVisibilityState) {
      Object.defineProperty(page, 'visibilityState', {value: visibility, configurable: true});
    }

    it('should check the theme again periodically', async () => {
      givenThemeJson(themeJson('christmas'), themeJson('christmas'));
      await service.start();

      jasmine.clock().tick(environment.themeCheckDelay);

      expect(load).toHaveBeenCalledTimes(2);
    });

    it('should check the theme again when the page shows up again', async () => {
      givenThemeJson(themeJson('christmas'), themeJson('christmas'));
      await service.start();

      givenPageVisibility('visible');
      page.dispatchEvent(new Event('visibilitychange'));

      expect(load).toHaveBeenCalledTimes(2);
    });

    it('should not check the theme when the page gets hidden', async () => {
      givenThemeJson(themeJson('christmas'));
      await service.start();

      givenPageVisibility('hidden');
      page.dispatchEvent(new Event('visibilitychange'));

      expect(load).toHaveBeenCalledTimes(1);
    });
  });
});

// local noon: the day does not depend on the time zone
const day = (isoDate: string) => new Date(`${isoDate}T12:00`);

describe('currentTheme', () => {
  [
    {today: '2026-10-19', expected: undefined},
    {today: '2026-10-20', expected: 'halloween'},
    {today: '2026-10-31', expected: 'halloween'},
    {today: '2026-11-01', expected: 'halloween'},
    {today: '2026-11-02', expected: undefined},
    {today: '2026-11-30', expected: undefined},
    {today: '2026-12-01', expected: 'christmas'},
    {today: '2026-12-31', expected: 'christmas'},
    {today: '2027-01-01', expected: 'christmas'},
    {today: '2027-01-06', expected: 'christmas'},
    {today: '2027-01-07', expected: undefined},
  ].forEach(({today, expected}) => {
    it(`should pick the theme of the season on ${today} in auto mode: ${expected}`, () => {
      expect(currentTheme({theme: 'auto', seasons}, day(today))).toBe(expected);
    });
  });

  it('should force a theme out of its season', () => {
    expect(currentTheme({theme: 'christmas', seasons}, day('2026-07-14'))).toBe('christmas');
  });

  it('should disable themes during a season', () => {
    expect(currentTheme({theme: 'none', seasons}, day('2026-12-25'))).toBeUndefined();
  });

  it('should ignore a theme that does not exist', () => {
    expect(currentTheme({theme: 'paques', seasons}, day('2026-04-05'))).toBeUndefined();
  });

  it('should ignore a season of an unknown theme', () => {
    const paques = [{theme: 'paques', from: '04-01', to: '04-10'}];

    expect(currentTheme({theme: 'auto', seasons: paques}, day('2026-04-05'))).toBeUndefined();
  });

  it('should ignore a season whose dates are not MM-DD', () => {
    const christmas = [{theme: 'christmas', from: '12-1', to: '01-06'}];

    expect(currentTheme({theme: 'auto', seasons: christmas}, day('2026-12-25'))).toBeUndefined();
  });
});

describe('theme.json', () => {
  // edited by hand: a misspelled theme or date would silently leave its season without decorations
  it('should apply the theme of each season on its first and last days', async () => {
    const json: JsonTheme = await (await fetch('/assets/theme.json')).json();

    const appliedThemes = json.seasons.flatMap(season => [season.from, season.to]
      .map(monthDay => currentTheme({theme: 'auto', seasons: [season]}, day(`2026-${monthDay}`))));

    expect(appliedThemes).toEqual(json.seasons.flatMap(season => [season.theme, season.theme]));
  });
});
