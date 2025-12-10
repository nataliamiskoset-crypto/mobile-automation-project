import { waitUntil } from "./waitUntil";
import {logger} from "./logger";

export async function waitUntilElementIsVisible(
    locator: string | WebdriverIO.Locator,
    options = {
        retries: 3,
        waitTimeout: 2000,
        waitInterval: 300,
        onRetry: async () => {}
    }
): Promise<WebdriverIO.Element> {

    const { retries, waitTimeout, waitInterval, onRetry } = options;

    for (let attempt = 1; attempt <= retries; attempt++) {
        const element = await $(locator);
        const visible = await waitUntil(
            async () => (await element.isDisplayed()),
            waitTimeout,
            waitInterval
        );
        if (visible) {
            return element;
        }
        await onRetry();
    }

    return false;
}
