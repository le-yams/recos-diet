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
import {DomainEvent, DomainEvents} from "../domain.events";
import {PatientInfoUpdatedEvent} from "./patient.events";
import {EventsCaptor} from '../shared.spec';

describe('Patient', () => {

  let patient: Patient;
  let eventsCaptor: EventsCaptor<PatientInfoUpdatedEvent>;

  beforeEach(() => {
    patient = new Patient();
    eventsCaptor = new EventsCaptor(PatientInfoUpdatedEvent.name);
  });

  afterEach(() => {
    eventsCaptor.close();
  });

  it('should compute BMI', () => {
    patient.updateSize({
      heightCm: 182,
      weightKg: 86
    });
    expect(patient.bmi).toBeCloseTo(26, 0.1);
  });

  it('should compute adjusted weight', () => {
    patient.updateSize({
      heightCm: 182,
      weightKg: 86
    });
    expect(patient.adjustedWeightKg).toBeCloseTo(83.8, 0.1);
  });

  it('should emit an event on patient info update', () => {
    const raisedEvents: DomainEvent[] = [];
    DomainEvents.subscribe(PatientInfoUpdatedEvent.name, value => raisedEvents.push(value));
    patient.updateSize({
      heightCm: 182,
      weightKg: 86
    });
    eventsCaptor.expectEventsCount(1);
    let patientInfo = eventsCaptor.mapSingleEvent(evt => evt.patient);
    expect(patientInfo.heightCm).toBe(182);
    expect(patientInfo.weightKg).toBe(86);
    expect(patientInfo.bmi).toBeCloseTo(26, 0.1);
    expect(patientInfo.adjustedWeightKg).toBeCloseTo(83.8, 0.1);
  });

});
