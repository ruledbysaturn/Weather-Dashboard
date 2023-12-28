document.addEventListener('DOMContentLoaded', function () {
    displaySearchHistory();
});

const APIKEY ="55f55ad7babd3c5f4fdd516e4df53a7a";
const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");

const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
};

const updateCurrentWeather = (data) => {
    const location = data.name;
    const date = new Date(data.dt * 1000);
    const icon = data.weather[0].icon;
    const tempKelvin = data.main.temp;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;

    const tempFahrenheit = (tempKelvin - 273.15) * 9/5 + 32;

    const details = document.querySelector(".details");
    details.querySelector("h2").textContent = `${location} (${date.toLocaleDateString()})`;
    details.querySelector("h3:nth-child(2)").textContent = `Temperature: ${tempFahrenheit.toFixed(2)} °F`;
    details.querySelector("h3:nth-child(3)").textContent = `Wind Speed: ${windSpeed} m/s`;
    details.querySelector("h3:nth-child(4)").textContent = `Humidity: ${humidity}%`;
};


const updateForecast = (forecastData) => {
  const forecastCards = document.querySelectorAll(".weather-cards .card");
  forecastData.list.forEach((forecast, index) => {
    const data = new Date(forecast.dt * 1000);
    const tempKelvin = forecast.main.temp;
    const windSpeed = forecast.wind.speed;
    const humidity = forecast.main.humidity;
    const dayOfWeek = getDayOfWeek(data.getUTCDay());
    const tempFahrenheit = (tempKelvin - 273.15) * 9 / 5 + 32;

    const card = forecastCards[index];
    card.querySelector("h3").textContent = `${dayOfWeek} ${data.toDateString()}`;
    card.querySelector("h4:nth-child(2)").textContent = `Temp: ${tempFahrenheit.toFixed(2)}°F`;
    card.querySelector("h4:nth-child(3)").textContent = `Wind Speed: ${windSpeed} m/s`;
    card.querySelector("h4:nth-child(4)").textContent = `Humidity: ${humidity}%`;
  });
};

const getDayOfWeek = (dayIndex) => {
    const daysOfWeek = [
        'Sunday', 
        'Monday', 
        'Tuesday', 
        'Wednesday', 
        'Thursday', 
        'Friday', 
        'Saturday'
    ];
    return daysOfWeek[dayIndex];
};

const updateSearch = (city) => {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    displaySearchHistory();

    const searchHistoryDiv = document.getElementById("searchHistory");
    const historyItem = document.createElement("div");
    historyItem.textContent = city;
    searchHistoryDiv.appendChild(historyItem);

    historyItem.addEventListener("click", () => {
        getWeatherData(city);
    });
};

const displaySearchHistory = () => {
    const searchHistoryDiv = document.getElementById('searchHistory');
    searchHistoryDiv.innerHTML = "";
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.forEach((city) => {
        const historyItem = document.createElement('div');
        historyItem.textContent = city;
        historyItem.addEventListener('click', () => {
            getWeatherData(city);
        });
        searchHistoryDiv.appendChild(historyItem);
    });
};


const getLocation = () => {
    const city =cityInput.value.trim();
    if(!city) return;
    const geocoding_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;

    fetch(geocoding_url).then((res) => res.json()).then((data) => {
        updateCurrentWeather(data);
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
        displaySearchHistory();
    })
    .catch((error) => {

        console.error("Error occurred while fetching coordinates", error);

    })
};

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        getLocation();
    }
});


searchBtn.addEventListener("click", getLocation);