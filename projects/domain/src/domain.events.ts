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

export type DomainEvent = object;

/**
 * The class of an event: subscribers receive its instances. Never identify an event by its class name, the
 * production build minifies class names and several classes can end up with the same one.
 */
export type DomainEventType<T extends DomainEvent> = new (...args: never[]) => T;

export interface DomainEventBus {

  publish(event: DomainEvent): void;

  subscribe<T extends DomainEvent>(eventType: DomainEventType<T>, consumer: Consumer<T>): Subscription;
}

export type Consumer<T> = (value: T) => void;

export interface Subscription {
  unsubscribe(): void;
}
