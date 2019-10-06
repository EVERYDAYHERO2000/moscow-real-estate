__.search = function(params){
  
  var request = params.text.toLowerCase().trim();
  var results = [];
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
      window.map.search = true;
    } else {
      window.map.search = false;  
    }
    
    __.renderList(DATA,true);
    
    $('#places').scrollTop(0);
    
  } else {
    
    window.map.search = false;
    $.each(DATA, function(i,e){
      e.canvas.visible = true;
    });
    
    __.renderList(DATA, false);
    
  }
  
  
  map.canvas.redraw();
  
  return results;
  
}