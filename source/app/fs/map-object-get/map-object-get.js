__.fs.mapObjectGet = function(id, type, callback) {

  let DATA = $('#app').data('data')[type],
      object = null;
  
  $.each(DATA, function(i,e){
    
    if (e.id == id){
      if (e.full){
        
        object = e;
        
      } else {
        getData(id, type, function(){
          object = e;
        }); 
      }
         
    }
    
  });
  
  function getData(id, type, callback){
    
    $.get('/bin/data/objects.json', function (data) {
          
      let DATA = $('#app').data('data');
      
      
      
      $.each(DATA.eco, function(i,e){
        
        for(var k in data.eco[i]) {
          
          e[k] = data.eco[i][k];
        }
        e.full = true;
        
      });
      
      $.each(DATA.railroad, function(i,e){
        
        for(var k in data.railroad[i]) {
          e[k] = data.railroad[i][k];
        }
        e.full = true;
        
      });
          
    });
    
    callback();
    
  }
  
  callback(object);
  
}