import {Component} from '@angular/core';
import {faUserInjured} from '@fortawesome/free-solid-svg-icons';
import {DomainService} from "../../domain.service";

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent {

  patient;

  faUserInjured = faUserInjured;

  constructor(private domainService: DomainService) {
    this.patient = this.domainService.patient;
  }

  updateHeight(event: Event) {
    this.patient.updateSize({
      heightCm: PatientFormComponent.intValueFromInput(event)
    })
  }

  updateWeight(event: Event): void {
    this.patient.updateSize({
      weightKg: PatientFormComponent.numberValueFromInput(event)
    })
  }

  private static intValueFromInput(event: Event): number {
    let target = event.target as HTMLInputElement;
    return parseInt(target.value)
  }

  private static numberValueFromInput(event: Event): number {
    let target = event.target as HTMLInputElement;
    return parseFloat(target.value);
  }
}
