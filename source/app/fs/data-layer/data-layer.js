__.fs.dataLayer = function(name, params){
  
  let event = {
    event : name,
    event_url : location.href
  }
  
  if (window.dataLayer){
    
    $.each(params, function(i,e){
      
      event[i] = e;
      
    });
    
    dataLayer.push(event);
    
  }
  
  return event;
  
}