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
import {TargetFlowsService} from './target-flows.service';
import {Observable} from 'rxjs';
import {DailyTargetFlow} from '@recos-diet/domain';

@Component({
  selector: 'app-target-flows',
  templateUrl: './target-flows.component.html',
  styleUrls: ['./target-flows.component.css'],
  standalone: false
})
export class TargetFlowsComponent {

  readonly targetFlows$: Observable<DailyTargetFlow[]>;

  readonly reg = /[.,]0+$/;

  constructor(targetFlowsService: TargetFlowsService) {
    this.targetFlows$ = targetFlowsService.targetFlows$;
  }

}
