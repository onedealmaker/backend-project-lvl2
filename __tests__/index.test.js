import fs from 'fs';
import genDiff from '../src/index';

const before = '/home/alexander/Projects/gendiff/__tests__/before.json';
const after = '/home/alexander/Projects/gendiff/__tests__/after.json';
const result = fs.readFileSync('__tests__/result.txt', 'utf-8');

test('generate difference', () => {
  expect(genDiff(before, after)).toEqual(result);
});
