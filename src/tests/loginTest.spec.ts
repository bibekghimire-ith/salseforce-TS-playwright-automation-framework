import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { decrypt, encrypt } from "../utils/CryptoJSUtils";
import { encryptEnvFile, decryptEnvFile } from "../utils/EncryptEnvFiles";
import logger from "../utils/LoggerUtils";


// Using existing "page" fixture from playwright
test("Login test", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    // ! is used to make sure not NULL value -> Avoid undefined value / TS Error
    await loginPage.fillUsername(decrypt(process.env.username!));
    await loginPage.fillPassword(decrypt(process.env.password!));

    const homePage = await loginPage.clickLoginButton();
    await homePage.expectHomePageTitleToBeVisible();
    logger.info("Login Test has been completed");
});

// test.skip("ENV test", async ({ page }) => {
//     console.log(process.env.NODE_ENV);
//     console.log(process.env.username);
//     console.log(process.env.password);
//     encryptEnvFile()

// })