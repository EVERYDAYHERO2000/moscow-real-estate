
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
  
  
  $('#places').scroll(function(e){
    var $last = $('#places').find('.place-item').last();
    var lastId = $last.attr('id').split('-')[1];
    var length = $('#places').find('.place-item').length;
    
    if ( !window.map.search && $last.offset().top < $(window).outerHeight() * 2 ){
      
      var count = 100;
      $.each(DATA, function(i,e){
        if (length < i){
          $('#places').append(__.placeItem(e));
          count--;
        }
        if (!count) return false;
      });
    }
    
  });
  
  function renderList(place, onlyVisible) {
    $('#places').empty();
    
    

    $.each(place, function(i,e){
      
      if (onlyVisible){

        if (e.canvas.visible){
          $('#places').append(__.placeItem(e));
        } 
        
      } else {
      
        if (i < 100){
          $('#places').append(__.placeItem(e));
        } else {
          return false;
        }
      }
      
    });
    
  }
  
  function renderMap(place) {
    var c = L.canvasOverlay().drawing(drawingOnCanvas).addTo(leafletMap);
    
    window.map.canvas = c;
    
    function drawingOnCanvas(canvasOverlay, params) {
      var ctx = params.canvas.getContext('2d');
      var zoom = window.map.getZoom();
      ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
      
      $.each(place, function(i,e){
        
            
            if (e.canvas.visible) e.canvas = __.placePoint({
              ctx : ctx,
              canvasOverlay : canvasOverlay,
              zoom : zoom,
              place : e
            });
            
        
      });
      
      
      
    };
  }
  
  
  __.renderList = renderList;
  
  
  
})