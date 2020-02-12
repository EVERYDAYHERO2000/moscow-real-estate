__.search = function(params){
  
  
  
  var DATA = $('#app').data('data').places,
      searchdata = [],
      results = [],
      map = $('#map').data('map'),
      search = new __.fs.substringSearch({ multiply : false }),
      keys = {};
  
  
  if (params.text || 
      params.types != undefined || 
      params.distance != undefined || 
      params.railroad != undefined || 
      params.direction != undefined || 
      params.eco != undefined || 
      params.cost != undefined ){
    
    
    if (params.text){
    
    searchdata = search.inArray(params.text, DATA, function(e){ return e.name; }, function(e){
      e.canvas.visible = true;
      
    }, function(e){
      e.canvas.visible = false;
      
    });
    
    } else {
      
      $.each(DATA, function(i,e){
       
        e.canvas.visible = true;
        
        searchdata.push({
          res: {
            obj : e
          }
        });
      
      });
      
  
      
    }
    
    if (searchdata.length){
      
      map.search = true;
      
    } else {
      
      map.search = false;
      
    }
    
    $.each(searchdata, function(i,e){
      
      let place = e.res.obj;
      
      if (!keys[place.id]) {
        
        if (params.types != undefined) {
          
          let a,b;
          
          if (params.types.kp && place.type == 'КП') a = true;
            
          if (params.types.snt && place.type != 'КП') b = true;
          
          if (!a && !b) place.canvas.visible = false;
          
          
        }
        
        if (params.railroad != undefined) {
          
          if (params.railroad && place.railroad.distance > 3){
             place.canvas.visible = false;
          }
          
        }

        if (params.cost != undefined) {
          
          if (params.cost <= 50000000) {
            
            if (place.price.closest >= params.cost){
              
              place.canvas.visible = false;
              
            }
            
          }
          
        }
        
        if (params.distance != undefined) {
          
          if (params.distance < 120) {
            let m = (place.car.time.m < 10) ? '0' + place.car.time.m : place.car.time.m;
            let timeToInt = Number( (''+place.car.time.h) + (''+m) );
            
            if (timeToInt > params.distance){
              
              place.canvas.visible = false;
              
            }
            
          }
          
        }
        
        if (params.direction != undefined) {
          
          if (params.direction.length){
            let match = false;
            $.each(params.direction, function(i,e){
              
              if (place.moscow.angle > e[0] && place.moscow.angle < e[1]) match = true;
              
            });
              
            if (!match) place.canvas.visible = false;
            
          }
          
        }
        
        if (params.eco != undefined) {
          
          if (params.eco && place.eco.distance < 5 && place.eco.distance >= 0){
            place.canvas.visible = false;
          } 
          
        }
        
        if (place.canvas.visible) {
        
          keys[place.id] = true;  
          results.push(place);
        
        }
        
      }
      
    });
    
    
    
    $('#places').trigger('renderList', {places : results, onlyVisible: true}).scrollTop(0);
    
    
    
    
  } else {
    
    map.search = false;
    
    $.each(DATA, function(i,e){
      e.canvas.visible = true;
    });
    
    $('#places').trigger('renderList', {places : DATA, onlyVisible: false});
    
  }
  
  $('#map').data('canvas').redraw();
  
  
  
  
  return results;
  
}

