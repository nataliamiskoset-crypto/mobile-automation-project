import {AppiumDriver} from 'webdriverio';

class NotificationsPage {
    // Element selectors
    private allowButton: string;
    private dontAllowButton: string;
    private driver: AppiumDriver; // Dodaj właściwość drivera

    constructor(driver: AppiumDriver) {
        this.driver = driver; // Inicjalizuj drivera
        this.allowButton = 'android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_button"]';
        this.dontAllowButton = '//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_deny_button"]';
    }

    public async getMessageText(): Promise<string> {
        const messageElement = await driver.$('~com.android.permissioncontroller:id/permission_message');

        try {
            await messageElement.waitForDisplayed({ timeout: 5000 }); // Czekaj maksymalnie 5 sekund
            const text = await messageElement.getText();
            return text;
        } catch (error) {
            return "Element not found.";
        }
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
