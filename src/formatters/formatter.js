import formatStylish from './stylish.js';

const formatsMap = {
  stylish: formatStylish,
};
const formatter = (AST, format) => formatsMap[format](AST);

export default formatter;
