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

import {Injectable, inject} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {JsonAssetLoaderService} from '../../infra/json-asset-loader.service';

const googleFormsOrigin = 'https://docs.google.com';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private jsonAssets = inject(JsonAssetLoaderService);
  private sanitizer = inject(DomSanitizer);
  // loaded once, shared by the menu and the survey page
  private survey?: Promise<Survey>;

  public get(): Promise<Survey> {
    this.survey ??= this.load();
    return this.survey;
  }

  private async load(): Promise<Survey> {
    const json = await this.jsonAssets.load<JsonSurvey>('survey');
    if (!json.enabled) {
      return NoSurvey;
    }
    if (!isGoogleFormsUrl(json.url)) {
      console.warn('survey ignored, its url is not a Google Forms one:', json.url);
      return NoSurvey;
    }
    // trusted once: the iframe binds this same object, a new one on each check would reload the form
    return {enabled: true, url: this.sanitizer.bypassSecurityTrustResourceUrl(json.url)};
  }
}

function isGoogleFormsUrl(url: string): boolean {
  try {
    return new URL(url).origin === googleFormsOrigin;
  } catch {
    return false;
  }
}

interface JsonSurvey {
  enabled: boolean
  url: string
}

export interface Survey {
  enabled: boolean
  url: SafeResourceUrl | null
}

export const NoSurvey: Survey = {
  enabled: false,
  url: null
}
