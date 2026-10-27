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

import {Patient} from './patient';
import {DomainEventBus} from '../domain.events';
import {PatientInfoUpdatedEvent} from './patient.events';
import {EventsCaptor} from '../shared.spec';
import {InMemoryDomainEventBus} from '../in-memory-domain-event-bus';

describe('Patient', () => {

  let events: DomainEventBus
  let eventsCaptor: EventsCaptor<PatientInfoUpdatedEvent>;
  let patient: Patient;

  beforeEach(() => {
    events = new InMemoryDomainEventBus();
    patient = new Patient(events);
    eventsCaptor = new EventsCaptor(PatientInfoUpdatedEvent, events);
  });

  afterEach(() => {
    eventsCaptor.close();
  });

  it('should compute BMI', () => {
    patient.updateSize({
      heightCm: 155,
      weightKg: 96
    });
    expect(patient.bmi).toBeCloseTo(39.96, 2);
  });

  it('should compute adjusted weight', () => {
    patient.updateSize({
      heightCm: 155,
      weightKg: 96
    });
    expect(patient.adjustedWeightKg).toBeCloseTo(69.05, 2);
  });

  it('should compute adjusted weight when 25 < bmi < 30', () => {
    patient.updateSize({
      heightCm: 182,
      weightKg: 86
    });
    expect(patient.isOverweight()).toBe(true);
    expect(patient.adjustedWeightKg).toBeCloseTo(83.61, 2);
  });

  it('should have adjusted weight equals weight when bmi < 25', () => {
    patient.updateSize({
      heightCm: 175,
      weightKg: 76.3
    });
    expect(patient.adjustedWeightKg).toBeCloseTo(76.3, 2);
  });

  it('should not be overweight bmi < 25', () => {
    patient.updateSize({
      heightCm: 175,
      weightKg: 76.3
    });
    expect(patient.isOverweight()).toBe(false);
  });

  it('should not be overweight when bmi = 25', () => {
    patient.updateSize({
      heightCm: 200,
      weightKg: 100
    });
    expect(patient.bmi).toBe(Patient.IDEAL_BMI);
    expect(patient.isOverweight()).toBe(false);
    expect(patient.adjustedWeightKg).toBe(100);
  });

  it('should compute adjusted weight as soon as bmi > 25', () => {
    patient.updateSize({
      heightCm: 200,
      weightKg: 100.4
    });
    expect(patient.isOverweight()).toBe(true);
    expect(patient.adjustedWeightKg).toBeCloseTo(100.1, 2);
  });

  it('should compute adjusted weight when bmi = 30', () => {
    patient.updateSize({
      heightCm: 200,
      weightKg: 120
    });
    expect(patient.bmi).toBe(30);
    expect(patient.isOverweight()).toBe(true);
    expect(patient.adjustedWeightKg).toBeCloseTo(105, 2);
  });

  [
    {heightCm: 160, weightKg: 100, adjustedWeightKg: 73},
    {heightCm: 180, weightKg: 120, adjustedWeightKg: 90.75},
  ].forEach(param => {
    it(`should compute adjusted weight for ${param.heightCm} cm and ${param.weightKg} kg`, () => {
      patient.updateSize({
        heightCm: param.heightCm,
        weightKg: param.weightKg
      });
      expect(patient.adjustedWeightKg).toBeCloseTo(param.adjustedWeightKg, 2);
    });
  });

  it('should emit an event on patient info update', () => {
    patient.updateSize({
      heightCm: 155,
      weightKg: 96
    });
    eventsCaptor.expectEventsCount(1);
    const patientInfo = eventsCaptor.mapSingleEvent(evt => evt.patient);
    expect(patientInfo.heightCm).toBe(155);
    expect(patientInfo.weightKg).toBe(96);
    expect(patientInfo.bmi).toBeCloseTo(39.96, 2);
    expect(patientInfo.adjustedWeightKg).toBeCloseTo(69.05, 2);
  });

  describe('invalid size', () => {
    const invalidSizes = [
      {name: 'NaN height', size: {heightCm: NaN}},
      {name: 'NaN weight', size: {weightKg: NaN}},
      {name: 'Infinity weight', size: {weightKg: Infinity}},
      {name: 'zero height', size: {heightCm: 0}},
      {name: 'negative weight', size: {weightKg: -70}},
      {name: 'height below min', size: {heightCm: 17}},
      {name: 'height above max', size: {heightCm: 1700}},
      {name: 'weight below min', size: {weightKg: 0.5}},
      {name: 'weight above max', size: {weightKg: 701}},
      {name: 'valid height with invalid weight', size: {heightCm: 180, weightKg: NaN}},
    ];

    invalidSizes.forEach(param => {
      it(`should ignore ${param.name}`, () => {
        const before = {height: patient.heightCm, weight: patient.weightKg, bmi: patient.bmi};
        eventsCaptor.expectEventsCount(0);
        expect(patient.updateSize(param.size)).toBe(false);
        expect(patient.heightCm).toBe(before.height);
        expect(patient.weightKg).toBe(before.weight);
        expect(patient.bmi).toBe(before.bmi);
        eventsCaptor.expectEventsCount(0);
      });
    });

    it('should accept bounds', () => {
      expect(patient.updateSize({
        heightCm: Patient.HEIGHT_CM.min,
        weightKg: Patient.WEIGHT_KG.max
      })).toBe(true);
      eventsCaptor.expectEventsCount(1);
    });

    it('should update a single field', () => {
      expect(patient.updateSize({weightKg: 80})).toBe(true);
      expect(patient.weightKg).toBe(80);
      expect(patient.heightCm).toBe(170);
    });
  });

});
