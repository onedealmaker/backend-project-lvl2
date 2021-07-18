import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
  ini: ini.parse,
};

export default (data, extension) => parsers[extension](data);
