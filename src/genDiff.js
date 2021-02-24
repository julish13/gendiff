import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getFileData = (filePath) => {
  const absolutePath = path.resolve(filePath);
  const fileData = JSON.parse(fs.readFileSync(absolutePath));
  return fileData;
};

const compareObjects = (object1, object2) => {
  const keys = _.uniq([...Object.keys(object1), ...Object.keys(object2)]).sort();
  const diff = keys
    .reduce((acc, key) => {
      if (_.has(object1, key) && !_.has(object2, key)) {
        acc.push(`  - ${key}: ${object1[key]}`);
        return acc;
      }

      if (!_.has(object1, key) && _.has(object2, key)) {
        acc.push(`  + ${key}: ${object2[key]}`);
        return acc;
      }

      if (object1[key] === object2[key]) {
        acc.push(`    ${key}: ${object1[key]}`);
        return acc;
      }

      acc.push(`  - ${key}: ${object1[key]}`);
      acc.push(`  + ${key}: ${object2[key]}`);
      return acc;
    }, [])
    .join('\n');
  const result = `
{
${diff}
}`;

  return result;
};

const genDiff = (filepath1, filepath2) => {
  const object1 = getFileData(filepath1);
  const object2 = getFileData(filepath2);
  return compareObjects(object1, object2);
};

export default genDiff;
