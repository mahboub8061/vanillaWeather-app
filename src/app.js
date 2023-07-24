function displayTempreture(response) {
  console.log(response.data.main.temp);
}
let apiKey = "68c948a4336a2211153a5fdb7bfbe8f9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTempreture);
