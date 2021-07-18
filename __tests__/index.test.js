import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const filesToCompare = [
  { file1: 'file1.json', file2: 'file2.json' },
  { file1: 'file1.yml', file2: 'file2.yml' },
  { file1: 'file1.json', file2: 'file2.yml' },
// { before: 'before.ini', after: 'after.ini' },
];

const resultStylish = fs.readFileSync(getFixturePath('result_stylish.txt'), 'utf-8');
const resultPlain = fs.readFileSync(getFixturePath('result_plain.txt'), 'utf-8');
// const resultJson = fs.readFileSync(getFixturePath('resultJSON.txt'), 'utf-8');

test.each(filesToCompare)('genDiff($file1, $file2)', ({ file1, file2 }) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2)))
    .toEqual(resultStylish);
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'stylish'))
    .toEqual(resultStylish);
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'plain'))
    .toEqual(resultPlain);
  // expect(genDiff(getFixturePath(file1), getFixturePath(file2), 'json'))
  //   .toEqual(resultJson);
});
