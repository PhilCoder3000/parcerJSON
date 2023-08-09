import { ParserValue } from '../types';

export class ParseError extends Error {
  prev: ParserValue | undefined;

  constructor(message: string, prev?: ParserValue) {
    super(message);
    this.prev = prev;
  }
}
