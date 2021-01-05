import execa from "execa";
import Listr from "listr";
import chalk from "chalk";

async function runDocker(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    try {
        await execa('docker-compose', ['up -d'], {
            cwd: options.targetDirectory
        })
    } catch (e) {
        return Promise.reject(new Error('Failed to run docker-compose'));
    }
}

/**
 * CLI up action
 *
 * @param options
 * @returns {Promise<boolean>}
 */
export async function upTask(options) {
    const tasks = new Listr([
        {
            title: 'Run env',
            task: () => runDocker(options),
        },
    ]);

    await tasks.run();

    console.log('%s Docker running', chalk.green.bold('DONE'));
    return true;
}