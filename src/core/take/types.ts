import { ParserOptions } from '../types';

export interface TakeOptions<T> extends ParserOptions<T> {
  min?: number;
  max?: number
}