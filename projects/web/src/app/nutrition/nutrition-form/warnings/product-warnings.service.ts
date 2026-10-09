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
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductWarningsChange, Warning} from '@recos-diet/domain';
import {DomainService} from '../../../domain.service';

@Injectable({
  providedIn: 'root'
})
export class ProductWarningsService {

  private readonly warnings: BehaviorSubject<Warning[]>;

  readonly warnings$: Observable<Warning[]>;

  constructor() {
    const domainService = inject(DomainService);

    this.warnings = new BehaviorSubject<Warning[]>(domainService.warnings.getProductWarnings());
    this.warnings$ = this.warnings.asObservable();

    domainService.EventBus().subscribe(ProductWarningsChange,
      evt => this.warnings.next(evt.warnings));
  }
}
