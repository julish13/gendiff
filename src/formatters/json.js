import isNested from './utils.js';

const prepareAST = (node) => {
  const { key, value, type } = node;
  if (isNested(node)) {
    const newChildren = value.map(prepareAST);
    return { key, value: newChildren, type };
  }
  return { key, value, type };
};

const format = (AST) => JSON.stringify(prepareAST(AST).value, null, '  ');

export default format;
