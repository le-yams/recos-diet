import {DomainEvent} from '../domain.events';
import {Pathology} from "./pathologies.data";

export class SelectedPathologiesEvent implements DomainEvent {
  readonly name = SelectedPathologiesEvent.name;

  constructor(public readonly pathologies: Pathology[]) {
  }

  hasAnorexia(): boolean {
    return !!this.pathologies
      .find(pathology => pathology === Pathology.ANOREXIE_MENTALE);
  }
}
