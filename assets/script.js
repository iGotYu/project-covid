var searchButton = document.querySelector("#searchBtn");

var stateInput = document.querySelector("#state");
var zipInput = document.querySelector("#user-input");
var zipCodeArr = new Array();
var resultsDiv = document.querySelector("#results-div");


//grabbing api for mapbox
function getApi(options) {
  var mapApi = `https://api.mapbox.com/geocoding/v5`;
}

//carousel and dropdown on page load
$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
  $(".carousel").carousel();
  $('select').formSelect();
});

// save user search input to local storage
function saveInput() {
  var stateZipInput = {
    state: stateInput.value,
    zip: zipInput.value
  }
  console.log(stateZipInput);
  localStorage.setItem('state', JSON.stringify(stateZipInput.state));
  localStorage.setItem('zip', JSON.stringify(stateZipInput.zip));
}

function getStateInput() {
  var savedState = JSON.parse(localStorage.getItem('state'));

  if (savedState !== null) {
    stateInput.value = savedState;
  } else {
      return;
  }
}

function getzipInput() {
  var savedZip = JSON.parse(localStorage.getItem('zip'));

  if (savedZip !== null) {
    zipInput.value = savedZip;
    const specialInput =  document.getElementsByClassName("mapboxgl-ctrl-geocoder--input")[0]
  
    specialInput.value = savedZip
    // specialInput.style.display="none"
  
  } else {
      return;
  }
}

//button event listeners
searchButton.addEventListener("click", function (event) {
  // event.preventDefault();
  var resultsContainer = document.querySelector('#results-container');
  resultsContainer.classList.remove('hidden');
  resultsContainer.classList.add('visible');
  resultsDiv.textContent = '';

  console.log(resultsDiv.offsetTop);
  var location = stateInput.value;
  fetchLocation(location);
  saveInput();
  console.log(location);
  getzipInput();
});


//Mapbox events
mapboxgl.accessToken =
  "pk.eyJ1IjoianZwcm9maXRzMjgiLCJhIjoiY2tuMjRzdmg4MTQ5cTJubW94bW41MzlnNyJ9.jM6FpByBc8lm0jphn2EQKw";
// initial map start
var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/jvprofits28/ckn2i7hxj2pcg17o5q8gi6ep4", // style URL
  center: [-95.7129, 37.0902], // starting position [lng, lat]
  zoom: 2.75, // starting zoom
});

window.navigator.geolocation.getCurrentPosition(function(position){
  map.flyTo({
    center: [position.coords.longitude, position.coords.latitude],
    zoom:10,
  })
})

//map popups
var marker = new mapboxgl.Marker().setLngLat([-0.2, 51.5]).addTo(map);
map.on("click", function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ["test-json", "alabama", "50-states"], // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      "<h5>" +
        feature.properties.name +
        "</h5><p>" +
        feature.properties.address +
        "</p>"+
        "<p> Available Appointments:"+
        feature.properties.appointments_available+
        
        "</p>"

    )
    .addTo(map);
});

//Collecting List display data
function fetchLocation(location) {
  console.log(location);
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
          var placeName = document.createElement("h5");
          placeName.setAttribute("class", "location-name");
          var nameDataLocation = document.createTextNode(
            data.features[i].properties.name
          );
          var placeUrl = document.createElement("a");
          var urlDataLocation = data.features[i].properties.url;
          placeUrl.setAttribute("href", urlDataLocation);
          placeUrl.setAttribute("target", "_blank")
          placeUrl.appendChild(nameDataLocation);
          placeName.appendChild(placeUrl);

          // address of location
          var placeAddress = document.createElement("h6");
          placeAddress.setAttribute("class", "location-address");
          var addressDataLocation = document.createTextNode(
            data.features[i].properties.address
          );
          placeAddress.appendChild(addressDataLocation);

          // city, state, zip of location
          var placeCity = document.createElement("h6");
          placeCity.setAttribute("class", "location-city");
          var cityDataLocation = document.createTextNode(
            data.features[i].properties.city + ', ' + data.features[i].properties.state + ' ' + data.features[i].properties.postal_code
          );
          placeCity.appendChild(cityDataLocation);

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
            placeVacType.innerHTML = "<b>Vaccine types available:</b> Pfizer";
          } else if (pfizer && moderna === true) {
            placeVacType.innerHTML =
              "<b>Vaccine types available:</b> Pfizer, Moderna";
          } else if (pfizer && moderna && jj === true) {
            placeVacType.innerHTML =
              "<b>Vaccine types available:</b> Pfizer, Moderna, Johnson & Johnson";
          } else if (moderna === true) {
            placeVacType.innerHTML = "<b>Vaccine types available:</b> Moderna";
          } else if (moderna && jj === true) {
            placeVacType.innerHTML =
              "<b>Vaccine types available:</b> Moderna, Johnson & Johnson";
          } else if (pfizer && jj === true) {
            placeVacType.innerHTML =
              "<b>Vaccine types available:</b> Pfizer, Johnson & Johnson";
          } else if (jj === true) {
            placeVacType.innerHTML =
              "<b>Vaccine types available:</b> Johnson & Johnson";
          } else {
            placeVacType.innerHTML =
              "<b>Vaccines available:</b> Information unavailable at this time. Please visit the location website for more information.";
          }

          // appointments_available_2nd_dose_only
          var placeSecondDoseOnly = document.createElement("p");
          placeSecondDoseOnly.setAttribute("class", "second-dose-only");
          if (
            data.features[i].properties.appointments_available_2nd_dose_only ===
            true
          ) {
            placeSecondDoseOnly.textContent =
              "<b>** Appointments for second dose only</b>";
          } else {
            placeSecondDoseOnly.textContent = "";
          }

          // appointment availability
          var placeAptAvail = document.createElement("p");
          placeAptAvail.setAttribute("class", "location-apts-avail");
          if (data.features[i].properties.appointments_available === true) {
            placeAptAvail.innerHTML = "<b>Appointments:</b> 🟢 Available";
          } else {
            placeAptAvail.innerHTML = "<b>Appointments:</b> 🔴 Unavailable";
          }

          resultsDiv.appendChild(placeName);
          resultsDiv.appendChild(placeAddress);
          resultsDiv.appendChild(placeCity);
          // resultsDiv.appendChild(placeState);
          // resultsDiv.appendChild(placeZip);
          resultsDiv.appendChild(placeAptAvail);
          resultsDiv.appendChild(placeSecondDoseOnly);
          resultsDiv.appendChild(placeVacType);

          // console.log(placeName);
        } else {
          var noLocation = document.createElement("h5");
          noLocation.setAttribute("class", "no-location");
          resultsDiv.appendChild(noLocation);
        }
      }
    });
}
getStateInput();
// getzipInput();