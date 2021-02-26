const PREFIXES = {
  deleted: '  - ',
  added: '  + ',
  equal: '    ',
};

const formatinner = (diffs) => {
  const diffsFormatted = diffs
    .map(({ key, value, status }) => {
      if (!(value instanceof Array)) {
        return `${PREFIXES[status]}${key}: ${value}`;
      }
      return `${PREFIXES[status]}${key}: {
${formatinner(value)}
}`;
    })
    .join('\n');
  return diffsFormatted;
};

const format = (diffs) => `
{
${formatinner(diffs)}
}`;

export default format;
