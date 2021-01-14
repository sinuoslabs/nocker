import execa from "execa";

export async function dockerIsRunningTask() {
    const { failed } = await execa('docker', ['info'])
        .catch((e) => {
            if (e.failed) {
                return Promise.reject('Docker is not running.');
            }
        });

    if (!failed) {
        return Promise.resolve(process);
    }
}
