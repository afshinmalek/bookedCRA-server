require("dotenv").config();

const sgMail = require("@sendgrid/mail");
const sgKey = process.env.SENDGRID;

// set SendGrid API key
sgMail.setApiKey(sgKey);

// setup email data with dynamic fields
const msg = {
  to: "afshin.malek3@gmail.com",
  from: "afshin.malek.6@gmail.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

// send email
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
