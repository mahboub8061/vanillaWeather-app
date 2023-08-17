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
  // if (hours < 10) {
  //   let hours = `0${hours}`;
  // }
  displayForecast();
  let minut = now.getMinutes();
  // if (minut < 10) {
  //   let minut = `0${minut}`;
  // }
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
    console.log(temp);
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
  function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    day.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        ` 
          <div class="col-2 forecast">
            <h3 class="forecast-day">${day}</h3>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII=" alt="">
            <span class="forecast-temp-max">31°</span><span class="forecast-temp-min">21°</span>
          </div>
         `;
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
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
