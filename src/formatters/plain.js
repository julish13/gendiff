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
  if (type === 'unchanged') {
    return null;
  }
  const key = (node.key === 'root') ? '' : node.key;
  const path = makePath(key, parentPath);
  if (type === 'changed') {
    const { oldValue, newValue } = node;
    if (!_.has(node, 'newValue')) {
      return makeRecord(path, 'removed', oldValue);
    }
    if (!_.has(node, 'oldValue')) {
      return makeRecord(path, 'added', newValue);
    }
    return makeRecord(path, 'updated', oldValue, newValue);
  }
  return node.children
    .flatMap((child) => formatter(child, path))
    .filter(((child) => child !== null))
    .join('\n');
};

export default formatter;
