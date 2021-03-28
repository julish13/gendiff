import _ from 'lodash';

const PREFIXES = {
  removed: '  - ',
  added: '  + ',
  unchanged: '    ',
};

const makeRecord = ({ key, value }, level, type = 'unchanged') => {
  if (!_.isPlainObject(value)) {
    return `${PREFIXES.unchanged.repeat(level - 1)}${
      PREFIXES[type]
    }${key}: ${value}`;
  }
  const entries = _.sortBy(Object.entries(value))
    .map(([childKey, childValue]) => makeRecord({ key: childKey, value: childValue }, level + 1));
  return `${PREFIXES.unchanged.repeat(level - 1)}${PREFIXES[type]}${key}: {
${entries.join('\n')}
${PREFIXES.unchanged.repeat(level)}}`;
};

const formatter = (node, level = 0) => {
  const { key, type } = node;

  switch (type) {
    case 'nested':
      return `${PREFIXES.unchanged.repeat(level)}${
        key === 'root' ? '' : `${key}: `
      }{
${node.children.map((child) => formatter(child, level + 1)).join('\n')}
${PREFIXES.unchanged.repeat(level)}}`;
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
