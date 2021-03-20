import fs from 'fs';
import path from 'path';
import buildAST from './buildAST/buildAST.js';
import formatter from './formatters/index.js';
import parse from './parsers.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const object1 = parse(
    fs.readFileSync(path.resolve(filepath1)),
    path.extname(filepath1),
  );
  const object2 = parse(
    fs.readFileSync(path.resolve(filepath2)),
    path.extname(filepath2),
  );
  return formatter(buildAST(object1, object2), format);
};

export default gendiff;
