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

import {Component, inject} from '@angular/core';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import {PathologiesService} from '../pathologies/pathologies.service';
import {Pathology} from '@recos-diet/domain';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-flows-strip',
  templateUrl: './flows-strip.component.html',
  styleUrls: ['./flows-strip.component.css'],
  imports: [FaIconComponent, AsyncPipe]
})
export class FlowsStripComponent {

  private pathologiesService = inject(PathologiesService);

  faAngleDoubleRight = faAngleDoubleRight;

  hasObesity$: Observable<boolean>

  constructor() {
    this.hasObesity$ = this.pathologiesService.selectedPathologies$.pipe(
      map(pathologies => pathologies.includes(Pathology.OBESITE))
    );
  }

}
