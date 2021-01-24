import program from 'commander';
import { version, description } from '../package.json';
import parse from './parsers';
import buildDiff from './diffBuilder';
import formatter from './formatters/index';

const getData = (pathToFile) => parse(pathToFile);
export const genDiff = (pathToFileBefore, pathToFileAfter, format) => {
  console.log(format);
  const before = getData(pathToFileBefore);
  const after = getData(pathToFileAfter);
  const difference = buildDiff(before, after);
  return formatter[format](difference);
};

export default () => {
  program
    .version(version)
    .description(description)
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log 
      console.log(genDiff(firstConfig, secondConfig, program.format));
    })
    .option('-f, --format [type]', 'output format', 'stylish')
    .parse(process.argv);
};
