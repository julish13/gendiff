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

  const statement = `Property '${path}' was ${type}`;
  switch (type) {
    case 'nested':
      return node.children
        .flatMap((child) => formatter(child, path))
        .filter(((child) => child !== null))
        .join('\n');
    case 'updated':
      return `${statement}. From ${stringifyValue(
        node.oldValue,
      )} to ${stringifyValue(node.newValue)}`;
    case 'added':
      return `${statement} with value: ${stringifyValue(
        node.value,
      )}`;
    case 'removed':
      return statement;
    default:
      return null;
  }
};

export default formatter;
