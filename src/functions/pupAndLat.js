const puppeteer = require("puppeteer");
const browserFetcher = puppeteer.createBrowserFetcher();
const latex = require('node-latex');
const fs = require('fs');

const previewArticle = async (urlText) => {
    console.log("URL COMING TO SCRAPER: ", urlText)
    console.log(puppeteer)

    try {
        const revisionInfo = await browserFetcher.download('901912');
        const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath});
        const page = await browser.newPage();
        await page.goto(urlText);

        await page.waitForSelector('h1');
        const title = await page.evaluate(() => document.querySelector('h1').textContent);
        console.log('Page title = ' + title);


        await browser.close();

        return textContent;

    } catch(err) {
        console.log(err);
    }

}

const createPdf = async () => {

}

module.exports = {
    previewArticle,
    createPdf
}