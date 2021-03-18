import isNested from './utils.js';

const PREFIXES = {
  removed: '  - ',
  added: '  + ',
  unchanged: '    ',
};

const isSeed = (node) => node.level === 0;

const getPrefix = (node) => {
  const indentLength = node.level - 1;
  const { type } = node;
  return `${PREFIXES.unchanged.repeat(indentLength)}${PREFIXES[type]}`;
};

const formatter = (node) => {
  const prefix = isSeed(node) ? '' : getPrefix(node);
  const postfix = isSeed(node) ? '' : ': ';

  const { key, value } = node;
  const heading = `${prefix}${key}${postfix}`;
  if (!isNested(node)) {
    return `${heading}${value}`;
  }

  return `${heading}{
${value.map(formatter).join('\n')}
${' '.repeat(prefix.length)}}`;
};

export default formatter;
