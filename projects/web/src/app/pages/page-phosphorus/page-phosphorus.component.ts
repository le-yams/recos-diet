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

import {Component, ChangeDetectionStrategy} from '@angular/core';
import {faLongArrowAltRight, faStickyNote} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-phosphorus',
  templateUrl: './page-phosphorus.component.html',
  styleUrls: ['./page-phosphorus.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
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
