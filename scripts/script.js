const celsius = document.querySelector(".celsius");
const farhenheit = document.querySelector(".farhenheit");

celsius.addEventListener("click", () => changeUnit('c'))
farhenheit.addEventListener("click", () => changeUnit('f'))

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