const covidGraphUrl = 'https://api.covid19api.com/total/dayone/country/';
let dateRange = [];
let confirmed = [];
let deaths = [];
let recoveries = [];
let myChart = document.getElementById('myChart').getContext('2d');

let covidGraph = new Chart(myChart, {
    type:'line',
    data:{
        labels: dateRange, //add dates here
        datasets:[
            {
            label:'Confirmed',
            // data: confirmed,
            fill: false,
            borderColor: '#F4D03F'
            },
            {
            label:'Deaths',
            // data: deaths,
            fill: false,
            borderColor: '#EC7063'
            },
            {
            label:'Recoveries',
            // data: recoveries,
            fill: false,
            borderColor: '#5DADE2'
            }
        ] //data sets go here
    },
    options:{
        responsive: true,
        maintainAspectRatio: true,
        showLines: true
    }
})

// function to get graph data by country
function getGraphData(url) {
    dateRange = [];
    confirmed = [];
    deaths = [];
    recoveries = [];
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            for(let i=0; i<data.length; i++){
                dateRange.push(data[i].Date.slice(0, 10));
                confirmed.push(data[i].Confirmed);
                deaths.push(data[i].Deaths);
                recoveries.push(data[i].Recovered);
            }
            console.log(data);
            console.log(data.length);
        })
        .catch(error => console.log(error))
}


function updateGraph() {
    covidGraph.data.labels = dateRange;
    covidGraph.data.datasets[0].data = confirmed;
    covidGraph.data.datasets[1].data = deaths;
    covidGraph.data.datasets[2].data = recoveries;

    covidGraph.update();
}