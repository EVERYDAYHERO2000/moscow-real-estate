$(function () {

  var leafletMap = L.map('map').setView([55.751244, 37.618423], 9);
  //L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png")
  L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA")
    .addTo(leafletMap);

  $.get('bin/data/data.json', function (places) {
    
    places = decodeData(places);

    $('#app').data('places', places);
    
    $('#map').trigger('renderMap', {
      places: places
    });

    $('#places').trigger('renderList', {
      places: places,
      onlyVisible: false
    });

  });

  $('#map').click(function (e) {

    var DATA = $('#app').data('places'),
        x = e.offsetX,
        y = e.offsetY;

    $.each(DATA, function (i, el) {

      if (x > el.canvas.x1 &&
        x < el.canvas.x2 &&
        y > el.canvas.y1 &&
        y < el.canvas.y2) {
        console.log(y, el);
      }

    });

  }).data('map', leafletMap).bind('renderMap', function (event, params) {

    var _this = this,
        places = params.places;

    var c = L.canvasOverlay().drawing(drawingOnCanvas).addTo(leafletMap);
    
    $(_this).data('canvas', c);

    function drawingOnCanvas(canvasOverlay, p) {
      var ctx = p.canvas.getContext('2d'),
          zoom = $(_this).data('map').getZoom();
      
      ctx.clearRect(0, 0, p.canvas.width, p.canvas.height);

      $.each(places, function (i, e) {

        if (e.canvas.visible) e.canvas = __.placePoint({
          ctx: ctx,
          canvasOverlay: canvasOverlay,
          zoom: zoom,
          place: e
        });

      });

    };

  });


  $('#places').scroll(function (e) {
    var _this = this,
        $last = $(_this).find('.place-item').last(),
        lastId = $last.attr('id').split('-')[1],
        length = $(_this).find('.place-item').length,
        map = $('#map').data('map');

    if (!map.search && $last.offset().top < $(window).outerHeight() * 2) {

      var DATA = $('#app').data('places'),
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

});