__.mapOverlay = function (params, canvasOverlay, ctx, zoom) {
  
  this.default = function (){
    return false
  };
  
  this.railroad = function (){
    return false
  };
  
  this.car = function (){
    return false
  };
  
  
  this.eco = function (params, canvasOverlay, ctx, zoom) {
    
    let eco = params.data.eco;
    
    
    var img = new Image();  
      
        var scale = 2,//( $('#app').data('browser').isMobile == 'mobile') ? 3 : 2,
              icons = {
                recicle : 1,
                radiation : 20 * scale,
                factory : 40 * scale,
                trash : 60 * scale,
                airport : 80 * scale,
                energy : 100 * scale,
                water : 120 * scale,
                point : 140 * scale,
                power : 160 * scale
              },
              size = 20 * scale,
              resize = size * 0.65;   
      
        img.addEventListener('load', function() {
          
        
          
          $.each(eco, function(i,e){
            
            
            
            var ico = null;
            
            if (zoom > 9) {
            
            if (e.type == 'n' ) ico = icons.recicle;
            if (e.type == 'a' ) ico = icons.airport;
            if (e.type == 'w' ) ico = icons.trash;
            if (e.type == 'r' || e.type == 'q') ico = icons.radiation;
            if (e.type == 'o' || e.type == 'E' ) ico = icons.factory;
            if (e.type == 's') ico = icons.water;
            if (e.type == 'p') ico = icons.energy;
            if (e.type == 'K') ico = icons.power;
            
            } else {
              
              ico = icons.point;
              
            }
            
            var dot = canvasOverlay._map.latLngToContainerPoint([e.point[1], e.point[0]]);
            
            
            
            if (ico) ctx.drawImage(img, 0, ico, size, size, dot.x - resize/2, dot.y - resize/2, resize, resize);
            
          })
          
          
          
        }, false);
        img.src = `source/assets/img/map/pins@${scale}x.png`; 
    
  }
  
  return this;
  
}