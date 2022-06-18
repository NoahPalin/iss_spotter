const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://api.ipbase.com/v2/info?apikey=SrNnGq0bcPI8UJqx8E3ZkfbEgbtFgTW44MZDqHTv&ip=${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  let data = JSON.parse(body);
  const latitude = data.data.location.latitude;
  const longitude = data.data.location.longitude;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };