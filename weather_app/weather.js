// API key
const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;

const body = document.querySelector("body");
const lottiePlayer = document.querySelector("#lottiePlayer");
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

// lottifiles - src;
const thunderstorm = "https://assets10.lottiefiles.com/temp/lf20_Kuot2e.json";
const drizzle = "https://assets10.lottiefiles.com/packages/lf20_jmBauI.json";
const rain = "https://assets10.lottiefiles.com/packages/lf20_oAByvh2C1K.json";
const snow = "https://assets8.lottiefiles.com/private_files/lf30_xiu4XR.json";
const clouds = "https://assets2.lottiefiles.com/temp/lf20_ZCwXJD.json";
const mist = "https://assets5.lottiefiles.com/temp/lf20_kOfPKE.json";
const smoke = "https://assets2.lottiefiles.com/packages/lf20_4fgslMc0Si.json";
const dust = "https://assets4.lottiefiles.com/packages/lf20_ci4fh3nd.json";
const fog = "https://assets2.lottiefiles.com/packages/lf20_4fgslMc0Si.json"; // fog and smoke has same littiefile;
const tornado = "https://assets4.lottiefiles.com/packages/lf20_eX03JvdrTy.json";

const morning = "https://assets2.lottiefiles.com/packages/lf20_qlkhxhrs.json";
const day = "https://assets5.lottiefiles.com/packages/lf20_5i5k8eh3.json";
const night = "https://assets2.lottiefiles.com/packages/lf20_fozoyhia.json";

let isMorning = false;
let isDay = false;
let isNight = false;
let weatherStatus = "";

// object to store data obtain from weather API;
let weatherData = {};

getWeatherInfo();

// this method uses index.js file's data and display on this page;
function displayWeatherData() {
    setBackgound();
    setLottieFile();

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
        isMorning = true;
    }

    else if(time >= 12 && time < 20) {
        body.classList.add("day-background");
        isDay = true;
    }

    else {
        body.classList.add("night-background");
        isNight = true;
    }
}


let selectedFile = "";

function setLottieFile() {

    switch(weatherStatus.toLowerCase()) {
        case "thunderstorm":
            selectedFile = thunderstorm;
            break;
        
        case "drizzle":
            selectedFile = drizzle;
            break;
        
        case "rain":
            selectedFile = rain;
            break;
        
        case "snow":
            selectedFile = snow;
            break;
        
        case "clouds":
            selectedFile = clouds;
            break;
        
        case "mist":
            selectedFile = mist;
            break;
        
        case "smoke":
            selectedFile = smoke;
            break;
        
        case "dust":
            selectedFile = dust;
            break;
        
        case "fog":
            selectedFile = fog;
            break;

        case "tornado":
            selectedFile = tornado;
            break;

        default:
            if(isMorning) selectedFile = morning;
            else if(isDay) selectedFile = day;
            else if(isNight) selectedFile = night;
    }

    lottiePlayer.setAttribute("src", selectedFile);
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

            // getting status to to set a lottiefile;
            weatherStatus = data.weather[0].main;

            weatherData.temperature = `${data.main.temp} <sup>o</sup>C`;
            weatherData.atmosphere = data.weather[0].description;
            weatherData.pressure = `${data.main.pressure} hPa`;
            weatherData.city = data.name;
            weatherData.country = data.sys.country;

            let currentTime = getCurrentTime(data.timezone);
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