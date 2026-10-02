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
import {DomainEventBus} from "../domain.events";
import {PatientInfoUpdatedEvent} from "./patient.events";
import {EventsCaptor, TestDomainEventBus} from '../shared.spec';

describe('Patient', () => {

  let events: DomainEventBus
  let eventsCaptor: EventsCaptor<PatientInfoUpdatedEvent>;
  let patient: Patient;

  beforeEach(() => {
    events = new TestDomainEventBus();
    patient = new Patient(events);
    eventsCaptor = new EventsCaptor(PatientInfoUpdatedEvent.name, events);
  });

  afterEach(() => {
    eventsCaptor.close();
  });

  it('should compute BMI', () => {
    patient.updateSize({
      heightCm: 155,
      weightKg: 96
    });
    expect(patient.bmi).toBeCloseTo(39.95, 0.01);
  });

  it('should compute adjusted weight', () => {
    patient.updateSize({
      heightCm: 155,
      weightKg: 96
    });
    expect(patient.adjustedWeightKg).toBeCloseTo(68.91, 0.01);
  });

  it('should have adjusted weight equals weight when bmi < 25', () => {
    patient.updateSize({
      heightCm: 175,
      weightKg: 76.3
    });
    expect(patient.adjustedWeightKg).toBeCloseTo(76.3, 0.01);
  });

  it('should not be overweight bmi < 25', () => {
    patient.updateSize({
      heightCm: 175,
      weightKg: 76.3
    });
    expect(patient.isOverweight()).toBeFalse();
  });

  it('should emit an event on patient info update', () => {
    patient.updateSize({
      heightCm: 155,
      weightKg: 96
    });
    eventsCaptor.expectEventsCount(1);
    let patientInfo = eventsCaptor.mapSingleEvent(evt => evt.patient);
    expect(patientInfo.heightCm).toBe(155);
    expect(patientInfo.weightKg).toBe(96);
    expect(patientInfo.bmi).toBeCloseTo(39.95, 0.1);
    expect(patientInfo.adjustedWeightKg).toBeCloseTo(68.91, 0.1);
  });

});
