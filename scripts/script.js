class Weather {
    
    constructor(data, tempUnit){
        this.data = data;
        this.tempUnit = tempUnit;
    }

    printWeather(){
        console.log("weahter: ")
        console.log(this.data);
    }
    
}


function weatherApp(){
    const APIKey =  "9ZX4M2DDTAWVY76JZT5WKWX7E";
    const celsius = document.querySelector(".celsius");
    const farhenheit = document.querySelector(".farhenheit");
    const search = document.querySelector(".search");
    const searchQuery = document.querySelector(".search-query");
    let tempUnit = "c";
    let fetchResult;
    let weather;
    
    celsius.addEventListener("click", () => changeUnit('c'))
    farhenheit.addEventListener("click", () => changeUnit('f'))
    search.addEventListener("click", () => searchClick())
    searchQuery.addEventListener("keydown", (e) => {
        if (e.keyCode === 13){
            search.click();
        }
    })
    
    function changeUnit(unit){
        if(unit === 'f'){
            farhenheit.classList.add("selected");
            celsius.classList.remove("selected");
            tempUnit = "f";
        }
        else if(unit === "c"){
            celsius.classList.add("selected");
            farhenheit.classList.remove("selected");
        }
    }
    
    function searchClick(){
        if(searchQuery.value.trim() === ""){
            searchQuery.focus();
        }
        else{
            fetchResult = fetchWeather(searchQuery.value);
        }
        
    }
    async function fetchWeather(location){
        try {
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${APIKey}`);
            
            if (!response.ok) {
                throw new Error("Failed to fetch weather data: " + response.statusText);
            }
            const weatherData = await response.json();
            weather = new Weather(weatherData, tempUnit)
            weather.printWeather();
        } catch(error) {
            console.error("Error fetching weather: ", error);
        }
    }
}

weatherApp();