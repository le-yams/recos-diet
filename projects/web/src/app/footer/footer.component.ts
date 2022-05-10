import {Component} from '@angular/core';
import {faBalanceScale} from '@fortawesome/free-solid-svg-icons';
import {AppService} from "../app.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  faBalanceScale = faBalanceScale;

  appVersion;

  constructor(appService: AppService) {
    this.appVersion = appService.getAppInfo().version;
  }

}
