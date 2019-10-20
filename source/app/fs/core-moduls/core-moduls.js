__.fs.coreModuls = function(moduls){
  
  var core = {};
  
  $.each(moduls,function(i,e){
        
    core[e] = __.core[e]();
    
  });
  
  return core;
  
}