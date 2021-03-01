import buildAST from './buildAST/buildAST.js';
import formatter from './formatter.js';
import getFileData from './parsers.js';
// import getFixturePath from '../src/utils.js';

const genDiff = (filepath1, filepath2) => {
  const object1 = getFileData(filepath1);
  const object2 = getFileData(filepath2);
  return formatter(buildAST(object1, object2));
};

export default genDiff;

// const json1 = getFileData(getFixturePath('file1.json'));
// const json2 = getFileData(getFixturePath('file2.json'));

// console.log(formatter(buildAST(json1, json2)))
