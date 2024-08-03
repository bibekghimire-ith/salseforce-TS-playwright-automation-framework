import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";


// Using existing "page" fixture from playwright
test("Login test", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    // ! is used to make sure not NULL value -> Avoid undefined value / TS Error
    await loginPage.fillUsername(process.env.username!);
    await loginPage.fillPassword(process.env.password!);

    const homePage = await loginPage.clickLoginButton();
    await homePage.expectHomePageTitleToBeVisible();
});

// test("ENV test", async ({ page }) => {
//     console.log(process.env.NODE_ENV);
//     console.log(process.env.username);
//     console.log(process.env.password);
// })