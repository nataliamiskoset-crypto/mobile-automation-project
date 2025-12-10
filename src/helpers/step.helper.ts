import SearchPage from "../../test/pageobjects/search.page";
import {driver, expect} from "@wdio/globals";

export async function searchApplication(
    searchPage: SearchPage,
    application: String,
    minResults: String
) {
    await searchPage.search(application);
    const countItemsInRecyclerView = await searchPage.countItemsInRecyclerView();
    expect(countItemsInRecyclerView).toBeGreaterThanOrEqual(minResults);
}




