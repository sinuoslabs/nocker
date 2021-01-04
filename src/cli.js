import arg from 'arg';
import inquierer from "inquirer";

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

    /**
     * Check if skipPrompts is defined
     * Or set default value
     */
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate
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
            choices: ['Simple', 'CQRS', 'MySql', 'Postgres', 'MySql-redis', 'Postgres-redis'],
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
    console.log(options);
}
