__.mapOverlay = function (params, canvasOverlay, ctx) {
  
  this.default = function (){
    return false
  };
  
  this.railroad = function (){
    return false
  };
  
  this.car = function (){
    return false
  };
  
  
  this.eco = function (params, canvasOverlay, ctx) {
    
    let eco = params.data.eco;
    
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
    
  }
  
  return this;
  
}