__.core.$map = function(){
  
    
    $('#map').click(function (e) {
      
      let id = $(this).attr('id');
      
      if ( $(e.target).is('canvas') ) {
       
        __.selectOnMap( e, id, $('.layers-controls__item_selected').data('id') );
        
        
        
      }
      
      

  }).bind('createMap', function(event){
    
    $(this).empty();

    var t = __.fs.mapTiles;
      
    var id = $(event.target).attr('id');

    var leafletMap = L.map(id, {
      attributionControl: false
    }).setView([55.751244, 37.618423], 9);
    L.control.attribution({position: 'bottomleft'}).addTo(leafletMap);
    var tiles = L.tileLayer(t.dark, {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
      
       
      tiles.on('tileload', function (tileEvent) {
        tileEvent.tile.setAttribute('alt', 'Map tile image');
        tileEvent.tile.setAttribute('role', 'presentation');
      }).addTo(leafletMap);
      
      leafletMap.search = false;
    
    $(event.target).data('map', leafletMap); 
    $(event.target).data('tiles', tiles);
    $(event.target).data('tileset', t);  

    __.mapControls();
      
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

      let changeOverlay = $('.layers-controls__item_selected').data('id');
      let tileset = $('#map').data('tileset');
      
      

      __.mapData()[changeOverlay](drawData);
 
      
      
      function drawData(){
        
        let overlay = ( $('#places').data('overlay') != changeOverlay ) ? true : false;  

        $.each(places, function (i, e) {


          //setTimeout(function(){

          if (e.canvas.visible) e.canvas = __.placePoint({
            mapId : mapId, 
            ctx: ctx,
            canvasOverlay: canvasOverlay,
            zoom: zoom,
            place: e
          });
          
          if ( overlay ){
            $(`#places .place-item[data-id="place-${e.id}"] .place-item__pin`).css({
              backgroundColor : e.canvas.color 
            })
          }

          //}, i*10)
          
        }); 

        
        
        $('#places').data('overlay', changeOverlay);
        
        window.DATA.places = places;
        
        $('#app').data('data',window.DATA);
        
        
        
        __.mapOverlay()[changeOverlay]( params, canvasOverlay, ctx, zoom, mapId );
        __.mapTiles(tileset)[changeOverlay]();
        __.mapLegend()[changeOverlay]();
        
      }
      

    };

  });
  
  
  
  
  
  return $('#map');
  
  }