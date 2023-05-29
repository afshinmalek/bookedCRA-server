const findAvailableHours = require("./findAvailableHours");

const getAvailableHours = (bookedDates, nextThreeDays, hours) =>
  bookedDates.map((bookings, i) =>
    findAvailableHours(
      { booked: bookings },
      new Date(
        bookings.length > 0 ? bookings[0].date : nextThreeDays[i]
      ).toDateString(),
      hours
    )
  );
module.exports = getAvailableHours;
