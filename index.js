const Shops = require("./utils/shops");
const Browser = require("./utils/browser");
const Mailer = require("./utils/mailer");

const fs = require("fs");
const cheerio = require("cheerio");
const CronJob = require("cron").CronJob;

const results = [];

async function monitor() {
  for (const shop of Shops.shops) {
    const { page, browser } = await Browser.configBrowse(shop.productUrl);
    const result = await checkStock(page, shop.selectors, shop.name);
    //updateLog(result);
    if (result.state) results.push(result);
    await browser.close();
  }

  if (results.length > 0) {
    const mail = new Mailer(results.toString());
    mail.sendMail(mail.getMails());
  } else {
    console.log("No Stock yet");
  }
}

async function checkStock(page, selectors, shopName) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);
  const $ = cheerio.load(html);
  let result = {
    shopName: shopName,
    url: page.target()._targetInfo.url,
    state: { price: -1, stock: false },
  };
  //await page.screenshot({path: `./screenshot/${shopName}-${getDate()}.png`});

  if ($(selectors.price, html)) {
    result.state.price = $(selectors.price, html)
      .children()
      .text()
      .replace(/\s/g, "");

    result.state.stock = thereIsStock(
      $(selectors.state, html).text().trim().toUpperCase()
    );
  }
  return result;
}

const thereIsStock = (state) => {
  const noStock = [
    "AGOTADO",
    "SIN STOCK",
    "PRODUCTO NO DISPONIBLE",
    "NO DISPONIBLE",
    "SIN FECHA EXACTA DE ENTRADA",
  ];
  return !noStock.includes(state);
};

const getDate = () => {
  const today = new Date();
  return `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}-${today.getHours()}:${today.getMinutes()}`;
};

const updateLog = (data) => {
  fs.appendFile(
    "./log/log.txt",
    "*" + getDate() + "*" + JSON.stringify(data) + "\n",
    (err, file) => {
      if (err) throw err;
      console.log("Saved!");
    }
  );
};

monitor();

// new CronJob(
//   " 60 * * * *",
//   function () {
//     monitor();
//   },
//   true
// );
