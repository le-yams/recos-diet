/*
 * Copyright (c) 2026. Yann D'Isanto
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

import {InMemoryDomainEventBus} from './in-memory-domain-event-bus';

describe('InMemoryDomainEventBus', () => {
  // The production build minifies class names, and several classes can end up with the same one: esbuild emitted
  // every event class as `var Bi=class t{…}`, all named `t`.
  const FirstEvent = class t {};
  const SecondEvent = class t {};

  let events: InMemoryDomainEventBus;

  beforeEach(() => {
    events = new InMemoryDomainEventBus();
  });

  it('should not forward an event to the subscribers of another class with the same name', () => {
    const consumer = vi.fn();
    events.subscribe(FirstEvent, consumer);

    events.publish(new SecondEvent());

    expect(consumer).not.toHaveBeenCalled();
  });

  it('should forward an event to the subscribers of its class', () => {
    const consumer = vi.fn();
    events.subscribe(FirstEvent, consumer);
    const event = new FirstEvent();

    events.publish(event);

    expect(consumer).toHaveBeenCalledExactlyOnceWith(event);
  });

  it('should forward an event to its subscribers in subscription order', () => {
    const calls: string[] = [];
    events.subscribe(FirstEvent, () => calls.push('first'));
    events.subscribe(FirstEvent, () => calls.push('second'));

    events.publish(new FirstEvent());

    expect(calls).toEqual(['first', 'second']);
  });

  it('should not forward an event to a consumer that unsubscribed', () => {
    const consumer = vi.fn();
    const subscription = events.subscribe(FirstEvent, consumer);

    subscription.unsubscribe();
    events.publish(new FirstEvent());

    expect(consumer).not.toHaveBeenCalled();
  });

  it('should keep the other subscriptions when a subscription is unsubscribed twice', () => {
    const otherConsumer = vi.fn();
    const subscription = events.subscribe(FirstEvent, vi.fn());
    events.subscribe(FirstEvent, otherConsumer);

    subscription.unsubscribe();
    subscription.unsubscribe();
    events.publish(new FirstEvent());

    expect(otherConsumer).toHaveBeenCalledTimes(1);
  });

  it('should not forward an event to a consumer unsubscribed while that event is being published', () => {
    const unsubscribingConsumer = vi.fn();
    const laterConsumer = vi.fn();
    events.subscribe(FirstEvent, unsubscribingConsumer);
    const laterSubscription = events.subscribe(FirstEvent, laterConsumer);
    unsubscribingConsumer.mockImplementation(() => laterSubscription.unsubscribe());

    events.publish(new FirstEvent());

    expect(laterConsumer).not.toHaveBeenCalled();
  });
});
