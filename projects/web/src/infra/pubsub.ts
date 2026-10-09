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

import {Consumer, DomainEvent, DomainEventBus, DomainEventType, Subscription} from '@recos-diet/domain';
import {Verbose} from './utils';

const EMPTY_SUBSCRIPTION: Subscription = {
  unsubscribe: () => undefined,
};

export type Predicate<T> = (value: T) => boolean;

const TRUE_PREDICATE: Predicate<unknown> = () => true;


export interface Bus<T> {

  publish(event: T): void;

  subscribe(consumer: Consumer<T>, filter: Predicate<T>): Subscription;
}


export class InMemoryBus<T> implements Bus<T> {

  private readonly consumers: Map<EmitterSubscription<T>, Consumer<T>> = new Map();

  subscribe(consumer: Consumer<T>, filter: Predicate<T>): Subscription {
    if (!consumer) {
      return EMPTY_SUBSCRIPTION;
    }
    const subscription = new EmitterSubscription(this.consumers, filter);
    this.consumers.set(subscription, consumer);
    return subscription;
  }

  publish(event: T): void {
    Verbose.log('publishing event', event);
    if (this.consumers.size === 0) {
      Verbose.log('no consumers registered');
      return;
    }
    let n = 0;
    this.consumers.forEach((consumer, subscription) => {
      const filter = subscription.filter ?? TRUE_PREDICATE;
      if (filter(event)) {
        n++;
        consumer(event);
      }
    });
    Verbose.log(`event forwarded to ${n} consumers`)
  }
}

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


export class DomainEvents implements DomainEventBus {

  private readonly bus: Bus<DomainEvent>;

  constructor(bus: Bus<DomainEvent>) {
    this.bus = bus;
  }

  public publish(event: DomainEvent): void {
    this.bus.publish(event);
  }

  public subscribe<T extends DomainEvent>(eventType: DomainEventType<T>, consumer: Consumer<T>): Subscription {
    return this.bus.subscribe(consumer as Consumer<DomainEvent>, forEvent(eventType));
  }
}

function forEvent(eventType: DomainEventType<DomainEvent>): Predicate<DomainEvent> {
  return evt => evt instanceof eventType;
}
