import isNested from './utils.js';

const prepareAST = (node) => {
  const { key, value, status } = node;
  if (isNested(node)) {
    const newChildren = value.map(prepareAST);
    return { key, value: newChildren, status };
  }
  return { key, value, status };
};

const format = (AST) => JSON.stringify(prepareAST(AST).value, null, '  ');

export default format;
