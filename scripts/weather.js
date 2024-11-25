export class Weather {
    #data;
    #currentConditions;
    #fifteenDays;
    
    constructor(data){
        this.#data = data;
        this.#currentConditions = this.#data.currentConditions;
        this.#fifteenDays = this.#data.days;
    }
    
    printWeather(){
        console.log("weahter: ")
        console.log(this.#data);
        console.log(this.#currentConditions)
        console.log(this.#fifteenDays);
    }

    get currentConditions(){
        return this.#currentConditions;
    }

    get city(){
        return this.#data.resolvedAddress.split(", ")[0];
    }

    get fifteenDays(){
        return this.#fifteenDays;
    }

    tempInFahren(temp){
        return temp
    }

    tempInCelsius(temp){
        return ((temp - 32) * 5) / 9
    }
    
}