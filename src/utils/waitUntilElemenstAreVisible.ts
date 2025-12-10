import { waitUntil } from "./waitUntil";
import { logger } from "./logger";

interface WaitOptions {
    retries?: number;
    waitTimeout?: number;
    waitInterval?: number;
    onRetry?: () => Promise<void>;
}

export async function waitUntilElementsAreVisible(
    locator: string | WebdriverIO.Locator,
    options: WaitOptions = {}
): Promise<WebdriverIO.ElementArray> {
    const {
        retries = 3,
        waitTimeout = 2000,
        waitInterval = 300,
        onRetry = async () => {}
    } = options;

    for (let attempt = 1; attempt <= retries; attempt++) {
        const elements = await $$(locator);
        const visibleElements = [];
        for (const el of elements) {
            const isVisible = await waitUntil(
                async () => await el.isDisplayed(),
                waitTimeout,
                waitInterval
            );
            if (isVisible) visibleElements.push(el);
        }
        if (visibleElements.length > 0) {
            return visibleElements;
        }
        await onRetry();
    }
}
