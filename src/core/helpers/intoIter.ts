import { intoIterableIter } from './intoIterableIter';

export function intoIter<T>(iter: Iterable<T>): IterableIterator<T> {
  return intoIterableIter(iter[Symbol.iterator]());
}
