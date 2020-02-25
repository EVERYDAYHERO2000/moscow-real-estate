var runApp = function(){
    
  __.core = __.fs.coreModuls(['$window','$app','$header','$map','$places','$placeSearch']);
  
  let location = window.location.pathname;
  
  //if (location == '/' || location == '/index.html') { 
  
      $.get('/bin/data/data.json', function (places) {
      
      let data = __.fs.decodeData(places);
      

      __.core.$app.data('data', data);

      __.core.$map.trigger('createMap');
      
      setTimeout(function(){
        __.core.$map.trigger('renderMap', {
          data: data
        });
      }, 300);  
      /* 
      __.core.$places.trigger('renderList', {
        places: data.places,
        onlyVisible: false
      });
      */ 
        
      
      if (location.includes('/place_')) {

        $.get(`/bin/data${location}data.json`, function(place){
          
          __.detailScreen({place:place});
          
        });
        
      }  
        
        
    });
  
  
    window.addEventListener('popstate', function(e){
      window.location.href = window.location.href; 
    }, false);
    
  //} 
  

  
  
}

  
