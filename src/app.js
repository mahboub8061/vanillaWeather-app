function displayTempreture(response) {
  let tempretureElement = document.querySelector("#tempreture");
  let humidity = document.querySelector("#Humidity");
  let wind = document.querySelector("#wind");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let now = new Date();
  let Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let day = document.querySelector("#day");
  let hours = now.getHours();
  if (hours < 10) {
    let hours = "0${hours}";
  }
  let minut = now.getMinutes();
  if (minut < 10) {
    let hours = "0${minut}";
  }
  let timeElement = document.querySelector("#time");
  let icon = document.querySelector("#icon");
  tempretureElement.innerHTML = Math.round(response.data.main.temp);
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
}
let city = "sydney";
let apiKey = "68c948a4336a2211153a5fdb7bfbe8f9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTempreture);
