const { MyData } = require("../database");

async function getBookedDates(dates) {
  return Promise.all(dates.map((date) => MyData.find({ date })));
}

module.exports = getBookedDates;
