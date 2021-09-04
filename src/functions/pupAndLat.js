const puppeteer = require("puppeteer");

const scrapeInfo = async (urlText) => {
    console.log("URL COMING TO SCRAPER: ", urlText)
    console.log(puppeteer)

    try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlText);

    await page.waitForSelector('h1');
    const textContent = await page.evaluate(() => document.querySelector('h1').textContent);
    console.log('Page title = ' + textContent);


    await browser.close();

    return textContent;

    } catch(err) {
        console.log(err);
    }



    }

module.exports = {
    scrapeInfo
}