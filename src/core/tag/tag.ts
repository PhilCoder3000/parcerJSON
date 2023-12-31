import { intoIter } from '../helpers/intoIter';
import { testChar } from '../helpers/testChar';
import { ParserState, Parser, Pattern, ParserOptions } from '../types';

export function tag(
  pattern: Iterable<Pattern>,
  opts: ParserOptions<string> = {},
): Parser<string, string> {
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

      testChar(test, char, prev);

      value += char;
    }

    if (opts.token) {
      yield {
        type: opts.token,
        value: opts.tokenValue?.(value) ?? value,
      };
    }

    const token = {
      type: 'TAG',
      value,
    };

    return [token, iter];
  };
}
