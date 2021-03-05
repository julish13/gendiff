import Leaf from '../buildAST/Leaf.js';

const PREFIXES = {
  removed: '  - ',
  added: '  + ',
  default: '    ',
};

const isSeed = (node) => node.getLevel() === 0;

const getPrefix = (node) => {
  const indentLength = node.getLevel() - 1;
  const status = node.getStatus();
  return `${PREFIXES.default.repeat(indentLength)}${PREFIXES[status]}`;
};

const formatter = (node) => {
  let prefix = '';
  let postfix = '';
  if (!isSeed(node)) {
    prefix = getPrefix(node);
    postfix = ': ';
  }

  const key = node.getKey();
  const heading = `${prefix}${key}${postfix}`;
  if (node instanceof Leaf) {
    return `${heading}${node.getValue()}`;
  }

  const children = node.getChildren();

  return `${heading}{
${children.map(formatter).join('\n')}
${' '.repeat(prefix.length)}}`;
};

export default formatter;
