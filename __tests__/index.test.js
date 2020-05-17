import fs from 'fs';
import genDiff from '../src/index';

const flatData = [
  ['__fixtures__/flatten/before.json', '__fixtures__/flatten/after.json'],
  ['__fixtures__/flatten/before.yml', '__fixtures__/flatten/after.yml'],
  ['__fixtures__/flatten/before.ini', '__fixtures__/flatten/after.ini'],
];
const nestedData = [
  ['__fixtures__/nested/before.json', '__fixtures__/nested/after.json'],
  ['__fixtures__/nested/before.yml', '__fixtures__/nested/after.yml'],
  ['__fixtures__/nested/before.ini', '__fixtures__/nested/after.ini'],
];
const result = {
  flat: fs.readFileSync('__fixtures__/flatten/result.txt', 'utf-8'),
  tree: fs.readFileSync('__fixtures__/nested/result.txt', 'utf-8'),
};

test.each(flatData)('generate difference (flat)', (a, b) => {
  expect(genDiff(a, b)).toBe(result.flat);
});
test.each(nestedData)('generate difference (nested)', (a, b) => {
  expect(genDiff(a, b)).toBe(result.tree);
});
