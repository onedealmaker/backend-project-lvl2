import parse from './parsers';
import buildDiff from './diffBuilder';
import formatter from './formatters';

const getData = (pathToFile) => parse(pathToFile);
export default (pathToFileBefore, pathToFileAfter, format = 'stylish') => {
  const before = getData(pathToFileBefore);
  const after = getData(pathToFileAfter);
  const difference = buildDiff(before, after);
  console.log('just format', format);
  console.log(formatter[format]);
  return formatter[format](difference);
};
