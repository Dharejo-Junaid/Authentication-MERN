const body = document.querySelector("body");
const temperature = document.querySelector("#temperature");
const atmosphere = document.querySelector("#atmosphere");
const pressure = document.querySelector("#pressure");
const city = document.querySelector("#city");
const country = document.querySelector("#country");
const time = document.querySelector("#time");

displayWeatherData();

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