import { waitUntil } from "./waitUntil";
import {logger} from "./logger";

export async function waitUntilElementGone(
    locator: string | WebdriverIO.Locator,
    options = {
        retries: 3,
        waitTimeout: 2000,
        waitInterval: 300,
        onRetry: async () => {}
    }
): Promise<boolean> {

    const { retries, waitTimeout, waitInterval, onRetry } = options;

    for (let attempt = 1; attempt <= retries; attempt++) {
        const element = await $(locator);
        const gone = await waitUntil(
            async () => !(await element.isDisplayed().catch(() => false)),
            waitTimeout,
            waitInterval
        );
        if (gone) {
            return true;
        }
        await onRetry();
    }

    return false;
}
