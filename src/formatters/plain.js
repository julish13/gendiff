import isNested from './utils.js';

const makePath = (key, path) => (path === '' ? key : `${path}.${key}`);

const stringifyValue = (value) => {
  if (Array.isArray(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const makeRecord = (name, type, value, newValue) => {
  if (type === 'added') {
    return `Property '${name}' was added with value: ${stringifyValue(value)}`;
  }
  if (type === 'removed') {
    return `Property '${name}' was removed`;
  }
  if (type === 'updated') {
    return `Property '${name}' was updated. From ${stringifyValue(
      value,
    )} to ${stringifyValue(newValue)}`;
  }
  return null;
};

const prepareAST = (node, parentPath = '') => {
  const { key } = node;
  const path = makePath(key, parentPath);
  if (isNested(node)) {
    const newChildren = node.value
      .map((child) => prepareAST(child, path))
      .reduce((acc, child) => {
        const { value } = child;
        const lastChild = acc[acc.length - 1];
        return lastChild?.key !== child.key
          ? [...acc, { ...child, value }]
          : [
            ...acc.slice(0, -1),
            { ...lastChild, type: 'updated', newValue: value },
          ];
      }, []);
    return { ...node, value: newChildren, path };
  }
  return { ...node, path };
};

const formatInner = (AST) => AST.reduce((acc, child) => {
  const {
    path, type, value, newValue = null,
  } = child;
  if (type !== 'unchanged') {
    return [...acc, makeRecord(path, type, value, newValue)];
  }
  if (isNested(child)) {
    const records = formatInner(value);
    return [...acc, ...records];
  }
  return acc;
}, []);

const format = (AST) => formatInner(prepareAST(AST).value).join('\n');

export default format;
