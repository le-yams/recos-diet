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
import {JsonAssetLoaderService} from "../../infra/json-asset-loader.service";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private jsonAssets = inject(JsonAssetLoaderService);

  public async get(): Promise<Survey> {
    return await this.jsonAssets.load<Survey>("survey");
  }
}

export interface Survey {
  enabled: boolean
  url: string
}

export const NoSurvey: Survey = {
  enabled: false,
  url: ""
}
