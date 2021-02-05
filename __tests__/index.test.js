import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
const fileNames = [
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
];
const resultStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
const resultPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
const resultJSON = fs.readFileSync(getFixturePath('resultJSON.txt'), 'utf-8');

test.each(fileNames)('generate difference (Stylish format)', (b, a) => {
  expect(genDiff(getFixturePath(b), getFixturePath(a), 'stylish')).toBe(resultStylish);
});
test.each(fileNames)('generate difference (Plain format)', (b, a) => {
  expect(genDiff(getFixturePath(b), getFixturePath(a), 'plain')).toBe(resultPlain);
});
test.each(fileNames)('generate difference (JSON format)', (b, a) => {
  expect(genDiff(getFixturePath(b), getFixturePath(a), 'json')).toBe(resultJSON);
});
