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
import {JsonAssetLoaderService} from '../../infra/json-asset-loader.service';
import {NoSurvey, SurveyService} from './survey.service';

describe('SurveyService', () => {
  const googleFormUrl = 'https://docs.google.com/forms/d/e/form-id/viewform?embedded=true';
  let load: jasmine.Spy;
  let service: SurveyService;

  function givenSurveyJson(json: {enabled: boolean, url: string}) {
    load = jasmine.createSpy('load').and.resolveTo(json);
    TestBed.configureTestingModule({
      providers: [{provide: JsonAssetLoaderService, useValue: {load}}]
    });
    service = TestBed.inject(SurveyService);
  }

  it('should load survey.json once for all its readers', async () => {
    givenSurveyJson({enabled: true, url: googleFormUrl});

    await Promise.all([service.get(), service.get()]);

    expect(load).toHaveBeenCalledOnceWith('survey');
  });

  it('should enable a Google Forms survey', async () => {
    givenSurveyJson({enabled: true, url: googleFormUrl});

    const survey = await service.get();

    expect(survey.enabled).toBeTrue();
    expect(survey.url).toBeTruthy();
  });

  it('should return no survey when it is disabled', async () => {
    givenSurveyJson({enabled: false, url: googleFormUrl});

    expect(await service.get()).toBe(NoSurvey);
  });

  ['https://example.com/forms/d/e/form-id/viewform', 'http://docs.google.com/forms/d/e/form-id/viewform',
    'https://docs.google.com.example.com/forms', 'not an url'].forEach(url => {
    it(`should ignore a survey whose url is not a Google Forms one: ${url}`, async () => {
      givenSurveyJson({enabled: true, url});

      expect(await service.get()).toBe(NoSurvey);
    });
  });
});
