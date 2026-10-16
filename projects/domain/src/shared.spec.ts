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

import {DomainEvent, DomainEventBus, DomainEventType, Subscription} from './domain.events';

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
