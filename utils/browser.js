const puppeteer = require("puppeteer");

class Browser {
  static async configBrowse(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    console.log("Browser configured");
    return page;
  }
}
module.exports = Browser;
