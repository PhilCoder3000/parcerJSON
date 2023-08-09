import { intoIter } from '../helpers/intoIter';
import { testChar } from '../helpers/testChar';
import { Parser, ParserState, Pattern } from '../types';
import { TakeOptions } from './types';

export function take(
  pattern: Pattern,
  opts: TakeOptions<string> = {},
): Parser<string, string> {
  return function* (source, prev) {
    const { min = 1, max = Infinity } = opts;
    let iter = intoIter(source);
    let count = 0;

    let value = '';

    while (true) {
      if (count >= max) {
        break;
      }

      let chunk = iter.next(),
        char = chunk.value;

      if (chunk.done) {
        source = yield ParserState.EXPECT_NEW_INPUT;
        iter = intoIter(source);
        chunk = iter.next();
        char = chunk.value;
      }

      try {
        if (testChar(pattern, char, prev)) {
          count++;
        }
      } catch (error) {
        if (count < min) {
          throw error;
        }
        break
      }

      value += char;
    }

    if (opts.token) {
      yield {
        type: opts.token,
        value: opts.tokenValue?.(value) ?? value,
      };
    }

    const token = {
      type: 'TAKE',
      value,
    };

    return [token, iter];
  };
}
