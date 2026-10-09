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

import {DomainEventBus} from '../domain.events';
import {PatientInfo} from '../patient/patient';
import {SelectedPathologiesEvent} from './pathologies.event';
import {PatientInfoUpdatedEvent} from '../patient/patient.events';
import {Pathology} from './pathologies.data';

export class Pathologies {

  selectedPathologies: Pathology[] = [];

  constructor(private events: DomainEventBus) {
    this.events.subscribe(PatientInfoUpdatedEvent,
      evt => this.updateObesityPathologySelection(evt.patient));
  }

  selectPathologies(pathologies: Pathology[]) {
    this.selectedPathologies = pathologies;
    this.events.publish(new SelectedPathologiesEvent(pathologies));
  }

  private updateObesityPathologySelection(patient: PatientInfo) {
    if (Pathologies.hasObesity(patient)) {
      this.addPathologyToSelection(Pathology.OBESITE);
      this.removePathologyFromSelection(Pathology.ANOREXIE_MENTALE);
    } else {
      this.removePathologyFromSelection(Pathology.OBESITE);
    }
  }

  private static hasObesity(patient: PatientInfo):boolean {
    return patient.bmi >= 30;
  }

  addPathologyToSelection(pathology: Pathology) {
    if(!this.isPathologySelected(pathology)) {
      const pathologiesWithObesity = [...this.selectedPathologies, pathology];
      this.selectPathologies(pathologiesWithObesity);
    }
  }

  removePathologyFromSelection(pathology: Pathology) {
    if(this.isPathologySelected(pathology)) {
      const pathologies = this.selectedPathologies.filter(p => p !== pathology);
      this.selectPathologies(pathologies);
    }

  }

  private isPathologySelected(pathology: Pathology) {
    return this.selectedPathologies.includes(pathology);
  }

}
