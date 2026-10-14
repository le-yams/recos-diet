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

  static readonly OBESITY_BMI = 30

  selectedPathologies: Pathology[] = [];

  constructor(private events: DomainEventBus) {
    this.events.subscribe(PatientInfoUpdatedEvent,
      evt => this.updateObesityPathologySelection(evt.patient));
  }

  selectPathologies(pathologies: Pathology[]) {
    this.selectedPathologies = pathologies;
    this.events.publish(new SelectedPathologiesEvent(pathologies));
  }

  /**
   * Publishes a single event: an intermediate selection holding both anorexia and obesity matches no product.
   */
  private updateObesityPathologySelection(patient: PatientInfo) {
    const pathologies = Pathologies.hasObesity(patient) ?
      this.selectionWithObesity() :
      this.selectedPathologies.filter(pathology => pathology !== Pathology.OBESITE);
    if (Pathologies.differ(pathologies, this.selectedPathologies)) {
      this.selectPathologies(pathologies);
    }
  }

  private selectionWithObesity(): Pathology[] {
    const pathologiesWithoutAnorexia = this.selectedPathologies.filter(pathology => pathology !== Pathology.ANOREXIE_MENTALE);
    return this.isPathologySelected(Pathology.OBESITE) ?
      pathologiesWithoutAnorexia :
      [...pathologiesWithoutAnorexia, Pathology.OBESITE];
  }

  private static hasObesity(patient: PatientInfo):boolean {
    return patient.bmi >= Pathologies.OBESITY_BMI;
  }

  private static differ(pathologies: Pathology[], otherPathologies: Pathology[]): boolean {
    return pathologies.length !== otherPathologies.length ||
      pathologies.some((pathology, index) => pathology !== otherPathologies[index]);
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
