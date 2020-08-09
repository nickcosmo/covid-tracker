const covidUrl = 'https://api.covid19api.com/summary';
const countries = document.getElementById('countries');
const main = document.querySelector('.mainContent');
const update = document.querySelector('.lastUpdate');
let countryData = [];


//api request
function getData(url) {
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            countryData = data.Countries;
            const options = data;
            const optionCountry = options.Countries;
            let countryArray = [];
            for(i=0; i<optionCountry.length; i++) {
                countryArray.push(optionCountry[i].Country);
            }
            createCountryList(countryArray);
            update.innerHTML = `Last Update: ${countryData[0].Date.slice(0, 10)}`;
        })
        .catch(error => console.log(error))
}

getData(covidUrl);

//functions
function createCountryList(arr) {
    let countryString = '<option>Pick a Country</option>';
    for(i=0; i<arr.length; i++){
        countryString += `<option value='${arr[i]}'>${arr[i]}</option>`;
    }
    countries.innerHTML = countryString;
}

function displayCountryData() {            
    for(i=0; i<countryData.length; i++){
        if(countryData[i].Country == countries.value){
            main.innerHTML = `
                <p>New Confirmed: ${countryData[i].NewConfirmed}</p>
                <p>Total Confirmed: ${countryData[i].TotalConfirmed}</p>
                <p>New Deaths: ${countryData[i].NewDeaths}</p>
                <p>Total Deaths: ${countryData[i].TotalDeaths}</p>
                <p>New Recovered: ${countryData[i].NewRecovered}</p>
                <p>Total Recovered: ${countryData[i].TotalRecovered}</p>
                `
        }
    }
    document.getElementById('currentCountry').innerHTML = countries.value;
}

//event listeners
countries.addEventListener('change', () => {
    displayCountryData();
    getGraphData(covidGraphUrl + countries.value);
    updateGraph();
});

