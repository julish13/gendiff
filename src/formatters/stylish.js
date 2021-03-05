import Leaf from '../buildAST/Leaf';

const PREFIXES = {
  deleted: '  - ',
  added: '  + ',
  default: '    ',
};

const getPrefix = (node) => `${PREFIXES.default.repeat(node.getLevel())}${PREFIXES[node.getStatus()]}`;

const formatInner = (node) => {
  const prefix = getPrefix(node);
  if (node instanceof Leaf) {
    return `${prefix}${node.getKey()}: ${node.getValue()}`;
  }
  return `${prefix}${node.getKey()}: {
${node
    .getChildren()
    .map((child) => formatInner(child))
    .join('\n')}
${' '.repeat(prefix.length)}}`;
};

const format = (AST) => {
  const ASTFormatted = AST.map(formatInner).join('\n');
  return `
{
${ASTFormatted}
}`;
};

export default format;
