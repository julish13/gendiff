import formatterStylish from './stylish.js';
import formatterPlain from './plain.js';

const formatsMap = {
  stylish: formatterStylish,
  plain: formatterPlain,
  json: (AST) => JSON.stringify(AST, null, '  '),
};

const formatter = (AST, format = 'stylish') => {
  const result = formatsMap[format](AST);
  // return `${result}`;
  return result;
};

export default formatter;
