import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const getJsonData = (absPath) => JSON.parse(fs.readFileSync(absPath, 'utf-8'));
const getYamlData = (absPath) => yaml.load(fs.readFileSync(absPath, 'utf8'));
const getIniData = (absPath) => ini.parse(fs.readFileSync(absPath, 'utf-8'));

export default (pathToFile) => {
  const absPath = path.isAbsolute(pathToFile)
    ? pathToFile
    : path.resolve(process.cwd(), pathToFile);

  if (path.extname(absPath) === '.yml') {
    return getYamlData(absPath);
  }
  if (path.extname(absPath) === '.ini') {
    return getIniData(absPath);
  } return getJsonData(absPath);
};
