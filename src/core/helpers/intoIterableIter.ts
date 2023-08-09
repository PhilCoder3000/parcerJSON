export function intoIterableIter<T>(
  iterator: Iterator<T>,
): IterableIterator<T> {
  //@ts-ignore
  if (typeof iterator[Symbol.iterator] === 'function') {
    return <any>iterator;
  }

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return iterator.next()
    },
  };
}
