import {DomainEvent} from "../domain.events";
import {TargetFlow} from "./target-flows";

export class TargetlowsUpdatedEvent implements DomainEvent {

  readonly name = TargetlowsUpdatedEvent.name;

  constructor(public readonly targetFlows: TargetFlow[]) {
  }
}
