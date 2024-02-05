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

import {Component} from '@angular/core';
import {faDisease, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {Pathology} from "@recos-diet/domain";
import {Observable} from "rxjs";
import {PathologiesService} from "../pathologies.service";
import {map} from "rxjs/operators";
import {WarningsService} from "../warnings/warnings.service";

@Component({
  selector: 'app-pathologies',
  templateUrl: './pathologies.component.html',
  styleUrls: ['./pathologies.component.css']
})
export class PathologiesComponent {

  faDisease = faDisease;
  faExclamationCircle = faExclamationCircle;

  allPathologies: Pathology[];
  selectedPathologies$: Observable<Pathology[]>;
  patientHasObesity$: Observable<boolean>;

  readonly hasWarnings$: Observable<boolean>;

  constructor(private pathologyService: PathologiesService, warningsService: WarningsService) {
    this.selectedPathologies$ = this.pathologyService.selectedPathologies$;
    this.patientHasObesity$ = this.selectedPathologies$.pipe(map(selectedPathologies => selectedPathologies.includes(Pathology.OBESITE)));
    this.hasWarnings$ = warningsService.warnings$.pipe(
      map(warnings => warnings.length > 0)
    );
    this.allPathologies = Object.values(Pathology);
  }

  isPathologyDisabled(pathology: Pathology): Observable<boolean> {
    return this.selectedPathologies$.pipe(
      map(selectedPathologies =>
        pathology === Pathology.OBESITE ||
        (pathology === Pathology.ANOREXIE_MENTALE && selectedPathologies.includes(Pathology.OBESITE))
      )
    );
  }
  isObesity(pathology: Pathology) {
    return pathology === Pathology.OBESITE
  }

  isAnorexia(pathology: Pathology) {
    return pathology === Pathology.ANOREXIE_MENTALE
  }

  isSelected(pathology: Pathology): Observable<boolean> {
    return this.selectedPathologies$.pipe(
      map(pathologies => pathologies.includes(pathology))
    )
  }

  pathologySelectionChange(pathology: Pathology, selected: boolean) {
    if (selected) {
      this.pathologyService.selectPathology(pathology);
    } else {
      this.pathologyService.unselectPathology(pathology);
    }
  }
}
