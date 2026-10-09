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

import {DomainEvents, InMemoryBus} from './pubsub';

describe('DomainEvents', () => {
  // The production build minifies class names, and several classes can end up with the same one: esbuild emitted
  // every event class as `var Bi=class t{…}`, all named `t`.
  const FirstEvent = class t {};
  const SecondEvent = class t {};

  let events: DomainEvents;

  beforeEach(() => {
    events = new DomainEvents(new InMemoryBus());
  });

  it('should not forward an event to the subscribers of another class with the same name', () => {
    const consumer = jasmine.createSpy('consumer');
    events.subscribe(FirstEvent, consumer);

    events.publish(new SecondEvent());

    expect(consumer).not.toHaveBeenCalled();
  });

  it('should forward an event to the subscribers of its class', () => {
    const consumer = jasmine.createSpy('consumer');
    events.subscribe(FirstEvent, consumer);
    const event = new FirstEvent();

    events.publish(event);

    expect(consumer).toHaveBeenCalledOnceWith(event);
  });
});
