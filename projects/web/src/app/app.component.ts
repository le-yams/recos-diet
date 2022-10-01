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

import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {filter, first} from "rxjs/operators";
import {MatSidenav} from "@angular/material/sidenav";
import {
  faBookMedical,
  faPrescriptionBottle,
  faQuestionCircle,
  faStickyNote,
  faVials,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router} from "@angular/router";
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  readonly isHandset$: Observable<boolean>;
  selectedMenuLabel: string;
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


  constructor(appService: AppService, private router: Router) {
    this.isHandset$ = appService.isHandset$;
    this.selectedMenuLabel = this.findSelectedMenuLabel();
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        this.selectedMenuLabel = this.findSelectedMenuLabel();
      });
  }

  findSelectedMenuLabel() {
    return this.menus.find(menu => this.isSelected(menu))!.label;
  }

  async closeDrawerIfHandset(drawer: MatSidenav) {
    const isHandset: boolean = await this.isHandset$.pipe(first()).toPromise();
    if (isHandset) {
      await drawer.close();
    }
  }

  public isSelected(menu: Menu) {
    const urlWithoutParams = this.router.url.split('?')[0];
    return urlWithoutParams === menu.route;
  }

}

export interface Menu {
  label: string;
  route: string;
  icon: IconDefinition;
}
