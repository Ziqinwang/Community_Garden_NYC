var BlockName = [];
$("#display").hide();

// Global Variables

$.ajax(bk).done(function(data){
  var parsedData = JSON.parse(data);
  bkgroup =L.geoJson(parsedData,  {
        style:getStyle,
        onEachFeature: onEachFeature
  });
  bkgroup.addTo(map2);
  //console.log(bkgroup._layers);
  _.each(bkgroup._layers,function(e){
    //console.log(e);
    BlockName.push([e.feature.properties.target_fid]);
  });
});


function onEachFeature(feature, layer) {
      layer.on({
      mousemove: highlight,
      mouseout: out,
      click: zoom
      });
}

function highlight(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 2,
    opacity:1,
    color: '#FFF',
    fillOpacity: 0.5
    });
  if (!L.Browser.ie && !L.Browser.opera) {
    layer.bringToFront();
  }
  up(layer.feature.properties);
}

function out(e) {
    bkgroup.resetStyle(e.target);
}

function zoom(e) {
    map2.fitBounds(e.target.getBounds());
}

function getStyle(feature) {
  return {
    weight: 1,
    opacity: 0.4,
    color: '#FFF',
    fillOpacity: 0.8,
    fillColor: getColor(feature.properties.predictpl)
  };
}

function getColor(d) {
  return d > 22.9 ? '#ffc6c4' :
          d > 22.3 ? '#ee919b' :
          d > 0.9 ? '#cc607d' :
          d > 0.4 ? '#9e3963' :
          '#672044';
}

var num = 0;

function up(props){
  google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(drawAnnotations);

  function drawAnnotations() {

        var data = google.visualization.arrayToDataTable([
          ['City', 'Predicted Garden', {type: 'string', role: 'annotation'},
           'Assigned Garden', {type: 'string', role: 'annotation'}],
          ['Brooklyn', parseFloat((props.predictpl*num/9322).toFixed(2)), parseFloat((props.predictpl*num/9322).toFixed(2)), ((BlockName[props.target_fid].length)-1), ((BlockName[props.target_fid].length)-1)],
        ]);

        var options = {
          title: 'Assigned Garden in Brooklyn',
          legend: { position: 'none' },
          chartArea: {width: '50%'},
          annotations: {
            alwaysOutside: true,
            textStyle: {
              fontSize: 12,
              auraColor: 'none',
              color: '#555'
            },
            boxStyle: {
              stroke: '#ccc',
              strokeWidth: 1,
              gradient: {
                color1: '#f3e5f5',
                color2: '#f3e5f5',
                x1: '0%', y1: '0%',
                x2: '100%', y2: '100%'
              }
            }
          },
          hAxis: {
            title: 'Garden Number',
            minValue: 0,
          }

        };
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
}


// // Global Variables
$( ".buttonT" ).click(function() {
  $("#display").show();
  $.ajax(gardenpoint).done(function(data){
    resetMap2();
    num =  $('#input').val();
    console.log(num);

    function judge(a){
      if (Math.random()<num/9322*(a.predictpl)/(a.lotsnum)){
        var Order = parseInt(a.target_fid);
        BlockName[Order].push(1);
        return 1;
      }
      else {return 0.01;}
    }

    function MarkerStyle(e){
      return {
        radius: 3,
        fillColor: "#1469EB",
        stroke:false,
        fillOpacity: judge(e)
      };
    }

    var parsedData = JSON.parse(data);
    L.geoJSON(parsedData,  {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, MarkerStyle(feature.properties));
      }
    }).addTo(assetLayerGroup2);
  });
});
//
