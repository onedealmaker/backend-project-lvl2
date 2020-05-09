import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const getJsonData = (absPath) => JSON.parse(fs.readFileSync(absPath, 'utf-8'));
const getYamlData = (absPath) => yaml.safeLoad(fs.readFileSync(absPath, 'utf8'));

export default (pathToFile) => {
  const absPath = path.isAbsolute(pathToFile)
    ? pathToFile
    : path.resolve(process.cwd(), pathToFile);

  if (path.extname(absPath) === '.yml') {
    return getYamlData(absPath);
  }

  return getJsonData(absPath);
};
