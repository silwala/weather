import { Weather } from "./weather.js"

function weatherApp(){
    const APIKey =  "9ZX4M2DDTAWVY76JZT5WKWX7E";
    const celsius = document.querySelector(".celsius");
    const fahrenheit = document.querySelector(".fahrenheit");
    const search = document.querySelector(".search");
    const searchQuery = document.querySelector(".search-query");
    const city = document.querySelector(".city");
    const condition = document.querySelector(".condition");
    const currentTempDiv = document.querySelector(".current-temperature")
    const weatherIcon = document.querySelector(".weather-icon-img")
    const feelsLike = document.querySelector(".feels-like");
    const visibility = document.querySelector(".visibility-value");
    const wind = document.querySelector(".wind-value");
    const sunRiseSet = document.querySelector(".sun-value");
    const hourlyTempArr = [];

    let tempUnit = "C";
    let weatherAddress = "";
    let weather;
    
    celsius.addEventListener("click", () => changeUnit('C'))
    fahrenheit.addEventListener("click", () => changeUnit('F'))
    search.addEventListener("click", () => searchClick())
    searchQuery.addEventListener("keydown", (e) => {
        if (e.keyCode === 13){
            search.click();
        }
    })
    
    function changeUnit(unit){
        if(unit === 'F'){
            fahrenheit.classList.add("selected");
            celsius.classList.remove("selected");
            tempUnit = "F";
        }
        else if(unit === "C"){
            celsius.classList.add("selected");
            fahrenheit.classList.remove("selected");
            tempUnit = "C";
        }
        console.log(getTemperature(weather.currentConditions.temp) + "°");
        currentTempDiv.textContent = `${getTemperature(weather.currentConditions.temp)}°`;
        feelsLike.textContent = `feels like ${getTemperature(weather.currentConditions.feelslike)}°`;

        const hourlyTemps = document.querySelectorAll(".hourly-temperature");
        for(let i = 0; i < hourlyTemps.length; i++){
            hourlyTemps[i].textContent = `${getTemperature(hourlyTempArr[i])}°`;
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

    function getCurrentHour(time){
        return Number(time.split(":")[0]);
    }

    function displayCurrentCondition(){
        const currentCondition = weather.currentConditions;
        city.textContent = weather.city;
        condition.textContent = currentCondition.conditions;
        currentTempDiv.textContent = `${getTemperature(currentCondition.temp)}°`;
        weatherIcon.src = `./images/weather-icons/${currentCondition.icon}.svg`;
        feelsLike.textContent = `feels like ${getTemperature(currentCondition.feelslike)}°`;
        visibility.textContent = `${currentCondition.visibility} miles`;
        wind.textContent = `${currentCondition.windspeed} mph`;
        sunRiseSet.textContent = `${getHourMin(currentCondition.sunrise)} / ${getHourMin(currentCondition.sunset)}`;
        document.body.style.backgroundImage = `url("./images/condition-background/${currentCondition.icon}.jpg")`
    }
    
    function displayTwentyFourHour(){
        const todayByHours = document.querySelector(".today-by-hours")
        todayByHours.textContent = ""
        let today = weather.fifteenDays[0];
        let numberOfHoursToDisplay = 24;
        let time = getCurrentHour(weather.currentConditions.datetime);
        
        let description = document.querySelector(".description");
        description.textContent = today.description;
        for(let i = 0; i < numberOfHoursToDisplay; i++){

            time++;
            if(time === 24){
             today = weather.fifteenDays[1];
             time = 0;
            }

            hourlyTempArr.push(today.hours[time].temp);
            let hourDiv = document.createElement("div");
            hourDiv.classList.add("hourly-condition");
            
             
            let timeDiv = document.createElement("div");
            timeDiv.classList.add("time-div");
            timeDiv.textContent = getHourMin(today.hours[time].datetime);
            
            let conditionImage = document.createElement("img");
            conditionImage.classList.add("hourly-condition-image");
            conditionImage.src = `./images/weather-icons/${today.hours[time].icon}.svg`;
            conditionImage.alt =`icon for ${today.hours[time].conditions}`;
            
            let temperature = document.createElement("div");
            temperature.classList.add("hourly-temperature");
            temperature.textContent = `${getTemperature(today.hours[time].temp)}°`
            
            let precip = document.createElement("div");
            precip.classList.add("precipitation")
            let precipImage = document.createElement("img");
            precipImage.classList.add("precip-image");
            if(today.hours[time].preciptype === null){
                precipImage.src = "./images/weather-icons/raindrop.png"
            }
            else if(today.hours[time].preciptype.length === 1 && today.hours[time].preciptype[0] === "snow"){
                precipImage.src = `./images/weather-icons/snowflake.png`
            }
            else{
                precipImage.src = "./images/weather-icons/raindrop.png"
            }
            let precipChance = document.createElement("div");
            precipChance.classList.add("precip-chance");
            precipChance.textContent = `${today.hours[time].precipprob}%`
            precip.append(precipImage, precipChance);
            todayByHours.append(hourDiv);
            hourDiv.append(timeDiv, conditionImage,temperature, precip);
        }
    }

    function getHourMin(timeWithHourMinSec){
        return timeWithHourMinSec.substring(0, timeWithHourMinSec.lastIndexOf(":"));
    }

    function getTemperature(temp){
        if(tempUnit === "F"){
            return Math.round(weather.tempInFahren(temp));
        }
        return Math.round(weather.tempInCelsius(temp));
    }

    async function getUserLocation(){
        try {
            const  response = await fetch("https://get.geojs.io/v1/ip/geo.json", {
                mode: 'cors'
              });
            if (!response.ok) {
                throw new Error("Error code: " + response.status);
            }
            const location = await response.json();
            weatherAddress = location.city;
            fetchWeather(weatherAddress);
        } catch(error) {
            console.log("Can't get user location: " + error)
        }
    }

    async function fetchWeather(location){
        if(location.trim === ""){
            return;
        }
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${APIKey}`, {
                mode: 'cors'
              });
            
            if (!response.ok) {
                throw new Error(response.status);
            }
            const weatherData = await response.json();
            weather = new Weather(weatherData)
            weather.printWeather();
            displayCurrentCondition();
            displayTwentyFourHour();
        } catch(error) {
            console.log("Error fetching weather data: ", error.message);

            const errorMessage = encodeURIComponent(error.message);
            window.location.href = `./error.html?message=${errorMessage}`;

        }
    }

    getUserLocation();
}

weatherApp();