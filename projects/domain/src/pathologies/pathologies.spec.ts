/*
 * Copyright (c) 2026. Yann D'Isanto
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

import {Pathologies} from './pathologies';
import {Pathology} from './pathologies.data';
import {SelectedPathologiesEvent} from './pathologies.event';
import {PatientInfoUpdatedEvent} from '../patient/patient.events';
import {DomainEventBus} from '../domain.events';
import {EventsCaptor} from '../shared.spec';
import {InMemoryDomainEventBus} from '../in-memory-domain-event-bus';

function patientInfoUpdatedEvent(bmi: number): PatientInfoUpdatedEvent {
  return new PatientInfoUpdatedEvent({heightCm: 170, weightKg: 70, bmi: bmi, adjustedWeightKg: 70});
}

describe('Pathologies', () => {

  let events: DomainEventBus;
  let eventsCaptor: EventsCaptor<SelectedPathologiesEvent>;
  let pathologies: Pathologies;

  beforeEach(() => {
    events = new InMemoryDomainEventBus();
    pathologies = new Pathologies(events);
  });

  afterEach(() => {
    eventsCaptor.close();
  });

  function givenSelectedPathologies(selectedPathologies: Pathology[]) {
    pathologies.selectPathologies(selectedPathologies);
    eventsCaptor = new EventsCaptor(SelectedPathologiesEvent, events);
  }

  it('should select obesity when bmi reaches 30', () => {
    givenSelectedPathologies([Pathology.CIRRHOTIQUE]);

    events.publish(patientInfoUpdatedEvent(30));

    eventsCaptor.expectEventsCount(1);
    expect(eventsCaptor.mapSingleEvent(evt => evt.pathologies)).toEqual([Pathology.CIRRHOTIQUE, Pathology.OBESITE]);
  });

  it('should replace anorexia with obesity in a single event', () => {
    givenSelectedPathologies([Pathology.ANOREXIE_MENTALE, Pathology.CVVHDF]);

    events.publish(patientInfoUpdatedEvent(34.6));

    eventsCaptor.expectEventsCount(1);
    expect(eventsCaptor.mapSingleEvent(evt => evt.pathologies)).toEqual([Pathology.CVVHDF, Pathology.OBESITE]);
    expect(pathologies.selectedPathologies).toEqual([Pathology.CVVHDF, Pathology.OBESITE]);
  });

  it('should unselect obesity when bmi falls below 30', () => {
    givenSelectedPathologies([Pathology.CVVHDF, Pathology.OBESITE]);

    events.publish(patientInfoUpdatedEvent(29.9));

    eventsCaptor.expectEventsCount(1);
    expect(eventsCaptor.mapSingleEvent(evt => evt.pathologies)).toEqual([Pathology.CVVHDF]);
  });

  it('should not publish when obesity stays selected', () => {
    givenSelectedPathologies([Pathology.OBESITE]);

    events.publish(patientInfoUpdatedEvent(35));

    eventsCaptor.expectEventsCount(0);
  });

  it('should not publish when bmi stays below 30', () => {
    givenSelectedPathologies([Pathology.CVVHDF]);

    events.publish(patientInfoUpdatedEvent(24));

    eventsCaptor.expectEventsCount(0);
  });

  it('should not publish when adding a selected pathology', () => {
    givenSelectedPathologies([Pathology.CVVHDF]);

    pathologies.addPathologyToSelection(Pathology.CVVHDF);

    eventsCaptor.expectEventsCount(0);
  });

  it('should not publish when removing an unselected pathology', () => {
    givenSelectedPathologies([Pathology.CVVHDF]);

    pathologies.removePathologyFromSelection(Pathology.ANOREXIE_MENTALE);

    eventsCaptor.expectEventsCount(0);
  });

});
