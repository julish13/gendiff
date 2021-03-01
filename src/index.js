import buildAST from './buildAST/buildAST.js';
import format from './format.js';
import getFileData from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const object1 = getFileData(filepath1);
  const object2 = getFileData(filepath2);
  return format(buildAST(object1, object2));
};

export default genDiff;
