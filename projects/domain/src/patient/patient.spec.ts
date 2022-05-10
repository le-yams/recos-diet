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
