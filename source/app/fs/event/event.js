__.fs.event = {
  bind: function (elem, eventName, event) {
    
    var listners = __.core.$app.data('listners') || {};
    if (!listners[elem + '|' + eventName]) {
      listners[elem + '|' + eventName] = {
        name: elem,
        event: eventName
      }
      
      __.core.$app.data('listners', listners);

      $(document).on(eventName, elem, event);
    }
  },
  unbind: function (elem, eventName) {
    var listners = __.core.$app.data('listners') || {};
    delete listners[elem + '|' + eventName];
    
    __.core.$app.data('listners', listners);
    $(document).off(eventName, elem);
  }
}