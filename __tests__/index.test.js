import fs from 'fs';
import genDiff from '../src/index';

const beforeJson = '__fixtures__/flatten/before.json';
const afterJson = '__fixtures__/flatten/after.json';
const beforeYaml = '__fixtures__/flatten/before.yml';
const afterYaml = '__fixtures__/flatten/after.yml';
const beforeIni = '__fixtures__/flatten/before.ini';
const afterIni = '__fixtures__/flatten/after.ini';
const result = fs.readFileSync('__fixtures__/flatten/result.txt', 'utf-8');

test('generate difference (flat JSON)', () => {
  expect(genDiff(beforeJson, afterJson)).toEqual(result);
});
test('generate difference (flat YAML)', () => {
  expect(genDiff(beforeYaml, afterYaml)).toEqual(result);
});
test('generate difference (flat INI)', () => {
  expect(genDiff(beforeIni, afterIni)).toEqual(result);
});
