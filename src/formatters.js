const PREFIXES = {
  deleted: '  - ',
  added: '  + ',
  same: '    ',
};

const format = (diffs) => {
  const diffsFormatted = diffs
    .map(({ key, value, status }) => `${PREFIXES[status]}${key}: ${value}`)
    .join('\n');
  return `
{
${diffsFormatted}
}`;
};

export default format;
