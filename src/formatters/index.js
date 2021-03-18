import _ from 'lodash';
import formatterStylish from './stylish.js';
import formatterPlain from './plain.js';
import formatterJSON from './json.js';

const formatsMap = {
  stylish: formatterStylish,
  plain: formatterPlain,
  json: formatterJSON,
};

const formatter = (AST, format) => {
  if (!_.has(formatsMap, format)) {
    throw new Error('the chosen format is not valid');
  }
  return formatsMap[format](AST);
};

export default formatter;
