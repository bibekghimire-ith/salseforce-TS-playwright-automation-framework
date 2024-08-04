import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtils";

export default class ContactPage {
    private readonly contactLinkLocator = "Contacts";
    private readonly newButtonLocator = 'New';
    private readonly firstNameTextFieldLocator = "First Name";
    private readonly lastNameTextFieldLocator = "Last Name";
    private readonly saveButtonLocator = "Save";
    private readonly contactFullNameLabelLocator = "lightning-formatted-name";

    constructor(private page: Page) {}

    async createNewContact(fname: string, lname:string) {
        await this.page.getByRole("button", { name: this.newButtonLocator, exact: true }).click();
        logger.info("New Button is clicked");
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).fill(fname);
        logger.info(`First name value filled as ${fname}`);
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).fill(lname);
        logger.info(`Last name value filled as ${lname}`);
        await this.page.getByRole("button", { name: this.saveButtonLocator, exact: true }).click()
            .catch((error) => {
                logger.error(`Error in clicking save button: ${error}`);
                throw error;
            })
            .then(() => logger.info("Save Button is clicked"));
    };

    async expectContactLabelContainsFirstANDLastName(fname: string, lname:string) {
        await expect(this.page.locator(this.contactFullNameLabelLocator)).toContainText(`${fname} ${lname}`);
        logger.info(`New contact created and ${fname} ${lname} is visible`);
        await this.page.getByRole('link', { name: this.contactLinkLocator, exact: true }).click();
    };
}