import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DomainService} from "../domain.service";
import {DomainEvents, SummarizedMicronutrimentRecommendation, SummarizedMicronutrimentRecommendationsUpdatedEvent} from "@recos-diet/domain";

@Injectable({
  providedIn: 'root'
})
export class MicronutrimentsService {

  private readonly nutrimentRecommendations = new BehaviorSubject<SummarizedMicronutrimentRecommendation[]>([])

  readonly nutrimentRecommendations$ = this.nutrimentRecommendations.asObservable();

  constructor(domainService: DomainService) {
    this.nutrimentRecommendations.next(domainService.micronutriments.getSummarizedRecommendations());
    DomainEvents.subscribe<SummarizedMicronutrimentRecommendationsUpdatedEvent>(SummarizedMicronutrimentRecommendationsUpdatedEvent.name,
      evt => this.nutrimentRecommendations.next(evt.recommendations));
  }
}
