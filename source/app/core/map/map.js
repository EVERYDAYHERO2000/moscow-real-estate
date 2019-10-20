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
    //L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png")
    L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA")
      .addTo(leafletMap);
    
    
    
    $(event.target).data('map', leafletMap);
    
  }).bind('renderMap', function (event, params) {

    var _this = this,
        places = params.data.places,
        eco = params.data.eco,
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
      
      var img = new Image();  
      
        var scale = 2,//( $('#app').data('browser').isMobile == 'mobile') ? 3 : 2,
              icons = {
                recicle : 1,
                radiation : 20 * scale,
                factory : 40 * scale,
                trash : 60 * scale,
                airport : 80 * scale,
                power : 100 * scale,
                water : 120 * scale
              },
              size = 20 * scale;   
      
        img.addEventListener('load', function() {
          
        
          
          $.each(eco, function(i,e){
            
            
            
            var ico = null;
            if (e.type == 'n' ) ico = icons.recicle;
            if (e.type == 'a' ) ico = icons.airport;
            if (e.type == 'w' || e.type == 'q' ) ico = icons.trash;
            if (e.type == 'r') ico = icons.radiation;
            if (e.type == 'o' || e.type == 'E' ) ico = icons.factory;
            if (e.type == 's') ico = icons.water;
            if (e.type == 'K' || e.type == 'p') ico = icons.power
            
            var dot = canvasOverlay._map.latLngToContainerPoint([e.point[1], e.point[0]]);
            
            
            
            if (ico) ctx.drawImage(img, 0, ico, 20 * scale, 20 * scale, dot.x - size/2, dot.y - size/2, size * 0.65, size * 0.65);
            
          })
          
          
          
        }, false);
        img.src = `source/assets/img/map/pins@${scale}x.png`; 
      

    };

  }).data('layer',{
    eco: {
      title : 'Экология',
      active : true
    },
    railroad : {
      title : 'Электирички',
      active : false 
    }
  });
  
  $('#map-controls').bind('create', function(event){
    
    $(this).append(`<div class="map-controls"><div class="btn">Слой</div></div>`);
    
  }).trigger('create');
  
  
  
  return $('#map');
  
  }
  
