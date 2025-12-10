import {AppiumDriver} from "webdriverio";
import BasePage from "./base.page";

class LatestPage extends BasePage{

    constructor(driver: AppiumDriver) {
        super();
    }

    public async isAppDisplayed(appName: string): Promise<boolean> {
        const element = await $(`//android.widget.TextView[@text="${appName}"]`);
        await this.waitForElement(element);
        return await element.isDisplayed();
    }

}
export default LatestPage;
