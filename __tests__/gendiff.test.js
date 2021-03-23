import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const expectedStylish = fs.readFileSync(
  getFixturePath('expected_stylish.txt'),
  'utf8',
);
const expectedPlain = fs.readFileSync(
  getFixturePath('expected_plain.txt'),
  'utf8',
);

const expectedJSON = fs.readFileSync(getFixturePath('expected.json'), 'utf8');

const jsonFilePath1 = getFixturePath('file1.json');
const jsonFilePath2 = getFixturePath('file2.json');
const ymlFilePath1 = getFixturePath('file1.yml');
const ymlFilePath2 = getFixturePath('file2.yml');

const formats = [
  ['stylish', expectedStylish],
  ['plain', expectedPlain],
  ['json', expectedJSON],
];

test.each(formats)('genDiff %s', (format, expected) => {
  expect(genDiff(jsonFilePath1, jsonFilePath2, format)).toBe(expected);
  expect(genDiff(ymlFilePath1, ymlFilePath2, format)).toBe(expected);
});
