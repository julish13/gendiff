import _ from 'lodash';

const PREFIXES = {
  removed: '  - ',
  added: '  + ',
  default: '    ',
};

const makeRecord = ({ key, value }, level, change = 'default') => {
  if (!_.isPlainObject(value)) {
    return `${PREFIXES.default.repeat(level - 1)}${
      PREFIXES[change]
    }${key}: ${value}`;
  }
  const entries = _.sortBy(Object.entries(value))
    .map(([childKey, childValue]) => makeRecord({ key: childKey, value: childValue }, level + 1));
  return `${PREFIXES.default.repeat(level - 1)}${PREFIXES[change]}${key}: {
${entries.join('\n')}
${PREFIXES.default.repeat(level)}}`;
};

const formatter = (node, level = 0) => {
  const { key, type } = node;

  switch (type) {
    case 'unchanged':
      return makeRecord(node, level);
    case 'nested':
      return `${PREFIXES.default.repeat(level)}${
        key === 'root' ? '' : `${key}: `
      }{
${node.children.map((child) => formatter(child, level + 1)).join('\n')}
${PREFIXES.default.repeat(level)}}`;
    case 'updated':
      return [
        makeRecord({ key, value: node.oldValue }, level, 'removed'),
        makeRecord({ key, value: node.newValue }, level, 'added'),
      ].join('\n');
    default:
      return makeRecord(node, level, type);
  }
};

export default formatter;
