import execa from "execa";
import { dockerIsRunningTask } from "./docker.task";

export async function defaultTask(command, option) {
    try {
        /**
         * Check if docker is running before.
         */
        await dockerIsRunningTask();

        /**
         * If command not defined run docker-compose ps
         */
        if (! command) {
            const { stdout } = await execa('docker-compose', ['ps']);

            if (stdout) {
                console.log(stdout);
            }
        } else {
            const subprocess = execa.command(`docker-compose ${command} ${option || ''}`);
            subprocess.stdout.pipe(process.stdout);

            const { stdout, stderr } = await subprocess;
            console.log(stdout || stderr);
        }
    } catch (e) {
        console.log(e.stderr || e);
    }
}
