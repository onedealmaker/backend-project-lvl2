import parse from './parsers';
import buildDiff from './diffBuilder';
import formatter from './formatters/index';

const getData = (pathToFile) => parse(pathToFile);
export default (pathToFileBefore, pathToFileAfter, format) => {
  const before = getData(pathToFileBefore);
  const after = getData(pathToFileAfter);
  const difference = buildDiff(before, after);
  return formatter[format](difference);
};
