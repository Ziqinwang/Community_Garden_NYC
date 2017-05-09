// //load the original dataset
var gardenraw ='https://gist.githubusercontent.com/Ziqinwang/2cd90ad8a91216d1ebcc5f2e9bb09cbe/raw/d8b81658f7859211f598ed5f0c545ad44227052c/manhattan_point.geojson';
var gardenpoint ='https://gist.githubusercontent.com/Ziqinwang/23ac3f51ac0d753938102e73d00c89da/raw/df160ebb6b187086e00c8dc20867efe8e0f74843/bk_point2.geojson';
var bk ='https://gist.githubusercontent.com/Ziqinwang/b57362aafe8a337595017951b6fc5aa1/raw/fee5f773540d9ffd368997d8265f6bc38656a44c/bk_block2.geojson';

// reset the first map
var resetMap = function(){
  assetLayerGroup.clearLayers();
};
// reset the second map
var resetMap2 = function(){
  assetLayerGroup2.clearLayers();
};


//set the basemap
L.mapbox.accessToken = 'pk.eyJ1Ijoid2FnbnppcWluIiwiYSI6ImNpdnNpbGRqazA1NTEyeWxkbWNvbXF3dXoifQ.N5sKiFdNKqGmibQ30RSXMw';

var map = L.mapbox.map('map')
  .setView([40.743395, -73.993251], 12);
var map2 = L.mapbox.map('map2')
  .setView([40.646606, -73.956350], 11);

//I try to use the mapbox js plugins to find the user's location, but this plugin does not work. LoL
L.control.locate().addTo(map);
// add layers to layer group rathen than basemap so that when I clear the layer the basemap would not wipe out.
var assetLayerGroup = L.layerGroup().addTo(map);
var assetLayerGroup2 = L.layerGroup().addTo(map2);

L.control.layers({
  'Dark': L.mapbox.styleLayer('mapbox://styles/mapbox/dark-v9'),
  'Light': L.mapbox.styleLayer('mapbox://styles/mapbox/light-v9').addTo(map),
  'Streets': L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v9'),
  'Satellite': L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-v9')
}).addTo(map);

L.control.layers({
  'Dark': L.mapbox.styleLayer('mapbox://styles/mapbox/dark-v9').addTo(map2),
  'Light': L.mapbox.styleLayer('mapbox://styles/mapbox/light-v9'),
  'Streets': L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v9'),
  'Satellite': L.mapbox.styleLayer('mapbox://styles/mapbox/satellite-v9')
}).addTo(map2);
