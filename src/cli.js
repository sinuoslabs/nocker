import arg from 'arg';
import inquierer from "inquirer";
import {createDockerFile, runEnv, stopEnv} from './main';

/**
 *
 * @param rawArgs
 * @returns {{template: string, runInstall: (boolean|boolean)}}
 */
function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--install': Boolean,
            '--skip': Boolean,
            '--template': String,
            '--node': Number,
            '-i': Boolean,
            '-t': String,
            '-n': Number,
        },
        {
            argv: rawArgs.slice(2),
        },
    )

    return {
        skipPrompts: args['--skip'] || false,
        command: args._[0],
        runInstall: args['--install'] || false,
        nodeVersion: args['--node'],
        template: args['--template'],
    };
}

/**
 *
 * @param options
 * @returns {Promise<{template: (*|string)}>}
 */
async function promptForMissingOptions(options) {
    const defaultTemplate = 'Simple';
    const defaultVersion = '12';

    /**
     * Check if skipPrompts is defined
     * Or set default value
     */
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
            nodeVersion: options.nodeVersion || defaultVersion
        };
    }

    /**
     * Initialize questions variable
     *
     * @type {*[]}
     */
    let questions = [];

    /**
     * Check if template defined
     */
    if (!options.template) {
        questions.push({
            type: 'checkbox',
            name: 'template',
            message: 'Please choose which service you want to use',
            choices: [
                'CQRS',
                'Mysql',
                'Redis',
                'Memcached',
                'Postgres',
            ],
            default: defaultTemplate
        });
    }

    /**
     * Check if nodejs version defined
     */
    if (!options.nodeVersion) {
        questions.push({
            type: 'list',
            name: 'nodeVersion',
            message: 'Please choose node version for your project',
            choices: [12, 14, 15],
            default: defaultVersion
        });
    }


    /**
     * Save user answers
     *
     * @type {*}
     */
    const answers = await inquierer.prompt(questions);

    /**
     * Return user options
     */
    return {
        ...options,
        template: options.template || answers.template,
        nodeVersion: options.nodeVersion || answers.nodeVersion,
    }
}

/**
 * Execute CLI
 *
 * @param args
 */
export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    switch (true) {
        case options.command === 'install':
            options = await promptForMissingOptions(options);
            await createDockerFile(options);
            break;
        case options.command === 'up':
            await runEnv(options);
            break;
        case options.command === 'down':
            await stopEnv(options);
            break;
        default:
            break;
    }
}
