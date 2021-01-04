import arg from 'arg';
import inquierer from "inquirer";
import {createDockerFile} from './main';

/**
 *
 * @param rawArgs
 * @returns {{template: string, runInstall: (boolean|boolean)}}
 */
function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--install': Boolean,
            '--yes': Boolean,
            '-i': Boolean,
        },
        {
            argv: rawArgs.slice(2)
        },
    );

    return {
        skipPrompts: args['--yes'] || false,
        template: args._[0],
        runInstall: args['--install'] || false,
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
     * Check if nodejs version defined
     */
    if (!options.nodeVersion) {
        questions.push({
            type: 'list',
            name: 'nodeVersion',
            message: 'Please choose node version for your project',
            choices: ['12', '14', '15'],
            default: defaultVersion
        });
    }

    /**
     * Check if template defined
     */
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: [
                'Simple',
                'CQRS',
                'CQRS Mysql',
                'CQRS Mysql, Redis',
                'CQRS Mysql, Memcached, Redis',
                'CQRS Postgres',
                'CQRS Postgres, Redis',
                'CQRS Postgres, Memcached, Redis',
                'MySql',
                'MySql, Redis',
                'MySql, Memcached',
                'MySql, Memcached, Redis',
                'Postgres',
                'Postgres, Redis',
                'Postgres, Memcached',
                'Postgres, Memcached, Redis',
                'Memcached',
                'Redis'
            ],
            default: defaultTemplate
        });
    }

    /**
     * Check if runInstall is defined
     */
    if (!options.runInstall) {
        questions.push({
            type: 'confirm',
            name: 'runInstall',
            message: 'Initialize docker compose file',
            default: false,
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
        nodeVersion: options.nodeVersion || answers.nodeVersion,
        template: options.template || answers.template,
        runInstall: options.runInstall || answers.runInstall
    }
}

/**
 * Execute CLI
 *
 * @param args
 */
export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createDockerFile(options);
}
