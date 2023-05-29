const { MyData } = require("../database");
const emailTemplate3 = require("../emailTemplate3");
const emailTemplate = require("../emailTemplate");
const { sendEmail } = require("../email");
const dotenv = require("dotenv");
dotenv.config();

const submitEmailHandler = async (req, res) => {
  try {
    console.log("################ ##################", req.params.date);

    let { email, name, date, time } = req.params;

    date = date.replace("%20", " ");

    const saveMe = { email, name, date, time };
    console.log("************** saveME *************", saveMe);
    const myData = new MyData(saveMe);

    const data = await myData.save();

    let appUrl = process.env.APP_URL;
    let strID = String(data._id);
    let elink = appUrl + "/cancel?documentId=" + strID;

    const html = emailTemplate3(time, date, elink);

    // Send confirmation email and response concurrently
    sendConfirmationEmail(data, elink);
    res.send(html);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.json({
        message: "Combination of date and time already exists",
      });
    }
    return res.status(500).json({ error: "An error occurred" });
  }
};

async function sendConfirmationEmail(emailData, elink) {
  try {
    const resultHtml = "";

    const to = emailData.email;
    const subject = "Appointment Confirmation";
    const text = "Your appointment has been confirmed.";
    await sendEmail(
      to,
      subject,
      text,
      emailTemplate(emailData, elink, resultHtml)
    );

    console.log("Confirmation email sent to:", to);
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

module.exports = submitEmailHandler;
