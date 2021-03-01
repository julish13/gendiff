import fs from 'fs';
import genDiff from '../src/index.js';
import getFixturePath from '../src/utils.js';

const expected = fs.readFileSync(getFixturePath('expected.txt'), 'utf8');

const jsonFilePath1 = getFixturePath('file1.json');
const jsonFilePath2 = getFixturePath('file2.json');
const ymlFilePath1 = getFixturePath('file1.yml');
const ymlFilePath2 = getFixturePath('file2.yml');

test('genDiff-stylish', () => {
  expect(genDiff(jsonFilePath1, jsonFilePath2)).toBe(expected);
  expect(genDiff(ymlFilePath1, ymlFilePath2)).toBe(expected);
});
