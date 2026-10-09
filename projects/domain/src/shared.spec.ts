/*
 * Copyright (c) 2022. Yann D'Isanto
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Shared utilities for testing
 */

import {Consumer, DomainEvent, DomainEventBus, DomainEventType, Subscription} from './domain.events';
import {Predicate, TRUE_PREDICATE} from './utils';

export class TestDomainEventBus implements DomainEventBus {

  private readonly consumers: Map<EmitterSubscription<DomainEvent>, Consumer<DomainEvent>> = new Map();

  public subscribe<T extends DomainEvent>(eventType: DomainEventType<T>, consumer: Consumer<T>): Subscription {
    const filter = forEvent(eventType);

    if (!consumer) {
      return EMPTY_SUBSCRIPTION;
    }
    const subscription = new EmitterSubscription<DomainEvent>(this.consumers, filter);
    this.consumers.set(subscription, consumer as Consumer<DomainEvent>);
    return subscription;
  }

  publish(event: DomainEvent): void {
    if (this.consumers.size === 0) {
      return;
    }
    this.consumers.forEach((consumer, subscription) => {
      const filter = subscription.filter ?? TRUE_PREDICATE;
      if (filter(event)) {
        consumer(event);
      }
    });
  }
}

const EMPTY_SUBSCRIPTION: Subscription = {
  unsubscribe: () => undefined,
};

class EmitterSubscription<T> implements Subscription {
  private consumers: Map<EmitterSubscription<T>, Consumer<T>> | undefined;
  filter: Predicate<T> | undefined;

  constructor(consumers: Map<EmitterSubscription<T>, Consumer<T>>, filter?: Predicate<T>) {
    this.consumers = consumers;
    this.filter = filter;
  }

  unsubscribe(): void {
    if (this.consumers) {
      this.consumers.delete(this);
    }
    this.consumers = undefined;
    this.filter = undefined;
  }
}

function forEvent(eventType: DomainEventType<DomainEvent>): Predicate<DomainEvent> {
  return evt => evt instanceof eventType;
}


export class EventsCaptor<T extends DomainEvent> {


  private subscription: Subscription;
  raisedEvents: T[] = [];

  constructor(eventType: DomainEventType<T>, events: DomainEventBus) {
    this.subscription = events.subscribe(eventType, evt => this.raisedEvents.push(evt))
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
