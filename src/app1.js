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

function displayForecast() {
  let forecast = document.querySelector("#week-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div clauss="forecast-day">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/01d@2x.png"
          alt=""
          width="45"
        />
        <div class="forecast-max-min">
          <span class="forecast-max">25°</span>
          <span class="forecast-min">15°</span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showTemp(response) {
  celsiusTemp = response.data.main.temp;
  let locationTemp = document.querySelector("#current-temp");
  locationTemp.innerHTML = Math.round(celsiusTemp);
  let currentCity = document.querySelector(".current-city");
  currentCity.innerHTML = response.data.name;
  let weatherCondition = document.querySelector("#weather-description");
  weatherCondition.innerHTML = response.data.weather[0].main;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
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

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#f-unit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#c-unit");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchDefault("Guadalajara");
displayForecast();
