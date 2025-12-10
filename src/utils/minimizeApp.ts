import {driver} from "@wdio/globals";

export async function minimizeApp() {
    await driver.execute('mobile: backgroundApp', {
        seconds: 1,
    });
}