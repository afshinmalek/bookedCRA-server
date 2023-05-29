const { MyData } = require("../database");

async function getAvailableDaysForBooking(startDate) {
  const availableDays = [];
  const maxAppointmentsPerDay = 9;

  for (
    let dayCount = 0, appointmentCount = 0;
    dayCount < 4;
    appointmentCount++
  ) {
    startDate = startDate || new Date();
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + appointmentCount);
    const dateString = nextDay.toDateString();

    try {
      const appointments = await MyData.find({ date: dateString });
      if (appointments.length < maxAppointmentsPerDay) {
        availableDays.push(dateString);
        dayCount++;
      }
    } catch (error) {
      // Handle the error appropriately
      console.error(error);
    }
  }

  return availableDays;
}

module.exports = getAvailableDaysForBooking;
