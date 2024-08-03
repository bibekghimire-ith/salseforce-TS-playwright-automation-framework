import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";


// Using existing "page" fixture from playwright
test("Login test", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername("qa-test@abc.com");
    await loginPage.fillPassword("Test@12345");

    const homePage = await loginPage.clickLoginButton();
    await homePage.expectHomePageTitleToBeVisible();
});