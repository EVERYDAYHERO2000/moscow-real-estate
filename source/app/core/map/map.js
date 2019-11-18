__.core.$map = function(){
  
    
    $('#map').click(function (e) {
      
      let id = $(this).attr('id');
      
      if ( $(e.target).is('canvas') ) {
       
        __.selectOnMap( e, id, $('#select-layer').val() );
        
      }
      
      

  }).bind('createMap', function(event){
    
    var t = __.fs.mapTiles;
      
    var id = $(event.target).attr('id');
    
    var leafletMap = L.map(id).setView([55.751244, 37.618423], 9);
    var tiles = L.tileLayer(t.dark)
      .addTo(leafletMap);
    
    $(event.target).data('map', leafletMap);
    $(event.target).data('tiles', tiles);
    $(event.target).data('tileset', t);  
      
    leafletMap.on('dragstart zoomstart', function (e) { 
      
      $('#map-controls').find('.place-select').remove();
    
    });  
        
      
    $('.leaflet-bar').find('a').each(function(i,e){
      $(e).click(function(event){
        event.preventDefault();
        $('#app').scrollTop(0);
      });
    });
      
    
  }).bind('renderMap', function (event, params) {

    var _this = this,
        places = params.data.places,
        map = $(event.target).data('map');
     

    var c = L.canvasOverlay().drawing(drawingOnCanvas).addTo(map);
    
    $(_this).data('canvas', c);

    function drawingOnCanvas(canvasOverlay, p) {
      let ctx = p.canvas.getContext('2d'),
          zoom = $(_this).data('map').getZoom(),
          mapId = $(_this).attr('id');
      
      
          
          
      
      ctx.clearRect(0, 0, p.canvas.width, p.canvas.height);

      /*
      $.each(places, function (i, e) {

        if (e.canvas.visible) e.canvas = __.placePoint({
          mapId : mapId, 
          ctx: ctx,
          canvasOverlay: canvasOverlay,
          zoom: zoom,
          place: e
        });

      });
      
      let changeOverlay = $('#select-layer').val();
      let tileset = $('#map').data('tileset');
      
      
      __.mapOverlay()[changeOverlay]( params, canvasOverlay, ctx, zoom, mapId );
      __.mapTiles(tileset)[changeOverlay]();
      */

    };

  });
  
  
  
  
  
  return $('#map');
  
  }