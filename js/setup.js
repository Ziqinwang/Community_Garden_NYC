// //set basemap

// //load the original dataset
var gardenraw ='https://gist.githubusercontent.com/Ziqinwang/1d74b9a1bf1325b2435bf1ec70e3e6ca/raw/4bc038f58bc68349f8cce013fc2ea826398d7bee/m_12_point.json';
var gardenpoint ='https://gist.githubusercontent.com/Ziqinwang/23ac3f51ac0d753938102e73d00c89da/raw/df160ebb6b187086e00c8dc20867efe8e0f74843/bk_point2.geojson';
var bk ='https://gist.githubusercontent.com/Ziqinwang/b57362aafe8a337595017951b6fc5aa1/raw/fee5f773540d9ffd368997d8265f6bc38656a44c/bk_block2.geojson';

var resetMap = function(){
  assetLayerGroup.clearLayers();
};
//
var resetMap2 = function(){
  assetLayerGroup2.clearLayers();
};

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


L.mapbox.accessToken = 'pk.eyJ1Ijoid2FnbnppcWluIiwiYSI6ImNpdnNpbGRqazA1NTEyeWxkbWNvbXF3dXoifQ.N5sKiFdNKqGmibQ30RSXMw';
//base map
var map = L.mapbox.map('map')
  .setView([40.743395, -73.993251], 12);
var map2 = L.mapbox.map('map2')
  .setView([40.646606, -73.956350], 11);
//I try to use the mapbox js plugins to find the user's location, but this plugin does not work. LoL
L.control.locate().addTo(map);
// group to store layers
var assetLayerGroup = L.layerGroup().addTo(map);
var assetLayerGroup2 = L.layerGroup().addTo(map2);
L.control.layers({
  'Dark': L.mapbox.styleLayer('mapbox://styles/mapbox/dark-v9').addTo(map),
  'Light': L.mapbox.styleLayer('mapbox://styles/mapbox/light-v9'),
  'Streets': L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v9'),
  'Satellite': L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-v9')
}).addTo(map);

L.control.layers({
  'Dark': L.mapbox.styleLayer('mapbox://styles/mapbox/dark-v9').addTo(map2),
  'Light': L.mapbox.styleLayer('mapbox://styles/mapbox/light-v9'),
  'Streets': L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v9'),
  'Satellite': L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-v9')
}).addTo(map2);
