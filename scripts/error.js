const code = document.querySelector(".error-code");
const description = document.querySelector(".error-description");
const params = new URLSearchParams(window.location.search);
const errorMessage = params.get("message");
code.textContent = errorMessage || "An unexpected error occurred.";

if(errorMessage === "400"){
    description.textContent = "Couldn't find a result for your search"
}
