function bindEvent(elem, eventName, event){
  var listners = $('#app').data('listners') || {};
  if (!listners[elem + '|' + eventName]){
    listners[elem + '|' + eventName] = {
      name : elem,
      event : eventName
    }
    
    $('#app').data('listners', listners);
    
    $(document).on(eventName,elem,event);
  }
}

function unbindEvent(elem, eventName){
  var listners = $('#app').data('listners') || {};
  delete listners[elem + '|' + eventName];
  $('#app').data('listners', listners);
  $(document).off(eventName, elem);
}