import arg from 'arg';

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

async function promptForMissingOptions(options) {
    const defaultTemplate = 'Simple';

    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate
        };
    }

    /**
     *
     * @type {*[]}
     */
    let questions = [];

    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: ['Simple', 'CQRS'],
            default: defaultTemplate
        })
    }
}


export function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    console.log(options);
}