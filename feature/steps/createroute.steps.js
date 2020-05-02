import 'jest';

import {
    defineFeature,
    loadFeature,
} from 'jest-cucumber';

const feature = loadFeature('./feature/features/createroute.feature');
const puppeteer = require('puppeteer');
let browser = null;
let page = null;

defineFeature(feature, test => {

    beforeEach(async () => {
        jest.setTimeout(1200000);
    });

    test('Trying create route with map', ({given, when, and, then}) => {

        given('I go to create route with page', async () => {
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
            await page.type("[id='username']", "viades2c");

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

            expect(page.url()).toBe("http://localhost:3000/#/welcome")

        });


        when('I fill the title and description and I upload a video and a image', async () => {

            await page.goto("http://localhost:3000/#/createroute", {
                waitUntil: 'networkidle2'
            });

            await page.waitFor(500);

            await page.waitForSelector("[id='input-title']", {visible: true});
            await page.type("[id='input-title']", "Pupeteer ");

            await page.waitFor(500);

            await page.waitForSelector("[id='input-description']", {visible: true});
            await page.type("[id='input-description']", "Pupeteer");

            await page.waitFor(500);

            const path = require('path');
            const imgPath = path.relative(process.cwd(), __dirname + '/imagen.png');
            const input_img = await page.$("[id='input-img']");
            await input_img.uploadFile(imgPath);
            await input_img.evaluate(upload => upload.dispatchEvent(new Event('change', {bubbles: true})));
            await page.waitFor(1000);

            const videoPath = path.relative(process.cwd(), __dirname + '/video.mp4');
            const input_video = await page.$("[id='input-video']");
            await input_video.uploadFile(videoPath);
            await input_video.evaluate(upload => upload.dispatchEvent(new Event('change', {bubbles: true})));
            await page.waitFor(1500);


        });

        and('I put the markers on the map and I save the route', async () => {

            await page.evaluate(() => {
                window.scrollBy(0, window.innerHeight);
            });

            await page.waitFor(1000);

            await page.mouse.move(500, 500);
            await page.mouse.down({button: 'left'});
            await page.mouse.up({button: 'left'});

            await page.waitFor(1000);

            await page.evaluate(() => {
                let submit = document.getElementById("button-save");
                submit.click()
            });

        });

        then('sends us to the timeline page', async () => {
            await page.waitFor(4000);
            expect(page.url()).toBe("http://localhost:3000/#/timeline")
        });
    })

});