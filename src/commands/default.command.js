import {defaultTask} from "../tasks/default.task";
const colors = require('colors');

export async function defaultCommand(command) {
    console.log(command);
    await defaultTask(command)
        .catch((err) => console.log(`${err}`));
}
