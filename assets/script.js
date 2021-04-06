var searchButton = document.querySelector('#searchBtn')
var stateSearchButton = document.querySelector('#state-search-btn');

var options = {
    option1: document.querySelector('#option1'),
    option2: document.querySelector('#option2'),
    option3: document.querySelector('#option3')
}

function getApi(options) {
    var mapApi = `https://api.mapbox.com/geocoding/v5`  
}

// mapboxgl.baseApiUrl = 'https://api.mapbox.com';
// var twitterApi = `https://api.twitter.com/2/users/by?usernames=`;
// var twitterKey = 'Im7uUV8AiJYhWKNnXbycBqMY9';
// var twitterSecretKey = 'IMnIEZ2K2rbvXfOQyJHf2K9UatzsgBRm3c8Jf5lZ1rz2ti39dw'
// var twitterBearerToken = 'AAAAAAAAAAAAAAAAAAAAAPM%2FOQEAAAAA899MVc2O6Be6P355V%2FcRsYMsI3s%3D0BbTUa0xte11HYfZTaPWIGOsjzLiRm8iqAgV71vO0jFWD1WokN'

// fetch api data for vaccine locators by state
var stateInput = document.querySelector('#state');
var zipInput = document.querySelector('#user-input');
var zipCodeArr = new Array;
var resultsDiv = document.querySelector('#results-div');

function fetchLocation(location) {
    console.log(location);
    var locatorApi = `https://www.vaccinespotter.org/api/v0/states/${location}.json`;
    fetch(locatorApi).then(function(data){
        return data.json()
    }).then(function(data){
        var {name, address, city, state, postal_code, appointment_vaccine_types, appointments, appointments_available, appointments_available_2nd_dose_only, carries_vaccine, url} = data.features[0].properties;
        console.log(data);
        // console.log(city);
        // console.log({name, address, city, state, postal_code, appointment_vaccine_types, appointments_available, appointments_available_2nd_dose_only, carries_vaccine, url});
        
        for (var i = 0; i < data.features.length; i++) {
            var option = document.createElement('option');
            var zipCode = document.createTextNode(data.features[i].properties.postal_code);
            option.appendChild(zipCode);
            zipInput.appendChild(option);
            // console.log(zipCode);
        }

        // for location name
        for (var i = 0; i < data.features.length; i++) {
            if (zipInput.value === data.features[i].properties.postal_code) {
                // name of location
                var placeName = document.createElement('h5');
                placeName.setAttribute('class', 'location-name');
                // url of location
                var placeUrl = document.createElement('a');
                placeUrl.setAttribute('href', placeUrl);
                placeName.append(placeUrl);
                var nameDataLocation = document.createTextNode(data.features[i].properties.name);
                placeName.appendChild(nameDataLocation);

                // url of location
                // var placeUrl = document.createElement('a');
                // var urlDataLocation = data.features[i].properties.url;
                // placeUrl.setAttribute('href', urlDataLocation);
                // placeName.append(placeUrl);

                // address of location
                var placeAddress = document.createElement('h6');
                placeAddress.setAttribute('class', 'location-address');
                var addressDataLocation = document.createTextNode(data.features[i].properties.address);
                placeAddress.appendChild(addressDataLocation);

                // city of location
                var placeCity = document.createElement('h6');
                placeCity.setAttribute('class', 'location-city');
                var cityDataLocation = document.createTextNode(data.features[i].properties.city);
                placeCity.appendChild(cityDataLocation);

                // state of location
                var placeState = document.createElement('h6');
                placeState.setAttribute('class', 'location-state');
                var stateDataLocation = document.createTextNode(data.features[i].properties.state);
                placeState.appendChild(stateDataLocation);

                // zip of location
                var placeZip = document.createElement('h6');
                placeZip.setAttribute('class', 'location-zip');
                var zipDataLocation = document.createTextNode(data.features[i].properties.postal_code);
                placeZip.appendChild(zipDataLocation);

                // appointments

                // appointment_vaccine_types
                var placeVacType = document.createElement('p');
                placeVacType.setAttribute('class', 'location-vac-type');
                var vacTypeDataLocation = document.createTextNode(data.features[i].properties.appointment_vaccine_types);
                placeVacType.appendChild(vacTypeDataLocation);
                var pfizer = data.features[i].properties.appointment_vaccine_types.pfizer;
                var moderna = data.features[i].properties.appointment_vaccine_types.moderna;
                var jj = data.features[i].properties.appointment_vaccine_types.jj; 
                // change text to dynamic button type text? 
                    // if unavailable, wrap text in red box, if availble, wrap in green box instead of long sentence abt unavailability
                if (pfizer === true) {
                    placeVacType.textContent = 'Vaccine types available: Pfizer';
                } else if (pfizer && moderna === true) {
                    placeVacType.textContent = 'Vaccine types available: Pfizer, Moderna';
                } else if (pfizer && moderna && jj === true) {
                    placeVacType.textContent = 'Vaccine types available: Pfizer, Moderna, Johnson & Johnson';
                } else if (moderna === true) {
                    placeVacType.textContent = 'Vaccine types available: Moderna'
                } else if (moderna && jj === true) {
                    placeVacType.textContent = 'Vaccine types available: Moderna, Johnson & Johnson'
                } else if (pfizer && jj === true) {
                    placeVacType.textContent = 'Vaccine types available: Pfizer, Johnson & Johnson'
                } else if (jj === true) {
                    placeVacType.textContent = 'Vaccine types available: Johnson & Johnson'
                } else {
                    placeVacType.textContent = 'Vaccines available: Information unavailable at this time. Please contact the location for more information.'
                }

                // appointments_available_2nd_dose_only
                var placeSecondDoseOnly = document.createElement('p');
                placeSecondDoseOnly.setAttribute('class', 'second-dose-only');
                if (data.features[i].properties.appointments_available_2nd_dose_only === true) {
                    placeSecondDoseOnly.textContent = '** Appointments for second dose only';
                } else {
                    placeSecondDoseOnly.textContent = '';
                }

                // appointment availability
                var placeAptAvail = document.createElement('p');
                placeAptAvail.setAttribute('class', 'location-apts-avail');
                if (data.features[i].properties.appointments_available === true) {
                    placeAptAvail.textContent = 'Appointments: available'
                } else {
                    placeAptAvail.textContent = 'Appointments: unavailable'
                }
                
                resultsDiv.appendChild(placeName);
                resultsDiv.appendChild(placeAddress);
                resultsDiv.appendChild(placeCity);
                resultsDiv.appendChild(placeState);
                resultsDiv.appendChild(placeZip);
                resultsDiv.appendChild(placeAptAvail);
                resultsDiv.appendChild(placeSecondDoseOnly);
                resultsDiv.appendChild(placeVacType);
                
                console.log(placeName);   
            } else {
                var noLocation = document.createElement('h5');
                noLocation.setAttribute('class', 'no-location');
                resultsDiv.appendChild(noLocation);
            }
        }
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