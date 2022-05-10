import {DomainEvent} from '../domain.events';
import {SummarizedMicronutrimentRecommendation} from "./micronutriments";

export class SummarizedMicronutrimentRecommendationsUpdatedEvent implements DomainEvent {
  readonly name = SummarizedMicronutrimentRecommendationsUpdatedEvent.name;

  constructor(public readonly recommendations: SummarizedMicronutrimentRecommendation[]) {
  }
}
