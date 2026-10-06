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

import {Component, ChangeDetectionStrategy} from '@angular/core';
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {MatCard, MatCardHeader, MatCardTitle, MatCardContent} from '@angular/material/card';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {MatDivider} from '@angular/material/list';

@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatCard, MatCardHeader, MatCardTitle, FaIconComponent, MatDivider, MatCardContent]
})
export class PageAboutComponent {

  faQuestionCircle = faQuestionCircle;

}
