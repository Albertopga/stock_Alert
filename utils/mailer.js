const nodemailer = require("nodemailer");
const fs = require("fs");

const user = "senderlearnmails@gmail.com";
const pass = "Vf$fZSmLFd3#";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

class Mailer {
  constructor(html) {
    this.options = {
      from: '"Stock Tracker" <senderlearnmails@gmail.com>',
      to: "",
      subject: "Product in stock",
      text: "The product you are waiting for are in stock",
      html: html,
    };
  }

  sendMail = (to) => {
    this.options.to = to;
    transporter.sendMail(this.options, function (error, info) {
      if (error) {
        console.log({ error });
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };

  getMails = () => {
    try {
      let data = fs.readFileSync("./utils/usersMail.txt", "utf8");
      return data.replace("\r", ",").replace("\n", " ");
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = Mailer;
