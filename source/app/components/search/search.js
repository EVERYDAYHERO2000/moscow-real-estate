__.search = function(params){
  
  var DATA = $('#app').data('data').places,
      request = params.text.toLowerCase().trim(),
      results = [],
      map = $('#map').data('map');
   
  
  if (params.text){
    $.each(DATA, function(i,e){
      
      var name = e.name.toLowerCase().trim();
      
      if (name.indexOf(request) !== -1){

        e.canvas.visible = true;
        results.push(e);
      } else {

        e.canvas.visible = false;

      }

    });

    if (results.length) {
      map.search = true;
    } else {
      map.search = false;  
    }
    
     $('#places').trigger('renderList', {places : DATA, onlyVisible: true}).scrollTop(0);
    
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