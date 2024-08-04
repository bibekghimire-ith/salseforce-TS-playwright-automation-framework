import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import logger from "../utils/LoggerUtils";
import { decrypt } from "../utils/CryptoJSUtils";
import { convertCsvFileToJsonFile } from "../utils/csvToJsonUtils";

var fileName = "../testdata/contact_data.csv";
const cdata = convertCsvFileToJsonFile(fileName);

cdata.forEach((contact, index) => {
    test(`Create new Contact - ${contact.fname, contact.lname}`, async ({ page }) => {
        logger.info("Test for New Contact creation is started...");
        const loginPage = new LoginPage(page);
    
        await loginPage.navigateToLoginPage();
        await loginPage.fillUsername(decrypt(process.env.username!));
        await loginPage.fillPassword(decrypt(process.env.password!));
    
        const homePage = await loginPage.clickLoginButton();
        await homePage.expectHomePageTitleToBeVisible();
        await homePage.navigateToServicePage();
        const contactPage = await homePage.navigateToContactTab();
        await contactPage.createNewContact(contact.fname, contact.lname);
        await contactPage.expectContactLabelContainsFirstANDLastName(contact.fname, contact.lname);
    });
});


test.skip("Create new Contact", async ({ page }) => {
    logger.info("Test for New Contact creation is started...");
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.username!));
    await loginPage.fillPassword(decrypt(process.env.password!));

    const homePage = await loginPage.clickLoginButton();
    await homePage.expectHomePageTitleToBeVisible();
    await homePage.navigateToServicePage();
    const contactPage = await homePage.navigateToContactTab();
    const contact = {"fname": "hello", "lname": "helli"};
    await contactPage.createNewContact(contact.fname, contact.lname);
    await contactPage.expectContactLabelContainsFirstANDLastName(contact.fname, contact.lname);
});