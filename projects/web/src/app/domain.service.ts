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

import {Injectable, inject} from '@angular/core';
import {DomainLoaderService} from "../infra/domain-loader.service";
import {DomainEventBus} from "@recos-diet/domain";

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  readonly domain;

  readonly warnings;

  readonly micronutriments;

  readonly bibliography;

  readonly targetFlows;

  readonly nutrition;

  readonly products;

  readonly pathologies;

  readonly patient;

  constructor() {
    const domainLoader = inject(DomainLoaderService);

    const domain = domainLoader.getDomain();
    this.warnings = domain.warnings;
    this.micronutriments = domain.micronutriments;
    this.bibliography = domain.bibliography;
    this.targetFlows = domain.targetFlows;
    this.products = domain.products;
    this.nutrition = domain.nutrition;
    this.pathologies = domain.pathologies;
    this.patient = domain.patient;
    this.domain = domain;
  }

  public EventBus(): DomainEventBus {
    return this.domain.eventBus;
  }

}
