import _ from 'lodash';
import formatterStylish from './stylish.js';
import formatterPlain from './plain.js';

const formatters = {
  stylish: formatterStylish,
  plain: formatterPlain,
  json: (AST) => JSON.stringify(AST, null, '  '),
};

const formatter = (AST, format) => {
  if (!_.has(formatters, format)) {
    throw new Error('the chosen format is not valid');
  }
  return formatters[format](AST);
};

export default formatter;
