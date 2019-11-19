__.fs.mapObjectGet = function(id, type, callback) {

  let DATA = $('#app').data('data')[type],
      object = null;
  
  
  $.each(DATA, function(i,e){
    
    if (e.id == id){
      if (e.full){
        
        object = e;
        
      } else {
        
        object = e;
        
      }
         
    }
    
  });
  
  callback(object);
  
}