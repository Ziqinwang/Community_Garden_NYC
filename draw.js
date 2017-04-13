


// Global Variables
$( "button" ).click(function() {
  $.ajax(gardenraw).done(function(data){
    resetMap();

    var num =  $('#input').val();
    var judge=function(a){
      if (Math.random()<num/9322*(a.predictpl)/(a.lotsnum)){
        return 1;
      }
      else {return 0.1;}
    };

    var geojsonMarkerOptions=function(e){
      return {
        radius: 3,
        fillColor: "#ff7800",
        stroke:false,
        fillOpacity: judge(e)
      };
    };
    var parsedData = JSON.parse(data);
    L.geoJSON(parsedData,  {
      pointToLayer: function (feature, latlng) {
        //console.log(feature);
        return L.circleMarker(latlng, geojsonMarkerOptions(feature.properties));
      }
    }).addTo(map);
  });
});
