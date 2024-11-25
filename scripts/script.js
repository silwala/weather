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
    const dailyTempArr = []

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

        const highLows = document.querySelectorAll(".high-low")
        for(let i = 0; i < highLows.length; i++){
            highLows[i].textContent = `${getTemperature(dailyTempArr[i][0])}° / ${getTemperature(dailyTempArr[i][1])}°`
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
            const hourDiv = document.createElement("div");
            hourDiv.classList.add("hourly-condition");
            
             
            const timeDiv = document.createElement("div");
            timeDiv.classList.add("time-div");
            timeDiv.textContent = getHourMin(today.hours[time].datetime);
            
            const conditionImage = document.createElement("img");
            conditionImage.classList.add("hourly-condition-image", "condition-image");
            conditionImage.src = `./images/weather-icons/${today.hours[time].icon}.svg`;
            conditionImage.alt =`icon for ${today.hours[time].conditions}`;
            
            const temperature = document.createElement("div");
            temperature.classList.add("hourly-temperature");
            temperature.textContent = `${getTemperature(today.hours[time].temp)}°`
            
            const precip = document.createElement("div");
            precip.classList.add("precipitation")
            const precipImage = document.createElement("img");
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
            const precipChance = document.createElement("div");
            precipChance.classList.add("precip-chance");
            precipChance.textContent = `${today.hours[time].precipprob}%`
            precip.append(precipImage, precipChance);
            todayByHours.append(hourDiv);
            hourDiv.append(timeDiv, conditionImage,temperature, precip);
        }
    }

    function displayFifteenDays(){
        const fifteenDaysDiv = document.querySelector(".fifteen-days");
        fifteenDaysDiv.textContent = "";
        const fifteenDays = weather.fifteenDays;
        const daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        for(let day = 0; day < fifteenDays.length; day++){
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");

            const dayName = document.createElement("div");
            dayName.classList.add("day-name");

            if(day === 0){
                dayName.textContent = "Today";
            }
            else if(day === 1){
                dayName.textContent = "Tomorrow"
            }
            else{
                const dateArr = fifteenDays[day].datetime.split("-");
                const year = Number(dateArr[0]);
                const month = Number(dateArr[1]) - 1;
                const dayNum = Number(dateArr[2]);

                const date = new Date(year, month, dayNum);
                dayName.textContent = daysInWeek[date.getDay()];
            }
            const precipDiv = document.createElement("div");
            precipDiv.classList.add("precipitation")
            let precipImage = document.createElement("img");
            precipImage.classList.add("precip-image");
            if(fifteenDays[day].preciptype === null){
                precipImage.src = "./images/weather-icons/raindrop.png"
            }
            else if(fifteenDays[day].preciptype.length === 1 && fifteenDays[day].preciptype[0] === "snow"){
                precipImage.src = `./images/weather-icons/snowflake.png`
            }
            else{
                precipImage.src = "./images/weather-icons/raindrop.png"
            }

            const conditionDiv = document.createElement("div");
            conditionDiv.classList.add("day-condition")

            const precipChance = document.createElement("div");
            precipChance.classList.add("precip-chance");
            precipChance.textContent = `${Math.round(Number(fifteenDays[day].precipprob))}%`
            precipDiv.append(precipImage, precipChance);

            const conditionImageDiv = document.createElement("div");
            conditionImageDiv.classList.add("condition-image-div")
            const conditionImage = document.createElement("img");
            conditionImage.classList.add("daily-condition-image", "condition-image");
            conditionImage.src = `./images/weather-icons/${fifteenDays[day].icon}.svg`;
            conditionImage.alt =`icon for ${fifteenDays[day].conditions}`;
            conditionImageDiv.append(conditionImage)

            const highLow = document.createElement("div");
            highLow.classList.add("high-low");
            highLow.textContent = `${getTemperature(fifteenDays[day].tempmin)}° / ${getTemperature(fifteenDays[day].tempmax)}°`
            dailyTempArr.push([fifteenDays[day].tempmin, fifteenDays[day].tempmax])

            fifteenDaysDiv.append(dayDiv);
            dayDiv.append(dayName, conditionDiv);
            conditionDiv.append(precipDiv, conditionImageDiv, highLow);
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
            displayFifteenDays();
        } catch(error) {
            console.log("Error fetching weather data: ", error.message);

            const errorMessage = encodeURIComponent(error.message);
            window.location.href = `./error.html?message=${errorMessage}`;

        }
    }

    getUserLocation();
}

weatherApp();