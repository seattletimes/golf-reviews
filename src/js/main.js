//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

//ICH code for popup template if needed----------
// var ich = require("icanhaz");
// var templateFile = require("./_popup.html");
// ich.addTemplate("popup", templateFile);

// var onEachFeature = function(feature, layer) {
//   layer.bindPopup(ich.popup(feature.properties))
// };
var markers = [];
var markergroup = L.featureGroup()

window.course.forEach(function(data) {
  var marker = L.marker([data.lat, data.lng], {
    icon: L.divIcon({
      className: "golf-icon"
    })
  });
  var html = `
    <b>${data.name}</b><br>
    <i>${data.address}</i><br>
    <br>
    Scott Hanson's rating: ${data.scott}/4<br>
    Craig Smith's rating: ${data.craig}/4<br>
    <a href="${data.url}" target="_blank">Read their review</a>

  `;
  console.log(html);
  marker.bindPopup(html);
  markers.push(marker);
  marker.addTo(markergroup);
});

markergroup.addTo(map);

 map.scrollWheelZoom.disable();
 map.fitBounds(markergroup.getBounds())