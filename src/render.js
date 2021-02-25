import getDiff from './compare.js';
import format from './format.js';
import getFileData from './parsers.js';

const gendiff = (filepath1, filepath2) => {
  const object1 = getFileData(filepath1);
  const object2 = getFileData(filepath2);
  return format(getDiff(object1, object2));
};

export default gendiff;
