import fs from 'fs';
import genDiff from '../src/index.js';

const before = JSON.parse(fs.readFileSync('__tests__/before.json', 'utf-8'));
const after = JSON.parse(fs.readFileSync('__tests__/after.json', 'utf-8'));
const result = fs.readFileSync('__tests__/result.txt', 'utf-8');

test('generate difference', () => {
  expect(genDiff(before, after)).toEqual(result);
});
