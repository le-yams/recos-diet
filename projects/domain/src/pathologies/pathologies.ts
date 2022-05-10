import {DomainEvents} from '../domain.events';
import {PatientInfo} from "../patient/patient";
import {SelectedPathologiesEvent} from "./pathologies.event";
import {PatientInfoUpdatedEvent} from "../patient/patient.events";
import {Pathology} from "./pathologies.data";

export class Pathologies {

  selectedPathologies: Pathology[] = [];

  constructor() {
    DomainEvents.subscribe<PatientInfoUpdatedEvent>(PatientInfoUpdatedEvent.name,
      evt => this.updateObesityPathologySelection(evt.patient));
  }

  selectPathologies(pathologies: Pathology[]) {
    this.selectedPathologies = pathologies;
    DomainEvents.publish(new SelectedPathologiesEvent(pathologies));
  }

  private updateObesityPathologySelection(patient: PatientInfo) {
    if (Pathologies.hasObesity(patient)) {
      this.addPathologyToSelection(Pathology.OBESITE);
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
