import parse from './parsers';

const stateDifiner = {
  unchanged: '    ',
  added: '  + ',
  deleted: '  - ',
};

const makeString = (status, key, value) => `${stateDifiner[status]}${key}: ${value}\n`;
const getData = (pathToFile) => parse(pathToFile);
const getPropState = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export default (pathToFileBefore, pathToFileAfter) => {
  const before = getData(pathToFileBefore);
  const after = getData(pathToFileAfter);
  const mergeKeys = Object.keys({ ...before, ...after });
  const showDiff = mergeKeys.map((key) => {
    if (before[key] === after[key]) {
      return makeString('unchanged', key, before[key]);
    } if (!getPropState(before, key) && getPropState(after, key)) {
      return makeString('added', key, after[key]);
    } if (getPropState(before, key) && !getPropState(after, key)) {
      return makeString('deleted', key, before[key]);
    }
    return `${makeString('added', key, after[key])}${makeString('deleted', key, before[key])}`;
  });

  return `{\n${showDiff.join('')}}`;
};
