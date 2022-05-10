import {Component} from '@angular/core';
import {faLongArrowAltRight, faStickyNote} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-phosphorus',
  templateUrl: './page-phosphorus.component.html',
  styleUrls: ['./page-phosphorus.component.css']
})
export class PagePhosphorusComponent {

  faStickyNote = faStickyNote;
  faLongArrowAltRight = faLongArrowAltRight;
  displayedColumns: string[] = ['phosphoremy', 'supplements'];
  dataSource: PhosphorusRecommendation[];

  constructor() {
    this.dataSource = [
      {
        phosphoremy: "0,8 - 0,66 mmol/L",
        supplements: [
          "PO: 0,33 mmol/kg/24h",
          "IV: 0,16 mmol/kg/24h"
        ]
      },
      {
        phosphoremy: "0,66 - 0,33 mmol/L",
        supplements: [
          "IV: 0,33 mmol/kg/24h"
        ]
      },
      {
        phosphoremy: "0,33 mmol/L et/ou signes cliniques de SRI",
        supplements: [
          "IV: 0,66 mmol/kg/24h"
        ]
      }
    ]
  }

}

interface PhosphorusRecommendation {
  phosphoremy: string
  supplements: string[]
}
