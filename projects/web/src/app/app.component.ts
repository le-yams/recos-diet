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
