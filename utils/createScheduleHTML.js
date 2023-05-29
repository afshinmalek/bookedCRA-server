function createScheduleHTML(allDates, emailData, appUrl) {
  let html = "";
  allDates.forEach((data, i) => {
    html += `<h3>${data[0].date}</h3>`;
    html += data
      .map(({ time }, j) => {
        let dateJ = data[j].date;
        let encodedDate = dateJ.replace(/ /g, "%20");

        let alink = `${appUrl}/submit-email/${emailData.email}/${emailData.name}/${encodedDate}/${data[j].time}`;
        return `<a id="button2" href=${alink}>${time}</a>`;
      })
      .join("");
  });
  return html;
}

module.exports = createScheduleHTML;
