import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtils";
import ContactPage from "./ContactPage";

export default class HomePage {
    // private readonly homepageTitleSelector = "Setup";
    private readonly homepageTitleSelector = "Home | Salesforce";
    private readonly appLauncherName = "App Launcher"

    constructor(private page: Page) {}

    async expectHomePageTitleToBeVisible() {
        // const t = await this.page.get
        // // await expect(this.page.getByTitle(this.homepageTitleSelector)).toBeVisible({ timeout: 15000 });
        // const pageTitle = await this.page.title();
        // console.log(pageTitle);
        // expect(pageTitle).toBe(this.homepageTitleSelector);

        await expect(this.page.getByTitle("Setup", { exact: true})).toBeVisible({ timeout: 15000 })
            .catch((error) => {
                logger.error(`Failed to login: ${error}`);
                throw error;
            }).then(() => logger.info("Setup title is visible"));
    };

    async navigateToServicePage() {
        await this.page.getByRole('button', {name: this.appLauncherName}).click();
        await this.page.getByRole('option', { name: 'Service', exact: true }).click();
        await expect(this.page.getByTitle("Service", { exact: true})).toBeVisible({ timeout: 15000 });
        logger.info("Navigated to Service Tab");
    };

    async navigateToContactTab() {
        await expect(this.page.getByRole('link', { name: 'Contacts', exact: true })).toBeVisible();
        logger.info('Contacts tab is visible');
        await this.page.getByRole('link', { name: 'Contacts', exact: true }).click();
        logger.info('Contacts Tab is clicked');

        const contactPage = new ContactPage(this.page);
        return contactPage;
    };
}