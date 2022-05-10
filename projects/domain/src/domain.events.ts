import {Consumer, Emitter, Predicate, Subscription} from './pubsub/pubsub'

export interface DomainEvent {
    name: string
}

export class DomainEvents {

  static readonly emitter = new Emitter<DomainEvent>();

  static publish(event: DomainEvent): void {
    DomainEvents.emitter.emit(event);
  }

  static subscribe<T extends DomainEvent>(eventName: string, consumer: Consumer<T>): Subscription {
    return DomainEvents.emitter.subscribe(consumer as Consumer<DomainEvent>, forEvent(eventName));
  }

}

function forEvent(eventName: string): Predicate<DomainEvent> {
  return evt => evt.name === eventName;
}
