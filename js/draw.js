// // Global Variables

// $( ".draggable" ).draggable();

// // Initialize Leaflet Draw
var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: true,
    circle: false,
    marker: false,
    rectangle: false,
  }
});
map.addControl(drawControl);
//
var myRectangles=[];
var i;
var Exportdata = [];
//
//draw the map
$("#results").hide();
$(".hide").hide();

map.on('draw:created', function (e) {
    var count=[];
    _.each(myRectangles, function(layer){map.removeLayer(layer);});
    var type = e.layerType;
    var layer = e.layer;
    var id = L.stamp(layer);
    myRectangles.push(layer);
    _.last(myRectangles).addTo(assetLayerGroup);

    var tempArray = [];
    for (var i=0; i < e.layer._latlngs[0].length; i++) {
        var lat = e.layer._latlngs[0][i].lat;
        var lng = e.layer._latlngs[0][i].lng;
        tempArray.push([lng, lat]);
     }


    function jud(a){
      return inside([a.lng,a.lat], tempArray);
    }


    $.ajax(gardenraw).done(function(data){
      //Adata.push(JSON.stringify(data));
      resetMap();
      var parsedData = JSON.parse(data);
      var drawData = L.geoJson(parsedData,{
              pointToLayer: function (feature, latlng) {
                if(jud(latlng)===true){
                  count.push(latlng);
                  Exportdata.push(JSON.stringify(feature));
                  $(".hide").show();
                  $("#results").show();
                  $('#results').html('<h4>There were ' + count.length+ ' gardens for the area you selected</h4>');
                  return L.marker(latlng, {icon: L.mapbox.marker.icon({
                      'marker-color': '#DC143C',
                      'marker-size': 'small',
                      'marker-symbol': 'garden'})
                  });
                }
                else if (jud(latlng)===false) {return L.marker(latlng,{opacity:0});
                }
              }
      });
      drawData.addTo(assetLayerGroup);

    });
});



document.getElementById('export').onclick = function(e) {
            // Stringify the GeoJson
            var convertedData = 'text/json;charset=utf-8,' + '{ "type": "FeatureCollection", "features":[' + encodeURIComponent(Exportdata) + "]}";
            // Create export
            document.getElementById('export').setAttribute('href', 'data:' + convertedData);
            document.getElementById('export').setAttribute('download','Community Garden.geojson');
};
