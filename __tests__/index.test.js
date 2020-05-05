import fs from 'fs';
import genDiff from '../src/index';

const before = '__fixtures__/before.json';
const after = '__fixtures__/after.json';
const result = fs.readFileSync('__fixtures__/result.txt', 'utf-8');

test('generate difference', () => {
  expect(genDiff(before, after)).toEqual(result);
});
