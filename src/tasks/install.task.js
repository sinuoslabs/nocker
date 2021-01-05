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
export async function installTask(options) {
    /**
     * Throw exception when user selected two database
     */
    if (options.template.includes("Mysql") && options.template.includes("Postgres")) {
        console.error('%s you selected two database service', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd(),
    };

    const currentFileUrl = import.meta.url;
    const templateDir = path.resolve(
        new URL(currentFileUrl).pathname,
        '../../../stubs',
        ((typeof options.template) === 'array')
            ? options.template.join('-').toLowerCase().replace(/, | /gi, '-')
            : options.template.toLowerCase().replace(/, | /gi, '-')
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