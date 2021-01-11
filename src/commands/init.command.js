import {initTask} from "../tasks/init.task";

export async function initCommand(args) {
    await initTask(args);
}
