#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index';

const { program } = commander;

program
  .version('1.1.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  })
  .option('-f, --format [type]', 'output format', 'stylish');
program.parse(process.argv);
