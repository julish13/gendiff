import fs from 'fs';
import gendiff from '../src/gendiff.js';
import getFixturePath from '../src/utils.js';

const expectedFlat = fs.readFileSync(getFixturePath('/flat/expected.txt'), 'utf8');

const jsonFlatFilePath1 = getFixturePath('/flat/file1.json');
const jsonFlatFilePath2 = getFixturePath('/flat/file2.json');

const ymlFlatFilePath1 = getFixturePath('/flat/file1.yml');
const ymlFlatFilePath2 = getFixturePath('/flat/file2.yml');

test('gendiff-flat', () => {
  expect(gendiff(jsonFlatFilePath1, jsonFlatFilePath2)).toBe(expectedFlat);
  expect(gendiff(ymlFlatFilePath1, ymlFlatFilePath2)).toBe(expectedFlat);
});
