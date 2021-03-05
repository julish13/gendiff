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

const formats = [
  [expectedStylish, 'stylish'],
  [expectedPlain, 'plain'],
];

describe.each(formats)('testing genDiff with different formats', (expected, format) => {
  test(`genDiff-${format}`, () => {
    expect(genDiff(jsonFilePath1, jsonFilePath2, format)).toBe(
      expected,
    );
    expect(genDiff(ymlFilePath1, ymlFilePath2, format)).toBe(expected);
  });
});
