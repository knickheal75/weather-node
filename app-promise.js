const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Adress to fetch weather for:",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

var encodeAddress = encodeURIComponent(argv.address);

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyATyOtJhC0CZXxZbzrwJ7XtGoYi9qzverg`;

axios
  .get(geocodeUrl)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("Unable to find address.");
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/1bf4ea1701f39e443267d7daea7cfff0/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  })
  .then(response => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(
      `It's currently ${temperature}. It feels like ${apparentTemperature}`
    );
  })
  .catch(e => {
    if (e.code === "ENOTFOUND") {
      console.log("Unable to connect to API servers");
    } else {
      console.log(e.message);
    }
  });
