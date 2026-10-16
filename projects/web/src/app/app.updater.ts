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

// Chrome closes the dialog of a tab that is switched from, and confirm() then returns false as for a refusal. The page
// only learns it is hidden right after: the answer counts as a refusal if the tab is still visible after this delay
export const dismissalCheckDelay = 1000;

export class AppUpdater {

  private checkForUpdateIntervalId: number | null = null;
  private checkingForUpdate = false;
  private lastWarningTimestamp = 0;
  // the same function each time: start() registers it only once however many times it runs, and stop() removes it
  private readonly checkOnTabReturn = () => {
    if (document.visibilityState === 'visible') {
      this.checkAppUpdate();
    }
  };

  constructor(private app: AppService, private http: HttpClient) {
  }

  start() {
    this.stop();
    this.checkForUpdateIntervalId = window.setInterval(() => {
      this.checkAppUpdate()
    }, environment.appUpdateCheckDelay);
    Verbose.log('new check for update interval set with handle id=' + this.checkForUpdateIntervalId + ' and delay=' + environment.appUpdateCheckDelay);
    // the site stays open in a tab among others on the ward computers: a deployment is announced as soon as the tab
    // comes back to the foreground, without waiting for the next interval
    document.addEventListener('visibilitychange', this.checkOnTabReturn);
    this.checkAppUpdate();
  }

  stop() {
    if (this.checkForUpdateIntervalId) {
      Verbose.log('clearing previous check for update interval with handle id=' + this.checkForUpdateIntervalId);
      window.clearInterval(this.checkForUpdateIntervalId);
      this.checkForUpdateIntervalId = null;
    }
    document.removeEventListener('visibilitychange', this.checkOnTabReturn);
  }

  private checkAppUpdate() {
    // Chrome shows no confirm() called from a background tab, it returns false at once: a hidden tab checks when it
    // comes back to the foreground
    if (document.visibilityState !== 'visible' || this.checkingForUpdate || this.userAlreadyNotified()) {
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
      // hidden while version.json was loading: the tab asks when it comes back to the foreground
      if (document.visibilityState !== 'visible') {
        return;
      }
      if (confirm('Une nouvelle version du site a été publiée, il est nécessaire de rafraîchir la page. Voulez-vous rafraîchir maintenant ?')) {
        location.reload();
      } else {
        window.setTimeout(() => {
          // a dialog closed by switching tabs was not answered: it does not put the reminders to sleep
          if (document.visibilityState === 'visible') {
            this.lastWarningTimestamp = new Date().getTime();
          }
        }, dismissalCheckDelay);
      }
    }
  }
}

interface VersionInfo {
  version: string;
}
