import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
  '.ini': ini.parse,
};

export default (pathToFile) => {
  const data = fs.readFileSync(pathToFile, 'utf-8');
  const ext = path.extname(pathToFile);
  return parsers[ext](data);
};
