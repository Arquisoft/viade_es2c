import 'jest';

import {
    defineFeature,
    loadFeature,
} from 'jest-cucumber';

const feature = loadFeature('./feature/features/login.feature');
const puppeteer = require('puppeteer');
let browser = null;
let page = null;

defineFeature(feature, test => {

    beforeEach(async () => {
        jest.setTimeout(1200000);
    });

    test('Trying to log in', ({given, when, and, then}) => {

        given('I will log ing', async () => {
            browser = await puppeteer.launch({
                headless: false
            });

            page = await browser.newPage()
            await page.goto("http://localhost:3000/#/login", {
                waitUntil: 'networkidle2'
            });

        });

        when('I write my webID', async () => {

            await page.waitForSelector(".sc-EHOje.cffgrt");
            await page.type(".sc-EHOje.cffgrt", "https://viadeees2c.solid.community/profile/card#me");

            await page.evaluate(() => {
                let btns = [...document.querySelectorAll("button")];
                btns.forEach(function (btn) {
                    if (btn.innerText == "Iniciar sesión") {
                        btn.click();
                    }

                });
            });

            await page.waitForNavigation({
                waitUntil: 'networkidle2'
            });

        });

        and('I fill the form', async () => {

            await page.waitForSelector("[id='username']", {visible: true});
            await page.type("[id='username']", "viadeees2c");

            await page.waitFor(500);
            await page.waitForSelector("[id='password']", {visible: true});
            await page.type("[id='password']", "viades2cviades2cviades2c", {visible: true});

            await page.waitFor(500);

            await page.evaluate(() => {
                let btns = [...document.querySelector(".form-horizontal.login-up-form").querySelectorAll("button")];
                btns.forEach(function (btn) {
                    if (btn.innerText == "Log In")
                        btn.click();
                });
            });

        });

        then('sends us to the welcome page', async () => {

            await page.waitForNavigation({
                waitUntil: 'networkidle2'
            });

            expect(page.url()).toBe("http://localhost:3000/#/welcome")

        });
    });
});