import { ParseError } from '../ParseError/ParseError';
import { ParserValue, Pattern } from '../types';

export function testChar(
  test: Pattern,
  char: string,
  prev: ParserValue | undefined,
): boolean {
  switch (typeof test) {
    case 'string':
      if (test !== char) {
        throw new ParseError('invalid string', prev);
      }
      break;
    case 'function':
      if (!test(char)) {
        throw new ParseError('invalid string', prev);
      }
      break;
    default:
      if (!test.test(char)) {
        throw new ParseError('invalid string', prev);
      }
  }

  return true;
}
