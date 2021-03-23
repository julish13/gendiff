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
  const entries = Object.entries(value)
    .sort()
    .map(([childKey, childValue]) => makeRecord({ key: childKey, value: childValue }, level + 1));
  return `${PREFIXES.default.repeat(level - 1)}${PREFIXES[change]}${key}: {
${entries.join('\n')}
${PREFIXES.default.repeat(level)}}`;
};

const formatter = (node, level = 0) => {
  const { key, type } = node;

  switch (type) {
    case 'nested':
      return `${PREFIXES.default.repeat(level)}${
        key === 'root' ? '' : `${key}: `
      }{
${node.children.map((child) => formatter(child, level + 1)).join('\n')}
${PREFIXES.default.repeat(level)}}`;
    case 'changed': {
      const result = [];
      const makeChangedRecord = (value, change) => {
        result.push(makeRecord({ key, value }, level, change));
      };
      if (_.has(node, 'oldValue')) {
        makeChangedRecord(node.oldValue, 'removed');
      }
      if (_.has(node, 'newValue')) {
        makeChangedRecord(node.newValue, 'added');
      }
      return `${result.join('\n')}`;
    }
    default:
      return makeRecord(node, level);
  }
};

export default formatter;
