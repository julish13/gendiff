import buildAST from './buildAST/buildAST.js';
import formatter from './formatters/formatter.js';
import getFileData from './parsers.js';

const genDiff = (filepath1, filepath2, format) => {
  const object1 = getFileData(filepath1);
  const object2 = getFileData(filepath2);
  return formatter(buildAST(object1, object2), format);
};

export default genDiff;
