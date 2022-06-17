const request = require('request');

// Obtains my IP address.
const fetchMyIP = function(callback) {
  request("https://geo.ipify.org/api/v2/country?apiKey=at_aGCVOFvEYPulOZiwXEPHbiRzY42eH&ipAddress=", (err, res, body) => {
    if (err) {
      callback(err);
    } else if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body);
      callback(err, data.ip);
    }
  });
};

// Calculates coordinates from an IP address.
const fetchCoordsByIp = function(ip, callback) {
  request(`https://api.ipbase.com/v2/info?apikey=SrNnGq0bcPI8UJqx8E3ZkfbEgbtFgTW44MZDqHTv&ip=${ip}`, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    } else if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const data = JSON.parse(body);
      const coordinates = { latitude: data.data.location.latitude.toString(), longitude: data.data.location.longitude.toString() };
      callback(err, coordinates);
    }
  });
};

const fetchISSFlyOverTimes = function(coordinates, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    } else if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      let data = JSON.parse(body);
      data = data.response;
      /*
      console.log(data.length);
      let timestamp1 = data[0].risetime*1000;
      date1 = new Date(timestamp1);
      console.log(date1.getDate());
      */
      callback(err, data);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }

    fetchCoordsByIp(ip, (err, loc) => {
      if (err) {
        return callback(err, null);
      }

      fetchISSFlyOverTimes(loc, (err, nextPasses) => {
        if (err) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation };