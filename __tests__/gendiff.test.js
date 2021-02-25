import fs from 'fs';
import gendiff from '../src/gendiff.js';
import getFixturePath from '../src/utils.js';

const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');

const result = fs.readFileSync(getFixturePath('expected_file1.txt'), 'utf8');

test('gendiff', () => {
  expect(gendiff(path1, path2)).toBe(result);
});
