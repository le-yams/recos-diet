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

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DomainService} from "../../domain.service";
import {faBookMedical} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from "@angular/router";
import {BibliographyEntry} from '@recos-diet/domain';
import {Verbose} from "../../../infra/utils";

@Component({
  selector: 'app-page-bibliography',
  templateUrl: './page-bibliography.component.html',
  styleUrls: ['./page-bibliography.component.css']
})
export class PageBibliographyComponent implements OnInit, AfterViewInit {

  bibliography;
  faBookMedical = faBookMedical;
  highlightedIndex?: number = undefined;

  constructor(private activatedRoute: ActivatedRoute, domainService: DomainService) {
    this.bibliography = domainService.bibliography;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const index: string = params['index'];
      this.highlightedIndex = parseInt(index);
      Verbose.log('highlighted bibliography index:', index);
    });
  }

  ngAfterViewInit(): void {
    if (this.highlightedIndex) {
      document.getElementById('bibliography-' + this.highlightedIndex)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  }

  isHighlighted(entry: BibliographyEntry) {
    return entry.index === this.highlightedIndex;
  }
}
