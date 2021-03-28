import _ from 'lodash';

const makePath = (key, path) => (path === '' ? key : `${path}.${key}`);

const stringifyValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const makeRecord = (name, type, value, newValue) => {
  switch (type) {
    case 'added':
      return `Property '${name}' was added with value: ${stringifyValue(
        value,
      )}`;
    case 'removed':
      return `Property '${name}' was removed`;
    default:
      return `Property '${name}' was updated. From ${stringifyValue(
        value,
      )} to ${stringifyValue(newValue)}`;
  }
};

const formatter = (node, parentPath = '') => {
  const { type } = node;
  const key = (node.key === 'root') ? '' : node.key;
  const path = makePath(key, parentPath);
  switch (type) {
    case 'unchanged':
      return null;
    case 'nested':
      return node.children
        .flatMap((child) => formatter(child, path))
        .filter(((child) => child !== null))
        .join('\n');
    case 'updated':
      return makeRecord(path, type, node.oldValue, node.newValue);
    default:
      return makeRecord(path, type, node.value);
  }
};

export default formatter;
