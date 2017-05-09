// this draw.js is the function for the first map
// Initialize Leaflet Draw
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

// Global Variables
var myRectangles=[];
var i;
var Exportdata = [];
$("#results").hide();
$(".hide").hide();


// the point in polygon function I found on Github, Really Appreciate!
var inside = function(point,vs) {
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};

//draw the first map
map.on('draw:created', function (e) {
    //every time draw the polygon, remove the previous polygon
    var count=[];
    _.each(myRectangles, function(layer){map.removeLayer(layer);});
    //var type = e.layerType;
    var layer = e.layer;
    //var id = L.stamp(layer);
    myRectangles.push(layer);
    _.last(myRectangles).addTo(assetLayerGroup);

    //put the polygon coordinate into an array for the point in polygon function
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
      resetMap();
      var parsedData = JSON.parse(data);
      var drawData = L.geoJson(parsedData,{
              pointToLayer: function (feature, latlng) {
                if(jud(latlng)===true){
                  //pop up the numebr of garden in the select area
                  count.push(latlng);
                  Exportdata.push(JSON.stringify(feature));
                  $(".hide").show();
                  $("#results").show();
                  $('#results').html('<h4>There were ' + count.length+ ' gardens for the area you selected</h4>');
                  //pop up the garden in the select area
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


//export the select garden in geojson format
document.getElementById('export').onclick = function(e) {
            // Stringify the GeoJson, I'am not sure why the exportdata is not featurecollection, so here I manually create the featurecollection...
            var convertedData = 'text/json;charset=utf-8,' + '{ "type": "FeatureCollection", "features":[' + encodeURIComponent(Exportdata) + "]}";
            // Create export
            document.getElementById('export').setAttribute('href', 'data:' + convertedData);
            document.getElementById('export').setAttribute('download','Community Garden.geojson');
};
