const APIKEY ="55f55ad7babd3c5f4fdd516e4df53a7a";
const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");

const updateCurrentWeather = (data) => {
    const location = data.name;
    const tempCelsius = data.main.temp;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;

    const tempFahrenheit = celsiusToFahrenheit(tempCelsius);

    document.querySelector(".details h2").textContent = location;
    document.querySelector(".details h3:nth-child(2)").textContent = `Temp: ${tempFahrenheit.toFixed(2)}°F`;
    document.querySelector(".details h3:nth-child(3)").textContent = `Wind Speed: ${windSpeed} m/s`;
    document.querySelector(".details h3:nth-child(4)").textContent = `Humidity: ${humidity}%`;
};

const updateForecast = (forecastData) => {
    const forecastCards = document.querySelectorAll(".weather-cards .card");
    forecastData.list.forEach((forecast, index) => { 
        const data = new Date(forecast.dt * 1000);
        const tempCelsius = forecast.main.temp;
        const windSpeed = forecast.main.humidity;

        const temperatureFahrenheit = celsiusToFahrenheit(temperatureCelsius);

        forecastCards[index].querySelector("h3").textContent = date.toDateString();
        forecastCards[index].querySelector("h4:nth-child(2)").textContent = `Temp: ${temperatureFahrenheit.toFixed(2)}°F`;
        forecastCards[index].querySelector("h4:nth-child(3)").textContent = `Wind Speed: ${windSpeed} m/s`;
        forecastCards[index].querySelector("h4:nth-child(4)").textContent = `Humidity: ${humidity}%`;
    });
};

const getLocation = () => {
    const city =cityInput.value.trim();
    if(!city) return;
    const geocoding_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={APIKEY}`;

    fetch(geocoding_url).then((res) => res.json()).then((data) => {
        console.log(data);
    })
    
    .catch((error) => {

        console.error("Error occurred while fetching coordinates", error);

    })
};


searchBtn.addEventListener("click", getLocation);