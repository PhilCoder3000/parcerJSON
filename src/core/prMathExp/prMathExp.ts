type Token = {
  type: string;
  value?: string | Token[];
};


export function parse(str: string) {
  const tokens: Token[] = []

  program(str, tokens)

  return tokens
}

function program(str: string, tokens: Token[]): string {
  if (str === '') {
    return '';
  }

  return expr0(str, tokens)
}

function expr0(str: string, tokens: Token[]): string {
  const subTokens: Token[] = [];
  const newStr = expr1(str, subTokens);
  
  if (newStr[0] === '+' || newStr[0] === '-') {
    const result = expr0(newStr.slice(1), subTokens);
    tokens.push({
      type: newStr[0],
      value: subTokens,
    });

    return result;
  }

  tokens.push(...subTokens);

  return newStr;
}

function expr1(str: string, tokens: Token[]): string {
  const subTokens: Token[] = [];
  const newStr = expr2(str, subTokens);

  if (newStr[0] === '/') {
    const result = expr1(newStr.slice(1), subTokens);
    tokens.push({
      type: newStr[0],
      value: subTokens,
    });

    return result;
  }

  tokens.push(...subTokens);

  return newStr;
}

function expr2(str: string, tokens: Token[]): string {
  const subTokens: Token[] = [];
  const newStr = expr3(str, subTokens);

  if (newStr[0] === '*') {
    const result = expr2(newStr.slice(1), subTokens);
    
    tokens.push({
      type: newStr[0],
      value: subTokens,
    });

    return result;
  }

  tokens.push(...subTokens);

  return newStr;
}

function expr3(str: string, tokens: Token[]): string {
  if (str[0] === '(') {
    const subTokens: Token[] = [];
    const newStr = expr0(str.slice(1), subTokens);

    if (newStr[0] !== ')') {
      throw new SyntaxError('invalid string');
    }

    tokens.push({
      type: 'GROUP',
      value: subTokens,
    });

    return newStr.slice(1);
  }

  return num(str, tokens);
}

function num(str: string, tokens: Token[]): string {
  const literal = /^-?\d+/.exec(str);
  if (literal === null) {
    throw new Error('literal in null');
  }

  const token: Token = {
    type: 'NUM',
    value: literal[0],
  };

  tokens.push(token);

  return str.slice(literal[0].length);
}
