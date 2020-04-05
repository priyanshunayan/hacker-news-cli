const program = require('commander');
const pkg = require('../package.json');
const configure = require('../commands/configure')
program.version(pkg.version);


program.command('consumer')
    .description("This is a cli")
    .action(() => {
        configure.consumer();
    })


program.parse(process.argv);




if (process.argv.slice(2).length) {
    program.outputHelp();
}