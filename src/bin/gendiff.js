#!/usr/bin/env node
import { version, description } from '../../package.json';

const { program } = require('commander');

program
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .action(function (firstConfig, secondConfig) {
    console.log(`${firstConfig}; ${secondConfig}`);
  })
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
