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
import {JsonAssetLoaderService} from "./json-asset-loader.service";
import {
  BibliographyEntry,
  BibliographyRepository,
  Domain,
  MicronutrimentExclusionsRead,
  MicronutrimentRecommendationsRead,
  WarningsRead
} from "@recos-diet/domain";
import {JsonProducts, MemoryProductsRepository} from "./memory-products.repository";
import {MemoryBibliographyRepository} from "./memory-bibliography.repository";
import {
  MemoryMicronutrimentRecommendationsRepository,
  NutritionRecommendations
} from "./memory-micronutriment-recommendations.repository";
import {
  MemoryMicronutrimentExclusionsRepository,
  PathologyExclusions
} from "./memory-micronutriment-exclusions.repository";
import {MemoryWarningsRepository, ProductOrPathologiesWarnings} from "./memory-warnings.repository";
import {DomainEvents, InMemoryBus} from "./pubsub";


@Injectable({
  providedIn: 'root'
})
export class DomainLoaderService {

  private jsonAssets = inject(JsonAssetLoaderService);

  private domain!: Domain

  getDomain() {
    return this.domain;
  }

  load(): Promise<Domain> {
    return this.loadDomain().then(domain => this.domain = domain);
  }

  private loadDomain(): Promise<Domain> {
    return Promise.all([
      this.loadProductsRepository(),
      this.loadBibliographyRepository(),
      this.loadEnteraleRecosRead(),
      this.loadParenteraleRecosRead(),
      this.loadRecoExclusionsRead(),
      this.loadWarningsRead()
    ]).then(
      ([
         productsRepository,
         bibliographyRepository,
         enteraleRecommendationsRead,
         parenteraleRecommendationsRead,
         recommendationExclusionsRead,
         warningsRead,
       ]) =>
        this.domain = new Domain(
          new DomainEvents(new InMemoryBus()),
          productsRepository,
          productsRepository,
          bibliographyRepository,
          enteraleRecommendationsRead,
          parenteraleRecommendationsRead,
          recommendationExclusionsRead,
          warningsRead
        )
    );
  }

  private loadProductsRepository(): Promise<MemoryProductsRepository> {
    return this.jsonAssets.load<JsonProducts>("products")
      .then(products => new MemoryProductsRepository(products))
  }

  private loadBibliographyRepository(): Promise<BibliographyRepository> {
    return this.jsonAssets.load<BibliographyEntry[]>("bibliography")
      .then(entries => new MemoryBibliographyRepository(entries))
  }


  private loadEnteraleRecosRead(): Promise<MicronutrimentRecommendationsRead> {
    return this.jsonAssets.load<NutritionRecommendations>("recos-enterale")
      .then(recos => new MemoryMicronutrimentRecommendationsRepository(recos))
  }

  private loadParenteraleRecosRead(): Promise<MicronutrimentRecommendationsRead> {
    return this.jsonAssets.load<NutritionRecommendations>("recos-parenterale")
      .then(recos => new MemoryMicronutrimentRecommendationsRepository(recos))
  }

  private loadRecoExclusionsRead(): Promise<MicronutrimentExclusionsRead> {
    return this.jsonAssets.load<PathologyExclusions[]>("recos-exclusions")
      .then(exclusions => new MemoryMicronutrimentExclusionsRepository(exclusions))
  }

  private loadWarningsRead(): Promise<WarningsRead> {
    return this.jsonAssets.load<ProductOrPathologiesWarnings[]>("warnings")
      .then(warnings => new MemoryWarningsRepository(warnings))
  }

}
