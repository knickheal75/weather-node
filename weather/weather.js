const request = require("request");

var getWeather = (latitude, longitude, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/1bf4ea1701f39e443267d7daea7cfff0/${latitude},${longitude}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback("Unable to fetch weather");
      }
    }
  );
};

module.exports = {
  getWeather
};
