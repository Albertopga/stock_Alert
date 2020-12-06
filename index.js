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
    if (result.state) results.push(result);
    await browser.close();
  }
  if (results.length > 0) {
    sendMail(results);
  } else {
    updateLog("No Stock yet");
  }
}

function sendMail(results) {
  const mail = new Mailer(generateMailHtml(results));
  mail.sendMail(mail.getMails());
}

function generateMailHtml(results) {
  let html = "<h1>Available stock in</h1><ul>";
  for (const result of results) {
    html += `<li><p><a href="${result.url}" >${result.shopName}</a>: ${result.state.price}</p></li>`;
  }
  html += "</ul>";
  return html;
}

async function checkStock(page, selectors, shopName) {
  try {
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
  } catch (e) {
    console.log(`ERROR: ${e}`);
    updateLog(e);
  }
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
  try {
    fs.appendFile(
      "./log/log.txt",
      `* ${getDate()} * ${data}  \n`,
      (err, file) => {
        if (err) {
          console.log(`ERROR: ${err}`);
          updateLog(err);
          throw err;
        }
        console.log(`Saved!`);
      }
    );
  } catch (e) {}
};

monitor();

// new CronJob(
//   " 60 * * * *",
//   function () {
//     monitor();
//   },
//   true
// );
