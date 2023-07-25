function displayTempreture(response) {
  let humidity = document.querySelector("#Humidity");
  let tempretureElement = document.querySelector("#tempreture");
  tempretureElement.innerHTML = Math.round(response.data.main.temp);
  let wind = document.querySelector("#wind");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let now = new Date();
  let Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let day = document.querySelector("#day");
  let hours = now.getHours();
  if (hours < 10) {
    let hours = `0${hours}`;
  }
  let minut = now.getMinutes();
  if (minut < 10) {
    let minut = `0${minut}`;
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
  // Centigrade to fahrenheit:
  function ShowTempreture(event) {
    event.preventDefault();
    Centigrade.classList.remove("active");
    fahrenheit.classList.add("active");
    let temp = document.querySelector("#tempreture");
    temp.innerHTML = Math.round(response.data.main.temp);
  }
  function showFahrenheitTemp(event) {
    event.preventDefault();
    let temp = document.querySelector("#tempreture");
    fahrenheit.classList.remove("active");
    Centigrade.classList.add("active");
    temp.innerHTML = Math.round(
      (Math.round(response.data.main.temp) * 9) / 5 + 32
    );
  }
  let Centigrade = document.querySelector("#centigrade");
  let fahrenheit = document.querySelector("#fahrenheit");
  Centigrade.addEventListener("click", ShowTempreture);
  fahrenheit.addEventListener("click", showFahrenheitTemp);
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
