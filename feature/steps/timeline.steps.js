import 'jest';

import {
    defineFeature,
    loadFeature,
} from 'jest-cucumber';

const feature = loadFeature('./feature/features/timeline.feature');
const puppeteer = require('puppeteer');
let browser = null;
let page = null;

defineFeature(feature, test => {

    beforeEach(async () => {
        jest.setTimeout(1200000);
    });

    test('Trying view my routes', ({given, when, and, then}) => {

        given('I go to timeline page', async () => {
            browser = await puppeteer.launch({
                headless: false
            });

            page = await browser.newPage();
            await page.goto("http://localhost:3000/#/login", {
                waitUntil: 'networkidle2'
            });

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

            await page.waitForNavigation({
                waitUntil: 'networkidle2'
            });

            expect(page.url()).toBe("http://localhost:3000/#/welcome");

            await page.waitFor(1000);

            await page.goto("http://localhost:3000/#/timeline", {
                waitUntil: 'networkidle2'
            });

            expect(page.url()).toBe("http://localhost:3000/#/timeline")

        });


        when('I try to see a route', async () => {

            await page.waitFor(6000);

            await page.evaluate(() => {
                let btns = [...document.querySelectorAll("button")];
                console.log(btns)
                btns.forEach(function (btn) {
                    if (btn.innerText == "Abrir ruta")
                        btn.click();
                });
            });

        });

        then('I can see the route', async () => {
            await page.waitFor(1000);
            await page.waitForSelector("[id='button-close']", {visible: true});
            expect(page.url()).toBe("http://localhost:3000/#/timeline")
        });
    })

});