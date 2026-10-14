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

import {Component, inject} from '@angular/core';
import {faBalanceScale} from '@fortawesome/free-solid-svg-icons';
import {AppService} from '../app.service';
import {RouterLink} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [RouterLink, FaIconComponent]
})
export class FooterComponent {

  faBalanceScale = faBalanceScale;

  appVersion;

  appVersionUrl;

  constructor() {
    const appService = inject(AppService);

    this.appVersion = appService.getAppInfo().version;
    this.appVersionUrl = versionPageUrl(this.appVersion);
  }

}

const REPOSITORY_URL = 'https://github.com/recos-diet/recos-diet';

// GitHub page of a version: the release of 2.4.0, the commit of a staging build (2.4.0-rc.12+a1b2c3d or
// 2.3.1+a1b2c3d, which have no release), the list of releases otherwise (SNAPSHOT-<timestamp> in development)
export function versionPageUrl(version: string): string {
  const [release, commit] = version.split('+');
  if (commit) {
    return `${REPOSITORY_URL}/commit/${commit}`;
  }
  if (/^\d+\.\d+\.\d+$/.test(release)) {
    return `${REPOSITORY_URL}/releases/tag/${release}`;
  }
  return `${REPOSITORY_URL}/releases`;
}
