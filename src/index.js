import program from 'commander';
import parse from './parsers';
import buildDiff from './diffBuilder';
import formatter from './formatters/index';

const getData = (pathToFile) => parse(pathToFile);
export const genDiff = (pathToFileBefore, pathToFileAfter, format) => {
  const before = getData(pathToFileBefore);
  const after = getData(pathToFileAfter);
  const difference = buildDiff(before, after);
  return formatter[format](difference);
};

export default () => {
  program
    .version('1.1.1', '-V, --version', 'output the version number')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(genDiff(firstConfig, secondConfig, program.format));
    })
    .option('-f, --format [type]', 'output format', 'stylish')
    .parse(process.argv);
};
