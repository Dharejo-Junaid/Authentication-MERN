// HTML elements;
const search = document.querySelector("#search");
const datalist = document.querySelector("#datalist");
const button = document.querySelector("button");

// action listener to button;
button.addEventListener("click", checkButtonEvent);

// add listener to search-bar;
search.addEventListener("input", addSuggestions);

// "input" eventListener on search bar;
let cities = [];

// calling function to get cities using API;
getCities();

// this function uses API and store all the city names into "cities" ARRAY;
function getCities() {
    const CITIES_API_URL = "https://countriesnow.space/api/v0.1/countries";
    
    fetch(CITIES_API_URL)
        .then(response => response.json())
        .then(data => {

            data["data"].forEach(country => {
                country["cities"].forEach(city => {
                    cities.push(city);
                });
            });
        })
        .catch(reason => {
            console.log(reason);
        });
}

// search-bar listener to add to give suggestions;
function addSuggestions() {

    let city = new String(search.value).toLowerCase();

    // getting the cities matches to user input;
    let matchedCities = cities.filter(element =>
        new String(element).toLowerCase().startsWith(city));

    // adding cities to suggestion;
    matchedCities = matchedCities.map(element => `<option value="${element}">${element}</option>`);
    datalist.innerHTML = matchedCities;
}

// check button listener;
function checkButtonEvent() {
    const city = search.value;

    if(city == "") {
        return;
    }

    window.location.href = `weather.html?city=${city}`;
}