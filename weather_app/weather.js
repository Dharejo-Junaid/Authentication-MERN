// API key
const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;

const body = document.querySelector("body");
const temperature = document.querySelector("#temperature");
const atmosphere = document.querySelector("#atmosphere");
const pressure = document.querySelector("#pressure");
const city = document.querySelector("#city");
const country = document.querySelector("#country");
const time = document.querySelector("#time");

const errorHeaders = document.querySelectorAll(".errorHeader");

const queryParams = new URLSearchParams(window.location.search);

// Access individual query parameters
const cityName = queryParams.get('city');

// object to store data obtain from weather API;
let weatherData = {};

getWeatherInfo();

// this method uses index.js file's data and display on this page;
function displayWeatherData() {
    setBackgound();

    temperature.innerHTML = weatherData.temperature;
    atmosphere.innerHTML = weatherData.atmosphere;
    pressure.innerHTML = weatherData.pressure;
    city.innerHTML = weatherData.city;
    country.innerHTML = weatherData.country;
    time.innerHTML = weatherData.time;
}

// this function set backgound image as per the time
// Morning [6, 12) << = >> Day [12, 20) << = >> Night;
function setBackgound() {
    
    // First remove all the classes body TAG has;
    body.classList.forEach(className => body.classList.remove(className));

    // let time = weatherData.hours;
    let time = weatherData.hours;

    // add backgound image as per time;
    if(time >= 6 && time < 12) {
        body.classList.add("morning-background");
    }

    else if(time >= 12 && time < 20) {
        body.classList.add("day-background");
    }

    else {
        body.classList.add("night-background");
    }
}

// function on button;
function getWeatherInfo() {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const status = data["cod"];
            if(status == "404") {
                errorHeaders[0].classList.remove("hide");
                errorHeaders[1].classList.remove("hide");
                return;
            }

            weatherData.temperature = `${data["main"]["temp"]} <sup>o</sup>C`;
            weatherData.atmosphere = data["weather"][0]["description"];
            weatherData.pressure = `${data["main"]["pressure"]} hPa`;
            weatherData.city = data["name"];
            weatherData.country = data["sys"]["country"];

            let currentTime = getCurrentTime(data["timezone"]);
            weatherData.time = currentTime.toLocaleTimeString();
            weatherData.hours = currentTime.getHours();

            displayWeatherData();
    });
}


// caculate time from timezone;
function getCurrentTime(timezone) {
    const currentTime = new Date();
    const localTimezoneOffset = currentTime.getTimezoneOffset() * 60; // Get local timezone offset in seconds
    const targetTime = new Date(currentTime.getTime() + (timezone + localTimezoneOffset) * 1000);
  
    return targetTime;
}