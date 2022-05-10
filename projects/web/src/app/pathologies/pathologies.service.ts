import { Injectable } from '@angular/core';
import {DomainEvents, Pathology, SelectedPathologiesEvent} from "@recos-diet/domain";
import {BehaviorSubject} from "rxjs";
import {DomainService} from "../domain.service";

@Injectable({
  providedIn: 'root'
})
export class PathologiesService {

  private readonly pathologies;

  private readonly selectedPathologies = new BehaviorSubject<Pathology[]>([]);
  readonly selectedPathologies$ = this.selectedPathologies.asObservable();

  constructor(private domainService: DomainService) {
    this.pathologies = domainService.pathologies;
    DomainEvents.subscribe<SelectedPathologiesEvent>(SelectedPathologiesEvent.name,
      evt => this.selectedPathologies.next(evt.pathologies));
  }

  selectPathology(pathology: Pathology) {
    this.pathologies.addPathologyToSelection(pathology);
  }

  unselectPathology(pathology: Pathology) {
    this.pathologies.removePathologyFromSelection(pathology);
  }

}
