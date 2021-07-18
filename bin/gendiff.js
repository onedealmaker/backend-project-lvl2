#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index.js';

const program = new commander.Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .addOption(new commander.Option('-f, --format [type]', 'output format')
    .default('stylish', 'stylish')
    .choices(['stylish', 'plain', 'json']))
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console.log(
    genDiff(filepath1, filepath2, program.opts().format),
  ));

program.parse(process.argv);
