async function fetchWeather(location){
    let fetchWeather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${APIKey}`);
    let weatherData = await fetchWeather.json();
    console.log(weatherData)
}


function displayController(){
    const celsius = document.querySelector(".celsius");
    const farhenheit = document.querySelector(".farhenheit");
    const search = document.querySelector(".search");
    const searchQuery = document.querySelector(".search-query");
    const APIKey = "9ZX4M2DDTAWVY76JZT5WKWX7E";
    
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
            fetchWeather(searchQuery.value);
        }
    
    }
}

displayController();