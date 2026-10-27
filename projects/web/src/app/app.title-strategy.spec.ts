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

import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {Title} from '@angular/platform-browser';
import {provideRouter, TitleStrategy} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
import {AppTitleStrategy} from './app.title-strategy';

@Component({template: ''})
class PageStubComponent {
}

describe('AppTitleStrategy', () => {
  let harness: RouterTestingHarness;
  let title: Title;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {path: 'titled', component: PageStubComponent, title: 'SRI'},
          {path: 'untitled', component: PageStubComponent}
        ]),
        {provide: TitleStrategy, useClass: AppTitleStrategy}
      ]
    });
    harness = await RouterTestingHarness.create();
    title = TestBed.inject(Title);
  });

  it('should put the title of the page before the name of the site', async () => {
    await harness.navigateByUrl('/titled');
    expect(title.getTitle()).toBe('SRI – Recos diététiques');
  });

  it('should only show the name of the site on a page without title', async () => {
    await harness.navigateByUrl('/titled');
    await harness.navigateByUrl('/untitled');
    expect(title.getTitle()).toBe('Recos diététiques');
  });
});
