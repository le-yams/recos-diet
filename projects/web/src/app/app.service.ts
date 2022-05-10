import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AppUpdater} from './app.updater';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  version: string = environment.appVersion;

  public readonly isHandset$: Observable<boolean>;

  constructor(breakpointObserver: BreakpointObserver, http: HttpClient) {
    this.isHandset$ = breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
    if (environment.production) {
      new AppUpdater(this, http).start();
    }
  }

  getAppInfo() {
    return {
      version: this.version
    };
  }

}
