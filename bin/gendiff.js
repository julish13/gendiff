#!/usr/bin/env node

import program from 'commander';
import gendiff from '../src/gendiff.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  })
  .parse(process.argv);
