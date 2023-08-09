export type Pattern = string | RegExp | ((char: string) => boolean);

export enum ParserState {
  EXPECT_NEW_INPUT,
}

export type Token<T = unknown> = {
  type: string;
  value?: T;
};

export interface ParserValue<T = unknown> extends Token<T> {}

export type ParserResult<T = unknown> = [ParserValue<T>, Iterable<string>];

export type Parser<T = unknown, R = unknown> = (
  iter: Iterable<T>,
  prev?: ParserValue,
) => Generator<ParserState | Token<T>, ParserResult<R>, Iterable<string>>;

export interface ParserOptions<T = unknown> {
  token?: string
  tokenValue?(arg0: unknown): T 
}