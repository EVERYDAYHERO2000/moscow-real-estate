__.search = function(params){
  
  var DATA = $('#app').data('data').places,
      searchdata = [],
      results = [],
      map = $('#map').data('map'),
      search = new __.substringSearch({ multiply : false }),
      keys = {};
  
  
  if (params.text){
    
    searchdata = search.inArray(params.text, DATA, function(e){ return e.name; }, function(e){
      e.canvas.visible = true;
      
    }, function(e){
      e.canvas.visible = false;
      
    });
    
    map.search = (searchdata.length) ? true : false;
    
    
    
    $.each(searchdata, function(i,e){
      
      if (!keys[e.res.obj.id]) {
        keys[e.res.obj.id] = true;
        results.push(e.res.obj);
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

