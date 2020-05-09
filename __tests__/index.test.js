import fs from 'fs';
import genDiff from '../src/index';

const beforeJson = '__fixtures__/before.json';
const afterJson = '__fixtures__/after.json';
const beforeYaml = '__fixtures__/before.yml';
const afterYaml = '__fixtures__/after.yml';
const beforeIni = '__fixtures__/before.ini';
const afterIni = '__fixtures__/after.ini';
const result = fs.readFileSync('__fixtures__/result.txt', 'utf-8');

test('generate difference (flatten JSON)', () => {
  expect(genDiff(beforeJson, afterJson)).toEqual(result);
});
test('generate difference (flatten YAML)', () => {
  expect(genDiff(beforeYaml, afterYaml)).toEqual(result);
});
test('generate difference (flatten INI)', () => {
  expect(genDiff(beforeIni, afterIni)).toEqual(result);
});
