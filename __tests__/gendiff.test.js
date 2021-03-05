import fs from 'fs';
import genDiff from '../src/index.js';
import getFixturePath from '../src/utils.js';

const expectedStylish = fs.readFileSync(
  getFixturePath('expected_stylish.txt'),
  'utf8',
);
const expectedPlain = fs.readFileSync(
  getFixturePath('expected_plain.txt'),
  'utf8',
);

const jsonFilePath1 = getFixturePath('file1.json');
const jsonFilePath2 = getFixturePath('file2.json');
const ymlFilePath1 = getFixturePath('file1.yml');
const ymlFilePath2 = getFixturePath('file2.yml');

test('genDiff-stylish', () => {
  expect(genDiff(jsonFilePath1, jsonFilePath2, 'stylish')).toBe(
    expectedStylish,
  );
  expect(genDiff(ymlFilePath1, ymlFilePath2, 'stylish')).toBe(expectedStylish);
});

test('genDiff-plain', () => {
  expect(genDiff(jsonFilePath1, jsonFilePath2, 'plain')).toBe(expectedPlain);
  expect(genDiff(ymlFilePath1, ymlFilePath2, 'plain')).toBe(expectedPlain);
});
