import fs from 'fs';
import genDiff from '../src/index';

const beforeJson = '__fixtures__/before.json';
const afterJson = '__fixtures__/after.json';
const beforeYaml = '__fixtures__/before.yml';
const afterYaml = '__fixtures__/after.yml';
const result = fs.readFileSync('__fixtures__/result.txt', 'utf-8');

test('generate difference', () => {
  expect(genDiff(beforeJson, afterJson)).toEqual(result);
  expect(genDiff(beforeYaml, afterYaml)).toEqual(result);
  expect(genDiff(beforeJson, afterYaml)).toEqual(result);
});
