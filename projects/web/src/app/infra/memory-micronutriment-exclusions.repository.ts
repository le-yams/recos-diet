import {MicronutrimentExclusionsRead, Pathology} from "@recos-diet/domain";

export class MemoryMicronutrimentExclusionsRepository implements MicronutrimentExclusionsRead {

  constructor(private exclusions: PathologyExclusions[]) {
  }

  pathologyNutrimentExclusions(pathology: Pathology): string[] {
    return this.exclusions
      .find(exclusions => exclusions.pathology === pathology)
      ?.excludedNutriments ?? [];
  }

}

export interface PathologyExclusions {
  pathology: Pathology;
  excludedNutriments: string[];
}
