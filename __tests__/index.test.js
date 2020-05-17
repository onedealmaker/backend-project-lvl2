import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const fileNames = [
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
];
const result = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

test.each(fileNames)('generate difference', (b, a) => {
  expect(genDiff(getFixturePath(b), getFixturePath(a))).toBe(result);
});
