import _ from 'lodash';

const PREFIXES = {
  removed: '  - ',
  added: '  + ',
  default: '    ',
};

const isLeaf = (node) => _.has(node, 'value');

const isSeed = (node) => node.level === 0;

const getPrefix = (node) => {
  const indentLength = node.level - 1;
  const status = node.status;
  return `${PREFIXES.default.repeat(indentLength)}${PREFIXES[status]}`;
};

const formatter = (node) => {
  let prefix = '';
  let postfix = '';
  if (!isSeed(node)) {
    prefix = getPrefix(node);
    postfix = ': ';
  }

  const key = node.key;
  const heading = `${prefix}${key}${postfix}`;
  if (isLeaf(node)) {
    return `${heading}${node.value}`;
  }

  const children = node.children;

  return `${heading}{
${children.map(formatter).join('\n')}
${' '.repeat(prefix.length)}}`;
};

export default formatter;
