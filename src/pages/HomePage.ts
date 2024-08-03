import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtils";

export default class HomePage {
    // private readonly homepageTitleSelector = "Setup";
    private readonly homepageTitleSelector = "Home | Salesforce";

    constructor(private page: Page) {}

    async expectHomePageTitleToBeVisible() {
        // const t = await this.page.get
        // // await expect(this.page.getByTitle(this.homepageTitleSelector)).toBeVisible({ timeout: 15000 });
        // const pageTitle = await this.page.title();
        // console.log(pageTitle);
        // expect(pageTitle).toBe(this.homepageTitleSelector);

        await expect(this.page.getByTitle("Setup", { exact: true})).toBeVisible()
            .catch((error) => {
                logger.error(`Failed to login: ${error}`);
                throw error;
            }).then(() => logger.info("Setup title is visible"));
    };
}