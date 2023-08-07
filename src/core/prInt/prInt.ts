const dict: Record<string, number> = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
};

export function prInt(value: string) {
  if (!/^\s*-?\d+\s*$/.test(value)) {
    return NaN;
  }

  let negative = 1;

  if (value.startsWith('-')) {
    value = value.slice(1);
    negative = -1;
  }

  const result = value
    .split('')
    .reduce(
      (acc, char, index, arr) => acc + dict[char] * 10 ** (arr.length - index - 1),
      0,
    );

  return result * negative;
}
