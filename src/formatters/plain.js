import _ from 'lodash';

const isLeaf = (node) => _.has(node, 'value');

const makePath = (key, path) => (path === '' ? key : `${path}.${key}`);

const normalizeValue = (value) => {
  if (Array.isArray(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const makeRecord = (name, data) => {
  const { status, value, newValue = null } = data;
  if (status === 'added') {
    return `Property '${name}' was added with value: ${normalizeValue(value)}`;
  }
  if (status === 'removed') {
    return `Property '${name}' was removed`;
  }
  return `Property '${name}' was updated. From ${normalizeValue(
    value,
  )} to ${normalizeValue(newValue)}`;
};

const format = (AST) => {
  const data = {};
  const formatInner = (node, parentPath = '') => {
    const { key } = node;
    const { status } = node;
    const path = makePath(key, parentPath);
    const value = isLeaf(node) ? node.value : node.children;

    if (status !== 'default') {
      data[path] = _.has(data, path)
        ? { ...data[path], status: 'updated', newValue: value }
        : { status, value };
      data[path].record = makeRecord(path, data[path]);
      return;
    }
    if (!isLeaf(node)) {
      const { children } = node;
      children.forEach((child) => formatInner(child, path));
    }
  };
  formatInner(AST);
  return Object.values(data)
    .map(({ record }) => record)
    .join('\n');
};

export default format;
