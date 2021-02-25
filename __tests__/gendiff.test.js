import fs from 'fs';
import gendiff from '../src/gendiff.js';
import getFixturePath from '../src/utils.js';

const path1 = getFixturePath('flat1.json');
const path2 = getFixturePath('flat2.json');

const result = fs.readFileSync(getFixturePath('expected_flat.txt'), 'utf8');

test('gendiff', () => {
  expect(gendiff(path1, path2)).toBe(result);
});
