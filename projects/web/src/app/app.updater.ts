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

import {AppService} from './app.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {Verbose} from '../infra/utils';

export class AppUpdater {

  private checkForUpdateIntervalId: number | null = null;
  private checkingForUpdate = false;
  private lastWarningTimestamp = 0;

  constructor(private app: AppService, private http: HttpClient) {
  }

  start() {
    if (this.checkForUpdateIntervalId) {
      Verbose.log('clearing previous check for update interval with handle id=' + this.checkForUpdateIntervalId);
      window.clearInterval(this.checkForUpdateIntervalId);
    }
    this.checkForUpdateIntervalId = window.setInterval(() => {
      this.checkAppUpdate()
    }, environment.appUpdateCheckDelay);
    Verbose.log('new check for update interval set with handle id=' + this.checkForUpdateIntervalId + ' and delay=' + environment.appUpdateCheckDelay);
    this.checkAppUpdate();
  }

  private checkAppUpdate() {
    if (this.checkingForUpdate || this.userAlreadyNotified()) {
      return;
    }
    this.checkingForUpdate = true;
    this.requestLatestOnlineVersion()
      // finalize runs on error too: a failed check (network, version.json missing during a deployment)
      // must not block the next ones
      .pipe(finalize(() => this.checkingForUpdate = false))
      .subscribe({
        next: data => this.refreshAppIfNecessary(data),
        error: err => Verbose.log('error checking for update', err)
      });
  }

  private userAlreadyNotified() {
    const elapsedFromLastWarning = new Date().getTime() - this.lastWarningTimestamp;
    return elapsedFromLastWarning < environment.updateWarningSleep;
  }

  private requestLatestOnlineVersion(): Observable<VersionInfo> {
    const url = location.origin + '/version.json?no-cache=' + new Date().getTime();
    return this.http.get<VersionInfo>(url);
  }

  private refreshAppIfNecessary(data: VersionInfo) {

    const currentVersion = this.app.version;
    const newVersion = data.version;
    if (newVersion !== currentVersion) {
      Verbose.log(`app new version available: ${newVersion} (current is ${currentVersion})`);
      if (confirm('Une nouvelle version du site a été publiée, il est nécessaire de rafraîchir la page. Voulez-vous rafraîchir maintenant ?')) {
        location.reload();
      } else {
        this.lastWarningTimestamp = new Date().getTime();
      }
    }
  }
}

interface VersionInfo {
  version: string;
}
