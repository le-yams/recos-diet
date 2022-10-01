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
