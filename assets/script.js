var APIKEY ="55f55ad7babd3c5f4fdd516e4df53a7a";

const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");

const getLocation = () => {
    const city =cityInput.value.trim();
    if(!city) return;
    const geocoding_url = "api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKEY}";

    fetch(geocoding_url).then(res => res.json()).then(data => {
        console.log(data)
    }).catch()
        alert("Error occurred while fetching coordinates");

    };


searchBtn.addEventListener("click", getLocation);