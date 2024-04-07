const cityInput = document.getElementById("input");
const card = document.getElementById("card");
const mainContainer = document.querySelector(".container");
const getWeatherButton = document.getElementById("btn");
const apiKey = "c2dcc4c0c678792bd93df3e67dde5d26";
let errorMsg = document.getElementById("error");
let showWeatherIcon = document.getElementById("icon");

getWeatherButton.addEventListener("click", async () => {
  const cityValue = cityInput.value;
  if (cityValue) {
    try {
      const weatherData = await getWeatherData(cityValue);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
    }
  } else {
    displayErrorMessage("Please enter city name");
  }
});

async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    displayErrorMessage("Please enter correct city name");

    throw new Error("Please enter the correct city name");
  }
  const weatherData = await response.json();

  return weatherData;
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ icon, description }],
  } = data;
  let cityName = document.getElementById("city");
  let temperature = document.getElementById("temp");

  let humid = document.getElementById("humidity");
  let des = document.getElementById("des");

  cityName.innerText = city;
  temperature.innerText = `${(temp - 273.15).toFixed(1)}°C`;

  humid.innerText = `${humidity}% humidity`;

  if (description.length > 14) {
    des.style.width = "80%";
    card.style.padding = " 16rem 0px";
  }
  des.innerText = description;

  showWeatherIcon.innerText = getWeatherIcon(icon);
  card.style.display = "flex";
  errorMsg.style.display = "none";
}

function getWeatherIcon(weatherIcon) {
  showWeatherIcon.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
}

function displayErrorMessage(msg) {
  errorMsg.innerHTML = msg;
  errorMsg.style.display = "flex";
  card.style.display = "none";
}

async function defaultWeather() {
  const weatherData = await getWeatherData("karachi");
  displayWeatherInfo(weatherData);
}

async function defaultwheatherDisplay() {
  await defaultWeather();
}

defaultwheatherDisplay();
