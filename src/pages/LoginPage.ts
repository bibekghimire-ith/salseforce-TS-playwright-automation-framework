import { Page } from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtils";

export default class LoginPage {
    private readonly usernameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginButtonSelector = "#Login";

    constructor(private page: Page) {

    }

    async navigateToLoginPage() {
        await this.page.goto('/');
        logger.info("Navigated to the login page");
    }

    async fillUsername(username: string) {
        await this.page.locator(this.usernameInputSelector).fill(username);
        logger.info("Filled the username field");
    }

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInputSelector).fill(password);
        logger.info("Filled the password field");
    }

    async clickLoginButton() {
        await this.page
            .locator(this.loginButtonSelector)
            .click()
            .catch((error) => {
                logger.error(`Error clicking login button: ${error}`);
                throw error;   // Rethrow error if needed
            }).then(() => logger.info("Clicked the login button"));
        
        const homePage = new HomePage(this.page);
        return homePage;
    }

}
