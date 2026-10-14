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

import {DOCUMENT, Injectable, inject} from '@angular/core';
import {JsonAssetLoaderService} from '../../infra/json-asset-loader.service';
import {environment} from '../../environments/environment';

// each theme is a style bundle named theme-<name> in angular.json, built but not injected into index.html
const themes = ['april-fools', 'christmas', 'halloween'];
const monthDay = /^\d{2}-\d{2}$/;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private jsonAssets = inject(JsonAssetLoaderService);
  private document = inject(DOCUMENT);
  private displayed?: {theme: string, stylesheet: HTMLLinkElement};

  // The site stays open for days on the computers of the ward: the theme follows the seasons and the edits of
  // theme.json without any reload, swapping a stylesheet leaves the page and what is being typed untouched
  start(): Promise<void> {
    window.setInterval(() => this.apply(), environment.themeCheckDelay);
    // a computer asleep for the night checks as soon as its screen wakes up
    this.document.addEventListener('visibilitychange', () => {
      if (this.document.visibilityState === 'visible') {
        this.apply();
      }
    });
    return this.apply();
  }

  // themes only decorate: a missing or broken theme.json must neither prevent the app from starting nor remove the
  // theme on display
  async apply(): Promise<void> {
    let theme: string | undefined;
    try {
      const json = await this.jsonAssets.load<JsonTheme>('theme');
      theme = currentTheme(json, new Date());
    } catch (error) {
      console.warn('theme kept, theme.json could not be loaded:', error);
      return;
    }
    if (theme === this.displayed?.theme) {
      return;
    }
    this.displayed?.stylesheet.remove();
    this.displayed = theme ? {theme, stylesheet: this.loadStylesheet(theme)} : undefined;
  }

  private loadStylesheet(theme: string): HTMLLinkElement {
    const stylesheet = this.document.createElement('link');
    stylesheet.rel = 'stylesheet';
    // the build does not hash the name of a non-injected bundle: the version renews the browser cache on each release
    stylesheet.href = `theme-${theme}.css?v=${environment.appVersion}`;
    this.document.head.appendChild(stylesheet);
    return stylesheet;
  }
}

export function currentTheme(json: JsonTheme, today: Date): string | undefined {
  const theme = json.theme === 'auto' ? seasonTheme(json.seasons, today) : json.theme;
  if (theme === undefined || theme === 'none') {
    return undefined;
  }
  if (!themes.includes(theme)) {
    console.warn('theme ignored, it does not exist:', theme);
    return undefined;
  }
  return theme;
}

function seasonTheme(seasons: JsonSeason[], today: Date): string | undefined {
  const todayMonthDay = formatMonthDay(today);
  return seasons.find(season => isInSeason(season, todayMonthDay))?.theme;
}

function isInSeason(season: JsonSeason, todayMonthDay: string): boolean {
  if (!monthDay.test(season.from) || !monthDay.test(season.to)) {
    console.warn('season ignored, its dates are not MM-DD:', season);
    return false;
  }
  // MM-DD strings compare like dates. A season that ends before it starts spans the new year (12-01 to 01-06)
  return season.from <= season.to
    ? season.from <= todayMonthDay && todayMonthDay <= season.to
    : season.from <= todayMonthDay || todayMonthDay <= season.to;
}

function formatMonthDay(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}-${day}`;
}

export interface JsonTheme {
  // 'auto' (the theme of the current season), 'none' or the name of a theme to force
  theme: string
  seasons: JsonSeason[]
}

interface JsonSeason {
  theme: string
  // MM-DD, both included
  from: string
  to: string
}
