import {waitUntilElementIsVisible} from "../../src/utils/waitUntilElementIsVisible";
import {logger} from "../../src/utils/logger";
import {retry} from "../../src/utils/retry";


class BasePage {
    public async getText(selector: string): Promise<string> {
        logger.info(`Get text for element: ${selector}`);
        const messageElement = await waitUntilElementIsVisible(selector)
        try {
            await messageElement.waitForDisplayed({timeout: 5000});
            const text = await messageElement.getText();
            return text;
        } catch (error) {
            return "Element not found.";
        }
    }

    public async enterTextAndSubmit(locator: string, text: string): Promise<void> {
        logger.info(`Enter text: ${text}`);
        const inputField = await waitUntilElementIsVisible(locator);
        await inputField.clearValue();
        await inputField.setValue(text);

    }

    protected async click(locator: string): Promise<void> {
        await retry(
            async () => {
                const element = await waitUntilElementIsVisible(locator, {
                    retries: 3,
                    waitTimeout: 2000,
                    waitInterval: 300,
                    onRetry: async () => logger.warn(`Retrying wait for element: ${locator}`)
                });
                await element.click();
                return true;
            },
            (result) => result === true,
            3,
            500
        );

        logger.info(`✅ Clicked element: ${locator}`);
    }

}

export default BasePage;
