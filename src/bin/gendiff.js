#!/usr/bin/env node
import { version, description } from '../../package.json';
import gendiff from '..';

const { program } = require('commander');

program
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig));
  })
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
