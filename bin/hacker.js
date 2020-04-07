#! /usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const updateNotifier = require('update-notifier');

updateNotifier({ pkg }).notify({ isGlobal: true });

program
    .version(pkg.version)
    .command('latest', "See all the latest News")
    .command('top', "See whats at the top of hacker news")
    .command('best', 'The best of hacker news');



program.parse(process.argv);

module.exports.obj = program.number;