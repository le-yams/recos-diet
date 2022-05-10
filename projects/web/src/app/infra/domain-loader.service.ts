import {Injectable} from '@angular/core';
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
import {MemoryWarningsRepository, PathologyWarnings} from "./memory-warnings.repository";

@Injectable({
  providedIn: 'root'
})
export class DomainLoaderService {

  private domain!: Domain

  constructor(private jsonAssets: JsonAssetLoaderService) {
  }

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
    return this.jsonAssets.load<PathologyWarnings[]>("warnings")
      .then(warnings => new MemoryWarningsRepository(warnings))
  }

}
