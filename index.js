const Shops = require("./utils/shops");
const Browser = require("./utils/browser");
const Mailer = require("./utils/mailer");

const cheerio = require("cheerio");
const CronJob = require("cron").CronJob;

const results = [];

async function monitor() {
  for (const shop of Shops.shops) {
    const page = await Browser.configBrowse(shop.productUrl);
    const result = await checkStock(page, shop.selectors, shop.name);
    if (result.state.stock) results.push(result);
  }

  if (results.length > 0) {
    results.map((shop) => console.log(shop));
    //Mailer.sendMail(mailOptions);
  } else {
    console.log("No Stock yet");
  }
}

async function checkStock(page, selectors, shopName) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);
  const $ = cheerio.load(html);
  let result = { shopName: shopName, state: { price: -1, stock: false } };

  console.log("antes de price");
  if ($(selectors.price, html)) {
    console.log("dentro de price");
    result.state.price = $(selectors.price, html)
      .children()
      .text()
      .replace(/\s/g, "");

    console.log("state: " + $(selectors.state, html) + "---");
    console.log("price: " + ($(selectors.price, html) + "---"));

    result.state.stock = therIsStock(
      $(selectors.state, html).text().trim().toUpperCase()
    );
  }
  return result;
}
const therIsStock = (state) => {
  const noStock = [
    "AGOTADO",
    "SIN STOCK",
    "PRODUCTO NO DISPONIBLE",
    "NO DISPONIBLE",
  ];
  return !noStock.includes(state);
};

monitor();
// new CronJob(
//   " 60 * * * *",
//   function () {
//     monitor();
//   },
//   true
// );
