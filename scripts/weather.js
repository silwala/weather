export class Weather {
    #data;
    #currentConditions;
    #today;
    #nextFortnight;
    
    constructor(data){
        this.#data = data;
        this.#currentConditions = this.#data.currentConditions;
        this.#today = this.#data.days[0];
        this.#nextFortnight = this.#data.days.slice(1);
    }
    
    printWeather(){
        console.log("weahter: ")
        console.log(this.#data);
        console.log(this.#currentConditions)
        console.log(this.#today);
        console.log(this.#nextFortnight);
    }

    get currentConditions(){
        return this.#currentConditions;
    }

    get city(){
        return this.#data.resolvedAddress.split(", ")[0];
    }

    get today(){
        return this.#today;
    }

    get nextFortnight(){
        return this.#nextFortnight;
    }

    tempInFahren(temp){
        return temp
    }

    tempInCelsius(temp){
        return ((temp - 32) * 5) / 9
    }
    
}