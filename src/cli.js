import {installCommand} from "./commands/install.command";
import {upCommand} from "./commands/up.command";
import {downCommand} from "./commands/down.command";
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
  nocker <command> [options]

${colors.yellow('commands can be:')}
  ${colors.green('install')}:      used to init env
  ${colors.green('up')}:           used to run env
  ${colors.green('down')}:         used to stop env
  ${colors.green('prod')}:         update env to past in production
`;

  console.log(usageText)
}

/**
 * Execute CLI
 *
 * @param args
 */
export async function cli(args) {

    switch (args[2]) {
        case 'help':
            usage()
            break
        case 'install':
            await installCommand(args);
            break
        case 'up':
            await upCommand(args);
            break
        case 'down':
            await downCommand(args);
            break
        default:
            usage()
    }
}
