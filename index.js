var x = $("#demo");
var myLatitude
var myLongitude

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.html("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  x.html(`Latitude: ${myLatitude}<br>
    Longitude: ${myLongitude}`);

  myLatitude = position.coords.latitude
  myLongitude = position.coords.longitude

  console.log(myLatitude)
  console.log(myLongitude)
}

function calculate(hotspot) {
  earthRadius = 6371;

  myLongitudeRads = myLongitude * (Math.PI / 180);
  myLatitudeRads = myLatitude * (Math.PI / 180);

  long1 = hotspot.longitude * (Math.PI / 180);
  lat1 = hotspot.latitude * (Math.PI / 180);

  x0 = myLongitudeRads * earthRadius * Math.cos(myLatitudeRads);
  y0 = myLatitudeRads * earthRadius;

  x1 = long1 * earthRadius * Math.cos(lat1);
  y1 = lat1 * earthRadius;

  dx = x0 - x1;
  dy = y0 - y1;

  d = Math.sqrt((dx * dx) + (dy * dy));

  return d <= 1
};

function isFree(networks) {
  return networks[10] !== "Limited Free"
}

class Hotspot {
  constructor(objectId, ssid, location, city, boro, locationType, latitude, longitude, name, provider) {
    this.objectId = objectId
    this.ssid = ssid
    this.location = location
    this.city = city
    this.boro = boro
    this.locationType = locationType
    this.latitude = parseFloat(latitude)
    this.longitude = parseFloat(longitude)
    this.name = name
    this.provider = provider
  }
}

function showHotspots(event, data) {
  var hotspots = JSON.parse(this.responseText)
  const freeHotspots = hotspots.data.filter(isFree)
  const modelHotspots = freeHotspots.map((hotspot) => {
    return new Hotspot(
      hotspot[8],
      hotspot[21],
      hotspot[13],
      hotspot[20],
      hotspot[9],
      hotspot[18],
      hotspot[14],
      hotspot[15],
      hotspot[12],
      hotspot[11]
    )
  })
  const nearbyHotspots = modelHotspots.filter(calculate)
  console.log(nearbyHotspots)
  const hotspotList = `<ul>
    ${nearbyHotspots.map(h =>
      '<li>' + '<div> Object ID: ' + h.objectId + '</div>'
      + '<div> SSID: ' + h.ssid + '</div>'
      + '<div> Location/Address: ' + h.location + ', ' + h.city + '</div>'
      + '<div> Location Type: ' + h.locationType + '</div>'
      + '<div> Name: ' + h.name + '</div>'
      + '<div> Provider: ' + h.provider + '</div>'
      + h.latitude + ', '
      + h.longitude
      + '</li><br>').join('')}
    </ul>`
  $("#hotspots").html(hotspotList)
}

function getHotspots() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", showHotspots);
  req.open("GET", 'https://data.cityofnewyork.us/api/views/yjub-udmw/rows.json')
  req.send()
}
