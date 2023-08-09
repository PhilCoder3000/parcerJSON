import { ParseError } from '../ParseError/ParseError';
import { intoIter } from '../helpers/intoIter';
import { ParserState, type Parser, type Pattern } from '../types';

export function tag(pattern: Iterable<Pattern>): Parser<string, string> {
  return function* (source, prev) {
    let iter = intoIter(source);

    let value = '';

    for (const test of pattern) {
      let chunk = iter.next(),
        char = chunk.value;

      if (chunk.done) {
        source = yield ParserState.EXPECT_NEW_INPUT;
        iter = intoIter(source);
        chunk = iter.next();
        char = chunk.value;
      }

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
        case 'number':
        case 'bigint':
        case 'boolean':
        case 'symbol':
        case 'undefined':
        case 'object':
        default:
          if (!test.test(char)) {
            throw new ParseError('invalid string', prev);
          }
      }

      value += char;
    }

    const token = {
      type: 'TAG',
      value
    }

    return [token, iter]
  };
}
