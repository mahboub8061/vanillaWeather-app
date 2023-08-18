function displayTempreture(response) {
  let humidity = document.querySelector("#Humidity");
  let tempretureElement = document.querySelector("#tempreture");
  tempretureElement.innerHTML = Math.round(response.data.main.temp);
  let wind = document.querySelector("#wind");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let now = new Date();
  let Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = document.querySelector("#day");
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minut = now.getMinutes();
  if (minut < 10) {
    minut = `0${minut}`;
  }
  let timeElement = document.querySelector("#time");
  let icon = document.querySelector("#icon");

  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].main;

  day.innerHTML = Days[now.getDay()];
  timeElement.innerHTML = ` ${hours}:${minut}`;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].main);
  getForecast(response.data.coord);
}
// Centigrade to fahrenheit:

function ShowTempreture(event) {
  event.preventDefault();
  Centigrade.classList.remove("active");
  fahrenheit.classList.add("active");
  let temp = document.querySelector("#tempreture");
  temp.innerHTML = Math.round(response.data.main.temp);
  console.log(temp);
}

let Centigrade = document.querySelector("#centigrade");

Centigrade.addEventListener("click", ShowTempreture);

// forecast part
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  console.log(date);
  let weekDay = date.getDay();
  console.log.apply(weekDay);
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekDays[weekDay];
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
          <div class="col-2 forecast">
            <h3 class="forecast-day">${formatDay(day.dt)}</h3>
            <img src="https://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" alt="">
            <span class="forecast-temp-max"> ${Math.round(
              day.temp.max
            )}°</span><span class="forecast-temp-min">${Math.round(
          day.temp.min
        )}°</span>
          </div>
         `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "68c948a4336a2211153a5fdb7bfbe8f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempreture);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let cityTitle = document.querySelector("#city");
  cityTitle.innerHTML = city;
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
search("new york");
