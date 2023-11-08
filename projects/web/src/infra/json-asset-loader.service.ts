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

import {Injectable, SecurityContext} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JsonAssetLoaderService {

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {
  }

  load<T>(name: string): Promise<T> {
    const url = location.origin + '/assets/' + name + '.json?no-cache=' + new Date().getTime();

    let trustedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    let sanitizedUrl = this.domSanitizer.sanitize(SecurityContext.RESOURCE_URL, trustedUrl)!;

    return firstValueFrom(this.http.get<T>(sanitizedUrl))
  }
}
