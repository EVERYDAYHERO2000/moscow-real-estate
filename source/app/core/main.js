var runApp = function(){
    
  __.core = __.fs.coreModuls(['$window','$app','$header','$map','$places','$placeSearch','$mapControls']);
  
  let location = window.location.pathname;
  
  //if (location == '/' || location == '/index.html') { 
    
      $.get('/bin/data/data.json', function (places) {

      let data = __.fs.decodeData(places);

      __.core.$app.data('data', data);

      __.core.$map.trigger('createMap').trigger('renderMap', {
        data: data
      });
      /* 
      __.core.$places.trigger('renderList', {
        places: data.places,
        onlyVisible: false
      });
      */  
    });
    
  //} 
  
  if (location.includes('/places/')) {
    
    __.detailScreen({});
    
  }
  
  
}

  
