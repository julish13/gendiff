import _ from 'lodash';

const PREFIXES = {
  removed: '  - ',
  added: '  + ',
  unchanged: '    ',
};

const makeIndent = (level, string = ' ', indentWidth = 4) => string.repeat(indentWidth).repeat(level);

const stringifyValue = (value, level, cb) => ((!_.isPlainObject(value))
  ? value
  : `{
${_.sortBy(Object.entries(value))
    .map(([childKey, childValue]) => cb({ key: childKey, value: childValue }, level + 1))
    .join('\n')}
${makeIndent(level)}}`);

const makeRecord = ({ key, value }, level, type = 'unchanged') => `${makeIndent(level - 1)}${PREFIXES[type]}${key}: ${stringifyValue(value, level, makeRecord)}`;

const formatter = (node, level = 0) => {
  const { key, type } = node;

  switch (type) {
    case 'nested':
      return `${makeIndent(level)}${
        key === 'root' ? '' : `${key}: `
      }{
${node.children.map((child) => formatter(child, level + 1)).join('\n')}
${makeIndent(level)}}`;
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
