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
import {faBullseye, faPills} from '@fortawesome/free-solid-svg-icons';
import {PatientFormComponent} from '../../patient/patient-form/patient-form.component';
import {NutritionFormComponent} from '../../nutrition/nutrition-form/nutrition-form.component';
import {PathologiesComponent} from '../../pathologies/pathologies/pathologies.component';
import {MatCard, MatCardHeader, MatCardTitle, MatCardContent} from '@angular/material/card';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {MatDivider} from '@angular/material/list';
import {FlowsStripComponent} from '../../flows-strip/flows-strip.component';
import {TargetFlowsComponent} from '../../target-flows/target-flows.component';
import {MicronutrimentsComponent} from '../../micronutriments/micronutriments.component';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PatientFormComponent,
    NutritionFormComponent,
    PathologiesComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    FaIconComponent,
    MatDivider,
    MatCardContent,
    FlowsStripComponent,
    TargetFlowsComponent,
    MicronutrimentsComponent
  ]
})
export class PageHomeComponent {

  faBullseye = faBullseye;
  faPills = faPills;

}
