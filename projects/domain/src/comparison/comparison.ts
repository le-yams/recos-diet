
export interface Comparable<T> {

  compareTo(other: T): number;
}

export type MaxOf = <T extends Comparable<T>>(a: T, b: T) => T;

export const maxOf: MaxOf = <T extends Comparable<T>>(a: T, b: T) => {
  const comp = a.compareTo(b);
  if (comp < 0) {
    return b;
  }
  return a;
};
