function bindEvent(elem, eventName, event){
  if (!window.listners[elem + '|' + eventName]){
    window.listners[elem + '|' + eventName] = {
      name : elem,
      event : eventName
    }
    $(document).on(eventName,elem,event);
  }
}

function unbindEvent(elem, eventName){
  delete window.listners[elem + '|' + eventName];
  $(document).off(eventName, elem);
}