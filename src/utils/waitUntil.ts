import {logger} from "./logger";

export async function waitUntilElementIsVisible(
    condition: () => Promise<boolean>,
    timeout = 3000,
    interval = 300
): Promise<boolean> {

    try {
        return await browser.waitUntil(async () => {
            try {
                return await condition();
            } catch {
                return false;
            }
        }, {
            timeout,
            interval,
            timeoutMsg: "Element was not visible after expected timeout",
        });
    } catch {
        return false;
    }
}
