import fs from 'fs';
import gendiff from '../src/render.js';
import getFixturePath from '../src/utils.js';

const expectedFlat = fs.readFileSync(getFixturePath('expected_flat.txt'), 'utf8');

const jsonFlatFilePath1 = getFixturePath('flat1.json');
const jsonFlatFilePath2 = getFixturePath('flat2.json');

const ymlFlatFilePath1 = getFixturePath('flat1.yml');
const ymlFlatFilePath2 = getFixturePath('flat2.yml');

test('gendiff-flat', () => {
  expect(gendiff(jsonFlatFilePath1, jsonFlatFilePath2)).toBe(expectedFlat);
  expect(gendiff(ymlFlatFilePath1, ymlFlatFilePath2)).toBe(expectedFlat);
});

// const expectedRecursive = fs.readFileSync(getFixturePath('expected_recursive.txt'), 'utf8');

// const jsonRecursiveFilePath1 = getFixturePath('recursive1.json');
// const jsonRecursiveFilePath2 = getFixturePath('recursive2.json');

// test('gendiff-recursive', () => {
//   expect(gendiff(jsonRecursiveFilePath1, jsonRecursiveFilePath2)).toBe(expectedRecursive);
//   expect(gendiff(ymlRecursiveFilePath1, ymlRecursiveFilePath2)).toBe(expectedRecursive);
// });
