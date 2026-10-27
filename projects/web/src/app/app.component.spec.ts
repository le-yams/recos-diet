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

import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideRouter, Router} from '@angular/router';
import {provideHttpClient, withXhr} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

// every url leads to an empty page: the menu is under test, not the pages and their dependencies
@Component({template: ''})
class PageStubComponent {
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([{path: '**', component: PageStubComponent}]),
        provideHttpClient(withXhr()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function menuEntries(): HTMLAnchorElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('mat-nav-list a'));
  }

  async function navigateTo(url: string) {
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link each menu entry to its page', () => {
    expect(menuEntries().map(entry => entry.getAttribute('href'))).toEqual(component.menus.map(menu => menu.route));
  });

  [
    {url: '/', currentEntry: 'Débits cibles et Micronutriments'},
    {url: '/sri', currentEntry: 'SRI'},
    // the url opened by the bibliography links
    {url: '/bibliography?index=3', currentEntry: 'Bibliographie'},
  ].forEach(param => {
    it(`should mark the menu entry of ${param.url} as the current page`, async () => {
      await navigateTo(param.url);

      const currentEntries = menuEntries().filter(entry => entry.getAttribute('aria-current') === 'page');
      expect(currentEntries.map(entry => entry.textContent?.trim())).toEqual([param.currentEntry]);
    });
  });
});
