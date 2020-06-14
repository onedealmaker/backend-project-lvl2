import program from 'commander';
import { version, description } from '../package.json';
import parse from './parsers';
import buildDiff from './diffBuilder';
import stylish from './formatters/stylish';

const getData = (pathToFile) => parse(pathToFile);
export const genDiff = (pathToFileBefore, pathToFileAfter, formatter = stylish) => {
  const before = getData(pathToFileBefore);
  const after = getData(pathToFileAfter);
  const difference = buildDiff(before, after);
  return formatter(difference);
};

export default () => {
  program
    .version(version)
    .description(description)
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig));
    })
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);
};
