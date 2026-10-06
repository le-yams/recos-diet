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

import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {firstValueFrom, Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {
  faBookMedical,
  faPrescriptionBottle,
  faQuestionCircle,
  faStickyNote,
  faVials,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {AppService} from './app.service';
import {NoSurvey, Survey, SurveyService} from "./survey/survey.service";
import {DisclaimerComponent} from './disclaimer/disclaimer.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatNavList, MatListItem} from '@angular/material/list';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {FooterComponent} from './footer/footer.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    DisclaimerComponent,
    MatButton,
    MatIcon,
    MatSidenavContainer,
    MatSidenav,
    MatIconButton,
    MatNavList,
    MatListItem,
    RouterLink,
    FaIconComponent,
    MatSidenavContent,
    RouterOutlet,
    FooterComponent,
    AsyncPipe
  ]
})


export class AppComponent {

  private router = inject(Router);

  survey$: Promise<Survey>;
  noSurvey = NoSurvey;

  readonly isHandset$: Observable<boolean>;
  selectedMenuLabel: string;
  currentRoute?: string;

  menus: Menu[] = [
    {
      label: 'Débits cibles et Micronutriments',
      route: '/',
      icon: faPrescriptionBottle
    },
    {
      label: 'Supplémentation en phosphore',
      route: '/phosphorus',
      icon: faStickyNote
    },
    {
      label: 'SRI',
      route: '/sri',
      icon: faStickyNote
    },
    {
      label: 'Dénutrition',
      route: '/denutrition',
      icon: faStickyNote
    },
    {
      label: 'Bibliographie',
      route: '/bibliography',
      icon: faBookMedical
    },
    {
      label: 'Produits',
      route: '/products',
      icon: faVials
    },
    {
      label: 'À propos',
      route: '/about',
      icon: faQuestionCircle
    }
  ];


  constructor() {
    const appService = inject(AppService);
    const survey = inject(SurveyService);

    this.isHandset$ = appService.isHandset$;
    this.selectedMenuLabel = this.findSelectedMenuLabel();
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.router.url.split('?')[0];
        this.selectedMenuLabel = this.findSelectedMenuLabel();
      });
    this.survey$ = survey.get();
  }

  findSelectedMenuLabel() {
    return this.menus.find(menu => this.isSelected(menu))?.label ?? "";
  }

  async closeDrawerIfHandset(drawer: MatSidenav) {
    const isHandset: boolean = await firstValueFrom(this.isHandset$)
    if (isHandset) {
      await drawer.close();
    }
  }

  public isSelected(menu: Menu) {
    return this.currentRoute === menu.route;
  }

}

export interface Menu {
  label: string;
  route: string;
  icon: IconDefinition;
}
