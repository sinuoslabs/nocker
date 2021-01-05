import arg from "arg";
import inquierer from "inquirer";
import {installTask} from "../tasks/install.task";

function parseArgumentsIntoOption(rawArgs) {
    const args = arg(
        {
            '--skip': Boolean,
            '--template': String,
            '--node': Number,
        },
        {
            argv: rawArgs.slice(2),
        },
    )

    return {
        skipPrompts: args['--skip'] || false,
        command: args._[0],
        nodeVersion: args['--node'],
        template: args['--template'],
    };
}

async function missingOptions(options) {
    const defaultTemplate = 'Mysql';
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

export async function installCommand(args) {
    let options = parseArgumentsIntoOption(args);
    options = await missingOptions(options);
    await installTask(options);
}