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

import {AfterViewInit, Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {DomainService} from '../../domain.service';
import {faBookMedical} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {BibliographyEntry} from '@recos-diet/domain';
import {Verbose} from '../../../infra/utils';
import {MatCard, MatCardHeader, MatCardTitle, MatCardContent} from '@angular/material/card';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {MatDivider} from '@angular/material/list';

@Component({
  selector: 'app-page-bibliography',
  templateUrl: './page-bibliography.component.html',
  styleUrls: ['./page-bibliography.component.css'],
  imports: [MatCard, MatCardHeader, MatCardTitle, FaIconComponent, MatDivider, MatCardContent]
})
export class PageBibliographyComponent implements AfterViewInit {

  private activatedRoute = inject(ActivatedRoute);

  bibliography;
  faBookMedical = faBookMedical;
  // a signal, so that the OnPush view refreshes when only the index query param changes
  readonly highlightedIndex = toSignal(this.activatedRoute.queryParams.pipe(
    tap(params => Verbose.log('highlighted bibliography index:', params['index'])),
    map(params => parseInt(params['index']))
  ));

  constructor() {
    const domainService = inject(DomainService);

    this.bibliography = domainService.bibliography;
  }

  ngAfterViewInit(): void {
    const highlightedIndex = this.highlightedIndex();
    if (highlightedIndex) {
      document.getElementById('bibliography-' + highlightedIndex)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }

  isHighlighted(entry: BibliographyEntry) {
    return entry.index === this.highlightedIndex();
  }
}
