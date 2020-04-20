import genDiff from '../src/index.js';

const before = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};
const after = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
};

const difference = {
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
};

test('generate difference', () => {
  expect(genDiff(before, after)).toEqual('olleh');
  expect(reverse('')).toEqual('');
});
