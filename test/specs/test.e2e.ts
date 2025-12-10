import NotificationsPage from "../pageobjects/notifications.page";
import MenuPage from "../pageobjects/menu.page";
import LatestPage from "../pageobjects/latests.page";
import {driver, expect} from "@wdio/globals";
import HomePage from "../pageobjects/home.page";
import searchPage from "../pageobjects/search.page";
import SearchPage from "../pageobjects/search.page";
import * as sea from "node:sea";
import {browser} from "webdriverio";
import { searchApplication} from "../../src/helpers/step.helper";
import {forceToNotificationsPopUp} from "../../src/utils/forceToNotificationsPopUp";

const searchCases = [
    {term: 'Running', minResults: 3},
    {term: 'freeDoom', minResults: 1},
    {term: 'Cycling', minResults: 3},
];

describe('Search application', () => {
    it('should open search page', async () => {
        const homePage = new HomePage(driver);
        const notificationsPage = new NotificationsPage(driver);
        await forceToNotificationsPopUp(notificationsPage);
        await homePage.open()
        await homePage.clickSearchLoop()
    });

    searchCases.forEach(({term, minResults}) => {
        it(`should show at least ${minResults} applications for "${term}"`, async () => {
            const searchPage = new SearchPage(driver);
            await searchApplication(searchPage, term, minResults)
        });
    });
});