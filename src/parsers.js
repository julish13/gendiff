import fs from 'fs';
import path from 'path';

const getFileData = (filePath) => {
  const absolutePath = path.resolve(filePath);
  const fileData = JSON.parse(fs.readFileSync(absolutePath));
  return fileData;
};

export default getFileData;
