import _ from 'lodash';
import formatterStylish from './stylish.js';
import formatterPlain from './plain.js';
import formatterJSON from './json.js';

const formatters = {
  stylish: formatterStylish,
  plain: formatterPlain,
  json: formatterJSON,
};

const formatter = (AST, format) => {
  if (!_.has(formatters, format)) {
    throw new Error('the chosen format is not valid');
  }
  return formatters[format](AST);
};

export default formatter;
