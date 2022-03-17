let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = `${day}, ${date} ${hour}:${minutes}`;
//
function searchDefault(city) {
  let apiKey = "86cb3e7be0356580c7382daac8e4cf19";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let weatherUrl = `${apiEndpoint}?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(showTemp);
}

function newCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchDefault(city);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", newCity);

//HOMEWORk
function showTemp(response) {
  let locationTemp = document.querySelector(".current-temp");
  locationTemp.innerHTML = Math.round(response.data.main.temp);
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = response.data.name;
  let weatherCondition = document.querySelector("#weather-description");
  weatherCondition.innerHTML = response.data.weather[0].main;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function getLocation(position) {
  let apiKey = "86cb3e7be0356580c7382daac8e4cf19";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let positionUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(positionUrl).then(showTemp);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let locationButton = document.querySelector("#get-location");
locationButton.addEventListener("click", searchLocation);

searchDefault("Guadalajara");
