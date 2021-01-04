import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import {promisify} from 'util';
import execa from 'execa';
import Listr from 'listr';
//import {projectInstall} from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function runDocker(options) {
    const result = await execa('docker-compose up', ['-d'], {
        cwd: options.targetDirectory
    });

    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize Install'))
    }


}

async function stopDocker(options) {
    const {result} = await execa('print down', {
        cwd: options.targetDirectory
    });

    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize Install'))
    }

    return;
}

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false
    });
}

export async function stopEnv(options) {
    const tasks = new Listr([
        {
            title: 'stop env',
            task: () => stopDocker(options),
            enabled: () => options.command
        },
    ]);

    await tasks.run();

    //console.log('%s Docker file ready', chalk.green.bold('DONE'));
    return true;
}

export async function createDockerFile(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    const currentFileUrl = import.meta.url;
    const templateDir = path.resolve(
        new URL(currentFileUrl).pathname,
        '../../stubs',
        options.template.toLowerCase().replace(/, | /gi, '-')
    );

    options.templateDirectory = `${templateDir}/${options.nodeVersion}`;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (e) {
        console.error('%s invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    const tasks = new Listr([
        {
            title: 'Create file',
            task: () => copyTemplateFiles(options),
        },
    ]);

    await tasks.run();

    console.log('%s Install successfully', chalk.green.bold('DONE'));
    return true;
}
