import {installCommand} from "./commands/install.command";
import {upCommand} from "./commands/up.command";
import {downCommand} from "./commands/down.command";
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
  ${colors.green('install')}:      used to init env
  ${colors.green('up')}:           used to run env
  ${colors.green('down')}:         used to stop env
  ${colors.green('prod')}:         update env to past in production
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
        case 'install':
            await installCommand(args);
            break
        default:
            await defaultCommand(command)
    }
}
