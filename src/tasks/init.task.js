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

/**
 * Copy file action
 *
 * @param options
 * @returns {Promise<*>}
 */
async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false
    });
}

/**
 * CLI install action
 *
 * @param options
 * @returns {Promise<boolean>}
 */
export async function initTask(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    const currentFileUrl = import.meta.url;
    const templateDir = path.resolve(new URL(currentFileUrl).pathname, '../../../stubs');

    options.templateDirectory = `${templateDir}`;

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

    console.log('%s File is created', chalk.green.bold('DONE'));
    return true;
}
