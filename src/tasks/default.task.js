import execa from "execa";
import Listr from "listr";
import chalk from "chalk";

async function executeCommand(options) {
    try {
        await execa('docker-compose', [`${options}`])
    } catch (e) {
        return Promise.reject(new Error('Failed to run docker-compose'));
    }
}

export async function defaultTask(options) {
    const tasks = new Listr([
        {
            title: 'Please wait command processing',
            task: () => executeCommand(options),
        },
    ]);

    await tasks.run();

    console.log('%s Install successfully', chalk.green.bold('DONE'));
    return true;
}
