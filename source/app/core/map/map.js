__.core.$map = function(){
  
    $('#map').click(function (e) {

    var DATA = $('#app').data('data').places,
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

  }).bind('createMap', function(event){
    
    var id = $(event.target).attr('id');
    
    var leafletMap = L.map(id).setView([55.751244, 37.618423], 9);
    var tiles = L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA")
      .addTo(leafletMap);
    
    
    
    $(event.target).data('map', leafletMap);
    $(event.target).data('tiles', tiles);  
    
  }).bind('renderMap', function (event, params) {

    var _this = this,
        places = params.data.places,
        map = $(event.target).data('map');
    

    var c = L.canvasOverlay().drawing(drawingOnCanvas).addTo(map);
    
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
      
      let changeOverlay = $('#select-layer').val();
      
      __.mapOverlay()[changeOverlay](params, canvasOverlay, ctx);
      __.mapTiles()[changeOverlay]();
      

    };

  });
  
  
  
  
  
  return $('#map');
  
  }
  
