import {Component} from '@angular/core';
import {faStickyNote} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-sri',
  templateUrl: './page-sri.component.html',
  styleUrls: ['./page-sri.component.css']
})
export class PageSriComponent {

  faStickyNote = faStickyNote;

  constructor() {
  }

}
