export class GroupableArray<T> {

  constructor(private array: T[]) {
  }

  by<K>(keyProvider: (item: T) => K): Map<K, T[]> {
    const grouped = new Map<string, T[]>();
    return this.array.reduce((map, item) => {
      const key: K = keyProvider(item);
      let group = map.get(key);
      if (!group) {
        group = []
        map.set(key, group);
      }
      group.push(item);
      return map;
    }, new Map<K, T[]>());
  }
}

export const group = function <T>(array: T[]): GroupableArray<T> {
  return new GroupableArray<T>(array);
}

export type Predicate<T> = (item: T) => boolean

export const notIn = function <T>(exclusion: T[]): Predicate<T> {
  return item => !exclusion.includes(item);
}


export const mapValues = function <K, V, U>(map: Map<K, V>, mappingFunction: (item: V) => U): U[] {
  return Array.from(map.values()).map(mappingFunction);
};

const isDevOrStagingEnv = function (): boolean {
  const hostname = window.location.hostname;
  const devOrStagingEnv = hostname.includes('localhost') || hostname.includes('staging');
  if (devOrStagingEnv) {
    console.debug('dev/staging environment detected');
  }
  return devOrStagingEnv;
}

export class Verbose {

  private static enabled: boolean = isDevOrStagingEnv();

  static log(...data: any[]) {
    Verbose.ifEnabled(
      () => console.log(...data));
  }

  static debug(...data: any[]) {
    Verbose.ifEnabled(
      () => console.debug(...data));
  }

  private static ifEnabled(callback: () => void) {
    if (this.enabled) {
      callback();
    }
  }

  static isEnabled(): boolean {
    return this.enabled;
  }

  static enable() {
    this.enabled = true;
  }

  static disable() {
    this.enabled = false;
  }
}
