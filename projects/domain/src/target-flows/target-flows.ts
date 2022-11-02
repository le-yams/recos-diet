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

import {DomainEventBus} from "../domain.events";
import {PatientInfo} from "../patient/patient";
import {PatientInfoUpdatedEvent} from "../patient/patient.events";
import {SelectedPathologiesEvent} from "../pathologies/pathologies.event";
import {TargetlowsUpdatedEvent} from "./target-flows.events";
import {Pathology} from "../pathologies/pathologies.data";
import {NutritionInfo} from "../nutrition/products";
import {SelectedProductNutritionInfoEvent} from "../nutrition/products.events";

export interface Target {

  value: number;

  isRelevant(context: PathologyContext): boolean;

}

const target10 = {
  value: 10,
  isRelevant(context: PathologyContext): boolean {
    return context.patientHasOnePathologyOf(
      Pathology.ANOREXIE_MENTALE, Pathology.DENUTRITION_SRI, Pathology.COVID_19
    );
  }
}

const target15 = {
  value: 15,
  isRelevant(context: PathologyContext): boolean {
    return context.patientHasNotPathology(Pathology.ANOREXIE_MENTALE) &&
      context.patientHasOnePathologyOf(Pathology.DENUTRITION_SRI, Pathology.COVID_19);
  }
}

const target20 = {
  value: 20,
  isRelevant(context: PathologyContext): boolean {
    return context.patientHasNotPathology(Pathology.ANOREXIE_MENTALE);
  }
}

const target25 = {
  value: 25,
  isRelevant(context: PathologyContext): boolean {
    return context.patientHasNotPathology(Pathology.ANOREXIE_MENTALE);
  }
}

const target30 = {
  value: 30,
  isRelevant(context: PathologyContext): boolean {
    return context.patientHasNotPathology(Pathology.ANOREXIE_MENTALE)
      && context.patientHasNotPathology(Pathology.OBESITE);
  }
}

export interface TargetFlow {
  targetCal: number
  dayEnergyKcal: number
  dayProteinsG: number
  proteinsForWeightGPerKg: number
  hourFlowML: number
}

export class PathologyContext {

  constructor(private selectedPathologies: Pathology[]) {
  }

  patientHasOnePathologyOf(...pathologies: Pathology[]): boolean {
    return this.selectedPathologies.some(pathology => pathologies.includes(pathology));
  }

  patientHasNotPathology(pathology: Pathology) {
    return !this.patientHasPathology(pathology);
  }

  patientHasPathology(pathology: Pathology) {
    return this.selectedPathologies.includes(pathology);
  }

}

export class TargetFlows {

  private readonly targets: Target[] = [target10, target15, target20, target25, target30];
  private patient?: PatientInfo;
  private selectedPoductNutritionInfo?: NutritionInfo;
  private selectedPathologies: Pathology[] = [];
  private targetFlows: TargetFlow[] = [];

  constructor(private events: DomainEventBus) {
    this.events.subscribe<PatientInfoUpdatedEvent>(PatientInfoUpdatedEvent.name, evt => this.patientInfoUpdated(evt.patient));
    this.events.subscribe<SelectedProductNutritionInfoEvent>(SelectedProductNutritionInfoEvent.name, evt => this.nutritionInfoUpdated(evt.selectedProductProductNutritionInfo));
    this.events.subscribe<SelectedPathologiesEvent>(SelectedPathologiesEvent.name, evt => this.selectedPathologiesUpdated(evt.pathologies));
  }

  getTargetFlows() {
    return this.targetFlows;
  }

  private patientInfoUpdated(patient: PatientInfo) {
    this.patient = patient;
    this.updateTargets();
  }

  private nutritionInfoUpdated(selectedProductProductNutritionInfo: NutritionInfo) {
    this.selectedPoductNutritionInfo = selectedProductProductNutritionInfo;
    this.updateTargets();
  }

  private selectedPathologiesUpdated(pathologies: Pathology[]) {
    this.selectedPathologies = pathologies;
    this.updateTargets();
  }

  private updateTargets() {
    if (this.patient && this.selectedPoductNutritionInfo) {
      const context = new PathologyContext(this.selectedPathologies);
      const targetFlows = this.targets
        .filter(target => target.isRelevant(context))
        .map(target => this.computeTargetFlow(target.value));
      this.targetFlows = targetFlows;
      this.events.publish(new TargetlowsUpdatedEvent(targetFlows))
    }
  }

  private computeTargetFlow(target: number): TargetFlow {
    const patient = this.patient!;
    const nutrition = this.selectedPoductNutritionInfo!;
    const dayFlowLiter = patient.adjustedWeightKg * target / nutrition.kcalPerLiter;
    const hourFlowML = dayFlowLiter * 1000 / 24;
    const dayEnergy = nutrition.kcalPerLiter * dayFlowLiter;
    const dayProteins = nutrition.proteinsGramsPerLiter * dayFlowLiter;
    const proteinsForWeight = dayProteins / patient.adjustedWeightKg;
    return {
      targetCal: target,
      dayEnergyKcal: dayEnergy,
      dayProteinsG: dayProteins,
      hourFlowML: hourFlowML,
      proteinsForWeightGPerKg: proteinsForWeight
    }
  }

}
