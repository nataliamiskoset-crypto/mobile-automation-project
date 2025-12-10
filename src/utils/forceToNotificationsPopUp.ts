import NotificationsPage from "../../test/pageobjects/notifications.page";
import {expect} from "@wdio/globals";
import {minimizeApp} from "./minimizeApp";

export async function forceToNotificationsPopUp(notificationsPage: NotificationsPage) {
    await minimizeApp()
    const notificationsMessage = await notificationsPage.getMessageText();
    expect(notificationsMessage).toEqual("Allow F-Droid to send you notifications?");
    await notificationsPage.clickAllowButton();
}
