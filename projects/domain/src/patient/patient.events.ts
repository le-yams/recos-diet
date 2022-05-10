import {DomainEvent} from '../domain.events';
import {PatientInfo} from "./patient";

export class PatientInfoUpdatedEvent implements DomainEvent {
  readonly name = PatientInfoUpdatedEvent.name;

  constructor(public readonly patient: PatientInfo) {
  }
}
