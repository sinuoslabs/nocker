import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import {promisify} from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false
    });
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
        options.template.toLowerCase()
    );

    options.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (e) {
        console.error('%s invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    console.log('copy docker file');
    await copyTemplateFiles(options);

    console.log('%s Docker file ready', chalk.green.bold('DONE'));
    return true;
}