const api_key = "API_KEY";
var map = L.map('map', { attributionControl: false }).setView([53.9045, 27.5615], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
var searchControl = L.Control.geocoder({ geocoder: L.Control.Geocoder.nominatim(), defaultMarkGeocode: false, placeholder: "Search..." }).on('markgeocode', function(e) {
    map.fitBounds(e.geocode.bbox);
}).addTo(map);

function toggleMenu() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
}

function showContextMenu(event) {
    event.preventDefault();
    var contextMenu = L.popup().setLatLng(map.mouseEventToLatLng(event)).setContent(getContextMenuContent(event)).openOn(map);
}


function getContextMenuContent(event) {
    var latlng = map.mouseEventToLatLng(event);
    var content = '<ul class="custom-context-menu">';
    // content += '<li><a href="#" onclick="addMarker(' + latlng.lat + ',' + latlng.lng + ');">Add marker</a></li>';
    content += '<li><a href="#" onclick="measure_distance(' + latlng.lat + ',' + latlng.lng + ');">Distance</a></li>';
    content += '<li><a href="#" onclick="copy_to_clipboard(' + latlng.lat + ',' + latlng.lng + ');">' + latlng.lat.toFixed(5) + ' ' + latlng.lng.toFixed(5) + '</a></li>';
    content += '</ul>';
    return content;
}

function copy_to_clipboard(lat, lng) {
    var coords = lat.toFixed(5) + ' ' + lng.toFixed(5);
    navigator.clipboard.writeText(coords);
    map.closePopup();
}

var plantIcon = L.icon({
    iconUrl: 'img/plant_img/plant.ico',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -38]
});

fetch('script/plant_src/plant.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(aes => {
      var popupContent = `
        <div>
          <h3>${aes.name}</h3>
          <p><strong>Reactor type:</strong> ${aes.reactorType}</p>
          <p><strong>Netto reactor power:</strong> ${aes.power_netto} МВт</p>
          <p><strong>Brutto reactor power:</strong> ${aes.power_brutto} МВт</p>
          <p><strong>Blocks number:</strong> ${aes.blocks}</p>
        </div>
      `;
      
      var marker = L.marker([aes.lat, aes.lng], { icon: plantIcon })
        .bindPopup(popupContent)
        .addTo(map);

      var aesName = L.divIcon({
        className: 'aes-label',
        html: `<p style="position: absolute; font-weight: bold; font-size: 16px; text-align: center; white-space: nowrap; transform: translateX(-50%); top: -10px;">${aes.name}</p>`
      });
      

      L.marker([aes.lat, aes.lng], { icon: aesName }).addTo(map);
    });
  })
  .catch(error => console.error('Error:', error));

  var controlIcon = L.icon({
    iconUrl: 'img/control_img/C1.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -38]
});

fetch('script/control_src/control.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(control => {
          var popupContent = `
          <div>
              <h3>${control.name}</h3>
              <p><strong>Reactor type:</strong> ${control.description}</p>
              <button class="btn btn-primary" onclick="openControlEditor('${control.name}')">Edit</button>
          </div>
      `;
      

            var marker = L.marker([control.lat, control.lng], { icon: controlIcon })
                .bindPopup(popupContent)
                .addTo(map);

            var controlName = L.divIcon({
                className: 'control-label',
                html: `<p style="position: absolute; font-weight: bold; font-size: 16px; text-align: center; white-space: nowrap; transform: translateX(-50%); top: -10px;">${control.name}</p>`
            });

            L.marker([control.lat, control.lng], { icon: controlName }).addTo(map);
        });
    })
    .catch(error => console.error('Error:', error));

    function openControlEditor(name) {
      $('#controlModal').modal('show');
  }

// async function addMarker(lat, lng) {
//     var marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
//     marker.bindPopup("Info").openPopup();
//     await generate_polygons(lat, lng);
//     map.closePopup();
// }

//
// const lat = 51.505;
// const lng = -0.09;
// const map = L.map('map').setView([lat, lng], 13);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
// }).addTo(map);

// generate_polygons(lat, lng, map);