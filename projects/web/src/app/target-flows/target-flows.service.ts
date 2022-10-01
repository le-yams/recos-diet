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
