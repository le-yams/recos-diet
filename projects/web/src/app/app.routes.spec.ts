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
import {provideRouter, Router} from '@angular/router';
import {RouterTestingHarness} from '@angular/router/testing';
import {routes} from './app.routes';

// pages replaced by an empty component: the routing is under test, not the pages and their dependencies
@Component({template: ''})
class PageStubComponent {
}

describe('routes', () => {
  let harness: RouterTestingHarness;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes.map(route => route.component ? {...route, component: PageStubComponent} : route))]
    });
    harness = await RouterTestingHarness.create();
    router = TestBed.inject(Router);
  });

  ['/inexistant', '/produits', '/products/42'].forEach(url => {
    it(`should redirect the unknown url ${url} to the home page`, async () => {
      await harness.navigateByUrl(url);
      expect(router.url).toBe('/');
    });
  });

  it('should keep a known url', async () => {
    await harness.navigateByUrl('/products');
    expect(router.url).toBe('/products');
  });
});
