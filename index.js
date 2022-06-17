const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
*/

/*
fetchCoordsByIp("64.231.121.199", (err, coordinates) => {
  if (err) {
    console.error(err);
  } else {
    console.log(coordinates);
  }
});
*/

// fetchISSFlyOverTimes ({latitude: '43.70317077636719', longitude: '-79.51219177246094'}, (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(data);
//   }
// });

/*
fetchISSFlyOverTimes ({latitude: '43.70317077636719', longitude: '-79.51219177246094'}, (err, data) => {
  if (err) {
    console.log(err);
    return;
  } else {
    //Day of week, month, day number, time, timezone
    let dateInfo = [];
    let timestamp;
    let actualDate;
    let dayOfWeek;
    let month;
    let duration;
    for (let i = 0; i < data.length; i++) {
      timestamp = data[i].risetime * 1000;
      duration = data[i].duration;
      actualDate = new Date(timestamp);
      dayOfWeek = actualDate.getDay();
      month = actualDate.getMonth();

      // For the day of the week.
      switch (dayOfWeek) {
      case 0:
        dateInfo.push("Sunday");
        break;
      case 1:
        dateInfo.push("Monday");
        break;
      case 2:
        dateInfo.push("Tuesday");
        break;
      case 3:
        dateInfo.push("Wednesday");
        break;
      case 4:
        dateInfo.push("Thursday");
        break;
      case 5:
        dateInfo.push("Friday");
        break;
      case 6:
        dateInfo.push("Saturday");
        break;
      }

      // For the month.
      switch (month) {
      case 0:
        dateInfo.push("January");
        break;
      case 1:
        dateInfo.push("Febuary");
        break;
      case 2:
        dateInfo.push("March");
        break;
      case 3:
        dateInfo.push("April");
        break;
      case 4:
        dateInfo.push("May");
        break;
      case 5:
        dateInfo.push("June");
        break;
      case 6:
        dateInfo.push("July");
        break;
      case 7:
        dateInfo.push("August");
        break;
      case 8:
        dateInfo.push("September");
        break;
      case 9:
        dateInfo.push("October");
        break;
      case 10:
        dateInfo.push("November");
        break;
      case 11:
        dateInfo.push("December");
        break;
      }
      dateInfo.push(actualDate.getDate());
      dateInfo.push(actualDate.getFullYear());
      dateInfo.push((Intl.DateTimeFormat().resolvedOptions().timeZone));
      dateInfo.push(duration);
      dateInfo.push(actualDate.getHours());
      dateInfo.push(actualDate.getMinutes());
      dateInfo.push(actualDate.getSeconds());
      console.log(`Next pass at ${dateInfo[0]} ${dateInfo[1]} ${dateInfo[2]} ${dateInfo[3]} ${dateInfo[6]}:${dateInfo[7]}:${dateInfo[8]} ${dateInfo[4]} for ${dateInfo[5]} seconds!`);
      dateInfo = [];
    }
  }
});
*/

const printTimes = function (err, finalArray) {
  fetchMyIP((err, ip) => {
    if (err) {
      console.log(err);
      return;
    }
    fetchCoordsByIp(ip, (err, coordinates) => {
      if (err) {
        console.log(err);
        return;
      }
      fetchISSFlyOverTimes(coordinates, (err, data) => {
        if (err) {
          console.log(err);
          return;
        } else {
          //Day of week, month, day number, time, timezone
          let dateInfo = [];
          let timestamp;
          let actualDate;
          let dayOfWeek;
          let month;
          let duration;
          let finalArray = [];
          for (let i = 0; i < data.length; i++) {
            timestamp = data[i].risetime * 1000;
            duration = data[i].duration;
            actualDate = new Date(timestamp);
            dayOfWeek = actualDate.getDay();
            month = actualDate.getMonth();
  
            // For the day of the week.
            switch (dayOfWeek) {
            case 0:
              dateInfo.push("Sunday");
              break;
            case 1:
              dateInfo.push("Monday");
              break;
            case 2:
              dateInfo.push("Tuesday");
              break;
            case 3:
              dateInfo.push("Wednesday");
              break;
            case 4:
              dateInfo.push("Thursday");
              break;
            case 5:
              dateInfo.push("Friday");
              break;
            case 6:
              dateInfo.push("Saturday");
              break;
            }
  
            // For the month.
            switch (month) {
            case 0:
              dateInfo.push("January");
              break;
            case 1:
              dateInfo.push("Febuary");
              break;
            case 2:
              dateInfo.push("March");
              break;
            case 3:
              dateInfo.push("April");
              break;
            case 4:
              dateInfo.push("May");
              break;
            case 5:
              dateInfo.push("June");
              break;
            case 6:
              dateInfo.push("July");
              break;
            case 7:
              dateInfo.push("August");
              break;
            case 8:
              dateInfo.push("September");
              break;
            case 9:
              dateInfo.push("October");
              break;
            case 10:
              dateInfo.push("November");
              break;
            case 11:
              dateInfo.push("December");
              break;
            }
            dateInfo.push(actualDate.getDate());
            dateInfo.push(actualDate.getFullYear());
            dateInfo.push((Intl.DateTimeFormat().resolvedOptions().timeZone));
            dateInfo.push(duration);
            dateInfo.push(actualDate.getHours());
            dateInfo.push(actualDate.getMinutes());
            dateInfo.push(actualDate.getSeconds());
            finalArray.push((`Next pass at ${dateInfo[0]} ${dateInfo[1]} ${dateInfo[2]} ${dateInfo[3]} ${dateInfo[6]}:${dateInfo[7]}:${dateInfo[8]} ${dateInfo[4]} for ${dateInfo[5]} seconds!`));
            dateInfo = [];
          }
          for (let i = 0; i < finalArray.length; i++) {
            console.log(finalArray[i]);
          }
        }
      });
    });
  });
};

printTimes();
