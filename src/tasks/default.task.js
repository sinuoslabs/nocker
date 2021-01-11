import execa from "execa";

export async function defaultTask(options) {
    try {
        if (! options) {
            await execa('docker-compose', ['up'], '-d')
        } else {
            await execa('docker-compose', [`${options}`])
        }
    } catch (e) {
        return Promise.reject(e.message);
    }
}
