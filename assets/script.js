const APIKEY ="55f55ad7babd3c5f4fdd516e4df53a7a";
const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");

const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
};

const updateCurrentWeather = (data) => {
    const location = data.name;
    const tempKelvin = data.main.temp;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;

    const tempFahrenheit = (tempKelvin - 273.15) * 9/5 +32;

    document.querySelector(".details h2").textContent = location;
    document.querySelector(".details h3:nth-child(2)").textContent = `Temp: ${tempFahrenheit.toFixed(2)}°F`;
    document.querySelector(".details h3:nth-child(3)").textContent = `Wind Speed: ${windSpeed} m/s`;
    document.querySelector(".details h3:nth-child(4)").textContent = `Humidity: ${humidity}%`;
};

const updateForecast = (forecastData) => {
    const forecastCards = document.querySelectorAll(".weather-cards .card");
    forecastData.list.forEach((forecast, index) => { 
        const data = new Date(forecast.dt * 1000);
        const tempKelvin = forecast.main.temp;
        const windSpeed = forecast.wind.speed;
        const humidity = forecast.main.humidity;
        const dayOfWeek = getDayOfWeek(data.getUTCDay());

        const tempFahrenheit = (tempKelvin - 273.15) * 9/5 +32;

        forecastCards[index].querySelector("h3").textContent = `${dayOfWeek} ${data.toDateString()}`;
        forecastCards[index].querySelector("h4:nth-child(2)").textContent = `Temp: ${tempFahrenheit.toFixed(2)}°F`;
        forecastCards[index].querySelector("h4:nth-child(3)").textContent = `Wind Speed: ${windSpeed} m/s`;
        forecastCards[index].querySelector("h4:nth-child(4)").textContent = `Humidity: ${humidity}%`;
    });
};

const getDayOfWeek = (dayIndex) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
};

const updateSearch = (city) => {
    const searchHistoryDiv = document.getElementById("searchHistory");
    const historyItem = document.createElement("div");
    historyItem.textContent = city;

    historyItem.addEventListener("click", () => {
        getWeatherData(city);
    });
    searchHistoryDiv.appendChild(historyItem);

};

const getLocation = () => {
    const city =cityInput.value.trim();
    if(!city) return;
    const geocoding_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;

    fetch(geocoding_url).then((res) => res.json()).then((data) => {
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;

        const forecast_url= `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;
        return fetch (forecast_url);
    })
    .then((res) => res.json())
    .then((forecastData) => {
        updateForecast(forecastData);
    })
    .then(() => {
        updateSearch(city);
    })
    .catch((error) => {

        console.error("Error occurred while fetching coordinates", error);

    })
};


searchBtn.addEventListener("click", getLocation);