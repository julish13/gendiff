import buildAST from './buildAST/buildAST.js';
import formatter from './formatters/index.js';
import getFileData from './parsers.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const object1 = getFileData(filepath1);
  const object2 = getFileData(filepath2);
  return formatter(buildAST(object1, object2), format);
};

export default gendiff;
