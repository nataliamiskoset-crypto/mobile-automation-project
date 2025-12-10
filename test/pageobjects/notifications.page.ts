import {AppiumDriver} from 'webdriverio';
import BasePage from "./base.page";

class NotificationsPage extends BasePage {
    // Element selectors
    private allowButton: string;
    private dontAllowButton: string;
    private permissionMessage: string;
    private driver: AppiumDriver;

    constructor(driver: AppiumDriver) {
        super();
        this.driver = driver;
        this.permissionMessage = '//android.widget.TextView[@resource-id="com.android.permissioncontroller:id/permission_message"]'
        this.allowButton = '//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]';
        this.dontAllowButton = '//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_deny_button"]';
    }

    public async getMessageText(): Promise<string> {
        return await this.getText(this.permissionMessage)
    }

    public async clickAllowButton(): Promise<void> {
        const allowButtonElement = await this.driver.$(this.allowButton);
        await allowButtonElement.click();
    }

    public async clickDontAllowButton(): Promise<void> {
        const dontAllowButtonElement = await this.driver.$(this.dontAllowButton);
        await dontAllowButtonElement.click();
    }
}

export default NotificationsPage;
