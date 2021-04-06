var searchButton = document.querySelector('#searchBtn')
var stateSearchButton = document.querySelector('#state-search-btn');

var options = {
    option1: document.querySelector('#option1'),
    option2: document.querySelector('#option2'),
    option3: document.querySelector('#option3')
}

// fetch api 
// find by zip
// narrow range by option selected
function getApi(options) {
    var mapApi = `https://api.mapbox.com/geocoding/v5`
    
}

// mapboxgl.baseApiUrl = 'https://api.mapbox.com';

// var twitterApi = `https://api.twitter.com/2/users/by?usernames=`;

// var twitterKey = 'Im7uUV8AiJYhWKNnXbycBqMY9';
// var twitterSecretKey = 'IMnIEZ2K2rbvXfOQyJHf2K9UatzsgBRm3c8Jf5lZ1rz2ti39dw'
// var twitterBearerToken = 'AAAAAAAAAAAAAAAAAAAAAPM%2FOQEAAAAA899MVc2O6Be6P355V%2FcRsYMsI3s%3D0BbTUa0xte11HYfZTaPWIGOsjzLiRm8iqAgV71vO0jFWD1WokN'

// var locatorStates= '/v0/states.json'
// var locatorApi = `https://www.vaccinespotter.org/api/${locatorStates}`;

// fetch api data for vaccine locators by state
var stateInput = document.querySelector('#state')
var searchInput = document.querySelector('#user-input')
var zipCodeArr = new Array;

// var searchLocation = 'WA';
function fetchLocation(location) {
    console.log(location);
    var locatorApi = `https://www.vaccinespotter.org/api/v0/states/${location}.json`;
    fetch(locatorApi).then(function(data){
        return data.json()
    }).then(function(data){
        var {name, address, city, state, postal_code, appointment_vaccine_types, appointments_available, appointments_available_2nd_dose_only, carries_vaccine, url} = data.features[0].properties;
        console.log(data);
        // console.log(city);
        
        for (var i = 0; i < data.features.length; i++) {
            var option = document.createElement('option');
            var zipCode = document.createTextNode(data.features[i].properties.postal_code);
            option.appendChild(zipCode);
            searchInput.appendChild(option);
            console.log(zipCode);
        }

        console.log({name, address, city, state, postal_code, appointment_vaccine_types, appointments_available, appointments_available_2nd_dose_only, carries_vaccine, url});
    })
}


searchButton.addEventListener('click', function(event) {    
    event.preventDefault();
    // console.log('clickkkkked');

    var location = stateInput.value;
    console.log(location)  
})

stateSearchButton.addEventListener('click', function(event) {
    event.preventDefault();

    var location = stateInput.value;
    fetchLocation(location);
})

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
    
  });
  $( document ).ready(function(){
    $(".dropdown-trigger").dropdown();
    $('.carousel').carousel();
  });
  //map begins
  mapboxgl.accessToken = 'pk.eyJ1IjoianZwcm9maXRzMjgiLCJhIjoiY2tuMjRzdmg4MTQ5cTJubW94bW41MzlnNyJ9.jM6FpByBc8lm0jphn2EQKw';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/jvprofits28/ckn2i7hxj2pcg17o5q8gi6ep4', // style URL
        center: [-104.127, 36.603], // starting position [lng, lat]
        zoom: 2 // starting zoom
    });
  
