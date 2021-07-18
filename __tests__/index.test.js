import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const filesToCompare = [
  { before: 'before.json', after: 'after.json' },
  { before: 'before.yml', after: 'after.yaml' },
  { before: 'before.json', after: 'after.yaml' },
// { before: 'before.ini', after: 'after.ini' },
];

const resultStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
const resultPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
const resultJson = fs.readFileSync(getFixturePath('resultJSON.txt'), 'utf-8');

test.each(filesToCompare)('genDiff($before, $after)', ({ before, after }) => {
  expect(genDiff(getFixturePath(before), getFixturePath(after)))
    .toEqual(resultStylish);
  expect(genDiff(getFixturePath(before), getFixturePath(after), 'stylish'))
    .toEqual(resultStylish);
  expect(genDiff(getFixturePath(before), getFixturePath(after), 'plain'))
    .toEqual(resultPlain);
  expect(genDiff(getFixturePath(before), getFixturePath(after), 'json'))
    .toEqual(resultJson);
});
