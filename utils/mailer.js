const nodemailer = require("nodemailer");

const user = "senderlearnmails@gmail.com";
const pass = "Vf$fZSmLFd3";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

class Mailer {
  static mailOptions = {
    from: '"Stock Tracker" <senderlearnmails@gmail.com>',
    to: "albertopga@gmail.com",
    subject: "Product in stock",
    text: "The product you are waiting for are in stock",
    html: `<a href=\"${URL}\">Link</a>`,
  };

  static sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };
}

module.exports = Mailer;
