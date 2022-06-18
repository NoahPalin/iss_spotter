const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(body => console.log(JSON.parse(body)));

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  }) 
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

const printPassTimes = function (passTimes) {
  console.log(passTimes);
}