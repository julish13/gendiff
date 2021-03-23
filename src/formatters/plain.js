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
    case 'updated':
      return `Property '${name}' was updated. From ${stringifyValue(
        value,
      )} to ${stringifyValue(newValue)}`;
    default:
      return null;
  }
};

const format = (AST) => {
  const result = [];
  const formatInner = (node, parentPath = '') => {
    const { type } = node;
    const key = (node.key === 'root') ? '' : node.key;
    const path = makePath(key, parentPath);
    if (type === 'nested') {
      node.children.forEach((child) => formatInner(child, path));
    }
    if (type === 'changed') {
      const oldValue = node.oldValue ?? null;
      const newValue = node.newValue ?? null;
      if (_.has(node, 'oldValue') && _.has(node, 'newValue')) {
        result.push(makeRecord(path, 'updated', oldValue, newValue));
      } else if (_.has(node, 'oldValue')) {
        result.push(makeRecord(path, 'removed', oldValue));
      } else {
        result.push(makeRecord(path, 'added', newValue));
      }
    }
  };
  formatInner(AST);
  return result.join('\n');
};

export default format;
