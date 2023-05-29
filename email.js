const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text, html) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your.confirmation.email.22@gmail.com",
        pass: process.env.GMAIL,
      },
    });

    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <your.confirmation.email.22@gamil.com>',
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
  sendEmail,
};
