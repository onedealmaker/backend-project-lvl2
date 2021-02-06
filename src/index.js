import parse from './parsers';
import buildDiff from './diffBuilder';
import formatter from './formatters';

const getData = (pathToFile) => parse(pathToFile);
export default (pathToFileBefore, pathToFileAfter, format = 'stylish') => {
  const before = getData(pathToFileBefore);
  const after = getData(pathToFileAfter);
  const difference = buildDiff(before, after);
  console.log(before, after);
  console.log('before doge object', before.common.setting6.doge);
  console.log('after objects', after.common.setting6.doge, after.group3.deep.id);
  return formatter[format](difference);
};
