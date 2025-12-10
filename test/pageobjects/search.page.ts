import BasePage from "./base.page";
import {LogStep} from "../../src/utils/logger.helper";
import {AppiumDriver} from "webdriverio";
import {waitUntilElementIsVisible} from "../../src/utils/waitUntilElementIsVisible";
import {waitUntilElementsAreVisible} from "../../src/utils/waitUntilElemenstAreVisible";

class NotificationsPage extends BasePage {

    private searchField: string;
    private items: string;
    private driver: AppiumDriver;

    constructor(driver: AppiumDriver) {
        super();
        this.driver = driver;
        this.searchField = '//android.widget.EditText[@resource-id="org.fdroid.fdroid:id/search"]'
        this.items = '//androidx.recyclerview.widget.RecyclerView[@resource-id="org.fdroid.fdroid:id/app_list"]/android.view.ViewGroup'
    }

    public async search(query: string): Promise<void> {
        await this.enterTextAndSubmit(this.searchField, query);
    }

    public async countItemsInRecyclerView(): Promise<number> {
        const elements = await waitUntilElementsAreVisible(this.items);
        return elements.length;
    }
}
export default NotificationsPage;
