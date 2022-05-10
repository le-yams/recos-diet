import {MicronutrimentRecommendation, MicronutrimentRecommendationsRead, Pathology} from "@recos-diet/domain";

export class MemoryMicronutrimentRecommendationsRepository implements MicronutrimentRecommendationsRead {

  constructor(private recos: NutritionRecommendations) {
  }

  pathologyRecommendations(pathology: Pathology): MicronutrimentRecommendation[] {
    return this.recos.pathologiesRecommendations
      .find(recos => recos.pathology === pathology)
      ?.recommendations ?? [];
  }

  sharedRecommendations(): MicronutrimentRecommendation[] {
    return this.recos.sharedRecommendations;
  }

}

export interface PathologyRecommendations {
  pathology: Pathology;
  recommendations: MicronutrimentRecommendation[];
}

export interface NutritionRecommendations {
  sharedRecommendations: MicronutrimentRecommendation[];
  pathologiesRecommendations: PathologyRecommendations[]
}
