'use strict'

class Country{
    constructor(name,capital,flagImageURL,currencies,region) {
        this.name = name;
        this.capital = capital;
        this.flagImageURL = flagImageURL;
        this.currencies = currencies;
        this.region = region;
    }
}

function createCountry(country) {
    let elem = document.createElement(`div`);
    elem.innerHTML = `
    <br>
    <h1>${country.name}</h1>
    <p>Capital: ${country.capital}</p>
    <img class="d-block w-100 img" src="${country.flagImageURL}" alt="Flag image">
    <p>Region: ${country.region}</p>
    <p>Currencies: ${country.currencies}</p>
    <a href="https://www.google.com/search?q=${country.name}"  target="_blank">More</a>
    <br>`;
    let att = document.createAttribute("class");
    att.value = "card my-3";
    elem.setAttributeNode(att);
    return elem;
}

function addCountry(elem) {
    document.getElementById("countries").appendChild(elem);
}

async function getCountry() {
    const countryForm = document.getElementById("form");
    let data = new FormData(countryForm);
    let input = data.get("country");
    const response = await fetch('https://restcountries.eu/rest/v2/name/'+input);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let countryJson = await response.json();
        let country = new Country(countryJson[0].name,countryJson[0].capital,countryJson[0].flag,
                countryJson[0].currencies[0].name, countryJson[0].region);
        let elem = createCountry(country);
        addCountry(elem);
    } else {
        alert("Country not found, try again");
    }
}

/*function checkForm() {
    const countryForm = document.getElementById("form");
    let data = new FormData(countryForm);
    return data.get("country");
}*/
