// HTML elements;
const searchInput = document.querySelector("#searchInput");
const citylist = document.querySelector("#citylist");
const searchButton = document.querySelector("Button");

// action listener to searchButton;
searchButton.addEventListener("click", searchButtonEvent);

// add listener to searchInput-bar;
searchInput.addEventListener("input", addSuggestions);

// "input" eventListener on searchInput bar;
let cities = [];

// calling function to get cities using API;
getCities();

// this function uses API and store all the city names into "cities" ARRAY;
function getCities() {
    const CITIES_API_URL = "https://countriesnow.space/api/v0.1/countries";
    
    fetch(CITIES_API_URL)
        .then(response => response.json())
        .then(weatherInfo => {

            weatherInfo.data.forEach(country => {
                country.cities.forEach(city => {
                    cities.push(city);
                });
            });
        })
        .catch(reason => {
            console.log(reason);
        });
}

// store matching cities;
// let matchedCities = [];

// searchInput-bar listener to add to give suggestions;
function addSuggestions() {

    let city = new String(searchInput.value).toLowerCase();

    // getting the cities matches to user input;
    let matchedCities = cities.filter(element =>
        element.toLowerCase().startsWith(city));

    // matchedCities = [];

    // for(let i=0; i<cities.length; i++) {
    //     if(cities[i].startsWith(city)) {
    //         matchedCities.push(cities[i]);
    //     }

    //     if(matchedCities.length == 5) {
    //         break;
    //     }
    // }

    // adding cities to suggestion;
    matchedCities = matchedCities.map(element => `<option value="${element}">${element}</option>`);
    citylist.innerHTML = matchedCities;
}

// check searchButton listener;
function searchButtonEvent() {
    const city = searchInput.value;

    if(city == "") {
        return;
    }

    window.location.href = `weather.html?city=${city}`;
}