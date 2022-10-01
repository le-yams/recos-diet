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

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DomainService} from "../../domain.service";
import {
  DomainEvents,
  NutritionistOpinionRequirementLevelChange,
  Warning,
  WarningLevel,
  WarningsChange
} from '@recos-diet/domain';

@Injectable({
  providedIn: 'root'
})
export class WarningsService {

  private readonly nutritionistOpinionRequirementLevel: BehaviorSubject<WarningLevel>;

  readonly nutritionistOpinionRequirementLevel$: Observable<WarningLevel>;

  private readonly warnings: BehaviorSubject<Warning[]>;

  readonly warnings$: Observable<Warning[]>;

  constructor(domainService: DomainService) {
    this.nutritionistOpinionRequirementLevel = new BehaviorSubject<WarningLevel>(domainService.warnings.getNutritionistOpinionRequirementLevel());
    this.nutritionistOpinionRequirementLevel$ = this.nutritionistOpinionRequirementLevel.asObservable();
    this.warnings = new BehaviorSubject<Warning[]>(domainService.warnings.getWarnings());
    this.warnings$ = this.warnings.asObservable();

    DomainEvents.subscribe<NutritionistOpinionRequirementLevelChange>(NutritionistOpinionRequirementLevelChange.name,
      evt => this.nutritionistOpinionRequirementLevel.next(evt.nutritionistOpinionRequirementLevel));
    DomainEvents.subscribe<WarningsChange>(WarningsChange.name,
      evt => this.warnings.next(evt.warnings));
  }
}
