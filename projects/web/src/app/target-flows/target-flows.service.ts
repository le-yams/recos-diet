import { Injectable } from '@angular/core';
import {DomainService} from "../domain.service";
import {BehaviorSubject} from "rxjs";
import {TargetFlow, TargetlowsUpdatedEvent, DomainEvents} from "@recos-diet/domain";

@Injectable({
  providedIn: 'root'
})
export class TargetFlowsService {

  private readonly targetFlows = new BehaviorSubject<TargetFlow[]>([])

  readonly targetFlows$ = this.targetFlows.asObservable();

  constructor(domainService: DomainService) {
    this.targetFlows.next(domainService.targetFlows.getTargetFlows());
    DomainEvents.subscribe<TargetlowsUpdatedEvent>(TargetlowsUpdatedEvent.name,
      evt => this.targetFlows.next(evt.targetFlows));
  }
}
