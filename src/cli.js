import {installCommand} from "./commands/install.command";

// usage represents the help guide
const usage = function () {
    const usageText = `
     _   _ _____ _____  _   __ ___________ 
    | \\ | |  _  /  __ \\| | / /|  ___| ___ \\
    |  \\| | | | | /  \\/| |/ / | |__ | |_/ /
    | . \` | | | | |    |    \\ |  __||    / 
    | |\\  \\ \\_/ / \\__/\\| |\\  \\| |___| |\\ \\ 
    \\_| \\_/\\___/ \\____/\\_| \\_/\\____/\\_| \\_|

  nocker helps you setup you docker environment.

  usage:
    nocker <command>

    commands can be:

    install:      used to init env
    up:           used to run env
    down:         used to stop env
  `

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
            break
        case 'down':
            break
        default:
            usage()
    }
}
