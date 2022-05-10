import {Verbose} from "../utils";

export interface Subscription {
  unsubscribe(): void;
}

const EMPTY_SUBSCRIPTION: Subscription = {
  unsubscribe: () => undefined,
};

export type Consumer<T> = (value: T) => void;

export type Predicate<T> = (value: T) => boolean;

const TRUE_PREDICATE: Predicate<unknown> = t => true;

export interface Publisher<T> {
  subscribe(consumer: Consumer<T>, filter?: Predicate<T>): Subscription;
}

export class Emitter<T> implements Publisher<T> {

  private readonly consumers: Map<EmitterSubscription<T>, Consumer<T>> = new Map();

  subscribe(consumer: Consumer<T>, filter: Predicate<T>): Subscription {
    if (!consumer) {
      return EMPTY_SUBSCRIPTION;
    }
    const subscription = new EmitterSubscription(this.consumers, filter);
    this.consumers.set(subscription, consumer);
    return subscription;
  }

  emit(event: T): void {
    Verbose.log('emitting event', event);
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
