const { MyData } = require("../database");
const emailTemplate = require("../emailTemplate");
const { sendEmail } = require("../email");
const dotenv = require("dotenv");
dotenv.config();

const submitFormHandler = async (req, res) => {
  try {
    const myData = new MyData(req.body);

    if (!req.body.time) {
      return res.json({ message: "Please provide the time!" });
    }
    if (!req.body.name) {
      return res.json({ message: "Please provide a name!" });
    }
    if (!req.body.email) {
      return res.json({ message: "Please provide an email!" });
    }

    const data = await myData.save();

    let appUrl = process.env.APP_URL;
    let strID = String(data._id);
    let link = appUrl + "/cancel?documentId=" + strID;

    const sendConfirmationEmail = async (emailData) => {
      try {
        const to = emailData.email;
        const subject = "Appointment Confirmation";
        const text = "Your appointment has been confirmed.";
        await sendEmail(to, subject, text, emailTemplate(data, link));

        console.log("Confirmation email sent to:", to);
      } catch (error) {
        console.error("Error sending confirmation email:", error);
      }
    };

    sendConfirmationEmail(data);
    //could add await to sendConfirmationEmail , but it adds few sec
    return res.json({ message: "Data added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = submitFormHandler;
