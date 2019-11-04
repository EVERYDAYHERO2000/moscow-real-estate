__.fs.analytics = function(name, params){
  
  let event = {
    event_url : location.href
  }
  
    
  $.each(params, function(i,e){
      
    event[i] = e;
      
  });
    
  if (window.amplitude) amplitude.getInstance().logEvent(name, event);
    
  
  
  return event;
  
}