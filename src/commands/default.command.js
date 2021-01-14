import {defaultTask} from "../tasks/default.task";

export async function defaultCommand(command, option) {
    await defaultTask(command, option);
}
