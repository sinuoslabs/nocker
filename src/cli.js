import {initCommand} from "./commands/init.command";
import {defaultCommand} from "./commands/default.command";
const colors = require('colors');

// usage represents the help guide
const usage = function () {
  const usageText = `${colors.rainbow(`
_   _ _____ _____  _   __ ___________ 
| \\ | |  _  /  __ \\| | / /|  ___| ___ \\
|  \\| | | | | /  \\/| |/ / | |__ | |_/ /
| . \` | | | | |    |    \\ |  __||    / 
| |\\  \\ \\_/ / \\__/\\| |\\  \\| |___| |\\ \\ 
\\_| \\_/\\___/ \\____/\\_| \\_/\\____/\\_| \\_|
`)}
nocker helps you setup you docker environment.

${colors.yellow('usage:')}
  nocker <command>

${colors.yellow('commands can be:')}
  ${colors.green('init')}:         used to init env
  ${colors.green('prod')}:         update env to past in production
  ${colors.green('npm')}:          run npm command
  ${colors.green('redis')}:        run redis command
  ${colors.green('mysql')}:        run mysql command
  ${colors.green('help')}:         to see nocker usage
`;

  console.log(usageText)
}

/**
 * Execute CLI
 *
 * @param args
 */
export async function cli(args) {
    const requirements = args.slice(2);
    const command = requirements.shift();

    switch (command) {
        case 'help':
        case '--help':
        case '-h':
            usage()
            break
        case 'init':
            await initCommand(args);
            break
        case 'prod':
            console.log('prod command')
            break
        case 'npm':
            console.log('npm command')
            break
        case 'redis':
            console.log('reedis command')
            break
        case 'mysql':
            console.log('MySql command')
            break
        case 'pgsql':
            console.log('Postgres command')
            break
        default:
            await defaultCommand(command)
    }
}
