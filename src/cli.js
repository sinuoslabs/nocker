import { initCommand } from "./commands/init.command";
import { defaultCommand } from "./commands/default.command";

/**
 * Execute CLI
 *
 * @param args
 */
export async function cli(args) {
    const requirements = args.slice(2);
    const command = requirements.shift();
    const option = requirements.pop();

    switch (command) {
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
            console.log('redis command')
            break
        case 'mysql':
            console.log('MySql command')
            break
        case 'pgsql':
            console.log('Postgres command')
            break
        case 'bash':
            await bashCommand();
            break
        default:
            await defaultCommand(command, option)
    }
}
