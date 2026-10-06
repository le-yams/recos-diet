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

import {Component, OnInit, SecurityContext} from '@angular/core';
import {NoSurvey, Survey, SurveyService} from "../../survey/survey.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-page-survey',
  templateUrl: './page-survey.component.html',
  styleUrls: ['./page-survey.component.css'],
  standalone: false
})
export class PageSurveyComponent implements OnInit {

  noSurvey = NoSurvey;
  survey$: Promise<Survey> = Promise.resolve(NoSurvey);
  readonly resourceUrlSecurityContext = SecurityContext.RESOURCE_URL

  constructor(private survey: SurveyService, public domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.survey$ = this.survey.get();
  }

}
