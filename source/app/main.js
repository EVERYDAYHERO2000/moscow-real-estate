
$(function(){
  
  var leafletMap = L.map('map').setView([55.751244, 37.618423], 9);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png")
  //L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA")
    .addTo(leafletMap);
  
  window.map = leafletMap;
  
  $.get('bin/data/data.json',function(places){
    places = decodeData(places);
    window.DATA = places;
    renderMap(places);
    renderList(places);
    
  });
  
  $('#map').click(function(e){
    
    var x = e.offsetX,
        y = e.offsetY;
    
    $.each(DATA,function(i,el){
      
      if (x > el.canvas.x1 && 
          x < el.canvas.x2 && 
          y > el.canvas.y1 && 
          y < el.canvas.y2 ){
        console.log(y, el);
      }
      
    });
    
  });
  
  function renderList(place) {
    $('#places').empty();
    $.each(place,function(i,e){
      //$('#places').append('<div>'+i+'</diV>');
      $('#places').append(__.placeItem(e));
      
    });
  }
  
  function renderMap(place) {
    L.canvasOverlay().drawing(drawingOnCanvas).addTo(leafletMap);


    function drawingOnCanvas(canvasOverlay, params) {
      var ctx = params.canvas.getContext('2d');
      var zoom = window.map.getZoom();
      ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
      

  
      
      $.each(place, function(i,e){
        
            
            e.canvas = __.placePoint({
              ctx : ctx,
              canvasOverlay : canvasOverlay,
              zoom : zoom,
              place : e
            });
            
        
      });
      
      
      
    };
  }
  
  
})