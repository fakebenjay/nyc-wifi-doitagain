if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successHandler);
}

function successHandler(position)  {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  map = new google.maps.Map(document.getElementById("mapHolder"),{
    zoom: 15,
    center: new google.maps.LatLng(latitude, longitude),
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  );

  yourPlaceDescription = "<h1>THIS IS WHERE YOU AT</h1>"

  yourInfowindow = new google.maps.InfoWindow({
    content: yourPlaceDescription
  });

  yourMarker = new google.maps.Marker({
    position: {lat: latitude, lng: longitude},
    map: map
  });
  yourMarker.addListener('click', function() {
    yourInfowindow.open(map, yourMarker);
  });
}
