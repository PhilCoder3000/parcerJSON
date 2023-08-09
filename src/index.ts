import { take } from './core/take';

const num = take(/\d/)
const iter = num('132123132123d')

console.log(iter.next())
// console.log(iter.next())