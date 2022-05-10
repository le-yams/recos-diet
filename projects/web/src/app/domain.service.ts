import { Injectable } from '@angular/core';
import {DomainLoaderService} from "./infra/domain-loader.service";

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  readonly warnings;

  readonly micronutriments;

  readonly bibliography;

  readonly targetFlows;

  readonly nutrition;

  readonly products;

  readonly pathologies;

  readonly patient;

  constructor(domainLoader: DomainLoaderService) {
    const domain = domainLoader.getDomain();
    this.warnings = domain.warnings;
    this.micronutriments = domain.micronutriments;
    this.bibliography = domain.bibliography;
    this.targetFlows = domain.targetFlows;
    this.products = domain.products;
    this.nutrition = domain.nutrition;
    this.pathologies = domain.pathologies;
    this.patient = domain.patient;
  }

}
