import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const filesToCompare = [
  { file1: 'before.json', file2: 'after.json' },
  // { file1: 'before.yml', file2: 'after.yml' },
  // { file1: 'before.json', file2: 'after.yml' },
];

const resultStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
// const resultPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
// const resultJSON = fs.readFileSync(getFixturePath('resultJSON.txt'), 'utf-8');

test.each(filesToCompare)('genDiff($file1, $file2)', ({ file1, file2 }) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2)))
    .toEqual(resultStylish);
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'stylish'))
    .toEqual(resultStylish);
  // expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'plain'))
  //   .toEqual(resultPlain);
  // expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'json'))
  //   .toEqual(resultJSON);
});
