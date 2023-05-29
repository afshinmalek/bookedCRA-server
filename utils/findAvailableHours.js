const findAvailableHours = ({ booked = [] }, sDate, hours) => {
  const bookedSet = new Set(booked.map((b) => b.time));
  const available = hours.filter((hour) => !bookedSet.has(hour));
  const updatedAvailable = available.map((h) => ({
    date: sDate,
    time: h,
  }));

  if (!booked || booked.length === 0) {
    return hours.map((h) => ({ date: sDate, time: h }));
  }

  return updatedAvailable;
};

module.exports = findAvailableHours;
