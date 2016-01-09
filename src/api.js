var _ = require('lodash');

var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=e97b28f65a2783600241fc71f5317657';

var kelvinToFahrenheit = function(kelvin) {
  return Math.round((kelvin - 273.15) * 1.8 + 32) + ' ˚F';
}

module.exports = function(latitude, longitude) {

  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;

  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      return {
        city       : json.name,
        temperature: kelvinToFahrenheit(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      }
    });
}
