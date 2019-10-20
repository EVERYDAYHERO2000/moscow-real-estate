var runApp = function(){
    
  __.core = __.fs.coreModuls(['$window','$app','$header','$map','$places','$placeSearch','$mapControls']);
  

  $.get('bin/data/data.json', function (places) {
    
    var data = decodeData(places);

    
    
    __.core.$app.data('data', data);
    
    __.core.$map.trigger('createMap').trigger('renderMap', {
      data: data
    });

    __.core.$places.trigger('renderList', {
      places: data.places,
      onlyVisible: false
    });

  });
  
  
}

  
