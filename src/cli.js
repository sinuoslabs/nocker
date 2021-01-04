import arg from 'arg';
import inquierer from "inquirer";
import {createDockerFile, stopEnv} from './main';

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
            '--template': String,
            '--node': Number,
            '-i': Boolean,
            '-t': String,
        },
        {
            argv: rawArgs.slice(2),
        },
    )

    return {
        skipPrompts: args['--yes'] || false,
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
        case options.command === 'down:env' && !options.template:
            await stopEnv(options);
            break;
        case (options.command === 'install:env' && options.template === '') || (options.command === 'install:env' && options.template !== ''):
            options = await promptForMissingOptions(options);
            await createDockerFile(options);
            break;
        case options.command === 'up:env' && !options.template:
            console.log('up');
            break;
        default:
            break;
    }

}
