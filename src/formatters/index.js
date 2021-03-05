import formatterStylish from './stylish.js';
import formatterPlain from './plain.js';

const formatsMap = {
  stylish: formatterStylish,
  plain: formatterPlain,
};

const formatter = (AST, format) => `
${formatsMap[format](AST)}`;

export default formatter;
