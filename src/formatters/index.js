import formatterStylish from './stylish.js';
import formatterPlain from './plain.js';
import formatterJSON from './json.js';

const formatsMap = {
  stylish: formatterStylish,
  plain: formatterPlain,
  json: formatterJSON,
};

const formatter = (AST, format) => formatsMap[format](AST);

export default formatter;
