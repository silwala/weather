function updateDisplay(){
    const code = document.querySelector(".error-code");
    const description = document.querySelector(".error-description");
    const goIndex = document.querySelector(".go-index");
    goIndex.addEventListener("click", goToIndex);
    const params = new URLSearchParams(window.location.search);
    const errorMessage = params.get("message");
    code.textContent = isCodeNumber(errorMessage) ? errorMessage : "Oops!";
    
    console.log(errorMessage)
    if(errorMessage === "400"){
        description.textContent = "Couldn't find a result for your search"
    }
    else if(errorMessage === "404"){
        description.textContent = "The page doesn't exist. Please Come back later."
    }
    else{
        description.textContent = "Something went wrong. Please Come back later."
    
    }
}

function isCodeNumber(code) {
    return !isNaN(code) && code.trim() !== "";
}

function goToIndex(){
    window.location.href = "./index.html";
}

updateDisplay();
