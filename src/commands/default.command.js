import {defaultTask} from "../tasks/default.task";

export async function defaultCommand(command) {
    await defaultTask(command);
}
