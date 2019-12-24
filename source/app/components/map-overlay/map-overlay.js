__.mapOverlay = function (params, canvasOverlay, ctx, zoom, mapId) {

  let scale = 2,
    icons = __.fs.mapSprites(scale),
    size = 20 * scale,
    resize = size * 0.65,
    src = `/source/assets/img/map/pins@${scale}x.png`,
    img = img = new Image();
  
    img.src = src;

  this.default = function () {
    return false
  };
  
  this.markets = function (params, canvasOverlay, ctx, zoom, mapId) {
    
    let markets = params.data.markets;
    
    
    getIcons(img, function(img){
      
      $.each(markets, function (i, e) {

        let ico = '';
      
        if (zoom > 9)  ico = icons.point_green;
        if (zoom > 11) ico = icons.markets;


        let bb = drawIcons(e, ctx, canvasOverlay, img, size, ico, resize);

        
        
        e.canvas = e.canvas || {}; 
        e.canvas[mapId] = bb;
        
      });
      
    });
    
    return false;
    
    
  }
  
  this.water = function (params, canvasOverlay, ctx, zoom, mapId) {
    
  
    let water = params.data.water;
    
    getIcons(img, function(img){
      
      $.each(water, function (i, e) {

        let ico = '';
      
        if (zoom > 9)  ico = icons.point_blue;
        if (zoom > 11) ico = icons.water_depth; 


        let bb = drawIcons(e, ctx, canvasOverlay, img, size, ico, resize);

        
        
        e.canvas = e.canvas || {};  
        e.canvas[mapId] = bb;
        
      });
      
    });
    
    return false;  
  }
  

  this.railroad = function (params, canvasOverlay, ctx, zoom, mapId) {

    
    
    let railroad = params.data.railroad;
    
    
    ///////
    $.each(railroad, function (i, e) {
        if (e.path){
        var line = e.path.points;

        
        
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 196, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
          

        for (var p = 0; p < line.length; p++) {

          var from = canvasOverlay._map.latLngToContainerPoint([line[p][1], line[p][0]]);
          var to = (line[p + 1]) ? canvasOverlay._map.latLngToContainerPoint([line[p + 1][1], line[p + 1][0]]) : from;

          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);

        }

        ctx.stroke();
          
        }

    });
    //////
    
    
    
    getIcons(img, function(img){
      
      $.each(railroad, function (i, e) {

        let ico = '';
      
        if (zoom > 9) ico = icons.point_blue;
        if (zoom > 11) ico = icons.railroad;

        let bb = drawIcons(e, ctx, canvasOverlay, img, size, ico, resize);

        
        
        e.canvas = e.canvas || {visible:true}; 
        e.canvas[mapId] = bb;
        
      });
      
    });
    
    return false
  };

  this.car = function (params, canvasOverlay, ctx, zoom, mapId) {
  
      
    let roads = params.data.roads;
    
    

    
      
        $.each(roads, function (i, e) {  
      
        var line = e.points;  
        
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 196, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
          

        for (var p = 0; p < line.length; p++) {

          var from = canvasOverlay._map.latLngToContainerPoint([line[p][1], line[p][0]]);
          var to = (line[p + 1]) ? canvasOverlay._map.latLngToContainerPoint([line[p + 1][1], line[p + 1][0]]) : from;

          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          
          

        }

        ctx.stroke();
          
        
           
        });

        
    
    
    
    return false
    
  };


  this.eco = function (params, canvasOverlay, ctx, zoom, mapId) {
    
    

    let eco = params.data.eco;
    
    
    getIcons(img, function(img){
      
      $.each(eco, function (i, e) {

        let ico = null;

        if (zoom > 9) {

          if (e.type == 6) ico = icons.recicle;
          if (e.type == 10) ico = icons.airport;   
          if (e.type == 7 || e.type == 9) ico = icons.trash;
          if (e.type == 2 || e.type == 1) ico = icons.radiation;
          if (e.type == 8 || e.type == 11) ico = icons.factory;
          if (e.type == 5) ico = icons.water;
          if (e.type == 4) ico = icons.energy;
          if (e.type == 3) ico = icons.power;
          if (e.type == 12) ico = icons.black_mesa;
          if (e.type == 13) ico = icons.army;
            
          

          
          
        } else {

          ico = icons.point_yellow;

        }

        let bb = drawIcons(e, ctx, canvasOverlay, img, size, ico, resize);
        
        
        
        e.canvas = e.canvas || {visible:true}; 
        e.canvas[mapId] = bb;

      });
      
    });
    


  }
  
  function getIcons(img, callback){
    
    if (__.core.$map.data('icons')){
      
      callback(__.core.$map.data('icons'));
      
    } else {
    
      img.addEventListener('load', function () {

        __.core.$map.data('icons', img);

        callback(img);

      });
      
    }
    
    return img;
    
  }
  
  
  function drawIcons(e, ctx, canvasOverlay, img, size, ico, resize){
    
    let dot = canvasOverlay._map.latLngToContainerPoint([e.point[1], e.point[0]]),
        bb = {
          x1: dot.x,
          x2: dot.x + (resize), 
          y1: dot.y,
          y2: dot.y + (resize)
        };
    
    if (ico) ctx.drawImage(img, 0, ico, size, size, dot.x - resize / 2, dot.y - resize / 2, resize, resize);
    return bb;
  }

  return this;

}