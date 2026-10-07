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

import {Component, Input, OnInit, inject} from '@angular/core';
import {Bibliography, BibliographyEntries, EMPTY_BIBLIOGRAPHY} from '@recos-diet/domain';
import {DomainService} from '../../domain.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-biblio-links',
  templateUrl: './biblio-links.component.html',
  styleUrls: ['./biblio-links.component.css'],
  imports: [RouterLink]
})
export class BiblioLinksComponent implements OnInit {

  private domainService = inject(DomainService);

  @Input() references!: Array<string>;

  bibliography: Bibliography;

  bibliographyEntries: BibliographyEntries = EMPTY_BIBLIOGRAPHY;

  constructor() {
    this.bibliography = this.domainService.bibliography;
  }

  ngOnInit(): void {
    this.bibliographyEntries = this.bibliography.entriesForReferences(...this.references);
  }

}
