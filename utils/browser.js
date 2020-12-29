const puppeteer = require("puppeteer");

class Browser {
  static async configBrowse(url) {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ["--disable-setuid-sandbox"],
      'ignoreHTTPSErrors': true 
    });
    const page = await browser.newPage();

    await page.goto(url);    

    return { page, browser };
  }
}
module.exports = Browser;
