/*
 * Shared utilities for testing
 */

import {DomainEvent, DomainEvents} from './domain.events';
import {Subscription} from './pubsub/pubsub';

export class EventsCaptor<T extends DomainEvent> {


  private subscription: Subscription;
  raisedEvents: T[] = [];

  constructor(eventName: string) {
    this.subscription = DomainEvents.subscribe<T>(eventName, evt => this.raisedEvents.push(evt as T))
  }

  expectEventsCount(expected: number) {
    expect(this.raisedEvents).toHaveSize(expected);
  }

  mapSingleEvent<U>(mapper: (evt: T) => U): U {
    return mapper(this.raisedEvents[0]);
  }

  close() {
    this.subscription.unsubscribe();
  }
}
