$(function(){
  
  var leafletMap = L.map('map').setView([55.751244, 37.618423], 9);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png")
    .addTo(leafletMap);
  
  $.get('bin/data/places.json',function(places){
    render(places);
  });
  
  function render(place) {
    L.canvasOverlay().drawing(drawingOnCanvas).addTo(leafletMap);

    function drawingOnCanvas(canvasOverlay, params) {
      var ctx = params.canvas.getContext('2d');
      ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
      ctx.fillStyle = 'rgba(255,116,0, 0.8)';

      ctx.globalAlpha = 0.2;

      
      $.each(place, function(i,e){
                
            var dot = canvasOverlay._map.latLngToContainerPoint([e.point[1], e.point[0]]);
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath(); 
          
        
      });
      
      
      
    };
  }
  
  
})