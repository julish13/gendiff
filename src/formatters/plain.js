import _ from 'lodash';

const makePath = (key, path) => (path === '' ? key : `${path}.${key}`);

const stringifyValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const formatter = (node, parentPath = '') => {
  const { type } = node;
  const key = (node.key === 'root') ? '' : node.key;
  const path = makePath(key, parentPath);

  switch (type) {
    case 'nested':
      return node.children
        .flatMap((child) => formatter(child, path))
        .filter(((child) => child !== null))
        .join('\n');
    case 'updated':
      return `Property '${path}' was ${type}. From ${stringifyValue(
        node.oldValue,
      )} to ${stringifyValue(node.newValue)}`;
    case 'added':
      return `Property '${path}' was ${type} with value: ${stringifyValue(
        node.value,
      )}`;
    case 'removed':
      return `Property '${path}' was ${type}`;
    default:
      return null;
  }
};

export default formatter;
