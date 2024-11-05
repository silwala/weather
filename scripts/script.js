import { Weather } from "./weather.js"

function weatherApp(){
    const APIKey =  "9ZX4M2DDTAWVY76JZT5WKWX7E";
    const celsius = document.querySelector(".celsius");
    const fahrenheit = document.querySelector(".fahrenheit");
    const search = document.querySelector(".search");
    const searchQuery = document.querySelector(".search-query");
    let tempUnit = "c";
    let weather;
    
    celsius.addEventListener("click", () => changeUnit('c'))
    fahrenheit.addEventListener("click", () => changeUnit('f'))
    search.addEventListener("click", () => searchClick())
    searchQuery.addEventListener("keydown", (e) => {
        if (e.keyCode === 13){
            search.click();
        }
    })
    
    function changeUnit(unit){
        if(unit === 'f'){
            fahrenheit.classList.add("selected");
            celsius.classList.remove("selected");
            tempUnit = "f";
        }
        else if(unit === "c"){
            celsius.classList.add("selected");
            fahrenheit.classList.remove("selected");
        }
    }
    
    function searchClick(){
        if(searchQuery.value.trim() === ""){
            searchQuery.focus();
        }
        else{
            fetchWeather(searchQuery.value);
        }
        
    }
    async function fetchWeather(location){
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${APIKey}`);
            
            if (!response.ok) {
                throw new Error("Failed to fetch weather data: " + response.statusText);
            }
            const weatherData = await response.json();
            weather = new Weather(weatherData)
            weather.printWeather();
        } catch(error) {
            console.error("Error fetching weather: ", error);
        }
    }
}

weatherApp();