import { ParserOptions } from '../types';

export interface TakeOptions extends ParserOptions {
  min?: number;
  max?: number
}