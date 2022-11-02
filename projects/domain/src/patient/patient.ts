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
import {PatientInfoUpdatedEvent} from "./patient.events";

export interface PatientSize {

  readonly heightCm: number;
  readonly weightKg: number

}

export interface PatientInfo {
  readonly heightCm: number;
  readonly weightKg: number
  readonly bmi: number;
  readonly adjustedWeightKg: number
}

const defaultPatientSize = {
  heightCm: 170,
  weightKg: 70
}

export class Patient implements PatientInfo {

  static readonly IDEAL_BMI = 24.9

  heightCm!: number;
  weightKg!: number;
  bmi!: number;
  adjustedWeightKg!: number;

  constructor(private events: DomainEventBus) {
    this.updateSize(defaultPatientSize);
  }

  updateSize(patientSize: Partial<PatientSize>): void {
    this.heightCm = patientSize.heightCm ?? this.heightCm;
    this.weightKg = patientSize.weightKg ?? this.weightKg;
    this.bmi = this.computeBMI();
    this.adjustedWeightKg = this.computeAdjustedWeight();
    this.events.publish(new PatientInfoUpdatedEvent(this));
  }

  private computeBMI(): number {
    const weightKg = this.weightKg;
    const heightCm = this.heightCm;
    const heightM = heightCm / 100;
    return Patient.bmi(weightKg, heightM)
  }

  private computeAdjustedWeight(): number {
    if (this.isOverweight()) {
      return Patient.adjustWeight(this.heightCm, this.weightKg);
    } else {
      return this.weightKg;
    }
  }

  isOverweight(): boolean {
    return this.bmi > Patient.IDEAL_BMI;
  }

  private static bmi(weightKg: number, heightM: number): number {
    return weightKg / (heightM * heightM);
  }

  private static adjustWeight(heightCm: number, weightKg: number): number {
    const idealWeight = Patient.idealWeightForHeight(heightCm);
    return idealWeight + (weightKg - idealWeight) * 0.33;
  }

  private static idealWeightForHeight(heightCm: number): number {
    return 2.2 * Patient.IDEAL_BMI + (3.5 * Patient.IDEAL_BMI * ((heightCm / 100) - 1.5));
  }

}
