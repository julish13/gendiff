import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFileData = (filePath) => {
  const absolutePath = path.resolve(filePath);
  const format = path.extname(absolutePath);

  const fileData = fs.readFileSync(absolutePath);

  const parsedData = format === '.yml' ? yaml.load(fileData) : JSON.parse(fileData);

  return parsedData;
};

export default getFileData;
