import fs from 'fs';
import path from 'path';
import buildAST from './buildAST.js';
import formatter from './formatters/index.js';
import parse from './parsers.js';

const getFileData = (filepath) => {
  const data = fs.readFileSync(path.resolve(filepath));
  const format = path.extname(filepath);
  return parse(data, format);
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const object1 = getFileData(filepath1);
  const object2 = getFileData(filepath2);
  return formatter(buildAST(object1, object2), format);
};

export default gendiff;
