var searchButton = document.querySelector("#searchBtn");
// var stateSearchButton = document.querySelector("#state-search-btn");

var stateInput = document.querySelector("#state");
var zipInput = document.querySelector("#user-input");
var zipCodeArr = new Array();
var resultsDiv = document.querySelector("#results-div");

// grabbing api for mapbox
function getApi(options) {
    var mapApi = `https://api.mapbox.com/geocoding/v5`;
}

// carousel and dropdown on page load
$(document).ready(function () {
    $(".dropdown-trigger").dropdown();
    $(".carousel").carousel();
  });

// button event listeners
searchButton.addEventListener("click", function (event) {
event.preventDefault();
// console.log('clickkkkked');

var location = stateInput.value;
fetchLocation(location)
console.log(location);
});

// stateSearchButton.addEventListener("click", function (event) {
// event.preventDefault();

// var location = stateInput.value;
// fetchLocation(location);
// });


// Mapbox events
    mapboxgl.accessToken =
    "pk.eyJ1IjoianZwcm9maXRzMjgiLCJhIjoiY2tuMjRzdmg4MTQ5cTJubW94bW41MzlnNyJ9.jM6FpByBc8lm0jphn2EQKw";
// initial map start
var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/jvprofits28/ckn2i7hxj2pcg17o5q8gi6ep4", // style URL
  center: GetLocation(zipcode), // starting position [lng, lat]
  zoom: 2, // starting zoom
});


// function GetLocation(address) {
//     var geocoder = new google.maps.Geocoder();
//     //var address = document.getElementById("txtAddress").value;
//     geocoder.geocode({ 'address': address }, function (results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//             var lat = results[0].geometry.location.lat();
//             var long = results[0].geometry.location.lng();
//             return [lat,long]
//         } else {
//             alert("Request failed.")
//         }
//     });
// };


// Collecting List display data
function fetchLocation(location) {
//   console.log(location)
  var locatorApi = `https://www.vaccinespotter.org/api/v0/states/${location}.json`;
  fetch(locatorApi)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.features.length; i++) {
        var option = document.createElement("option");
        var zipCode = document.createTextNode(
          data.features[i].properties.postal_code
        );
        option.appendChild(zipCode);
        zipInput.appendChild(option);
        // console.log(zipCode);
      }

      // for info on locations by state/zip search
      for (var i = 0; i < data.features.length; i++) {
        if (zipInput.value === data.features[i].properties.postal_code) {
          // name of location
          var placeName = document.createElement('h5');
          placeName.setAttribute('class', 'location-name');
          var nameDataLocation = document.createTextNode(data.features[i].properties.name);
          var placeUrl = document.createElement('a');
          var urlDataLocation = data.features[i].properties.url;
          placeUrl.setAttribute('href', urlDataLocation)
          placeUrl.appendChild(nameDataLocation);
          placeName.appendChild(placeUrl);

          // address of location
          var placeAddress = document.createElement("h6");
          placeAddress.setAttribute("class", "location-address");
          var addressDataLocation = document.createTextNode(
            data.features[i].properties.address
          );
          placeAddress.appendChild(addressDataLocation);

          // city of location
          var placeCity = document.createElement("h6");
          placeCity.setAttribute("class", "location-city");
          var cityDataLocation = document.createTextNode(
            data.features[i].properties.city
          );
          placeCity.appendChild(cityDataLocation);

          // state of location
          var placeState = document.createElement("h6");
          placeState.setAttribute("class", "location-state");
          var stateDataLocation = document.createTextNode(
            data.features[i].properties.state
          );
          placeState.appendChild(stateDataLocation);

          // zip of location
          var placeZip = document.createElement("h6");
          placeZip.setAttribute("class", "location-zip");
          var zipDataLocation = document.createTextNode(
            data.features[i].properties.postal_code
          );
          placeZip.appendChild(zipDataLocation);

          // appointments

          // appointment_vaccine_types
          var placeVacType = document.createElement("p");
          placeVacType.setAttribute("class", "location-vac-type");
          var vacTypeDataLocation = document.createTextNode(
            data.features[i].properties.appointment_vaccine_types
          );
          placeVacType.appendChild(vacTypeDataLocation);
          var pfizer =
            data.features[i].properties.appointment_vaccine_types.pfizer;
          var moderna =
            data.features[i].properties.appointment_vaccine_types.moderna;
          var jj = data.features[i].properties.appointment_vaccine_types.jj;
          // change text to dynamic button type text?
          // if unavailable, wrap text in red box, if availble, wrap in green box instead of long sentence abt unavailability
          if (pfizer === true) {
            placeVacType.textContent = "Vaccine types available: Pfizer";
          } else if (pfizer && moderna === true) {
            placeVacType.textContent =
              "Vaccine types available: Pfizer, Moderna";
          } else if (pfizer && moderna && jj === true) {
            placeVacType.textContent =
              "Vaccine types available: Pfizer, Moderna, Johnson & Johnson";
          } else if (moderna === true) {
            placeVacType.textContent = "Vaccine types available: Moderna";
          } else if (moderna && jj === true) {
            placeVacType.textContent =
              "Vaccine types available: Moderna, Johnson & Johnson";
          } else if (pfizer && jj === true) {
            placeVacType.textContent =
              "Vaccine types available: Pfizer, Johnson & Johnson";
          } else if (jj === true) {
            placeVacType.textContent =
              "Vaccine types available: Johnson & Johnson";
          } else {
            placeVacType.textContent =
              "Vaccines available: Information unavailable at this time. Please contact the location for more information.";
          }

          // appointments_available_2nd_dose_only
          var placeSecondDoseOnly = document.createElement("p");
          placeSecondDoseOnly.setAttribute("class", "second-dose-only");
          if (
            data.features[i].properties.appointments_available_2nd_dose_only ===
            true
          ) {
            placeSecondDoseOnly.textContent =
              "** Appointments for second dose only";
          } else {
            placeSecondDoseOnly.textContent = "";
          }

          // appointment availability
          var placeAptAvail = document.createElement("p");
          placeAptAvail.setAttribute("class", "location-apts-avail");
          if (data.features[i].properties.appointments_available === true) {
            placeAptAvail.textContent = "Appointments: available";
          } else {
            placeAptAvail.textContent = "Appointments: unavailable";
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
          var noLocation = document.createElement("h5");
          noLocation.setAttribute("class", "no-location");
          resultsDiv.appendChild(noLocation);
        }
      }
    });
}