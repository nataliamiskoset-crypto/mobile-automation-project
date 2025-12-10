import BasePage from "./base.page";
import {logger} from "../../src/utils/logger";
import {AppiumDriver} from "webdriverio";
import {waitUntilElementGone} from "../../src/utils/waitUntilElementGone";
import {retry} from "../../src/utils/retry";

class HomePage extends BasePage {
    private searchLoop: string;
    private driver: AppiumDriver;
    private missingApplicationsMessage: string;

    constructor(driver: AppiumDriver) {
        super()
        this.driver = driver
        this.searchLoop = '//android.widget.ImageButton[@content-desc="Search"]';
        this.missingApplicationsMessage = '//android.widget.TextView[@resource-id="org.fdroid.fdroid:id/empty_state"]';
    }

    public async clickSearchLoop(): Promise<void> {
        await this.click(this.searchLoop);
    }

    public async open(): Promise<this> {
        const isLoaded = await this.homePageIsLoaded();
        if (!isLoaded) {
            logger.warn("⚠️ HomePage was not loaded, which may affect the reliability of this test case.");
        }
        return this;
    }

    protected async homePageIsLoaded(): Promise<void> {
        await retry(
            async () => {
                await waitUntilElementGone(this.missingApplicationsMessage);
                return true;
            },
            (result) => result === true,
            3,
            500
        );

        logger.info("🏠 Home page is fully loaded.");    }
}

export default HomePage;
