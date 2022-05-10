import { Component} from '@angular/core';
import {faStickyNote} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-denutrition',
  templateUrl: './page-denutrition.component.html',
  styleUrls: ['./page-denutrition.component.css']
})
export class PageDenutritionComponent {

  faStickyNote = faStickyNote;

  patientIsOld = false;

  constructor() { }

}
