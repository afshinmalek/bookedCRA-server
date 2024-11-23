const emailTemplate4 = require("../emailTemplate4");
const { sendEmail } = require("../email");
const updateResultHtml = require("../emailBooking");
const dotenv = require("dotenv");
dotenv.config();

const emailOpenSpotsHandler = async (req, res) => {
  try {
    if (!req.body.date) {
      return res.json({ message: "Please provide a date!" });
    }
    if (!req.body.name) {
      return res.json({ message: "Please provide a name!" });
    }
    if (!req.body.email) {
      return res.json({ message: "Please provide an email!" });
    }

    const sendConfirmationEmail = async (emailData) => {
      try {
        const resultHtml = await updateResultHtml(emailData);

        const to = emailData.email;
        const subject = "Make Your Appointment ";
        const text = "You can choose a time for your appointment.";
        await sendEmail(to, subject, text, emailTemplate4(resultHtml));

        console.log("Confirmation email sent to:", to);
      } catch (error) {
        console.error("Error sending confirmation email:", error);
      }
    };

    sendConfirmationEmail(req.body);
    //could add await to sendConfirmationEmail , but it adds few sec
    return res.json({ message: "Data added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = emailOpenSpotsHandler;
