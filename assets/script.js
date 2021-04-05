console.log('linked fosho');
var options = {
    option1: document.querySelector(‘#option1’),
    option2: document.querySelector(‘#option2’),
    option3: document.querySelector(‘#option3’)
}
// fetch api
// find by zip
// narrow range by option selected
function getApi(options) {
    var mapApi = `https://api.mapbox.com/geocoding/v5`
}
// mapboxgl.baseApiUrl = ’https://api.mapbox.com';
document.addEventListener(‘click’, function(event) {
    event.preventDefault();
    console.log(‘clickkkkked’);
})
document.addEventListener(‘DOMContentLoaded’, function() {
    var elems = document.querySelectorAll(‘select’);
    var instances = M.FormSelect.init(elems, options);
  });

  $( document ).ready(function{
    $(".dropdown-trigger").dropdown();
  });