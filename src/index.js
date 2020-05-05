import path from 'path';
import fs from 'fs';

const stateDifiner = {
  unchanged: '    ',
  added: '  + ',
  deleted: '  - ',
};

const makeString = (status, key, value) => `${stateDifiner[status]}${key}: ${value}\n`;
const getData = (pathToFile) => {
  const absPath = path.isAbsolute(pathToFile)
    ? pathToFile
    : path.resolve(process.cwd(), pathToFile);

  return JSON.parse(fs.readFileSync(absPath, 'utf-8'));
};
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
