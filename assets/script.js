var searchButton = document.querySelector('#searchBtn')

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

var twitterApi = `https://api.twitter.com/2/users/by?usernames=`;

var twitterKey = 'Im7uUV8AiJYhWKNnXbycBqMY9';
var twitterSecretKey = 'IMnIEZ2K2rbvXfOQyJHf2K9UatzsgBRm3c8Jf5lZ1rz2ti39dw'
var twitterBearerToken = 'AAAAAAAAAAAAAAAAAAAAAPM%2FOQEAAAAA899MVc2O6Be6P355V%2FcRsYMsI3s%3D0BbTUa0xte11HYfZTaPWIGOsjzLiRm8iqAgV71vO0jFWD1WokN'



document.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('clickkkkked');
})

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
    
  });