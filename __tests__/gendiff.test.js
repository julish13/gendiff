import fs from 'fs';
import genDiff from '../src/index.js';
import getFixturePath from '../src/utils.js';

const expectedFlat = fs.readFileSync(
  getFixturePath('expected_flat.txt'),
  'utf8',
);

const jsonFlatFilePath1 = getFixturePath('flat1.json');
const jsonFlatFilePath2 = getFixturePath('flat2.json');

const ymlFlatFilePath1 = getFixturePath('flat1.yml');
const ymlFlatFilePath2 = getFixturePath('flat2.yml');

test('genDiff-flat', () => {
  expect(genDiff(jsonFlatFilePath1, jsonFlatFilePath2)).toBe(expectedFlat);
  expect(genDiff(ymlFlatFilePath1, ymlFlatFilePath2)).toBe(expectedFlat);
});

const expectedRecursive = fs.readFileSync(
  getFixturePath('expected_recursive.txt'),
  'utf8',
);

const jsonRecursiveFilePath1 = getFixturePath('recursive1.json');
const jsonRecursiveFilePath2 = getFixturePath('recursive2.json');
const ymlRecursiveFilePath1 = getFixturePath('recursive1.yml');
const ymlRecursiveFilePath2 = getFixturePath('recursive2.yml');

test('genDiff-recursive', () => {
  expect(genDiff(jsonRecursiveFilePath1, jsonRecursiveFilePath2)).toBe(
    expectedRecursive,
  );
  expect(genDiff(ymlRecursiveFilePath1, ymlRecursiveFilePath2)).toBe(
    expectedRecursive,
  );
});
