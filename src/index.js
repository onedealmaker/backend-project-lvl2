import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './diffBuilder.js';
import formatter from './formatters/index.js';

const getPath = (fileName) => path.resolve(process.cwd(), fileName);
const getData = (fileName) => {
  const filePath = getPath(fileName);
  const extension = path.extname(filePath).slice(1);
  return parse(fs.readFileSync(filePath, 'utf-8'), extension);
};
export default (pathToFileBefore, pathToFileAfter, format = 'stylish') => {
  const before = getData(pathToFileBefore);
  const after = getData(pathToFileAfter);
  const difference = buildDiff(before, after);
  return formatter(format, difference);
};
