__.core.$places = function(){
  
  
    $('#places').scroll(function (e) {
    var _this = this,
        $last = $(_this).find('.place-item').last(),
        lastId = $last.data('id').split('-')[1],
        length = $(_this).find('.place-item').length,
        map = $('#map').data('map');

    if (!map.search && $last.offset().top < $(window).outerHeight() * 2) {

      var DATA = $('#app').data('data').places,
          count = 100;
      
      
      $.each(DATA, function (i, e) {
        if (length < i) {
          $(_this).append(__.placeItem(e));
          count--;
        }
        if (!count) return false;
      });
    }

  }).bind('renderList', function (event, params) {

    var _this = this,
        onlyVisible = params.onlyVisible || false,
        places = params.places;

    $(_this).empty();

    $.each(places, function (i, e) {

      if (onlyVisible) {

        if (e.canvas.visible) {
          $(_this).append(__.placeItem(e));
        }

      } else {

        if (i < 100) {
          $(_this).append(__.placeItem(e));
        } else {
          return false;
        }
      }

    });

  });
  
  return $('#places');
  
}