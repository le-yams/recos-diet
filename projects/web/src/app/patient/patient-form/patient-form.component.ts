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
import {faUserInjured} from '@fortawesome/free-solid-svg-icons';
import {Patient} from '@recos-diet/domain';
import {DomainService} from "../../domain.service";

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
  standalone: false
})
export class PatientFormComponent {

  patient;

  faUserInjured = faUserInjured;

  readonly heightBounds = Patient.HEIGHT_CM;
  readonly weightBounds = Patient.WEIGHT_KG;

  constructor(private domainService: DomainService) {
    this.patient = this.domainService.patient;
  }

  updateHeight(event: Event) {
    this.patient.updateSize({
      heightCm: PatientFormComponent.intValueFromInput(event)
    })
  }

  updateWeight(event: Event): void {
    this.patient.updateSize({
      weightKg: PatientFormComponent.numberValueFromInput(event)
    })
  }

  shouldDisplayAdjustedWeight(): boolean {
    return this.patient.isOverweight() &&
      this.round(this.patient.adjustedWeightKg, 1) <
      this.round(this.patient.weightKg, 1)
  }

  private static intValueFromInput(event: Event): number {
    const target = event.target as HTMLInputElement;
    return parseInt(target.value)
  }

  private static numberValueFromInput(event: Event): number {
    const target = event.target as HTMLInputElement;
    return parseFloat(target.value);
  }

  private round(value: number, precision: number): number {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
}
