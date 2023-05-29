const getAvailableDaysForBooking = require("./utils/getAvailableDaysForBooking");
const getBookedDates = require("./utils/getBookedDates");
const getAvailableHours = require("./utils/getAvailableHours");
const createScheduleHTML = require("./utils/createScheduleHTML");

const dotenv = require("dotenv");
dotenv.config();

async function updateResultHtml(emailData) {
  try {
    let appUrl = process.env.APP_URL;
    const hours = [9, 10, 11, 12, 1, 2, 3, 4, 5];

    let nextThreeDays = await getAvailableDaysForBooking(
      new Date(emailData.date)
    );
    const bookedDates = await getBookedDates(nextThreeDays);
    const allAvailableHours = getAvailableHours(
      bookedDates,
      nextThreeDays,
      hours
    );

    let resultHtml = createScheduleHTML(allAvailableHours, emailData, appUrl);
    console.log("&&&&&&&&&&&&&&& final1 resultHml &&&&&&&&&&", resultHtml);
    return resultHtml;
  } catch (error) {
    return error.message;
  }
}

module.exports = updateResultHtml;
