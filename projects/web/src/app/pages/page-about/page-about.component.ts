import {Component} from '@angular/core';
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.css']
})
export class PageAboutComponent {

  faQuestionCircle = faQuestionCircle;

  constructor() {
  }

}
