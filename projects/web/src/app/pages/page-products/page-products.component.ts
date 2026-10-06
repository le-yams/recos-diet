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
import {faVials} from '@fortawesome/free-solid-svg-icons';
import {DomainService} from '../../domain.service';
import {NutritionType, ProductDetail} from '@recos-diet/domain';
import {AppService} from '../../app.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatCard, MatCardHeader, MatCardTitle, MatCardContent} from '@angular/material/card';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {MatDivider} from '@angular/material/list';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-page-products',
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    FaIconComponent,
    MatDivider,
    MatCardContent,
    ProductDetailComponent,
    AsyncPipe
  ]
})
export class PageProductsComponent {

  faVials = faVials;
  readonly notHandset$: Observable<boolean>;
  productsEnterale: ProductDetail[];
  productsParenterale: ProductDetail[];

  constructor() {
    const domainService = inject(DomainService);
    const appService = inject(AppService);

    this.notHandset$ = appService.isHandset$.pipe(map(negate));
    const groupedProducts: ProductDetail[][] = domainService.products.listAllProducts()
      .sort(byProductName)
      .reduce(byNutritionType, [[], []]);
    // semgrep detect-object-injection: false positives, the indexes are constants
    this.productsEnterale = groupedProducts[GROUPED_ENTERALE_INDEX]; // nosemgrep
    this.productsParenterale = groupedProducts[GROUPED_PARENTERALE_INDEX]; // nosemgrep
  }
}

const negate = function (b: boolean) {
  return !b;
}

const GROUPED_ENTERALE_INDEX = 0;
const GROUPED_PARENTERALE_INDEX = 1;

const byNutritionType = function (acc: ProductDetail[][], product: ProductDetail) {
  switch (product.nutritionType) {
    case NutritionType.ENTERALE:
      acc[GROUPED_ENTERALE_INDEX].push(product);
      break;
    case NutritionType.PARENTERALE:
      acc[GROUPED_PARENTERALE_INDEX].push(product);
      break;
    default:
      // TODO: throw error
      break;
  }
  return acc;
};

const byProductName = function (p1: ProductDetail, p2: ProductDetail): number {
  return p1.name.localeCompare(p2.name);
}
