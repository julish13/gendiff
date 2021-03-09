import _ from 'lodash';

const isLeaf = (node) => _.has(node, 'value');

const makePath = (key, path) => (path === '' ? key : `${path}.${key}`);

const normalizeValue = (value) => {
  if (Array.isArray(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const makeRecord = (name, status, value, newValue) => {
  if (status === 'added') {
    return `Property '${name}' was added with value: ${normalizeValue(value)}`;
  }
  if (status === 'removed') {
    return `Property '${name}' was removed`;
  }
  if (status === 'updated') {
    return `Property '${name}' was updated. From ${normalizeValue(value)} to ${normalizeValue(newValue)}`;
  }
  return null;
};

const prepareAST = (node, parentPath = '') => {
  const { key } = node;
  const path = makePath(key, parentPath);
  if (!isLeaf(node)) {
    const { children } = node;
    const newChildren = children
      .map((child) => prepareAST(child, path))
      .reduce((acc, child) => {
        const value = isLeaf(child) ? child.value : child.children;
        const indexOfduplicate = acc.findIndex((accChild) => accChild.key === child.key);
        if (indexOfduplicate === -1) {
          return [...acc, { ...child, value }];
        }
        return [...acc.slice(0, -1), { ...acc[indexOfduplicate], status: 'updated', newValue: value }];
      }, []);
    return { ...node, children: newChildren, path };
  }
  return { ...node, path };
};

const formatInner = (AST) => AST.reduce((acc, child) => {
  const {
    path, status, value, newValue = null,
  } = child;
  if (status !== 'default') {
    return [...acc, makeRecord(path, status, value, newValue)];
  }
  if (Array.isArray(value)) {
    const records = formatInner(value);
    return [...acc, ...records];
  }
  return acc;
}, []);

const format = (AST) => (formatInner(prepareAST(AST).children)).join('\n');

export default format;
