function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let discriptionElement = document.querySelector("#discription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#current-time");
  let date = currentDate(new Date(response.data.time * 1000));
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}" class="current weather icon"/>`;
  temperature.innerHTML = Math.round(realtimeTemp);

  cityElement.innerHTML = response.data.city;
  discriptionElement.innerHTML = response.data.condition.discription;
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = date;

  getweather(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "9bc0fcfatb57dfo01a435016efa04358";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function forecastDisplay(response) {
  console.log(response.data);

  let weatherHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      weatherHtmlHtml =
        weatherHtmltHtml +
        `
     <div class="row">
       <div class="col-2">
         <div class="weather-date">${formatDay(day.time)}</div>
         <div class="image-1">
           <img
             src="${day.condition.icon_url}"
             class= "weather-icon"
           />
           <div class="forecast-temp">
             <div class="minmax-1">
               <strong>${Math.round(day.temperature.maximum)}° </strong>
               <span id = "min">${Math.round(day.temperature.minimum)}°</span>
             </div>
           </div>
         </div>
       </div>
     </div>
     `;
    }
  });

  let weatherforecast = document.querySelector("#weather");
  weatherHtml.innerHTML = weatherHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", citySearchResult);

searchCity("Durban");
weatherDisplay();
